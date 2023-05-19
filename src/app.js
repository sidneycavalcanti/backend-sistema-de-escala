import express from "express";
import routes from "./routes";
// import authMiddlewares from "./middlewares/auth";
import cors from "cors";

import "./database";


class App {

  

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false}))
    // this.server.use(authMiddlewares);
   
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;


