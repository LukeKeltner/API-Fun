$(document).ready(function() 
{
	var streets = 'streets-v10'
	var satellite = 'satellite-v9'
	var satelliteStreets = 'satellite-streets-v10'
	var lat;
	var long;
	OWMkey = '44576d69a6ceba81853c602d2283e513'
	mapboxgl.accessToken = 'pk.eyJ1IjoiY2x1ZWxlc3NsdWtlIiwiYSI6ImNqNmduNDFzNjBhYTEzMnBrZ3lteTUzeHcifQ.V5K5MzJBoG-Aynvi1I1OQA';

	var map = new mapboxgl.Map(
	{
		container: 'map',
		style: 'mapbox://styles/mapbox/'+streets,
	});

	map.on('mousemove', function (event) 
	{
		lat = event.lngLat.lat
		long = event.lngLat.lng
	});

	map.on('click', function()
	{
		queryURL = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&units=imperial&APPID='+OWMkey
	 	$.ajax(
	      {
	        url: queryURL,
	        method: 'GET'
	      }).done(function(response) 
	      {
	        $('.lat').html(response.coord.lat)
	        $('.long').html(response.coord.lon)
	        $('.area').html(response.name)
	        $('.weather').html(response.weather[0].main+' - '+response.weather[0].description)
	        $('.temp').html("Temp: "+response.main.temp+" F")
	        $('.humidity').html("Humidity: "+response.main.humidity)
	        $('.wind').html("Wind Speed: "+response.wind.speed+" mi/hr")
	    });
	})

	$('#street').on('click', function()
	{
		map.setStyle('mapbox://styles/mapbox/' + streets);
	})

	$('#satellite').on('click', function()
	{
		map.setStyle('mapbox://styles/mapbox/' + satellite);
	})

	$('#satellite-street').on('click', function()
	{
		map.setStyle('mapbox://styles/mapbox/' + satelliteStreets);
	})

});