"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "admin1@gmail.com",
        password: "hoang1505",
        firstName: "Nguyễn",
        lastName: "Hoàng",
        gender: 1,
        address: "Hà Nội",
        phoneNumber: "0336069232",
        image: "",
        roleId: "",
        positionId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
