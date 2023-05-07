import Sequelize, { Model } from "sequelize";

class Militar extends Model {
  static init(sequelize) {
    super.init(
      {
        idt: Sequelize.INTEGER,
        grad: Sequelize.INTEGER,
        situacao: Sequelize.BOOLEAN,
        name: Sequelize.STRING,
        num: Sequelize.INTEGER,
        dtultimosv: Sequelize.DATE,
        qtddiaf: Sequelize.INTEGER,
      },
      {
        sequelize,
        name: {
          singular: "militar",
          plural: "militars",
        },
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Graduacao, {
      foreignKey: "grad",
      as: "gradId",
    });
  }
}

export default Militar;
