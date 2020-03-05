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

function getInformationFromDB (callback) {

    // eslint-disable-next-line no-unused-vars
    con.query('SELECT * FROM location', function(err, result, fields)
    {
        if (err) return callback(err);
        callback(null, result);
    });
}

console.log("Call Function");
getInformationFromDB(function (err, result) {
    if (err) console.log("Database error!");
    else {
        app.get('/', function (req, res) {
            res.send(result);
        });
    }
});

// async function testi(){
//     try {
//         const rivi = await con.query('SELECT * FROM location', function(err, result, fields)
//         {
//             if (err) throw err;
//             const palaute = result;
//             return palaute; 
//         });
//         return rivi;
//     } catch (err){
//         console.log("kikki");
//     }
// }

// testi().then((x) => function(){
//     app.get('/', function (req, res) {
//         res.send(x);
//     });
// });

// function asyncAwait() {
//     let testi = "ase";
//     testi = con.query('SELECT * FROM location', async function(err, result, fields)
//     {
//         if (err) throw err;
//         const palaute = await result;
//         return palaute; 
//     });
//     return testi;
// }
// console.log(testi());

// app.get('/', function (req, res) {
//     res.send(asyncAwait());
// });
// asyncAwait();