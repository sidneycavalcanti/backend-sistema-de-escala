import Sequelize, { Model } from "sequelize";

class Militar extends Model {
  static init(sequelize) {
    super.init(
      {
        idt: Sequelize.INTEGER,
        grad: Sequelize.STRING,
        name: Sequelize.STRING,
        num: Sequelize.INTEGER,
        dtultimosv: Sequelize.DATE,
        ultfunc: Sequelize.STRING,
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
    this.hasMany(models.Servico, {foreignKey: 'oficial_id'})
    this.hasMany(models.Servico, {foreignKey: 'sgtdia_id'})
    this.hasMany(models.Servico,{foreignKey: 'cbgd_id'})
    this.hasMany(models.Servico,{foreignKey: 'moto_id'})
    this.hasMany(models.Servico,{foreignKey: 'parmcav_id'})

    this.hasMany(models.Servico,{foreignKey: 'frente1_id'})
    this.hasMany(models.Servico,{foreignKey: 'frente2_id'})
    this.hasMany(models.Servico,{foreignKey: 'frente3_id'})

    this.hasMany(models.Servico,{foreignKey: 'tras1_id'})
    this.hasMany(models.Servico,{foreignKey: 'tras2_id'})
    this.hasMany(models.Servico,{foreignKey: 'tras3_id'})

    this.hasMany(models.Servico,{foreignKey: 'aloj1_id'})
    this.hasMany(models.Servico,{foreignKey: 'aloj2_id'})
    this.hasMany(models.Servico,{foreignKey: 'aloj3_id'})
    
    this.hasMany(models.Servico,{foreignKey: 'garagem1_id'})
    this.hasMany(models.Servico,{foreignKey: 'garagem2_id'})
    this.hasMany(models.Servico,{foreignKey: 'garagem3_id'})
    
    // this.belongsTo(models.Servico, { foreignKey: "oficial_id", as: "oficialId" });
    // this.belongsTo(models.Servico, { foreignKey: "sgtdia_id", as: "sgtdiaId" });
    // this.belongsTo(models.Servico, { foreignKey: "cbgd_id", as: "cbgdId" });
    // this.belongsTo(models.Servico, { foreignKey: "moto_id", as: "motoId" });

    // this.belongsTo(models.Servico, { foreignKey: "frente1_id", as: "frente1Id" });
    // this.belongsTo(models.Servico, { foreignKey: "frente2_id", as: "frente2Id" });
    // this.belongsTo(models.Servico, { foreignKey: "frente3_id", as: "frente3Id" });

    // this.belongsTo(models.Servico, { foreignKey: "tras1_id", as: "tras1Id" });
    // this.belongsTo(models.Servico, { foreignKey: "tras2_id", as: "tras2Id" });
    // this.belongsTo(models.Servico, { foreignKey: "tras3_id", as: "tras3Id" });

    // this.belongsTo(models.Servico, { foreignKey: "aloj1_id", as: "aloj1Id" });
    // this.belongsTo(models.Servico, { foreignKey: "aloj2_id", as: "aloj2Id" });
    // this.belongsTo(models.Servico, { foreignKey: "aloj3_id", as: "aloj3Id" });

    // this.belongsTo(models.Servico, { foreignKey: "garagem1_id", as: "garagem1Id" });
    // this.belongsTo(models.Servico, { foreignKey: "garagem2_id", as: "garagem2Id" });
    // this.belongsTo(models.Servico, { foreignKey: "garagem3_id", as: "garagem3Id" });
  }

  
}

export default Militar;
