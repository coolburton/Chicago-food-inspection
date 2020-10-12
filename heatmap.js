var myMap = L.map("map", {
  center: [41.87, -87.62],
  zoom: 13
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var baseURL = "https://data.cityofchicago.org/resource/4ijn-s7e5.json?";
var date = "$where=inspection_date between '2018-01-01' and '2020-06-01'";
var complaint = "&inspection_type=Canvass";
var results = "&results=Fail";
var limit = "&$limit=10000";

var url = baseURL+date+complaint+results+limit;
d3.json(url).then (function(response){

  console.log(response);

  var heatArray = [];
  for (var i = 0; i < response.length; i++) {
    var location = response[i].location;
    if (location) {
      heatArray.push([+location.latitude, +location.longitude]);
    }
  }

  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 20
  }).addTo(myMap);

});
