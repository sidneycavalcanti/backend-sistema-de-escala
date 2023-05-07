import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cat: Sequelize.STRING,
        password: Sequelize.VIRTUAL, //campo virtual
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
        name: {
          singular: "user",
          plural: "users",
        },
      }
    );
    //aqui criptografa a senha
    this.addHook("beforeSave", async user => {
      if(user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
  }
  // static associate(models) {
  //   this.belongsTo(models.File, { foreignKey: "file_id" });
  // }
  //verifica se esta batendo a senha
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;