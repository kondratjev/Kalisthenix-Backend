import { ApolloServer } from "apollo-server-express";
import express from "express";

import CONFIG from "./config";
import "./db/mongoose";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { getContext } from "./utils/auth";

(async () => {
  const server = new ApolloServer({ typeDefs, resolvers, context: getContext });

  const app = express();

  app.disable("x-powered-by");

  server.applyMiddleware({ app });

  app.listen({ port: CONFIG.PORT }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${CONFIG.PORT}${server.graphqlPath}`
    );
  });
})();
