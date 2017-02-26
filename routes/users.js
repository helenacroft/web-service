var express = require('express');
var router = express.Router();

var User = require('../libs/user');
var mongoose = require('../libs/mongoose');
var gridStore = require("mongoose-gridstore");

var PDFDocument = require('pdfkit');
var fs = require('fs');


router.get('/', function(req, res, next) {
	
	console.log(mongoose.version);
	
	User.find({}, function(err, documents) {
		if(err) return console.log(err); 
		var users = {};
    	documents.forEach(function(document) {
     	 	users[document._id] = document;
    	});

   		res.send(users);  		
	});	
});
router.get('/:firstName', function(req, res, next) {
	var firstName = req.params.firstName;
	User.findOne({firstName: firstName }, function(err, document) {
		if(err) return console.log(err);

		if(document == null) return res.json({result: false});

   		var pdf = new PDFDocument();
		pdf.pipe(fs.createWriteStream('output.pdf'));
   		pdf.fontSize(14);
		pdf.text('firstName: ' + document.firstName + '\n' 
			   + 'lastName: ' + document.lastName + '\n')
			.image(document.img.data, 50, 120);   		
		pdf.end();
				
		document.addAttachment('output.pdf', fs.readFileSync('output.pdf'))
        		.catch( function(err) { 
        			handleError(res, err);
        		 });
    	document.save();
		res.json({"result":true});
	});
	
});

module.exports = router;
