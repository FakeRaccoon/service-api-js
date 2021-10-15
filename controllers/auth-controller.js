const User = require("../models/user");
const Role = require("../models/role");
const Token = require("../models/token");
const RoleRelation = User.belongsTo(Role, { foreignKey: "role_id" });

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password, name, role_id } = req.body;

    if (!username)
      return res.status(400).json({ message: "username cant be null" });
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      return res.status(400).json({ message: "username already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUer = await User.create({
      username: username.trim(),
      name: name.trim(),
      role_id: role_id,
      password: hashed.trim(),
    });

    return res.status(200).json({ result: newUer });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username: username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid user credential" });
    }

    const token = generateAccessToken({ id: user.id, username: user.username });
    const refreshToken = jwt.sign({ id: user.id, username: user.username }, process.env.REFRESH_TOKEN_SECRET);

    await Token.create({ token: refreshToken });

    return res.json({
      username: user.username,
      token: token,
      refreshToken: refreshToken,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1w" });
}

const logout = async (req, res) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken)
      return res.status(400).json({ message: "Please include token" });
    if (!(await Token.findOne({ token: refreshToken })))
      return res.status(400).json({ message: "Cant find token" });
    await Token.destroy({ where: { token: refreshToken } });
    return res.json({ message: "Logged Out" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const logoutAll = async (req, res) => {
  try {
    await Token.destroy({where: {}});
    return res.json({ message: "Removed All Token" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getToken = async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null)
    return res.status(401).json({ message: "Invalid Token" });

  if (!(await Token.findOne({ where: { token: refreshToken } }))) {
    return res.status(403).json({ message: "This Token does not exist" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const token = generateAccessToken({ id: user.id, username: user.username });
    const decoded = jwt.decode(token);
    const date = new Date(decoded.iat * 1000);
    const exp = new Date(decoded.exp * 1000);
    res.json({
      token: token,
      generateAt: date.toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      }),
      expiresAt: exp.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
    });
  });
};

module.exports = { register, login, logout, logoutAll, getToken }
