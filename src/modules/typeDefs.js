import {gql} from 'apollo-server-express'

export const typeDefs = gql`
    scalar Any

    type Query {
        users: [User!]!
        orders(userId: ID): [Order!]!
        foods: [Food!]!
    }
    
    type Mutation {
        addUser(username: String! contact: String!): MutationResponse!
        addOrder(foodId: ID! userId: ID! count: ID!): MutationResponse!
    }

    type MutationResponse {
        status: Int!
        message: String!
        data: Any
    }

    type User {
        userId: ID!
        username: String!
        contact: String!
        orders: [Order!]
    }
    type Order {
        orderId: ID!
        food: Food!
        user: User!
        count: Int!
    }
    type Food {
        foodId: ID!
        foodName: String!
        foodImg: String!
    }

`