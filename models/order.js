'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'customerId' });
      Order.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  Order.init({
    productId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    shipping: DataTypes.BOOLEAN,
    discount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};