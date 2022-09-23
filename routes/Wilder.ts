import express, { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { IInfosReturn } from "../controller/interfaces";
import Wilder from "../entity/Wilder";
import WilderController from "./../controller/Wilder";
const router = express.Router();

router.get("/", async function (_, res: Response) {
  try {
    let wilders = await new WilderController().listWilders();

    res.json({ wilders, success: true });
  } catch (err) {
    res.json({ success: false });
  }
});

router.get("/:id", async function (req: Request, res: Response) {
  const { id } = req.params;
  try {
    let wilder: Wilder | null = await new WilderController().findWilder(+id);
    if (wilder) {
      res.json({ wilder, success: true });
    } else {
      res.status(404).send({ success: false });
    }
  } catch (err) {
    res.json({ success: false });
  }
});

router.post("/create", async function (req: Request, res: Response) {
  const { first_name, last_name, age, notes } = req.body;
  try {
    let wilder: Wilder | null = await new WilderController().createWilder({
      first_name,
      last_name,
      age,
      notes
    });
    res.json({ success: true, wilder, message: "Le wilder a été ajouté" });
  } catch (err: any) {
    res.json({ success: false, message: err.message });
  }
});

router.patch("/update/:id", async function (req: Request, res: Response) {
  const { id } = req.params;
  
  const { first_name, last_name, age, notes} = req.body;
  console.log("🟩🟩🟩🟩🟩 ~ file: Wilder.ts ~ line 51 ~ first_name, last_name, age, notes", first_name, last_name, age, notes)
  
  try {
    let wilder: UpdateResult = await new WilderController().updateWilder({
      first_name,
      last_name,
      age,
      id: +id,
      notes
    });
    
    res.json({ wilder, success: true });
  } catch (err) {
    console.log("🟩🟩🟩🟩🟩 ~ file: Wilder.ts ~ line 64 ~ err", err)
    res.json({ success: false });
  }
});

router.delete("/delete", async function (req: Request, res: Response) {
  const { id } = req.body;
  let infos: IInfosReturn;
  try {
    let result: DeleteResult = await new WilderController().deleteWilder(id);

    if (result.affected === 0) {
      infos = { success: false, message: "Le wilder n'existe pas" };
    } else {
      infos = { success: true, message: "Wilder supprimé" };
    }
    res.json(infos);
  } catch (err: any) {
    infos = { success: false, message: err.message };
    res.json(infos);
  }
});

router.post(
  "/assignNoteLanguage",
  async function (req, res) {
    const { wilderId, languageId, note } = req.body;
    try {
      let result = await new WilderController().assignNoteLanguage({
        languageId,
        wilderId,
        note,
      });
      res.json({ result, success: true });
    } catch (err) {
      res.json({ success: false });
    }
  }
);

export default router;
