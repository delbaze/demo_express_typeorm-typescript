import { DataSource } from "typeorm";
// import typeorm from "typeorm";
import Wilder from "../entity/Wilder";
import Language from "../entity/Language";
import Note from "../entity/Note";
// import Language from "./../entity/Language";
// import Note from "./../entity/Note";

import * as path from "path";
// import * as url from "url";
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
// console.log(__dirname);
// export default new typeorm.DataSource({
export default new DataSource({
  type: "sqlite",
  // database: "./../database.sqlite",
  database: path.resolve(__dirname, "../database.sqlite"),
  synchronize: true,
  // entities: [Wilder, Language, Note],
  entities: [Wilder, Note, Language],
  logging: ["query", "error"],
});
