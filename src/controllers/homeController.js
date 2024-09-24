const db = require("../models");
import CRUDservice from "../services/CRUDservice";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homePage.ejs", { data: data });
  } catch (e) {
    console.log(e);
  }
};
let getCRUD = async (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDservice.createNewUser(req.body);
  // console.log(message);
  return res.send("post crud from server");
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDservice.getAllUser();
  // console.log("------------");
  // console.log(data);
  // console.log("------------------");
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDservice.getUserInfoById(userId);
    return res.render("editCRUD.ejs", {
      user: userData,
    });
  } else {
    return res.send("no data");
  }

  return res.send("hello form edit page");
};

let putUserCRUD = async (req, res) => {
  let data = req.body;
  await CRUDservice.updateUserData(data);
  return res.send("update sucessed!");
};

module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putUserCRUD: putUserCRUD,
};
