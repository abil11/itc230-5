

//var credentials = require("../credentials");
var mongoose = require("mongoose");



  var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }  } };
//  mongoose.connect(credentials.mongo.development.connectionString, options);
  mongoose.connect("mongodb://zmon:12345tyu@ds127872.mlab.com:27872/abil", options);


var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

var musicSchema = mongoose.Schema({
  type: String,
  band: String,
  singer:String,
  label:String,
  bandmembers: Number,
});
module.exports = mongoose.model('Music', musicSchema);
