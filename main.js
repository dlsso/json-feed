// Namespace using revealing module pattern 
var jsonFeed = (function() {

	// Create the init method for jsonFeed
	var init = function() {

		// Set URL for news feed
		var newsFeed = "http://www.corsproxy.com/www.whitehouse.gov/facts/json/all/college%20affordability";

		// jQuery call to get the articles
		$.getJSON(newsFeed, function (articles, response) {

			// Validate response
			if(response !== "success") $('#articleContainer').append(response + '<br>')
			else {
				// Sort articles by URL title
				articles.sort(function(a, b){

					// Grab title and normalize
					var titleA=a.url_title.toLowerCase(), titleB=b.url_title.toLowerCase()

					// Sort ascending
					if (titleA < titleB) return -1 
					if (titleA > titleB) return 1
					else return 0
				});

				// Loop through articles and display info for each
				for (var i = 0; i < articles.length; i++) {
					$('#articleContainer').append(
					'<a href="' + articles[i].url + '">' + articles[i].url_title + '</a><br>'
					+ 'Body: ' + articles[i].body + '<br>'
					+ 'Category: ' + articles[i].category + '<br>'
					+ 'Path: ' + articles[i].path + '<br>'
					+ 'Type: ' + articles[i].type + '<br>'
					+ 'UID: ' + articles[i].uid + '<br>'
					+ 'URL: ' + articles[i].url + '<br>'
					+ 'URL Title: ' + articles[i].url_title + '<br><br>')
				}
			}
		});
	};

	// Allows init to be called from the outside
	return {
		init: init
	}
}());


$(document).on('ready', function() {
	jsonFeed.init();
});