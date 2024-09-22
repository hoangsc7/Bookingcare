import bcrypt from "bcryptjs";
const db = require("../models");

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.fname,
        lastName: data.lname,
        gender: data.gender == "1" ? true : false,
        address: data.address,
        phoneNumber: data.phoneNumber,
        roleId: data.roleId,
      });
      resolve("ok!create a new user successd!");
    } catch (e) {
      reject(e);
    }
  });
  console.log("data from service");
  console.log(data);
  console.log(hashPasswordFromBcrypt);
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
};
