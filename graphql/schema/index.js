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


type Booking{
    _id:ID!
    event:Event!
    user:User!
    createdAt:String!
    updatedAt:String!
}

type AuthData{
    userId:ID!
    token: String!
    tokenExpiration: Int!
}


type RootQuery{
    events : [Event!]!
    bookings:[Booking!]!
    login(email:String!,password:String!) : AuthData!
}

type RootMutation{
    createEvent(event: EventInput): Event
    createUser(user: userInput) : User
    bookEvent(eventId:ID!) : Booking!
    cancelBooking(bookingId: ID!):Event!
}

schema{
    query:RootQuery
    mutation:RootMutation
}
`)