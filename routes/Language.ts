import express from "express";
import LanguageController from "./../controller/Language";
const router = express.Router();

router.get("/", async function (req, res) {
  try {
    let languages = await new LanguageController().listLanguages();
    res.json({ languages, success: true });
  } catch (err) {
    res.json({ success: false });
  }
});

router.post("/create", async function (req, res) {
  const { label } = req.body;
  try {
    let language = await new LanguageController().createLanguage(label);
    res.json({ success: true, language });
  } catch (err) {
    res.json({ success: false });
  }
});

export default router;
