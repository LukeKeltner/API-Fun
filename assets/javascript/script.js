$(document).ready(function() 
{

	var resultNumber = 20
	var trending = false;
	var searchButtons = $('.search-buttons')
	var searchResults = $('.search-results')

	var getNewButton = function(string)
	{
		var newButton = $("<button type='button' class='btn btn-primary'>"+string+"</button>")
		searchButtons.append(newButton)
	}

	var getSearchResults = function(searchString, trending)
	{
		searchResults.empty()

		if (trending)
		{
			var queryURL = "http://api.giphy.com/v1/gifs/trending?&api_key=dc6zaTOxFJmzC&limit="+resultNumber;
		}

		else
		{
			var queryURL = "http://api.giphy.com/v1/gifs/search?q="+searchString+"&api_key=dc6zaTOxFJmzC&limit="+resultNumber;
		}

	    $.ajax(
	    {
		    url: queryURL,
		    method: 'GET'

	    }).done(function(response) 
	    {
	    	console.log(response)

		    for (var i=0; i<response.data.length; i++)
		    {
				var newImg = $('<img>')
				var stillImg = response.data[i].images.original_still.url
				var moveImg = response.data[i].images.downsized.url
				newImg.attr('class', i)
				newImg.attr('src', stillImg)
				newImg.css('width', '200px')
				newImg.data('stop', stillImg)
				newImg.data('move', moveImg)
				newImg.data('moving', false)
				searchResults.append(newImg)
			}
	    });
	}

	$('#search-button').on('click', function()
	{
		var userInput = $('input').val()
		if (userInput!=="")
		{
			getNewButton(userInput)
		}
	})

	$('#trending-button').on('click', function()
	{
		getSearchResults("", true)
	})

	searchButtons.on('click', function(event)
	{
		var searchString = event.target.textContent
		getSearchResults(searchString, false)

	})

	searchResults.on('click', function(event)
	{
		clickedID = event.target.className
		console.log(clickedID)
		imgClicked = $('.'+clickedID)

		for (var i=0; i<resultNumber; i++)
		{
			if (clickedID==i)
			{
				if (!imgClicked.data('moving'))
				{
					var moveData = imgClicked.data('move')
					imgClicked.attr('src', moveData)
					imgClicked.data('moving', true)
				}

				else
				{
					var stopData = imgClicked.data('stop')
					imgClicked.attr('src', stopData)
					imgClicked.data('moving', false)
				}
			}
		}
	})
});
