import db from "../models/index";
import bcrypt from "bcryptjs";
import moment from "moment-timezone";
import { express } from "express";
// import { defaultValueSchemable } from "../../node_modules/sequelize/types/utils";

const salt = bcrypt.genSaltSync(10);
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

//check email
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExit = await checkUserEmail(email);
      if (isExit) {
        //user allready exits
        //miss gan cac attibutes usesing
        //chuyen dau ra thanh raw
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password"],
          where: {
            email: email,
          },
          raw: true,
        });
        if (user) {
          //compare password
          //check password
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            // const userWithoutPassword = { ...user.toJSON() };
            delete user.password;
            userData.errCode = 0;
            userData.errMessage = "Ok";
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found~`;
        }
      } else {
        //return error
        userData.errCode = 1;
        userData.errMessage = `Your's email isn't exit in your system.Please try other email!`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

// let compareUserPassword = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId == "ALL") {
        users = await db.User.findAll({
          attributes: { exclude: ["password"] },
        });
        if (users) {
          users = users.map((User) => {
            return {
              ...User,
              createdAt: moment(User.createdAt)
                .tz("Asia/Ho_Chi_Minh")
                .format("YYYY-MM-DD HH:mm:ss"),
              updatedAt: moment(User.updatedAt)
                .tz("Asia/Ho_Chi_Minh")
                .format("YYYY-MM-DD HH:mm:ss"),
            };
          });
        }
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: { exclude: ["password"] },
        });
        if (users) {
          users = {
            ...users,
            createdAt: moment(users.createdAt)
              .tz("Asia/Ho_Chi_Minh")
              .format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: moment(users.updatedAt)
              .tz("Asia/Ho_Chi_Minh")
              .format("YYYY-MM-DD HH:mm:ss"),
          };
        }
      }

      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email  is  exist??
      let check = await checkUserEmail(data.email);
      if (check) {
        resolve({
          errCode: 1,
          message: "Your email í already in used. Please try another email!",
        });
      }
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
      resolve({
        errCode: 0,
        message: "ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: `The user isn't exist!`,
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      errCode: 0,
      errMessage: "The user is deleted.",
    });
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing require parameter!",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        resolve({
          errCode: 0,
          errMessage: "Update succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
};
