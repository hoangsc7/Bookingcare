import express from "express";
import homeController from "../controllers/homeController";
let router = express.Router();

let initwebRouter = (app) => {
  router.get("/", homeController.getHomePage);

  router.get("/hoangnv", (req, res) => {
    return res.send("hoangnv");
  });
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  return app.use("/", router);
};
module.exports = initwebRouter;
