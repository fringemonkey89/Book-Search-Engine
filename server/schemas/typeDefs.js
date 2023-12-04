const { gql } = require('apollo-server-express')

const typeDefs = gql `
    type Book {
        authors: [String]
        description: String
        bookId: String!
        image: String
        link: String
        title: String
    }

    type User {
        _id: ID!
        username: String
        bookCount: Int
        email: String
        savedBooks: [Book]
    }

    input bookInput {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!) : Auth
        saveBook(input: bookInput): User
        removeBook(bookId: ID!): User
    }

`

module.exports = typeDefs