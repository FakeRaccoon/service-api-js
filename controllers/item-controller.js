const Item = require("../models/item");
const Cache = require("../models/cache");
const { Op } = require("sequelize");

const addItem = async (req, res) => {
  try {
    const { name } = req.body;
    const item = await Item.create({ item_name: name });
    return res.status(200).json({ result: item });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getItem = async (req, res) => {
  try {
    const where = {};
    const search = req.query.search;
    if (search) {
      const part = await Item.findAll({
        where: {
          [Op.or]: [
            { item_name: { [Op.like]: `%${search}%` } },
            { item_alias: { [Op.like]: `%${search}%` } },
            { item_code: { [Op.like]: `%${search}%` } },
          ],
        },
        limit: 5,
      });
      return res.status(200).json({ result: part });
    } else {
      const part = await Item.findAll({ limit: 5 });
      return res.status(200).json({ result: part });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getItem };
