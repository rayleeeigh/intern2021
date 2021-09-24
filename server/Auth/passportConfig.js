const User = require("../models/accounts");
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;
const passport = require("passport");
var saltRounds = 10;

module.exports = function(passport) {

    var salt = bcrypt.genSaltSync(saltRounds);

    passport.use(
        new localStrategy((email,password,done)=>{
            var hash = bcrypt.hashSync(password, salt);
            User.findOne({account_email:email},(err,user)=>{
                if(err) throw console.log(err);
                if(!user) return done(null,false);
                bcrypt.compare(hash, account_password,(err,result)=>{
                    if(err) throw console.log(err);
                    if(result === true) {
                        return done(null,user);
                    }else{
                        return done(null, false);
                    }
                })
            })
        })
    )
    passport.serializeUser((user,cb) =>{
        cb(null, user.id);
    })
    
    passport.deserializeUser((id,cb)=>{
        User.findOne({_id:id},(err,user)=>{
            cb(err,user);
        });
    });
}

