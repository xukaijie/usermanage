
require('./connect');
var mongoose = require('mongoose');

var express = require('express');

var routerPath = require("../routes/routePath");
var router = express.Router();

var Schema = mongoose.Schema;

console.log("mongoose-db...........")

var User_Schema = new Schema({
    name: String,
    phone: String,
    date: Date,
    password:String

}, {
    versionKey: false
});

var User = mongoose.model("User", User_Schema);

/* GET users listing. */
router.get(routerPath.createuser, function(req, res, next) {

    var beta = new User({
        name:"xukaijie",
        phone:"18042008682",
        date:Date.now(),
        password:"123456"
    });

    beta.save(function(err){
            if (err){
                console.log(err)
            } else{
                console.log("存入成功")
            }
            res.send("存入成功")
    })
});

router.post(routerPath.authuser, function(req, res, next) {

    var name = req.body.name;
    var password = req.body.password;


    User.findOne({name:name,password:password},null,function(err,docs){

        console.log(err)
        console.log(docs)
        if (docs !=null){

            res.status(200);
        }else{
            res.status(510);
        }

        res.json({});
    })

});

router.get(routerPath.listusers, function(req, res, next) {

    console.log("########")
    User.find({},null,function(err,docs){

        var ret = {};

        ret.users=[];

        if (docs != null){

            for (var i = 0;i < docs.length;i++){

                ret.users.push({name:docs[i].name,phone:docs[i].phone})
            }
        }

        console.log(ret);

        res.json(ret);
    })

});

module.exports = router;