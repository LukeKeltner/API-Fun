$(document).ready(function() 
{
	var searchResults = $('.search-results')
	var movieTitle = []
	var imdbRating = []
	var backgroundColorArray = []
	var borderColorArray = []

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

	var getSearchResults = function(string)
	{
		$.ajax({
			url: "http://www.omdbapi.com/?s="+string+"&y=&plot=short&apikey=40e9cece",
			method: "GET"
		}).done(function(response)
		{	
			console.log(response.Search)

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
						newButton.data("movie-id", response.Search[i].imdbID)
						searchResults.append(newButton)					
					}
				}
			}
		});
	}

	var getUserMovie = function(string)
	{
		$.ajax({
			url: "http://www.omdbapi.com/?i="+string+"&y=&plot=short&apikey=40e9cece",
			method: "GET"
		}).done(function(response)
		{	
			console.log(response.imdbID)
			var currentRating = parseInt(response.imdbRating)
			console.log(response.Plot)

			if (response.imdbRating === 'N/A')
			{
				console.log(response.imdbRating)
				$('.users-pick').html("No IMDB Rating for "+response.Title)
				$('.bio').html("")
				$('.movie-pic').attr('src', '')
			}

			else if (response.imdbRating === undefined)
			{
				$('.users-pick').html("Error retrieving Title")
				$('.bio').html("")
				$('.movie-pic').attr('src', '')
			}

			else if (typeof response.imdbRating === 'string')
			{
				$('.users-pick').html(response.Title+" added!")
				$('.bio').html('Plot: '+response.Plot)
				$('.movie-pic').attr('src', response.Poster)
				console.log(response.imdbRating)
				movieTitle.push(response.Title)
				imdbRating.push(response.imdbRating)

				updateGraph()				
			}
		});
	}

	var updateGraph = function()
	{
	    chart.load({
	        columns: 
	        [
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
		getUserMovie(movieSelected.data('movie-id'))
		console.log(event.target.id+" and "+movieSelected.data('movie-id'))
	})

	$('#clear-graph').on('click', function()
	{
		$('.users-pick').html("Graph Cleared!")
		chart.unload()
		movieTitle = []
		imdbRating = []
		$('.bio').html("")
		$('.movie-pic').attr('src', '')
	})	

	$('#search-input').keyup(function(event)
	{
		if (event.which === 13)
		{
			var userInput = $('input').val()

			if (userInput!=="")
			{
				searchResults.empty()
				getSearchResults(userInput)
			}
		}
	})
});