// http://api.citybik.es/v2/
/*
let xmlhttp = new XMLHttpRequest();
let url = "http://api.citybik.es/v2/networks/citybikes-helsinki";
xmlhttp.onreadystatechange = function () {
	if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
		let myArr = JSON.parse(xmlhttp.responseText);
		//   let string = "";
		/*
            for (let i of myArr.network.stations){
                string += i.name;
            }

            document.getElementById("testi").innerHTML = string;

		taulukoi(myArr.network.stations);
	}
};
xmlhttp.open("GET", url, true); // 4
xmlhttp.send();

// -----------------------------------------------------------
function taulukoi (lista) {
// DRAW HTML TABLE
	let taulukko = document.getElementById("taulu");
	let row = taulukko.insertRow();

	for (const i of lista) {
		let cell = row.insertCell();
		cell.innerHTML = i.name;
		let cell2 = row.insertCell();
		cell2.innerHTML = i.free_bikes;
		//let cell3 = row.insertCell();
		/*      cell3.innerHTML = i.id;
            let cell4 = row.insertCell();
            cell4.innerHTML = i.timestamp;
            
		row = taulukko.insertRow();
	}
	// ATTACH TABLE TO CONTAINER
	document.getElementById("testi").appendChild(taulukko);
}

*/

/*const request = require('request');

var req = {
	url: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
	method: 'POST',
	headers: { "Content-Type": "application/json" },
	body: { "query": `{
    bikeRentalStations {
		name
	}
  }` },
	json: true
};

request(req, function (error, response, body) {
	if (!error && response.statusCode == 200) {
		let arr = JSON.parse(body, null, 4);
		document.getElementById("testi").innerHTML = arr.data.bikeRentalStations.name[0];		
		//console.log(JSON.stringify(body, null, 4)); 
	}
});*/

let xmlr = new XMLHttpRequest();
let url = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
let query = {
	query: `{
		bikeRentalStations {
			name
			bikesAvailable
			lat
			lon
		}
	}`
};

xmlr.responseType = "json";
xmlr.open('POST', url, true);
xmlr.setRequestHeader('Content-Type', 'application/json');
xmlr.onreadystatechange = function () {
	if (xmlr.readyState === 4 && xmlr.status === 200) {
		let arr = xmlr.response;
		
		let taulu = document.getElementById("taulu");
		for (let i of arr.data.bikeRentalStations){
			let rivi = taulu.insertRow();
			let nimi = rivi.insertCell();
			nimi.innerText = i.name;
			let vapaatPyorat = rivi.insertCell();
			vapaatPyorat.innerText = i.bikesAvailable;
			taulu.appendChild(rivi);
		}
	}
};

xmlr.send(JSON.stringify(query));
