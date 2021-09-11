import { read, write } from "../lib/orm.js"

export const resolvers = {
    Query: {
        users: () => read('users'),
        orders: (_,{userId}) => !userId ? read('orders') : read('orders').filter(val => val.user_id == userId),
        foods: () => read('foods')
    },
    Mutation:{
        addUser: (_,user) => {
            let users = read('users')
                user.user_id = users.length ? users[users.length - 1].user_id + 1 : 1
                users.push(user)
                if(write('users', users)){
                    return {
                        status: 201,
                        message: "the user add",
                        data: user
                    }
                }
        },
        addOrder: (_,{foodId, userId, count}) => {
            let orders = read('orders')
                let order = orders.find(val => val.food_id == foodId && val.user_id == userId)
                if(order) {
                    order.count = +order.count + +count
                }else{
                    order = {
                        order_id: orders.length ? orders[orders.length - 1].order_id + 1 : 1,
                        user_id: userId,
                        food_id: foodId,
                        count
                    }
                    orders.push(order)
                }
                if(write('orders', orders)){
                    return {
                        status: 201,
                        message: "the order add",
                        data: order
                    }
                }
        }
    },
    User: {
        userId: (global) => global.user_id,
        orders: global =>  {
            let orders = read('orders')
            return orders.filter(val => val.user_id == global.user_id)
        }
    },
    Order: {
        orderId: global => global.order_id,
        food: global => read('foods').find(val => val.food_id == global.food_id),
        user: global => read('users').find(val => val.user_id == global.user_id)
    },
    Food: {
        foodId: global => global.food_id,
        foodName: global => global.food_name,
        foodImg: global => global.food_img
    }
}