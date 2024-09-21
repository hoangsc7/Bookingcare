const db = require("../models");

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log("===================");
    console.log(data);
    return res.render("homePage.ejs", { data: data });
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  getHomePage: getHomePage,
};
