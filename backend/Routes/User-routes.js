const express = require("express");
const { signup, getAllUsers, login } = require("../Controllers/User-control");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", signup);
router.post("/login", login);
module.exports = router;
