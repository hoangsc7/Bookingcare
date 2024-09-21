import bodyParser from "body-parser";
import express from "express";
import viewEngine from "./config/viewEngine";
import initwebRouter from "./routes/web";
require("dotenv").config();

let app = express();

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initwebRouter(app);

let port = process.env.PORt || 8089;

app.listen(port, () => {
  console.log("backend nodejs is runing on the port:" + port);
});
