var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gridStore = require("mongoose-gridstore");

var User = new Schema({
	firstName: String,
	lastName: String ,
	img: {
		data: Buffer,
		contentType: String
	}
});

User.plugin(gridStore);

module.exports = mongoose.model('User', User);