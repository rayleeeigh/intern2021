const account = require("../models/accounts");

exports.createAccount = async(req, res) => {
    let data = await account.model.create({
        account_email: req.body.email,
        account_password: req.body.password,
        updatedAt: null
    })
}

exports.showAccounts = async(req, res) => {
    let data = await account.model.findAll();
    res.send(data);
}

exports.resetPassword = async(req, res) => {
    let data = await account.model.findOne({
        where:{
            account_email: req.body.email
        }
    });

    data.account_password=req.body.password;

    await data.save();
}
