## creating scrapper using mean stack using basic setup provided by scotch.io
## found here https://scotch.io/tutorials/scraping-the-web-with-node-js
why not use what is already out there, will need to build a controller at some point to save this data in cacheing database
other than that should be pretty straight forward

MEAN
NPM
UBUNTU 16.04LTS 
SCOTCH.IO

#1 need to figurew out download, it works, but its rather funky
#2 then need to parse to json
#3 add controller to push data to API
#4 then build a CRON to do this once a week???

looking into another PDF parser, pdftojson is not working well, almost sure its because of the shitty way these PDFs are formatted

#https://www.npmjs.com/package/pdf-to-text
PDF to text works, follow install instructions 
can build json with this, currently just a string