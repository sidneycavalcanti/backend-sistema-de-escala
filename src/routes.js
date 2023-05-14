import { Router } from "express";
// import multer from "multer";
// import multerConfig from "./config/multer";

// import auth from "./app/middlewares/auth";

// import sessions from "./app/controllers/SessionsController";
import servicos from "./controllers/ServicosController";
import militares from "./controllers/MilitaresController";
import users from "./controllers/UsersController";
import grads from "./controllers/GradController";
// import files from "./app/controllers/FilesController";

const routes = new Router();
// const upload = multer (multerConfig);


// sessions

// routes.post("/sessions", sessions.create);


//apartir dessa posição todas as rotas vão está protegida
//controla o acesso.
// routes.use(auth);


//militars
routes.get("/militares", militares.index);
routes.get("/militares/:id", militares.show);
routes.post("/militares", militares.create);
routes.put("/militares/:id", militares.update);
routes.delete("/militares/:id", militares.destroy);

routes.get("/militarestotal", militares.index1);
routes.get("/militarestotal/:id", militares.show);
routes.put("/militarestotal/:id", militares.update);

//servicos
routes.get("/servicos", servicos.index);
routes.get("/servicos/:id", servicos.show);
routes.post("/servicos", servicos.create);
routes.put("/servicos/:id", servicos.update);
routes.delete("/servicos/:id", servicos.destroy);

//users
routes.get("/users", users.index);
routes.get("/users/:id", users.show);
routes.post("/users", users.create)
routes.put("/users/:id", users.update);
routes.delete("/users/:id", users.destroy);

//grad
routes.get("/grads", grads.index);
routes.get("grads/:id", grads.show);
// routes.post("/grads", grads.create)
// routes.put("/grads/:id", grads.update);
// routes.delete("/grads/:id", grads.destroy);

//file
// routes.post("/files", upload.single("file"), files.create);

export default routes;
