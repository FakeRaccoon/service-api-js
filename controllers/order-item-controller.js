const OrderItem = require("../models/order-item");

const start = new Date();
var isoDateTime = new Date(start.getTime() - start.getTimezoneOffset() * 60000);

const createOrderItem = async (req, res) => {
  try {
    const { order_id, item_id } = req.body;
    const order = await OrderItem.create({
      order_id: order_id,
      item_id: item_id,
      qty: 1,
      created_at: isoDateTime,
    });
    return res.status(200).json({ result: order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateOrderItem = async (req, res) => {
  try {
    const id = req.params.id;
    const { qty, price } = req.body;
    await OrderItem.update(
      {
        qty: qty,
        price: price,
        updated_at: isoDateTime,
      },
      {
        where: { id: id },
      }
    );
    return res.status(200).json({ message: "Data Updated" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    const id = req.params.id;
    await OrderItem.destroy({
      where: { id: id },
    });
    return res.status(200).json({ message: "Data Deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrderItem, updateOrderItem, deleteOrderItem };
