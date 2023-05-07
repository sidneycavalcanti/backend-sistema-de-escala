import Sequelize from "sequelize";

import config from "../config/database";

import Servico from "../models/Servico";
import Militar from "../models/Militar";
import User from "../models/User";
import Graduacao from "../models/Graduacao";
// import File from "../app/models/File";

const models =  [ User, Servico, Militar, Graduacao ];

class Database {
  constructor() {
    this.connection = new Sequelize(config);
    this.init();
    this.associate();
  }

   init() {
     models.forEach(model => model.init(this.connection));
   }

  associate() {
     models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
     });
   }
}

export default new Database();
