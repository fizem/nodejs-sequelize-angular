'use strict';
module.exports = (sequelize, DataTypes) => {
  var Resource = sequelize.define('Resource', {
    ID: DataTypes.UUID,
    NAME: DataTypes.STRING,
    DISPLAYNAME: DataTypes.STRING,
    TECHNICALNAME: DataTypes.STRING,
    STATUS: DataTypes.STRING,
    RESOURCEOWNER: DataTypes.STRING,
    RESOURCEMANAGER: DataTypes.STRING,
    ARCHITECTE: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Resource;
};
