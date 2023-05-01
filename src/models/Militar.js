import Sequelize, { Model } from "sequelize";

class Militar extends Model {
  static init(sequelize) {
    super.init(
      {
        idt: Sequelize.INTEGER,
        grad: Sequelize.STRING,
        situacao: Sequelize.BOOLEAN,
        name: Sequelize.STRING,
        num: Sequelize.INTEGER,
        dtultimosv: Sequelize.DATE,
        ultfunc: Sequelize.INTEGER,
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
    this.belongsTo(models.Funcao, {
      foreignKey: "ultfunc",
      as: "funId",
    });
    
    
    // this.hasMany(models.Servico, { foreignKey: "oficial_id" });
    // this.hasMany(models.Servico, { foreignKey: "sgtdia_id" });
    // this.hasMany(models.Servico, { foreignKey: "cbgd_id" });
    // this.hasMany(models.Servico, { foreignKey: "rancho_id" });
    // this.hasMany(models.Servico, { foreignKey: "moto_id" });
    // this.hasMany(models.Servico, { foreignKey: "parmcav_id" });

    // this.hasMany(models.Servico, {foreignKey: 'auxrancho1_id' });
    // this.hasMany(models.Servico, {foreignKey: 'auxrancho2_id' });
    // this.hasMany(models.Servico, {foreignKey: 'auxrancho3_id' });

    // this.hasMany(models.Servico, { foreignKey: "frente1_id" });
    // this.hasMany(models.Servico, { foreignKey: "frente2_id" });
    // this.hasMany(models.Servico, { foreignKey: "frente3_id" });

    // this.hasMany(models.Servico, { foreignKey: "tras1_id" });
    // this.hasMany(models.Servico, { foreignKey: "tras2_id" });
    // this.hasMany(models.Servico, { foreignKey: "tras3_id" });

    // this.hasMany(models.Servico, { foreignKey: "aloj1_id" });
    // this.hasMany(models.Servico, { foreignKey: "aloj2_id" });
    // this.hasMany(models.Servico, { foreignKey: "aloj3_id" });

    // this.hasMany(models.Servico, { foreignKey: "garagem1_id" });
    // this.hasMany(models.Servico, { foreignKey: "garagem2_id" });
    // this.hasMany(models.Servico, { foreignKey: "garagem3_id" });

    // this.hasMany(models.Militar, {foreignKey: 'pavsup1_id' });
    // this.hasMany(models.Militar, {foreignKey: 'pavsup2_id' });

    // this.hasMany(models.Militar, {foreignKey: 'armeiro_id' });
  }
}

export default Militar;
