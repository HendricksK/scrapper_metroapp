var express = require('express')
var request = require('request')
var cheerio = require('cheerio')
var app     = express()
var https 	= require('https')
var exec = require('child_process').exec
var LineByLineReader = require('line-by-line')
//let instantiations 
let fs 		= require('fs'), PDFParser = require('pdf2json')
let fileName = ''

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

app.get('/pdf-util', function(req, res) {

	var pdfUtil = require('pdf-to-text')
	var pdf_path = 'downloads/metro/pdfs/28.pdf'
	var jsonData = new Object()
	var option = {from: 0, to: 1}
 
	pdfUtil.info(pdf_path, function(err, info) {
		if (err) throw(err)
		console.log(info)
		fileName = info.title
	})
	 
	//Omit option to extract all text from the pdf file 
	pdfUtil.pdfToText(pdf_path, function(err, data) {
	  	if (err) throw(err)
	  	// console.log(data) //print all text
		jsonData[0] = data
		fs.writeFile(fileName + '.txt', data)
		fs.writeFile('content_json.json', jsonData[0]) 
		res.send(data)    
	})

})

app.get('/line-by-line', function(req, res) {

    var lr = new LineByLineReader('DOCS_CMR3-#259623-v12-POCKET_NORTH_2014.XLS.txt')

	lr.on('error', function (err) {
	// 'err' contains error object
		console.log(err)
	})

	lr.on('line', function (line) {
		console.log(line)
	// pause emitting of lines...
		lr.pause()
		// ...do your asynchronous line processing..
		setTimeout(function () {
			// ...and continue emitting lines.
			lr.resume()
		}, 100)
	})

	lr.on('end', function () {
	// All lines are read, file is closed now.
	})

	res.send('wise man once said')
})

app.listen('8081')

console.log('Magic happens on port 8081')
exports = module.exports = app
