var mysql = require('mysql');
var util = require('util');

var con = mysql.createConnection({
    host: "localhost",
    user: "olso",
    password: "olso",
    database: "reseptihaku"
});

const query = util.promisify(con.query).bind(con);

let ainekset = ['lohi', 'silakka'];

async function insertAinekset(ainekset) {
    let idt = [];
    
    for (let item of ainekset){
        const id = await query("INSERT INTO ainesosat(nimi) VALUES ('"+item+"');");
        console.log(id.insertId);
        idt.push(id.insertId);
    }
    
    return idt;

    // return new Promise((resolve, reject) => {
    //     // let query = "INSERT INTO ainesosat(nimi) VALUES ";

    //     // for (let item of ainekset){
    //     //     if (ainekset.indexOf(item) === (ainekset.length-1)){
    //     //         query += "('"+item+"');";
    //     //     } else {
    //     //         query += "('"+item+"'),";
    //     //     }
    //     // }
    //     // con.query(query, function(err, result, fields)
    //     // {
    //     //     if (err) console.log(err);
    //     //     console.log(result.insertId);
    //     // });
    //     // console.log(query);
    //     let idt = [];
    //     for (let item of ainekset){
           
    //         let testi = "INSERT INTO ainesosat(nimi) VALUES ('"+item+"');";
    //         // eslint-disable-next-line no-unused-vars
    //         con.query(testi, function(err, result, fields)
    //         {
    //             if (err) console.log(err);
    //             console.log(result.insertId);
    //         });
      
    //     }
    //     resolve(idt);
    // });
}

let resepti = {"nimi":"lihapulla", "resepti":"www.google.com", "vegaaninen":0,"laktoositon":1, "gluteeniton":1};
function insertResepti(resepti){
    return new Promise((resolve, reject) => {
        let testi = "INSERT INTO reseptit(nimi,resepti,vegaaninen,laktoositon,gluteeniton) VALUES "+
    "('"+resepti.nimi+"','"+resepti.resepti+"','"+resepti.vegaaninen+"','"+resepti.laktoositon+"','"+resepti.gluteeniton+"');";
        console.log(testi);
        // eslint-disable-next-line no-unused-vars
        con.query(testi, function(err, result, fields)
        {
            if (err) console.log(err);
            resolve(result.insertId);
        });
    });
}

function getAinekset(){
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM ainesosat', function(err, result, fields){
            if (err) console.log(err);
            // console.log(result);
            // console.log(result[0].AinesosaId);
            resolve(result);
        });
    });
}

function getReseptit(){
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM reseptit', function(err, result, fields){
            if (err) console.log(err);
            // console.log(result);
            resolve(result);
        });
    });
}
async function testi(ainekset){
    console.log(await insertAinekset(ainekset));
}

testi(ainekset);
// insertResepti(resepti)
// insertAinekset(ainekset);
// getAinekset();