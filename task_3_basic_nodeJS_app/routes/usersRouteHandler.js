const express = require("express");
const { getAllUsers, addNewUser , deleteUser} = require("../controllers/usersController");

const router = express.Router();

router.route("/")
    .get((req, res) => getAllUsers(req, res))
    .post((req, res) => addNewUser(req, res))
    .delete((req, res) => deleteUser(req, res))

module.exports = router
