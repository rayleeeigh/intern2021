const express = require("express");
const router = express.Router();
const accountsController = require("../controllers/accountsController");
const jwt = require("jsonwebtoken");

const verify = (req,res,next) => {
    const authHeader= req.headers.authorization;
    // res.send(authHeader);
    if(authHeader){
        const token = authHeader;
        // res.send(token);
        console.log(token);
        jwt.verify(token,"mySecretKey",(err,user)=>{
            if(err){
                return res.status(403).json("Token is not valid!");
            }
            
            req.user = user;
            next();
        })
    }else{
        res.status(401).json("You are not authenticated");
    }
};


router.post("/create", accountsController.createAccount);
router.get("/accounts", accountsController.showAccounts);
router.post("/resetpassword", accountsController.resetPassword);
router.post("/login",accountsController.login);
router.post("/refresh",accountsController.refreshAccessToken);
router.post("/logout",verify,accountsController.logout);

router.get("/sample",(req,res)=>{
    console.log("hello");
    res.send("hello");
})


module.exports = router;