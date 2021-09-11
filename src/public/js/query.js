const FOODS = `
    query{
        foods{
            foodId
            foodName
        }
    }
`

const USERS = `
    query{
        users {
            userId
            username
            contact
        }
    }
`
const ORDERS = `
    query($userId: ID){
        orders(userId: $userId) {
            food {
                foodName
                foodImg
                foodId
            }
            count
            user{
                userId
            }
        }
    }
`
const ADDUSER = `
    mutation($addUserUsernames: String!, $addUserContacts: String!){
        addUser(username: $addUserUsernames, contact: $addUserContacts) {
            status
            message
            data
    }
  }
`
const ADDORDER = `
    mutation($addOrderFoodId: ID!, $addOrderUserId: ID!, $addOrderCount: ID!){
    addOrder(foodId: $addOrderFoodId, userId: $addOrderUserId, count: $addOrderCount) {
      status
      message
      data
    }
  }
`