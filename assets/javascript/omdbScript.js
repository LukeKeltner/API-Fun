$(document).ready(function() 
{
	var searchResults = $('.search-results')
	var movieTitle = []
	var imdbRating = []
	var backgroundColorArray = []
	var borderColorArray = []
	var firstTime = true

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
			movieTitle.push(response.Title)
			imdbRating.push(response.imdbRating)
			console.log(response.Title)
			console.log(response.imdbRating)
			console.log(movieTitle)
			console.log(imdbRating)
			drawGraph()
		});
	}

	var drawGraph = function()
	{
			$('#myChart').empty()

			if (!firstTime)
			{
				ctx.empty()
				firstTime = false
			}

			var ctx = document.getElementById("myChart").getContext('2d');

			var r = Math.floor(Math.random()*256)
			var g = Math.floor(Math.random()*256)
			var b = Math.floor(Math.random()*256)

			backgroundColorArray.push('rgba('+r+', '+g+', '+b+', 0.2)')
			borderColorArray.push('rgba('+r+', '+g+', '+b+', 1)')

			var myChart = new Chart(ctx, {
		    type: 'bar',
		    data: {
		        labels: movieTitle,
		        datasets: [{
		            label: '# of Votes',
		            data: imdbRating,
		            backgroundColor: backgroundColorArray,
		            borderColor: borderColorArray,
		            borderWidth: 1
		        }]
		    },
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
		        }
		    }
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
		$('.users-pick').html(movieSelected.data('title')+" added!")
		getUserMovie(movieSelected.data('title'))
	})





































	
});