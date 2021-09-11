import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import path from 'path'
import { typeDefs } from './modules/typeDefs.js'
import { resolvers } from './modules/resolvers.js'



async function startApolloServer(typeDefs, resolvers) {
    const app = express();

    app.use(express.static(path.join(process.cwd(), 'src', 'public')))
    app.get('/', (req,res) => res.sendFile(path.join(process.cwd(), 'src', 'views', 'index.html')))
    

    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    server.applyMiddleware({ app });
    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer(typeDefs,resolvers)