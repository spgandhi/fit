# syntax=docker/dockerfile:1
FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /src
COPY package.json /
COPY yarn.lock /
RUN yarn install
COPY . .
EXPOSE 4000
CMD ["node", "index.js"]