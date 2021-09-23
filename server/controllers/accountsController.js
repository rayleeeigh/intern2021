const accounts = require("../models/accounts")

exports.createAccount = async(req, res) => {
    let data = await user.model.create({
        userEmail: "Rayl",
        userPassword: "Xylem",
        updatedAt: null
    })

    res.json(data);
}
