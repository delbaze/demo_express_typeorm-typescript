import { Repository } from "typeorm";
import Wilder from "../entity/Wilder";
import dataSource from "../lib/datasource";

interface IWilderController {
  db: Repository<Wilder>;
  listWilders: () => Promise<Wilder[]>;
  findWilder: (id: number) => Promise<Wilder | null>;
  createWilder: ({ first_name, last_name, age }: IWilder) => Promise<Wilder>;
}

interface IWilder {
  first_name: string;
  last_name: string;
  age?: number;
}
class WilderController implements IWilderController {
  db: Repository<Wilder>;
  constructor() {
    this.db = dataSource.getRepository("Wilder");
  }
  async listWilders() {
    return await this.db //list des wilders avec notes
      .createQueryBuilder("wilder")
      .leftJoinAndSelect("wilder.notes", "note")
      .leftJoinAndSelect("note.language", "language")
      .getMany();
    // return await this.db.find(); //liste des wilders sans notes
  }

  //récupérer 1 wilder en particulier (à partir de son ID)

  async findWilder(id: number): Promise<Wilder | null> {
    return await this.db
      .createQueryBuilder("wilder")
      .leftJoinAndSelect("wilder.notes", "note")
      .leftJoinAndSelect("note.language", "language")
      .where("wilder.id= :id", { id })
      .getOne();
  }

  async createWilder({ first_name, last_name, age }: IWilder): Promise<Wilder> {
    //1 ere methode avec create
    let wilder = this.db.create({ first_name, last_name, age });
    return await this.db.save(wilder);

    //2eme methode avec le query builder

    // let wilder = this.db
    //   .createQueryBuilder()
    //   .insert()
    //   .values([{ first_name, last_name, age }])
    //   .execute();

    // return wilder;
  }

  async updateWilder(first_name, last_name, age, id) {
    return (
      this.db
        .createQueryBuilder()
        .update()
        .set({ first_name, last_name, age })
        // .where(`id=${id}`) // id=10
        .where("id= :id", { id }) // id=10
        .execute()
    );
  }

  async deleteWilder(id) {
    return this.db
      .createQueryBuilder()
      .delete()
      .where("id= :id", { id })
      .execute();
  }

  async assignNoteLanguage(languageId, wilderId, note) {
    let languageRepository = dataSource.getRepository("Language");
    let noteRepository = dataSource.getRepository("Note");
    let language = await languageRepository.findOneBy({ id: languageId });
    if (!language) {
      throw new Error("ce langage n'existe pas");
    }
    let wilder = await this.db.findOneBy({ id: wilderId });
    if (!wilder) {
      throw new Error("ce wilder n'existe pas");
    }
    let previousNote = await noteRepository.findOneBy({ wilder, language });

    let newNote = noteRepository.save({
      ...previousNote,
      language: languageId,
      wilder: wilderId,
      note,
    });
    return newNote;
  }
}
export default WilderController;
