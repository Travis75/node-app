"use strict";

module.exports = function(sequelize, DataTypes) {
  var HumanApi = sequelize.define("HumanApi", {
    humanId: DataTypes.STRING,
    accessToken: DataTypes.TEXT,
    publicToken: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        HumanApi.belongsTo(models.User)
      }
    }
  });
  return HumanApi;
};