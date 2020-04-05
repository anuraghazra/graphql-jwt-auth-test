const { gql } = require('apollo-server-express');

const typeDefs = gql`
  directive @auth on OBJECT | FIELD_DEFINITION

  type Query {
    todos: [Todo!]! @auth
    users: [User!]!
  }
  
  type User {
    id: ID!
    username: String!
    email: String!
  }
  
  type Todo {
    id: ID!
    title: String!
    isDone: Boolean
  }

  type LoginOutput {
    token: String!
    user: User!
  }

  type Mutation {
    addTodo(title: String!): Todo @auth
    deleteTodo(id: ID!): Todo @auth
    toggleTodo(id: ID!): Todo @auth
  
    login(username: String!, password: String!): LoginOutput! 
    signup(username: String!, email: String!, password: String!): User!
  }
`

module.exports = { typeDefs } 