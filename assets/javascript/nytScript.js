$(document).ready(function() 
{
	var articleLimit;

	var createArticle = function(title, date, info, author, link)
	{
		var articleDiv = $("<div class='thumbnail'>")
		var articleTitle = $("<h3>"+title+"</h3>")
		var articleAuthor = $("<p>"+author+"</p>")
		var articleDate = $("<p>"+date+"</p>")
		var articleInfo = $("<p>"+info+"</p>")
		var articleLink = $("<a href="+link+">Click Here!</a>")

		articleDiv.append(articleTitle)
		articleDiv.append(articleAuthor)
		articleDiv.append(articleDate)
		articleDiv.append(articleInfo)
		articleDiv.append(articleLink)

		$('#results-body').append(articleDiv)
	}

	var search = function (input, begin, end)
	{
		console.log("being "+begin)
		console.log("end "+end)
		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
		url += '?' + $.param(
		{
		  'api-key': "3f773f6859af4b2c8f946c3173456726",
		  'q': ""+input+"",
		  'fq': "new york times",
		  'begin_date': begin,
	  	  'end_date': end,
	  	  'facet_filter': "true"
		});

		$.ajax({
		  url: url,
		  method: 'GET',
		}).done(function(result) 
		{
			console.log("RESULT!")
			console.log(result)

			for (var i=0; i<articleLimit; i++)
			{
			  var title = result.response.docs[i].headline.main
			  var author = result.response.docs[i].byline.original
			  var info = result.response.docs[i].snippet
			  //var date = Date(Date.parse(result.response.docs[i].pub_date))
			  var date = result.response.docs[i].pub_date
			  var link = result.response.docs[i].web_url

			  createArticle(title, date, info, author, link)		
			}

		})

		.fail(function(err) 
		{
			$('#results-body').html("There was an error!")
			throw err;
		}); 
	}

	$('.dropdown-menu li').on('click', function()
	{
		$('#num-results').text($(this).text())
	})


	$('#submit').on('click', function()
	{
		articleLimit = parseInt($('#num-results').text())

		$('#results-body').empty()
		var input = $('#terms').val().toLowerCase().trim()
		var begin;
		var end;

		if ($('#begin-date').val() !== '')
		{
			begin = $('#begin-date').val()
		}

		else
		{
			begin = '20160101'
		}

		if ($('#end-date').val() !== '')
		{
			end = $('#end-date').val()
		}

		else
		{
			end = '20170819'
		}

		search(input, begin, end)

	})

	$('#clear-button').on('click', function()
	{
		$('#results-body').empty()
	})

});