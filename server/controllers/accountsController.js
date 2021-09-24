const account = require("../models/accounts");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const passport = require('passport');

var saltRounds = 10


exports.createAccount = async(req, res) => {
    
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(req.body.password, salt);

    let findAcc = await account.model.findOne({
        where: {
            account_email: req.body.email
        }
    })

    if (findAcc == null) {
        let data = await account.model.create({
            account_email: req.body.email,
            account_password: hash,
            updatedAt: null
        })
        return res.status(200).send("Sign-up success");
        
    } else {
        return res.status(404).send("Account Exists");
    }

    // let data = await account.model.create({
    //     account_email: req.body.email,
    //     account_password: req.body.password,
    //     updatedAt: null
    // })
    // return res.status(200).send("Success");
}

exports.login = async(req, res) => {

    let accounts = await account.model.findOne({
        where: {
            account_email: req.body.email
        }
    })

    if (accounts != null) {
        if (bcrypt.compareSync(req.body.password, accounts.account_password) && accounts.account_password != "") {
            console.log("success");
            return res.status(200).json({});
        } else {
            return res.status(201).json({});
        }
    } else {
        return res.status(202).json({});
    }

    // passport.authenticate("local",(err,user,info)=>{
    //     if(err) throw err;
    //     if(!user) return res.status(404).json({});
    //     else{
    //         req.logIn(user,err=>{
    //             if(err) throw err;
    //             res.send('Successfully Authenticated');
    //             console.log(req.user);
    //         })
    //     }
    // })(req,res,next);
}


exports.showAccounts = async(req, res) => {
    let data = await account.model.findAll();
    res.send(data);
    
    console.log("test");
}

exports.resetPassword = async(req, res) => {
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(req.body.password, salt);


    let data = await account.model.findOne({
        where:{
            account_email: req.body.email
        }
    });

    if(data==null){
        return res.status(401).send("Account not found");
    }else{
        data.account_password=hash;
        await data.save();
        return res.status(201).send("Reset success");
    }
    

}

