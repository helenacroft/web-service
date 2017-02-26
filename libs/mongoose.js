var mongoose = require('mongoose');
var fs = require('fs');
var User = require('./user');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', function(error){
	console.log('connection error ' +  error.message);
});

db.once('open', function() {	
	console.log('connected to db');	
	User.find(function(err, documents) {
		if(documents.length) return ; 		
  		new User({
			firstName: "John",
			lastName: "Doe",
			img: {
				data: fs.readFileSync('images/cat-1.jpg'),
				contentType: 'image/jpg'
			}
		}).save();	

		new User({
			firstName: "Jane",
			lastName: "Doe",
			img: {
				data: fs.readFileSync('images/cat-2.jpg'),
				contentType: 'image/jpg' 
			}
		}).save();

	});	
});

module.exports = mongoose;