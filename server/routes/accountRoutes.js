const express = require("express");
const router = express.Router();
const accountsController = require("../controllers/accountsController");

router.post("/signup", accountsController.createAccount);

module.exports = router;