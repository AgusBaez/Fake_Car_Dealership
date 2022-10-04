"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cars.belongsTo(models.users, {
        foreignKey: "id",
        target_key: "user_id",
      });
    }
  }
  cars.init(
    {
      brand: DataTypes.STRING,
      speed: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      plate: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cars",
    }
  );
  return cars;
};
