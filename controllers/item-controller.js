const Item = require("../models/item");
const Cache = require("../models/cache");
const { Op } = require("sequelize");

const getItem = async (req, res) => {
  try {
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
        limit: 10,
      });
      return res.status(200).json({ result: part });
    } else {
      const part = await Item.findAll({ limit: 10 });
      return res.status(200).json({ result: part });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getItem };
