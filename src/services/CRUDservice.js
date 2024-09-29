import bcrypt from "bcryptjs";
import { raw } from "body-parser";
import { resolveInclude } from "ejs";
const db = require("../models");

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
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
  // console.log("data from service");
  // console.log(data);
  // console.log(hashPasswordFromBcrypt);
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

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Cập nhật dữ liệu user trực tiếp bằng model
      let [updated] = await db.User.update(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          // Các trường khác cần cập nhật
        },
        {
          where: { id: data.id }, // Điều kiện để xác định bản ghi cần cập nhật
        }
      );

      if (updated) {
        resolve("ok!");
      } else {
        reject("User not found");
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await db.User.destroy({
          where: { id: userId },
        });
        resolve({
          errCode: 0,
          message: "User deleted successfully",
        });
      } else {
        resolve({
          errCode: 2,
          message: "User not found",
        });
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};
