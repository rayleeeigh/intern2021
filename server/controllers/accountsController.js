const account = require("../models/accounts");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const passport = require('passport');
const jwt = require("jsonwebtoken");
const e = require("express");

var saltRounds = 10
let refreshTokens = []

const generateAccessToken = (user) =>{
    return jwt.sign({account_id: user.account_id},"mySecretKey",{expiresIn:"5s"})
}
const generateRefreshToken = (user) =>{
    return jwt.sign({account_id: user.account_id}, "myRefreshSecretKey")
}



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
        return res.status(207).send("Account Exists");
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
            
            // return res.status(200).json({});
            const accessToken = generateAccessToken(accounts);
            const refreshToken = generateRefreshToken(accounts);
            refreshTokens.push(refreshToken);
            res.json({
                email:accounts.account_email,
                accessToken,
                refreshToken,
            })
            // res.send(accessToken);
        
            console.log(accounts);
        } else {
            return res.status(201).json({});
        }
    } else {
        return res.status(202).json({});
    }

    

    //************USED PASSPORT AUTH************* */
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

exports.refreshAccessToken = async(req,res)=>{
    const refreshToken = req.body.token

    if(!refreshToken) return res.status(401).json("You are not authenticated");

    if(!refreshTokens.includes(refreshToken)){
        return res.send(403).json("Refresh token is not valid");
        // res.send(refreshTokens);
    }
    // else{
    //     res.send("naa");
    // }
    jwt.verify(refreshToken , "myRefreshSecretKey", (err,user)=>{
        err && console.log(err);
        // res.send("verified");
        refreshTokens = refreshTokens.filter((token)=>token!==refreshToken);

        
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        
        refreshTokens.push(newRefreshToken);
        // res.send(newAccessToken);
        res.status(200).json({
            accessToken : newAccessToken,
            refreshToken: newRefreshToken,
        })
    })
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
        return res.status(205).send("Account not found");
    }else{
        data.account_password=hash;
        await data.save();
        return res.status(201).send("Reset success");
    }
    

}

exports.logout = async(req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token)=>token !==refreshToken);
    res.status(200).json("You logged out Successfully");

}