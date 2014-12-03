"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {type: DataTypes.STRING, validate: {notEmpty: true}},
    password: {type: DataTypes.STRING, validate: {notEmpty: true}},
    session: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasOne(models.HumanApi)
      }
    }
  });
  return User;
};