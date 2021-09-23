const express = require('express');
const account = require("./models/accounts");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create", (req,res) => {
    const email=req.body.email;
    const password=req.body.password;

    let data = account.model.create({account_email: email, account_password: password, createdAt:true, updatedAt: null, deletedAt: null});

    console.log(data);
})

require("./connection.js");
app.listen(5000);