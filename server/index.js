const { gql } = require("apollo-server");
const { Neo4jGraphQL } = require("@neo4j/graphql");
const ApolloServer = require('apollo-server-express');
const neo4j = require("neo4j-driver");
require("dotenv").config();
const express = require('express')
const fs = require('fs');
const https = require('https');
const http = require('http');

const typeDefs = gql`
  type User {
    id: ID! @id
    name: String!
    exercises: [Exercise] @relationship(type: "DID_EXERCISE", direction: OUT)
    workouts: [Workout] @relationship(type: "DID_WORKOUT", direction: OUT)
  }

  type Exercise {
    id: ID! @id
    name: String!
    slug: String!
    user: [User]! @relationship(type: "DID_EXERCISE", direction: IN)
    workout: [Workout]! @relationship(type: "HAS_EXERCISE", direction: IN, properties: "HasExercise")
    focus: String
    rounds: HasExercise
  }

  type Workout {
    id: ID! @id
    isActive: Boolean!
    startTime: DateTime! @timestamp
    endTime: DateTime
    user: [User]! @relationship(type: "DID_WORKOUT", direction: IN)
    exercises: [Exercise]! @relationship(type: "HAS_EXERCISE", direction: OUT, properties: "HasExercise")
  }

  interface HasExercise @relationshipProperties {
    details: String
  }   
`;

async function startApolloServer() {
  const configurations = {
    // Note: You may need sudo to run on port 443
    production: { ssl: true, port: 4000, hostname: 'localhost' },
    development: { ssl: false, port: 4000, hostname: 'fitbud.me' },
  };

  console.log(process.env.NODE_ENV);
  const environment = process.env.NODE_ENV || 'development';
  const config = configurations[environment];

  const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
  );

  const neoSchema = new Neo4jGraphQL({ typeDefs, driver });
  const server = new ApolloServer.ApolloServer({
    schema: neoSchema.schema,
    context: ({ req }) => ({ req }),
  });

  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  // Create the HTTPS or HTTP server, per configuration
  let httpServer;
  console.log(config.ssl);
  if (config.ssl) {
    // Assumes certificates are in a .ssl folder off of the package root.
    // Make sure these files are secured.
    httpServer = https.createServer(
      {
        key: fs.readFileSync(`./etc/letsencrypt/live/fitbud.me/privkey.pem`),
        cert: fs.readFileSync(`./etc/letsencrypt/live/fitbud.me/cert.pem`),
      },
      app,
    );
  } else {
    httpServer = http.createServer(app);
  }

  await new Promise(resolve =>
    httpServer.listen({ port: config.port }, resolve)
  );

  console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${
      server.graphqlPath
    }`
  );

  return { server, app };
}

startApolloServer();
