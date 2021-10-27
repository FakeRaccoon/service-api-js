const Customer = require("../models/customer");
const { Op } = require("sequelize");

const getCustomer = async (req, res) => {
    try {
      const search = req.query.search;
      if (search) {
        const customer = await Customer.findAll({
          where: {
            [Op.or]: [
              { name: { [Op.like]: `%${search}%` } },
              { contact: { [Op.like]: `%${search}%` } },
            ],
          },
          limit: 5,
        });
        return res.status(200).json({ result: customer });
      } else {
        const customer = await Customer.findAll({ limit: 5 });
        return res.status(200).json({ result: customer });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

module.exports = { getCustomer };
