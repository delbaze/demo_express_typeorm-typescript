import dataSource from "../lib/datasource";

class LanguageController {
  constructor() {
    this.db = dataSource.getRepository("Language");
  }

  async listLanguages() {
    return await this.db.find();
  }
  async createLanguage(label) {
    let language = this.db.create({ label });
    return await this.db.save(language);

  }
}

export default LanguageController;
