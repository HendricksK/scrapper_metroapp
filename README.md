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


##https://stackoverflow.com/questions/31657501/reading-and-extracting-data-from-a-text-file-in-javascript
looking into file consumption here

##https://www.npmjs.com/package/line-by-line
working on pulling line by line from file,
will look into building a script instead of using express to trigger
the functions... 

also need to build a function on the API side to save data to the DB,
save entire 'nice' docs to API for cacheing and then, which will require building
nice json objects for couch DB

then let the API pull it all into MYSQL tables...

look into using GREP tools for pulling unnecessary lines from files
https://www.npmjs.com/browse/keyword/grep
