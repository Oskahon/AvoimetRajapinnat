// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
//     res.send("Hello world!");
// });

// var server = app.listen(8081, function () {
//     var host = server.address().address;
//     var port = server.address().port;
   
//     console.log("Example app listening at http://%s:%s", host, port);
// });

// console.log("mo");

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "salakka"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});