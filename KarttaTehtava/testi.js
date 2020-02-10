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
		
		let taulu = document.getElementById("tiedot");
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
