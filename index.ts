import * as dotenv from "dotenv";

dotenv.config();
import express from "express";
import datasource from "./lib/datasource";
import {wilders, languages} from "./routes";

const app = express()

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use("/wilders", wilders);
app.use("/languages", languages);

const start = async () => {
    await datasource.initialize();
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Serveur lancé sur le port ${process.env.PORT}`); //es6
    });
  };
  
start();
  