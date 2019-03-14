var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);
var fetch = require('node-fetch');
var data = []
var url = "https://api-v3.mbta.com/vehicles?api_key=dd61a37a76fe444aa485740f28250656&filter[route]=1&include=trip"

// init the data store
db.defaults({ vehicles: []}).write();

async function fetchData(){
    fetch(url)
        .then(res => res.json())
        .then(json => {
        console.log(json.data[0].attributes.direction_id)
        data = json.data;
        return data;
    })
}

async function Populate(){
    await fetchData
    fetchData()
    console.log ('Populate')
    console.log (data)
    data.forEach(newVehicle);
}

var newVehicle = function (data){
    var vehicle = {
        id : data.id,
        label : data.attributes.label,
        direction_id : data.attributes.direction_id,
        latitude : data.attributes.latitude,
        longitude : data.attributes.longitude
    }
    //Add post to db
    db.get('vehicles')
    .push(vehicle)
    .write();
}

//Call function to fetch data & populate db
Populate();
//Set internval every 15 seconds for 1 hour
var startTime = new Date().getTime()
var timerID = setInterval((function (){
    console.log('timerCalled')
    if (new Date().getTime() - startTime > 3600000){
        clearInterval(timerID)
        console.log('timerStopped')
        return
    }
Populate()
}), 15000)



//read post
console.log(db.get('vehicles').value())