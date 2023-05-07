import * as Yup from "yup";
import { Op } from "sequelize";
//import { parseISO } from "date-fns";

// import multer from "multer";

import Militar from "../models/Militar";
import Graduacao from "../models/Graduacao";


class MilitaresController {
    //listar
    async index(req, res) {
      const {
        idt,
        grad,
        situacao,
        name,
        num,
        dtultimosv,
        ultfunc,
        qtddiafm,
        createdBefore,
        createdAfter,
        updatedBefore,
        updatedAfter,
        sort,
      } = req.query;
  
      const page = req.query.page || 1;
      const limit = req.query.limit || 100;
  
      let where = {};
      let order = [];
  
      if (idt) {
        where = {
          ...where,
          idt: {
            [Op.like]: idt,
          },
        };
      }
      if (grad) {
        where = {
          ...where,
          grad: {
            [Op.like]: grad,
          },
        };
      }
      if (situacao) {
        where = {
          ...where,
          situacao: {
            [Op.like]: situacao,
          },
        };
      }
      if (name) {
        where = {
          ...where,
          name: {
            [Op.like]: name,
          },
        };
      }
      if (num) {
        where = {
          ...where,
          num: {
            [Op.like]: num,
          },
        };
      }
      if (dtultimosv) {
        where = {
          ...where,
          dtultimosv: {
            [Op.like]: dtultimosv,
          },
        };
      }
      if (ultfunc) {
        where = {
          ...where,
          ultfunc: {
            [Op.like]: ultfunc,
          },
        };
      }
      if (qtddiafm) {
        where = {
          ...where,
          qtddiafm: {
            [Op.like]: qtddiafm,
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
  
      const data = await Militar.findAll({
        where,
        include: [
          { model: Graduacao, as: 'gradId',attributes: ['name'] },
        ],
        order: [['grad', 'ASC']],
        limit,
        offset: limit * page - limit,
      });
  
      return res.json(data);
    }

   
  
    //listar por id
    async show(req, res){
        const militar = await Militar.findByPk(req.params.id);

        if (!militar) {
        return res.status(404).json();
        }
        return res.json(militar);
    }
    //criar
    async create(req, res){
      console.log(req.body);
       const schema = Yup.object().shape({
            idt: Yup.number().required(),
            grad: Yup.number().required(),
            situacao: Yup.bool(),
            name: Yup.string().required(),
            num: Yup.number().required(),
            dtultimosv: Yup.date(),
            ultfunc: Yup.number(),
            qtddiaf: Yup.number()
          });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on validate schema." });
    }
    try{
      const militar = await Militar.create(req.body);
      return res.status(201).json(militar);
    } catch (error) { 
      if( error.name === 'SequelizeUniqueConstraintError'){
        return res.status(400).json({ error: "Militar already exists." });
      }
      console.error("Error on create:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
    
    
    return res.status(201).json(militar);
    }
    
    //atualizar
    async update(req, res){
          const schema = Yup.object().shape({
            idt: Yup.number(),
            grad: Yup.number(),
            situacao: Yup.bool(),
            name: Yup.string(),
            num: Yup.number(),
            dtultimosv: Yup.date(),
            ultfunc: Yup.number(),
            qtddiaf: Yup.number()
          });
      
          if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate schema." });
          }
      
          const militar = await Militar.findByPk(req.params.id);
      
          if (!militar) {
            return res.status(404).json();
          }
      
         
          const { idt, grad, name, num, dtultimosv, ultfunc, qtddiaf} = await militar.update(
            req.body
          );
      
          return res.status(201).json({  idt, grad, name, num, dtultimosv, ultfunc, qtddiaf});
    }
    
    //atualizar situacao ativo ou inativo
    async update(req, res){
      const schema = Yup.object().shape({
        situacao: Yup.bool(),
      });
  
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Error on validate schema." });
      }
  
      const militar = await Militar.findByPk(req.params.id);
  
      if (!militar) {
        return res.status(404).json();
      }
  
     
      const { idt, grad, name, num, dtultimosv, ultfunc, qtddiaf} = await militar.update(
        req.body
      );
  
      return res.status(201).json({  idt, grad, name, num, dtultimosv, ultfunc, qtddiaf});
}
    //excluir
    async destroy(req, res) {

      const militar = await Militar.findByPk(req.params.id);
  
      if(!militar) {
        return res.status(404).json();
      }
  
      await militar.destroy();
  
      return res.json();
    }
}

export default new MilitaresController();