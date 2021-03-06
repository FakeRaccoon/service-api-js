const Custom = require("../models/customer");
const OrderItem = require("../models/order-item");
const Item = require("../models/item");
const Order = require("../models/order");
const Payment = require("../models/payment");

const { Op } = require("sequelize");

const Customer = Order.belongsTo(Custom, { foreignKey: "customer_id" });
const OrderItems = Order.hasMany(OrderItem, { foreignKey: "order_id" });
const itemRelation = Order.belongsTo(Item, { foreignKey: "item_id" });
const orderItemRelation = OrderItem.belongsTo(Item, { foreignKey: "item_id" });
const Payments = Order.hasOne(Payment, { foreignKey: "order_id" });

const getOrder = async (req, res) => {
  try {
    const { page, fromStatus, toStatus } = req.query;
    const id = req.params.id;
    let limit = 10;
    let offset = 0;
    if (page) {
      offset = offset + (page - 1) * limit;
    }
    if (id) {
      const user = await Order.findOne({
        include: [
          { model: Custom, attributes: ["name", "address", "contact"] },
          {
            model: Item,
          },
          {
            model: OrderItem,
            attributes: ["id", "price", "qty"],
            include: [Item],
          },
          { model: Payment, attributes: ["repair_fee", "dp", "type"] },
        ],
        attributes: { exclude: ["customer_id", "item_id"] },
        where: { id: id },
      });
      return res.status(200).json({ result: user });
    }
    const { rows, count } = await Order.findAndCountAll({
      include: [
        { model: Custom, attributes: ["name", "address", "contact"] },
        { model: Item },
      ],
      attributes: { exclude: ["customer_id", "item_id"] },
      where: fromStatus
        ? { status: { [Op.between]: [fromStatus, toStatus] } }
        : null,
      order: [["id", "DESC"]],
      limit: limit,
      offset: offset,
    });
    return res.status(200).json({ result: rows });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createOrder = async (req, res) => {
  try { 
    const start = new Date();
    var isoDateTime = new Date(start.getTime() - start.getTimezoneOffset() * 60000);
    const { item_id, customer_id, name, address, contact, condition, item_name } = req.body;
    if (customer_id && item_id) {
      const order = await Order.create({
        status: 0,
        item_id: item_id,
        condition: condition,
        customer_id: customer_id,
        created_at: isoDateTime,
      });
      await Payment.create({ order_id: order.id });
      return res.status(200).json({ result: order });
    }
    if (!customer_id && !item_id) {
      const item = await Item.create({ item_name: item_name, updated_at: isoDateTime });
      const user = await Custom.create({
        name: name,
        address: address,
        contact: contact,
        created_at: isoDateTime,
      });
      const order = await Order.create({
        status: 0,
        item_id: item.id,
        condition: condition,
        customer_id: user.id,
        created_at: isoDateTime,
      });
      await Payment.create({ order_id: order.id });
      return res.status(200).json({ result: order });
    }
    if (customer_id && !item_id) {
      const item = await Item.create({ item_name: item_name, updated_at: isoDateTime });
      const order = await Order.create({
       status: 0,
       item_id: item.id,
       condition: condition,
       customer_id: customer_id,
       created_at: isoDateTime,
     });
     await Payment.create({ order_id: order.id });
     return res.status(200).json({ result: order });
    }
    if (!customer_id && item_id) {
      const user = await Custom.create({
        name: name,
        address: address,
        contact: contact,
        created_at: isoDateTime,
      });
      const order = await Order.create({
       status: 0,
       item_id: item_id,
       condition: condition,
       customer_id: user.id,
       created_at: isoDateTime,
     });
     await Payment.create({ order_id: order.id });
     return res.status(200).json({ result: order });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateOrder = async (req, res) => {
  const start = new Date();
  var isoDateTime = new Date(start.getTime() - start.getTimezoneOffset() * 60000);
  try {
    const id = req.params.id;
    const { estimated_date, problem, status, repair_fee, dp, type } = req.body;
    await Order.update(
      {
        estimated_date: estimated_date,
        problem: problem,
        status: status,
        updated_at: isoDateTime,
      },
      {
        where: { id: id },
      }
    );
    await Payment.update(
      {
        repair_fee: repair_fee,
        dp: dp,
        type: type,
      },
      {
        where: { order_id: id },
      }
    );
    return res.status(200).json({ message: "Data Updated" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getOrder, createOrder, updateOrder };
