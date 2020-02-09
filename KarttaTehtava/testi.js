// http://api.citybik.es/v2/

let xmlhttp = new XMLHttpRequest();
    let url = "http://api.citybik.es/v2/networks/citybikes-helsinki";
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let myArr = JSON.parse(xmlhttp.responseText);
            let string = "";
/*
            for (let i of myArr.network.stations){
                string += i.name;
            }

            document.getElementById("testi").innerHTML = string;
*/
            taulukoi(myArr.network.stations);
        }
    };
    xmlhttp.open("GET", url, true); // 4
    xmlhttp.send();
    
//-----------------------------------------------------------
    function taulukoi (lista){
        // DRAW HTML TABLE
        let taulukko = document.getElementById("taulu"),
            row = taulukko.insertRow();

        for (let i of lista) {
            let cell = row.insertCell();
            cell.innerHTML = i.name;
            let cell2 = row.insertCell();
            cell2.innerHTML = i.free_bikes;
            let cell3 = row.insertCell();
/*            cell3.innerHTML = i.id;
            let cell4 = row.insertCell();
            cell4.innerHTML = i.timestamp;
            */
            row = taulukko.insertRow();
        }
        // ATTACH TABLE TO CONTAINER
        document.getElementById("testi").appendChild(taulukko);
    }
    