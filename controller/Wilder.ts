import { Repository } from "typeorm";
import Language from "../entity/Language";
import Note from "../entity/Note";
import Wilder from "../entity/Wilder";
import dataSource from "../lib/datasource";
import {
  IWilderAssignNote,
  IWilderController,
  IWilderInfos,
  IWilderInputNote,
  IWilderUpdateInfos,
} from "./interfaces.d";

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

  async findWilder(id: number) {
    return await this.db
      .createQueryBuilder("wilder")
      .leftJoinAndSelect("wilder.notes", "note")
      .leftJoinAndSelect("note.language", "language")
      .where("wilder.id= :id", { id })
      .getOne();
  }

  async createWilder({ first_name, last_name, age, notes }: IWilderInfos) {
    //1 ere methode avec create
    let wilder = this.db.create({ first_name, last_name, age });
    let wilderSaved = await this.db.save(wilder);

      notes?.forEach((n: IWilderInputNote) => {
        this.assignNoteLanguage({
          languageId: n.language.id,
          wilderId: wilderSaved.id,
          note: n.note,
        });
      });
    return wilderSaved;

    //2eme methode avec le query builder

    // let wilder = this.db
    //   .createQueryBuilder()
    //   .insert()
    //   .values([{ first_name, last_name, age }])
    //   .execute();

    // return wilder;
  }

  async updateWilder(params: IWilderUpdateInfos) {
    const { notes, id, ...userInfo } = params;

    let wilder = await this.findWilder(id); //me permet de récupérer mes notes
    if (!wilder) {
      throw new Error("Ce wilder n'existe pas");
    }
    let updatedWilder = await this.db.update(id, userInfo);
    let noteRepository = dataSource.getRepository("Note");
    if (notes?.length === 0) { //si jamais je n'ai plus de notes reçue depuis le formulaire, je supprime toutes les notes
      wilder?.notes.forEach(async (note) => {
        await noteRepository.delete(note.id);
      });
    }
    notes?.forEach((n: Note) => {
      wilder?.notes.forEach(async (note: Note) => {
        if (notes.some((n) => n.id !== note.id)) { // si la note est présente dans le wilder, mais pas dans les notes reçues par le formulaire
          await noteRepository.delete(note.id);
        }
      });
      if (n.language?.id) {
        this.assignNoteLanguage({
          languageId: n.language.id,
          wilderId: id,
          note: n.note,
        });
      }
    });
    return updatedWilder;
  }

  async deleteWilder(id: number) {
    return this.db
      .createQueryBuilder()
      .delete()
      .where("id= :id", { id })
      .execute();
  }

  async assignNoteLanguage({ languageId, wilderId, note }: IWilderAssignNote) {
    let languageRepository = dataSource.getRepository("Language");
    let noteRepository = dataSource.getRepository("Note");
    let language = await languageRepository.findOneBy({ id: languageId });
    let wilder = await this.db.findOneBy({ id: wilderId });
    if (!wilder) {
      throw new Error("ce wilder n'existe pas");
    }
    if (!language) {
      throw new Error("ce langage n'existe pas");
    }
    console.log(
      "🟩🟩🟩🟩🟩 ~ file: Wilder.ts ~ line 105 ~ WilderController ~ assignNoteLanguage ~ language",
      language
    );
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
