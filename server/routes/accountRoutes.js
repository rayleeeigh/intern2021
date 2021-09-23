const express = require("express");
const router = express.Router();
const accountsController = require("../controllers/accountsController");

router.post("/create", accountsController.createAccount);
router.get("/accounts", accountsController.showAccounts);

module.exports = router;