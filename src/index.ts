import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UsersResolver } from "./modules/users/graphql/resolvers/UsersResolver";
import { connect } from "./config/database";
import { PetsResolver } from "./modules/pets/graphql/resolvers/PetsResolver";

async function bootstrap() {
  const app = express();
  const port = process.env.PORT || 4010;

  await connect();

  const schema = await buildSchema({
    resolvers: [UsersResolver, PetsResolver],
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

bootstrap();
