const gql = require("graphql-tag");

const typeDefs = gql`
  type User {
    username: String!
    password: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }
  enum YesNo {
    YES
    NO
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    friendOf: [User!]!
    id: ID!
  }

  type Subscription {
    personAdded: Person!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(name: String!, phone: String!): Person
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): Token
    addAsFriend(name: String!): User
  }
`;

module.exports = typeDefs;
