import express from "express";
import homeController from "../controllers/homeController";
let router = express.Router();

let initwebRouter = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putUserCRUD);

  return app.use("/", router);
};
module.exports = initwebRouter;
