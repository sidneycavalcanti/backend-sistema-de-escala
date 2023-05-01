import Sequelize, { Model } from "sequelize";


class Funcao extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
        name: {
          singular: "funcao",
          plural: "funcoes",
        },
      }
    );
 
  }
  // static associate(models) {
  //   this.hasMany(models.Militar, {foreignKey: "ultfunc"})
  // }
}

export default Funcao;
