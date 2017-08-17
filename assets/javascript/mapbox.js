$(document).ready(function() 
{
	var streets = 'streets-v10'
	var satellite = 'satellite-v9'
	var lat;
	var long;
	key = '44576d69a6ceba81853c602d2283e513'
	mapboxgl.accessToken = 'pk.eyJ1IjoiY2x1ZWxlc3NsdWtlIiwiYSI6ImNqNmduNDFzNjBhYTEzMnBrZ3lteTUzeHcifQ.V5K5MzJBoG-Aynvi1I1OQA';

	var map = new mapboxgl.Map(
	{
		container: 'map',
		style: 'mapbox://styles/mapbox/'+streets,
		zoom:0
	});

	map.on('mousemove', function (event) 
	{
		lat = event.lngLat.lat
		long = event.lngLat.lng
		console.log(event.lngLat)
		console.log(lat)
		console.log(long)
	});

	map.on('click', function()
	{
		queryURL = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&units=imperial&APPID='+key
	 	$.ajax(
	      {
	        url: queryURL,
	        method: 'GET'
	      }).done(function(response) 
	      {
	        console.log(response)
	        $('.lat').html(response.coord.lat)
	        $('.long').html(response.coord.lon)
	    });
	})
	
});