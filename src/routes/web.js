import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/UserController";
let router = express.Router();

let initwebRouter = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putUserCRUD);
  router.get("/delete-crud", homeController.delUserCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);

  return app.use("/", router);
};
module.exports = initwebRouter;
