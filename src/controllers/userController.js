import user from "../models/user";
import userService from "../services/userService";

//check xem email,pass nhap vao co bi null k
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameter",
    });
  }

  let userData = await userService.handleUserLogin(email, password);
  //check email
  //compare password
  //return infoUser
  //access_ttoken :JWT
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.body.id;

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
      users: [],
    });
  }

  let users = await userService.getAllUsers(id);
  // console.log(users);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
};
