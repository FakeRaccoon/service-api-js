const User = require("../models/user");
const Role = require("../models/role");
const Token = require('../models/token');
const RoleRelation = User.belongsTo(Role, { foreignKey: "role_id" });

const addRole = async (req, res) => {
  const { name, level } = req.body;
  try {
    if (!name && !level) {
      return res.status(400).json({ message: "Validation Error!" });
    }
    const role = await Role.create({ name: name, level: level });
    return res.status(200).json({ message: "Success", result: role });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const authCheck = async (req, res) => {
  try {
    const username = req.user.username;
    const user = await User.findOne({ where: { username: username } });

    if (user) return res.status(200).json({ result: user });

    return res.status(400).json({ message: "Invalid user credential" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const username = req.query.username;
    if (username) {
      const user = await User.findOne({
        include: [{ model: Role }],
        attributes: { exclude: ["role_id"] },
        where: { username: username }
      });
      return res.status(200).json({ result: user });     
    }
    const user = await User.findAll({
      include: [{ model: Role }],
      attributes: { exclude: ["role_id"] },
    });
    return res.status(200).json({ result: user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { addRole, getUser, authCheck };
