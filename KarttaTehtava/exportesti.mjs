export function getPyoraData(func) {
    let xmlr = new XMLHttpRequest();
    let url = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
    let query = {
        query: `{
		bikeRentalStations {
			name
			stationId
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
            var arr = xmlr.response;

            // let taulu = document.getElementById("tiedot");
            // for (let i of arr.data.bikeRentalStations){
            // 	let rivi = taulu.insertRow();
            // 	let nimi = rivi.insertCell();
            // 	let vapaatPyorat = rivi.insertCell();
            // 	nimi.innerText = i.name;
            // 	vapaatPyorat.innerText = i.bikesAvailable;

            // 	taulu.appendChild(rivi);
            // }

            let lista = document.getElementById("asemat");

            for (let i of arr.data.bikeRentalStations) {
                let tietue = document.createElement("option");
                tietue.innerText = i.name;
                tietue.value = i.stationId;
                lista.appendChild(tietue);
            }

            func(60.1719, 24.9414, null, null);
        }

    };
    xmlr.send(JSON.stringify(query));

}

export function getStationData(Id, func) {
    let xmlr = new XMLHttpRequest();
    let url = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
    let query = {
        query: `{
		bikeRentalStation(id: "${Id}") {
			name
			stationId
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
            var arr = xmlr.response;
            var asema = arr.data.bikeRentalStation;
            console.log(asema.name + ", " + asema.bikesAvailable);
            func(asema.lat, asema.lon, asema.name, asema.bikesAvailable);
        }

    };
    xmlr.send(JSON.stringify(query));
}