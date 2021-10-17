const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Event{
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator:User!
}

input EventInput{
    title: String!
    description: String!
    price: Float!
    date: String!
}

type User{
  _id:ID!
  email:String!
  password:String
  createdEvents:[Event!]!
}

input userInput{
  email:String!
  password:String!
}


type RootQuery{
    events : [Event!]!
}

type RootMutation{
    createEvent(event: EventInput): Event
    createUser(user: userInput) : User
}

schema{
    query:RootQuery
    mutation:RootMutation
}
`)