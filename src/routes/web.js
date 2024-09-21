import express from "express";
import homeController from "../controllers/homeController";
let router = express.Router();

let initwebRouter = (app) => {
  router.get("/", homeController.getHomePage);

  router.get("/hoangnv", (req, res) => {
    return res.send("hoangnv");
  });

  return app.use("/", router);
};
module.exports = initwebRouter;
