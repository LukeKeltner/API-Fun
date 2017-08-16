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
			movieTitle.push(response.Title)
			imdbRating.push(response.imdbRating)
			if (!firstTime)
			{
				console.log('before destory')
				myChart.destroy()
				console.log('after destory')
			}
			drawGraph()
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

			myChart = new Chart(ctx, {
		    type: 'bar',
		    data: {
		        labels: movieTitle,
		        datasets: [{
		            label: 'IMDB Rating',
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
		$('.users-pick').html(movieSelected.data('title')+" added!")
		getUserMovie(movieSelected.data('title'))
	})





































	
});