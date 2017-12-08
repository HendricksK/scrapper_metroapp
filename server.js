var express = require('express')
var request = require('request')
var cheerio = require('cheerio')
var app     = express()
var https 	= require('https')
var exec = require('child_process').exec
//let instantiations 
let fs 		= require('fs'), PDFParser = require('pdf2json')

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
						exec(wget, {maxBuffer: 1024 * 3000}, function(err) {
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

app.get('/pdf-json', function(req, res) {

 	var pdfFilePath = 'downloads/metro/pdfs/28.pdf'

	let pdfParser = new PDFParser(this,1) 
 
    pdfParser.on('pdfParser_dataError', errData => console.error(errData.parserError))
    pdfParser.on('pdfParser_dataReady', pdfData => {
    	fs.writeFile('fields.json', pdfParser.getAllFieldsTypes())
        fs.writeFile('content.json', pdfParser.getRawTextContent())
    })

    pdfParser.loadPDF(pdfFilePath)
    
})

app.listen('8081')

console.log('Magic happens on port 8081')
exports = module.exports = app
