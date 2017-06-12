var express = require('express');
var app = express();

// set up handlebars view engine
var handlebars = require('express3-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);






app.get('/', function(req, res) {
res.render('home');
});

var music = require('./lib/music.js');



app.get('/about', function(req, res) {
  res.render('about', {
      course: music.course,
      teacher: music.teacher,
      code: music.code});
});

//get object
app.get('/get', function(req, res) {
    var item = music.get(req.query.course)
        if (item) {
        res.send("Searched for " + req.query.course + "\n" + JSON.stringify(item));
    } else {
        res.send ("item not found");
    }

});

//delete object
app.get('/delete', function(req, res) {
    var result = music.delete(req.query.course)
    res.send("Deleted course " + req.query.course + "\n" + JSON.stringify(result));
});



// 404
app.use(function(req, res, next){
res.status(404);
res.render('404');
});
// 500
app.use(function(err, req, res, next){
console.error(err.stack);
res.status(500);
res.render('500');
});




app.listen(app.get('port'), function(){
 console.log( 'server is working' );
});
