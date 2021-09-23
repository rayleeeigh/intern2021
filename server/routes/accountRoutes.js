const express = require("express");
const router = express.Router();
const accountsController = require("../controllers/accountsController");

router.post("/create", accountsController.createAccount);
router.get("/accounts", accountsController.showAccounts);
router.post("/resetpassword", accountsController.resetPassword);
router.post("/login",accountsController.login);

module.exports = router;