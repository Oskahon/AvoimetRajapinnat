// http://127.0.0.1:8081/

var express = require('express');
var app = express();

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
   
    console.log("Example app listening at http://%s:%s", host, port);
});

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "salakka",
    database: "example_db"
});

// function getInformationFromDB (callback) {

//     // eslint-disable-next-line no-unused-vars
//     con.query('SELECT * FROM location', function(err, result, fields)
//     {
//         if (err) return callback(err);
//         callback(null, result);
//     });
// }


// console.log("Call Function");
// getInformationFromDB(function (err, result) {
//     if (err) console.log("Database error!");
//     else {
//         app.get('/', function (req, res) {
//             res.send(result);
//         });
//     }
// });

app.get('/', function (req, res) {
    con.query('SELECT * FROM location', function(err, result, fields)
    {
        if (err) throw err;
        res.send(result);
    });
});

// async function testi(){
//     try {
//         let palaute = await con.query('SELECT * FROM location');
//         console.log("mo");
//         return palaute;
//     } catch(err){
//         console.log("jotain meni pieleen");
//     }
// }
// app.get('/', async function (req, res) {
//     res.send(await testi());
// });

// async function testi(){
//     let result = await con.query('SELECT * FROM location')
//     return result;
// }

// app.get('/', function (req, res) {
//     res.send(testi());
// });

// async function testi(){
//     try {
//         const rivi = await con.query('SELECT * FROM location', function(err, result, fields)
//         {
//             if (err) throw err;
//         });
//         return rivi;
//     } catch (err){
//         console.log("kikki");
//     }
// }

// testi().then(x => {
//     app.get('/', function (req, res) {
//         res.send(x);
//     });
// });