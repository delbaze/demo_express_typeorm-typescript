import { DataSource } from "typeorm";
import Wilder from "../entity/Wilder";
import Language from "../entity/Language";
import Note from "../entity/Note";


import * as path from "path";

export default new DataSource({
  type: "sqlite",
  database: path.resolve(__dirname, "../database.sqlite"),
  synchronize: true,
  entities: [Wilder, Note, Language],
  logging: ["query", "error"],
});
