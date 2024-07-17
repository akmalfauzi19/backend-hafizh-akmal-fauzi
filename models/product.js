'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Product.hasMany(models.Order, { foreignKey: 'id', as: 'orders' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};

