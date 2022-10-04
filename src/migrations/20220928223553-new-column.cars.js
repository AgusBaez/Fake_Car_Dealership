"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn("cars", "plate", {
        allowNull: false,
        type: Sequelize.INTEGER,
      });
    } catch (err) {
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn("cars", "plate");
    } catch (err) {
      throw err;
    }
  },
};
