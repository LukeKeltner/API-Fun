$(document).ready(function() 
{
	var searchResults = $('.search-results')
	var movieTitle = []
	var imdbRating = []
	var backgroundColorArray = []
	var borderColorArray = []
	var firstTime = true
	var myChart;

	var getSearchResults = function(string)
	{
		$.ajax({
			url: "http://www.omdbapi.com/?s="+string+"&y=&plot=short&apikey=40e9cece",
			method: "GET"
		}).done(function(response)
		{	

			if (response.Error==="Movie not found!")
			{
				searchResults.html("No result!")
			}

			else
			{
				for (var i=0; i<response.Search.length; i++)
				{
					if (response.Search[i].Type === 'movie')
					{
						var newButton = $("<button type='button' class='list-group-item' id="+i+">"+response.Search[i].Title+" ("+response.Search[i].Year+")"+"</button>")
						newButton.data("title", response.Search[i].Title)
						searchResults.append(newButton)					
					}
				}
			}
		});
	}

	var getUserMovie = function(string)
	{
		$.ajax({
			url: "http://www.omdbapi.com/?t="+string+"&y=&plot=short&apikey=40e9cece",
			method: "GET"
		}).done(function(response)
		{	
			var currentRating = parseInt(response.imdbRating)
			console.log(typeof response.imdbRating)

			if (response.imdbRating === 'N/A')
			{
				console.log(response.imdbRating)
				$('.users-pick').html("No IMDB Rating for "+response.Title)
			}

			else if (response.imdbRating === undefined)
			{
				$('.users-pick').html("Error retrieving Title")
			}

			else if (typeof response.imdbRating === 'string')
			{
				$('.users-pick').html(movieSelected.data('title')+" added!")
				console.log(response.imdbRating)
				movieTitle.push(response.Title)
				imdbRating.push(response.imdbRating)

				if (!firstTime)
				{
					myChart.destroy()
				}

				drawGraph()				
			}
		});
	}

	var drawGraph = function()
	{
			firstTime = false
			$('#myChart').empty()

			var ctx = document.getElementById("myChart").getContext('2d');

			var r = Math.floor(Math.random()*256)
			var g = Math.floor(Math.random()*256)
			var b = Math.floor(Math.random()*256)

			backgroundColorArray.push('rgba('+r+', '+g+', '+b+', 0.2)')
			borderColorArray.push('rgba('+r+', '+g+', '+b+', 1)')

			var  dataSets = []

			for (var i=0; i<movieTitle.length; i++)
			{
				var obj = 
				{
					label: movieTitle[i],
					data: imdbRating[i],
		            backgroundColor: backgroundColorArray[i],
		            borderColor: borderColorArray[i],
		            borderWidth: 1					
				}

				dataSets.push(obj)
			}

			console.log(dataSets)
			console.log(imdbRating)

			myChart = new Chart(ctx, {
		    type: 'bar',
		    data: {
		        //labels: movieTitle,
		        abels: ['Movie 1', 'Movie 2'],
		        datasets: /*[{
		            label: 'IMDB Rating',
		            data: imdbRating,
		            backgroundColor: backgroundColorArray,
		            borderColor: borderColorArray,
		            borderWidth: 1
		        },
		        {
		            label: 'pooooop',
		            data: imdbRating,
		            backgroundColor: backgroundColorArray,
		            borderColor: borderColorArray,
		            borderWidth: 1
		        }]*/

		        [{
		            label: ['Movie 1'],
		            data: [7.9],
		            backgroundColor: 'blue',
		            borderColor: 'blue',
		            borderWidth: 1
		        },
		        {
		            label: [']Movie 2'],
		            data: [5.6],
		            backgroundColor: 'red',
		            borderColor: 'red',
		            borderWidth: 1
		        }]
		    },
		    options: {
		    	legend: 
		    	{
		    		display: true,
    				text: String,
    				position: 'right',
    				fillStyle: Color,
		    	},
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
		        }
		    }
		});
/*			console.log('Data before clear')
			console.log(myChart.tooltip._data.datasets[0].removeData())
			console.log('Data after clear')
			console.log(myChart.tooltip._data.datasets[0].data)*/
	}


	$('#search-button').on('click', function()
	{
		searchResults.empty()
		var userInput = $('input').val()

		if (userInput!=="")
		{
			getSearchResults(userInput)
		}
	})

	$('.search-results').on('click', function(event)
	{
		movieSelected = $('#'+event.target.id)
		getUserMovie(movieSelected.data('title'))
	})

	$('#clear-graph').on('click', function()
	{
		$('.users-pick').html("Graph Cleared!")
		myChart.destroy()
		movieTitle = []
		imdbRating = []
	})





































	
});