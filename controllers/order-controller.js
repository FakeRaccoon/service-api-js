const Custom = require("../models/customer");
const OrderItem = require("../models/order-item");
const Item = require("../models/item");
const Order = require("../models/order");
const Payment = require("../models/payment");

const Customer = Order.belongsTo(Custom, { foreignKey: "customer_id" });
const OrderItems = Order.hasMany(OrderItem, { foreignKey: "order_id" });
const itemRelation = Order.belongsTo(Item, { foreignKey: "item_id" });
const orderItemRelation = OrderItem.belongsTo(Item, { foreignKey: "item_id" });
const Payments = Order.hasOne(Payment, { foreignKey: "order_id" });

const getOrder = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const user = await Order.findOne({
        include: [
          { model: Custom, attributes: ["name", "address", "contact"] },
          {
            model: Item
          },
          {
            model: OrderItem,
            attributes: ["id", "price", "qty"],
            include: [Item],
          },
          { model: Payment, attributes: ["repair_fee", "type"] },
        ],
        attributes: { exclude: ["customer_id", "item_id"] },
        where: { id: id },
      },
    );
      return res.status(200).json({ result: user });
    }
    const order = await Order.findAll({
      include: [
        { model: Custom, attributes: ["name", "address", "contact"] },
        {
          model: Item
        }
      ],
      attributes: { exclude: ["customer_id", "item_id"] },
    });
    return res.status(200).json({ result: order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const { status, item_id, customer_id, name, address, contact } = req.body;
    if (!customer_id) {
      const user = await Custom.create({ name: name, address: address, contact: contact })
      const order = await Order.create({ status: status, item_id: item_id, customer_id: user.id })
      return res.status(200).json({ result: order });
    }
    const order = await Order.create({ status: status, item_id: item_id, customer_id: customer_id });
    return res.status(200).json({ result: order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getOrder, createOrder };
