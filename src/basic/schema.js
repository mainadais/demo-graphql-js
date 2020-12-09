const { buildSchema } = require("graphql");
const schema = buildSchema(`
type Query {
    hello: String

    rollDice(numDice: Int!, numSides: Int!): [Int]

    getDie(numSides: Int): FakeDie

    getBook(isbn: ID!): Book

    getAllBooks: [Book]

    getAvailableBooks: [Book]

    calculateValue(num: Int!): Result!

    retrieveUser(num: Int!): User!
}

type Mutation {
    addBook(book: AddBook): Book!

    addAuthor(isbn: ID!, author: AddAuthor!): Book!
}

type FakeDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRoll: Int!): [Int]
}

type Book {
    isbn: ID!
    title: String!
    available: Boolean
    authors: [Author]
}

type Author {
    name: String
}

input AddBook {
    title: String!
}

input AddAuthor{
    name: String!
}

union Result = Some | None

type Some  {
    data: Int
}

type None  {
    error: Int
}

interface User {
    id: ID!
    name: String
}

type Admin implements User {
    id: ID!
    name: String
    title: String
    roles: [String!]
}

type Guest implements User {
    id: ID!
    name: String
    token: String!
}
`);

module.exports = schema;
