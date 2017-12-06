var express = require('express')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var app     = express()

app.get('/scrape', function(req, res){

	url = 'http://capetowntrains.freeblog.site/timetables'

	request(url, function(error, response, html) {
		if(!error) {

			var $ = cheerio.load(html)

			$('span a').filter(function() {
				var data = $(this)
				console.log(data.text())
				console.log(data.attr('href'))
			})
		}
	})

})

app.listen('8081')

console.log('Magic happens on port 8081')
exports = module.exports = app
