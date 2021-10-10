//DOM
const lat = document.getElementById('lat'),
lon = document.getElementById('lon'),
time = document.getElementById('time');

// url that response latitude and longitude of iss
const iss_url = 'https://api.wheretheiss.at/v1/satellites/25544';

//make a map
const mymap = L.map('issMap');
mymap.options.minZoom = 2.5;

    //copy right for map
const attribution = " &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"; //copy right for map tile

    //make a tile which show a map feature
const tile_url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; 

const tiles = L.tileLayer(tile_url,{attribution}); //tiles mean a map design 

tiles.addTo(mymap);

    //create a iss icon on map
const issIcon = L.icon({
        iconUrl: 'issIcon3.png',
        iconSize: [50, 50],
        iconAnchor: [50,32],
        popupAnchor: [-3, -76],

    });

    //crate a marker to make iss icon
const makeMarker = L.marker([0, 0],{icon:issIcon}).addTo(mymap);

let firstTime = true;
    
//Fetch from iss url
const fetchISS = async function(){
    const response = await fetch(iss_url);
    const {latitude,longitude} = await response.json();
    let X = 'E',
    Y = 'N';
    if (latitude < 0) Y = 'S';
    if(longitude < 0) X = 'W';
    lat.innerHTML = `${latitude.toFixed(2)} ${Y}`;
    lon.innerHTML = `${longitude.toFixed(2)} ${X}`;

    //make map with leaflet
    // makeMap(latitude,longitude);
    makeMarker.setLatLng([latitude,longitude]);

    if(firstTime){
        mymap.setView([latitude,longitude],2);
        firstTime = false;
    }
    
}







let clock = () => {
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
     time.innerHTML = `${hrs} : ${mins} : ${secs}`
    // log the time in console
    
  }
  // call the clock function



setInterval(fetchISS,1000);
setInterval(clock,1000)