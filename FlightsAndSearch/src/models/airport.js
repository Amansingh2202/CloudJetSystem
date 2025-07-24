'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City,{
        foreignKey: 'cityId',
        onDelete: 'CASCADE', // what this is doing the momemt city is deleted all the airports associated with that city will also be deleted
        onUpdate: 'CASCADE',// if city is updated then all the airports associated with that city will also be updated
        hooks: true// this is used to make sure that the hooks are called when the city is deleted or updated
      })

    }
  }
  Airport.init({
    name:{ 
      type:DataTypes.STRING,
      allowNull: false},
    address: DataTypes.STRING,
    cityId: {
      type:DataTypes.INTEGER,
    allowNUll:false}
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};