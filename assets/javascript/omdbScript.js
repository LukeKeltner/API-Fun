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
			console.log(response.Plot)

			if (response.imdbRating === 'N/A')
			{
				console.log(response.imdbRating)
				$('.users-pick').html("No IMDB Rating for "+response.Title)
				$('.bio').html("")
			}

			else if (response.imdbRating === undefined)
			{
				$('.users-pick').html("Error retrieving Title")
				$('.bio').html("")
			}

			else if (typeof response.imdbRating === 'string')
			{
				$('.users-pick').html(movieSelected.data('title')+" added!")
				$('.bio').html('Plot: '+response.Plot)
				$('.movie-pic').attr('src', response.Poster)
				console.log(response.imdbRating)
				movieTitle.push(response.Title)
				imdbRating.push(response.imdbRating)

				if (!firstTime)
				{
					myChart.destroy()
				}

				updateGraph()				
			}
		});
	}

	var updateGraph = function()
	{
	    chart.load({
	        columns: [
	            [movieTitle[movieTitle.length-1], imdbRating[imdbRating.length-1]]
	        ]
	    });

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
		chart.unload()
		movieTitle = []
		imdbRating = []
	})	



	var chart = c3.generate(
	{
		title: 
		{
  			text: 'IMDB Ratings'
		},

    	data: 
    	{
        	columns: 
        	[

        	],

        	type: 'bar',
    	},

    	legend: 
    	{
        	position: 'right'
    	},
    
    	bar: 
    	{
        	width: 
        	{
            	ratio: 0.9 
        	}
    	}
	});
});