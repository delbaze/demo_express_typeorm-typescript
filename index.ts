import * as dotenv from "dotenv";

dotenv.config();
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { WilderResolver } from "./resolver/wilder.resolver";
import { buildSchema } from "type-graphql";
// import express from "express";
import datasource from "./lib/datasource";
// import {wilders, languages} from "./routes";

const start = async (): Promise<void> => {
  const schema = await buildSchema({ resolvers: [WilderResolver] });
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });
  server.listen().then(async ({ url }) => {
    await datasource.initialize();
    console.log(`Serveur lancé sur ${url}`);
  });
};
start();
// const app = express()

// app.use(express.urlencoded({ extended: true}));
// app.use(express.json());

// app.use("/wilders", wilders);
// app.use("/languages", languages);

// const start = async () => {
//     await datasource.initialize();
//     app.listen(process.env.PORT || 3000, () => {
//       console.log(`Serveur lancé sur le port ${process.env.PORT}`); //es6
//     });
//   };

// start();
