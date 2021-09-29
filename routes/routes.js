const express = require("express");
const auth = require("../middlewares/jwt-auth");
const route = express.Router();

const { getOrder, createOrder } = require("../controllers/order-controller");
const { addRole, getUser, authCheck } = require("../controllers/user-controller");
const { getPart, getFromHeroku } = require('../controllers/part-controller');
const { getItem } = require('../controllers/item-controller');
const { login, register, getToken, logout, logoutAll } = require('../controllers/auth-controller');

route.get("/orders", auth, getOrder);
route.post("/orders", auth, createOrder);
route.get("/orders/:id", auth, getOrder);

route.post("/auth/register", register);
route.post("/auth/login", login);
route.post("/auth/token", getToken);
route.post("/auth/logout", logout);
route.post("/auth/purge", logoutAll);

route.get("/users/detail", auth, authCheck);
route.get("/users", getUser);
route.post("/users/role", addRole);

route.get("/parts/:item", auth, getPart);
route.get("/heroku", getFromHeroku);

route.get('/items', getItem);

route.get('/cache', getPart);

module.exports = route;
