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

function getData() {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-unused-vars
        con.query('SELECT * FROM location', function(err, result, fields)
        {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

app.get('/', async function (req, res) {
    let palaute = await getData();
    res.send(palaute);
});
