const {sayHello} = require("../controllers/rootControllers")
const express = require("express");

const router = express.Router();

router.route("/")
    .get((req, res) => sayHello(req, res))

module.exports = router