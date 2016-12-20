var mongoose = require("mongoose");

mongoose.set('debug',true);

console.log("connecting.......")

var db = mongoose.connect('mongodb://localhost/usermana');

db.connection.on("error",function(error){

    console.log("数据库连接失败："+error)
})

db.connection.on("open",function(error){

    console.log("数据库连接成功")
})