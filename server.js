var express = require('express')
var fs 		= require('fs')
var request = require('request')
var cheerio = require('cheerio')
var app     = express()
var https 	= require('https')
var exec = require('child_process').exec;

app.get('/scrape', function(req, res){

	var url = 'http://capetowntrains.freeblog.site/timetables'
	var count = 0

	request(url, function(error, response, html) {
		if(!error) {

			var $ = cheerio.load(html)

			$('span a').filter(function() {
				
				var data = $(this)

				if (data.attr('href')) {
					if(data.attr('href').includes('storage')) {
						console.log(data.attr('href'))
						var wget = 'wget -O downloads/metro/pdfs/' + count + '.pdf' + ' ' + data.attr('href').replace(/(?=[() ])/g, '\\')
						exec(wget, {maxBuffer: 1024 * 5000}, function(err) {
							if(err) throw err
							else console.log('file downloaded')
						})
						count++
					}
				}
			})
		}
	})

})

app.listen('8081')

console.log('Magic happens on port 8081')
exports = module.exports = app
