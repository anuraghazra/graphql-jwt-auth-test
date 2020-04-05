const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const { makeExecutableSchema } = require('graphql-tools');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('./graphql');
const { AuthDecorator } = require('./graphql/directives');
const { verifyToken } = require('./utils/verifyToken');

dotenv.config();

(async () => {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
      auth: AuthDecorator
    }
  })

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ currentUser: verifyToken(req) }),
  });

  server.applyMiddleware({ app });

  await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
  });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  })
})()
