const { gql, ApolloServer } = require("apollo-server");
const { Neo4jGraphQL } = require("@neo4j/graphql");
const neo4j = require("neo4j-driver");
require("dotenv").config();

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


const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "letmein")
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const server = new ApolloServer({
  schema: neoSchema.schema,
  context: ({ req }) => ({ req }),
});

server.listen().then(({ url }) => {
  console.log(`GraphQL server ready on ${url}`);
});