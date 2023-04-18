import * as Yup from "yup";
import { Op } from "sequelize";
//import { parseISO } from "date-fns";

import Servico from "../models/Servico";
import Militar from "../models/Militar";
// import Mail from "../../lib/Mail";
// import Queue from "../../lib/Queue";
// import Dummyjob from "../jobs/Dummyjob";

class ServicosController {
    //listar
    
    async index(req, res) {
        const {
          data,
          oficial_id ,
          sgtdia_id ,
          cbgd_id,
          moto_id,
          parmcav_id,

          frente1_id,
          frente2_id,
          frente3_id,

          tras1_id,
          tras2_id,
          tras3_id,

          aloj1_id,
          aloj2_id,
          aloj3_id,

          garagem1_id,
          garagem2_id,
          garagem3_id,

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
    
        if (data) {
          where = {
            ...where,
            data: {
              [Op.like]: data,
            },
          };
        }
        if (oficial_id) {
          where = {
            ...where,
            oficial_id: {
              [Op.like]: oficial_id,
            },
          };
        }
        if (sgtdia_id) {
          where = {
            ...where,
            sgtdia_id: {
              [Op.like]: sgtdia_id,
            },
          };
        }
        if (cbgd_id) {
          where = {
            ...where,
            cbgd_id: {
              [Op.like]: cbgd_id,
            },
          };
        }
        if (moto_id) {
          where = {
            ...where,
            moto_id: {
              [Op.like]: moto_id,
            },
          };
        }
        if (parmcav_id) {
          where = {
            ...where,
            parmcav_id: {
              [Op.like]: parmcav_id,
            },
          };
        }
        if (frente1_id) {
          where = {
            ...where,
            frente1_id: {
              [Op.like]: frente1_id,
            },
          };
        }
        if (frente2_id) {
            where = {
              ...where,
              frente2_id: {
                [Op.like]: frente2_id,
              },
            };
          }
          if (frente3_id) {
            where = {
              ...where,
              frente3_id: {
                [Op.like]: frente3_id,
              },
            };
          }
          if (tras1_id) {
            where = {
              ...where,
              tras1_id: {
                [Op.like]: tras1_id,
              },
            };
          }
          if (tras2_id) {
            where = {
              ...where,
              tras2_id: {
                [Op.like]: tras2_id,
              },
            };
          }
          if (tras3_id) {
            where = {
              ...where,
              tras3_id: {
                [Op.like]: tras3_id,
              },
            };
          }
          if (aloj1_id) {
            where = {
              ...where,
              aloj1_id: {
                [Op.like]: aloj1_id,
              },
            };
          }
          if (aloj2_id) {
            where = {
              ...where,
              aloj2_id: {
                [Op.like]: aloj2_id,
              },
            };
          }
          if (aloj3_id) {
            where = {
              ...where,
              aloj3_id: {
                [Op.like]: aloj3_id,
              },
            };
          }
          if (garagem1_id) {
            where = {
              ...where,
              garagem1_id: {
                [Op.like]: garagem1_id,
              },
            };
          }
          if (garagem2_id) {
            where = {
              ...where,
              garagem2_id: {
                [Op.like]: garagem2_id,
              },
            };
          }
          if (garagem3_id) {
            where = {
              ...where,
              garagem3_id: {
                [Op.like]: garagem3_id,
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
    
        const dados = await Servico.findAll({
          where,
          include: [
            { model: Militar, as: 'oficialId',attributes: ['grad','name'] },
            { model: Militar, as: 'sgtdiaId',attributes: ['grad','name'] },
            { model: Militar, as: 'cbgdId',attributes: ['grad','name'] },
            { model: Militar, as: 'motoId',attributes: ['grad','name'] },
            { model: Militar, as: 'parmcavId',attributes: ['grad','name'] },

            { model: Militar, as: 'frente1Id',attributes: ['grad','name'] },
            { model: Militar, as: 'frente2Id',attributes: ['grad','name'] },
            { model: Militar, as: 'frente3Id',attributes: ['grad','name'] },

            { model: Militar, as: 'tras1Id',attributes: ['grad','name'] },
            { model: Militar, as: 'tras2Id',attributes: ['grad','name'] },
            { model: Militar, as: 'tras3Id',attributes: ['grad','name'] },

            { model: Militar, as: 'aloj1Id',attributes: ['grad','name'] },
            { model: Militar, as: 'aloj2Id',attributes: ['grad','name'] },
            { model: Militar, as: 'aloj3Id',attributes: ['grad','name'] },

            { model: Militar, as: 'garagem1Id',attributes: ['grad','name'] },
            { model: Militar, as: 'garagem2Id',attributes: ['grad','name'] },
            { model: Militar, as: 'garagem3Id',attributes: ['grad','name'] },
          ],
          order,
          limit,
          offset: (limit * page) - limit,
        });
    
        return res.json(dados);
      }

      //listar por id
      //localhost:5000/militars/1/contacts
      async show(req, res){

        // findbypk 
          const servico = await Servico.findByPk(req.params.id, {
            include: [
              { model: Militar, as: 'oficialId',attributes: ['grad','name'] },
              { model: Militar, as: 'sgtdiaId',attributes: ['grad','name'] },
              { model: Militar, as: 'cbgdId',attributes: ['grad','name'] },
              { model: Militar, as: 'motoId',attributes: ['grad','name'] },
              { model: Militar, as: 'parmcavId',attributes: ['grad','name'] },
  
              { model: Militar, as: 'frente1Id',attributes: ['grad','name'] },
              { model: Militar, as: 'frente2Id',attributes: ['grad','name'] },
              { model: Militar, as: 'frente3Id',attributes: ['grad','name'] },
  
              { model: Militar, as: 'tras1Id',attributes: ['grad','name'] },
              { model: Militar, as: 'tras2Id',attributes: ['grad','name'] },
              { model: Militar, as: 'tras3Id',attributes: ['grad','name'] },
  
              { model: Militar, as: 'aloj1Id',attributes: ['grad','name'] },
              { model: Militar, as: 'aloj2Id',attributes: ['grad','name'] },
              { model: Militar, as: 'aloj3Id',attributes: ['grad','name'] },
  
              { model: Militar, as: 'garagem1Id',attributes: ['grad','name'] },
              { model: Militar, as: 'garagem2Id',attributes: ['grad','name'] },
              { model: Militar, as: 'garagem3Id',attributes: ['grad','name'] },
            ],
          })
  
          if (!servico) {
          return res.status(404).json();
          }
          return res.json(servico);
      }

      async show2(req, res){

        // findbypk 
          const servico = await Servico.findByPk(req.params.id, {
            include: [
              { model: Militar, as: 'oficialId',attributes: ['grad','name'] },
              { model: Militar, as: 'sgtdiaId',attributes: ['grad','name'] },
              { model: Militar, as: 'cbgdId',attributes: ['grad','name'] },
              { model: Militar, as: 'motoId',attributes: ['grad','name'] },
              { model: Militar, as: 'parmcavId',attributes: ['grad','name'] },
  
              { model: Militar, as: 'frente1Id',attributes: ['grad','name'] },
              { model: Militar, as: 'frente2Id',attributes: ['grad','name'] },
              { model: Militar, as: 'frente3Id',attributes: ['grad','name'] },
  
              { model: Militar, as: 'tras1Id',attributes: ['grad','name'] },
              { model: Militar, as: 'tras2Id',attributes: ['grad','name'] },
              { model: Militar, as: 'tras3Id',attributes: ['grad','name'] },
  
              { model: Militar, as: 'aloj1Id',attributes: ['grad','name'] },
              { model: Militar, as: 'aloj2Id',attributes: ['grad','name'] },
              { model: Militar, as: 'aloj3Id',attributes: ['grad','name'] },
  
              { model: Militar, as: 'garagem1Id',attributes: ['grad','name'] },
              { model: Militar, as: 'garagem2Id',attributes: ['grad','name'] },
              { model: Militar, as: 'garagem3Id',attributes: ['grad','name'] },
            ],
          })
  
          if (!servico) {
          return res.status(404).json();
          }
          return res.json(servico);
      }


     

      //criar
      async create(req, res){
         const schema = Yup.object().shape({
              data: Yup.date().required(),
              
              oficial_id: Yup.number().required(),
              sgtdia_id: Yup.number().required(),
              cbgd_id: Yup.number().required(),
              moto_id: Yup.number().required(),
              parmcav_id: Yup.number().required(),

              frente1_id: Yup.number().required(),
              frente2_id: Yup.number().required(),
              frente3_id: Yup.number().required(),

              tras1_id: Yup.number().required(),
              tras2_id: Yup.number().required(),
              tras3_id: Yup.number().required(),

              aloj1_id: Yup.number().required(),
              aloj2_id: Yup.number().required(),
              aloj3_id: Yup.number().required(),

              garagem1_id: Yup.number().required(),
              garagem2_id: Yup.number().required(),
              garagem3_id: Yup.number().required(),

            });
  
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: "Error on validate schema." });
       
      }
  
      const servico = await Servico.create(req.body);

      return res.status(201).json(servico);
      }
      
      //atualizar
      async update(req, res) {
        console.log('chegou aqui 1')
        const schema = Yup.object().shape({
          data: Yup.date(),

          oficial_id: Yup.number(),
          sgtdia_id: Yup.number(),
          cbgd_id: Yup.number(),
          moto_id: Yup.number(),
          permcav_id: Yup.number(),

          frente1_id: Yup.number(),
          frente2_id: Yup.number(),
          frente3_id: Yup.number(),

          tras1_id: Yup.number(),
          tras2_id: Yup.number(),
          tras3_id: Yup.number(),

          aloj1_id: Yup.number(),
          aloj2_id: Yup.number(),
          aloj3_id: Yup.number(),
          
          garagem1_id: Yup.number(),
          garagem2_id: Yup.number(),
          garagem3_id: Yup.number(),
        });
      
        if (!(await schema.isValid(req.body))) {
          return res.status(400).json({ error: "Error on validate schema." });
        }
      
        const servico = await Servico.findByPk(req.params.id, console.log('chegou aqui 2')
      //     ,{
      //     include: [
      //       { model: Servico, as: 'oficiald',attributes: ['id'] },
      //       { model: Servico, as: 'sgtdiaId',attributes: ['id'] },
      //       { model: Servico, as: 'cbgdId',attributes: ['id'] },
      //       { model: Servico, as: 'motoId',attributes: ['id'] },
      //       { model: Servico, as: 'parmcavId',attributes: ['id'] },

      //       { model: Servico, as: 'frente1Id',attributes:  ['id'] },
      //       { model: Servico, as: 'frente2Id',attributes:  ['id'] },
      //       { model: Servico, as: 'frente3Id',attributes:  ['id'] },

      //       { model: Servico, as: 'tras1Id',attributes:  ['id'] },
      //       { model: Servico, as: 'tras2Id',attributes:  ['id'] },
      //       { model: Servico, as: 'tras3Id',attributes: ['id'] },

      //       { model: Servico, as: 'aloj1Id',attributes: ['id'] },
      //       { model: Servico, as: 'aloj2Id',attributes: ['id'] },
      //       { model: Servico, as: 'aloj3Id',attributes:  ['id'] },

      //       { model: Servico, as: 'garagem1Id',attributes:  ['id'] },
      //       { model: Servico, as: 'garagem2Id',attributes:  ['id'] },
      //       { model: Servico, as: 'garagem3Id',attributes:  ['id'] },
      //     ],
      // }
      );
      
        if (!servico) {
          return res.status(404).json();
        }
      
        const updatedServico = await servico.update(req.body, console.log('chegou aqui 3'));
      
        return res.status(201).json(updatedServico);
      }
      //excluir
      async destroy(req, res) {
  
        const servico = await Servico.findByPk(req.params.id);
    
        if(!servico) {
          return res.status(404).json();
        }
    
        await servico.destroy();
    
        return res.json();
      }
}

export default new ServicosController();