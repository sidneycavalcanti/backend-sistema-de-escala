import * as Yup from "yup";
import { Op } from "sequelize";
//import { parseISO } from "date-fns";

import User from "../models/User";
// import Mail from "../../lib/Mail";
// import Queue from "../../lib/Queue";
// import Dummyjob from "../jobs/Dummyjob";


class UsersController {
  // Listagem dos Customers
  async index(req, res) {
    const {
      name,
      cat,
      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort,
    } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 8;

    let where = {};
    let order = [];

    if (name) {
      where = {
        ...where,
        name: {
          [Op.like]:  `%${name}%`,
        },
      };
    }

    if (cat) {
      where = {
        ...where,
        cat: {
          [Op.like]: cat,
        },
      };
    }


    if (createdBefore) {
      where = {
        ...where,
        createdAt: {
          [Op.gte]: parseISO(createdBefore),
        },
      };
    }

    if (createdAfter) {
      where = {
        ...where,
        createdAt: {
          [Op.lte]: parseISO(createdAfter),
        },
      };
    }

    if (updatedBefore) {
      where = {
        ...where,
        updatedAt: {
          [Op.gte]: parseISO(updatedBefore),
        },
      };
    }

    if (updatedAfter) {
      where = {
        ...where,
        updatedAt: {
          [Op.lte]: parseISO(updatedAfter),
        },
      };
    }

    if (sort) {
      order = sort.split(",").map(item => item.split(":"));
    }

    try{
      const data = await User.findAll({
        attributes: { exlude: ["password", "password_hash"] },
        where,
        order,
        limit,
        offset: limit * page - limit,
      });
      const count = await User.count({ where });
      const totalPages = Math.ceil(count / limit);
      return res.status(201).json({ data, totalPages });
    }catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "Usuario already exists." });
      }
      console.error("Error on create:", error);
      return res.status(500).json({ error: "Internal server error." });
    } 
  }

  // Recuperar contato
  async show(req, res) {
    const user = await User.findByPk(req.params.id, {
      attributes: { exlude: ["password", "password_hash"] },
    });

    if (!user) {
      return res.status(404).json();
    }
    return res.json(user);
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cat: Yup.string().required(),
      password: Yup.string().required().min(3),
      passwordConfirmation: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on validate schema." });
    }
    try{
      const user =  await User.create(
        req.body
      ); 
    } catch (error) {
      if (error.password === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "verificar limite de caracteres do password" });
      }
      console.error("Error on create:", error);
      return res.status(500).json({ error: "Internal server error." })
    }

    // const { name, cat, password, createAt, UpdatedAt } =

    // Mail.send({
    //   to: email,
    //   subject: "Bem-vindo(a)",
    //   text: `Olá ${name}, bem-vindo(a) ao nosso sistema`,
    // });

    // await Queue.add(Dummyjob.key, { message: "Hello Jobs"});

    // return res.status(201).json({ name, cat, password, createAt, UpdatedAt });
  }

  // Atualiza um Customer
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      cat: Yup.boolean(),
      oldPassword: Yup.string().required().min(3),
      password: Yup.string().required().
        min(3)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      passwordConfirmation: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on validate schema." });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json();
    }

    const { oldPassword } = req.body;

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "User password not match." });
    }

    const { id, name, file_id, createdAt, updatedAt } = await user.update(
      req.body
    );

    return res.status(201).json({ id, name, file_id, createdAt, updatedAt });
  }

  async destroy(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json();
    }

    await user.destroy();

    return res.json();
  }
}

export default new UsersController();
