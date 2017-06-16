'use strict';
var Music = require('./models/musics.js');
var express = require("express");
var app = express();

// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/../public'));
app.use(require("body-parser").urlencoded({extended: true}));
app.use((err, req, res, next) => {
  console.log(err);
});

// set template engine
let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: 'main' }));
app.set("view engine", ".html");

app.get('/', (req,res) => {
    Music.find((err,karot) => {
        if (err) return (err);
        res.render('home', {musics: karot });
    });
});


app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});

app.get('/get', (req,res,next) => {
    Music.findOne({ type:req.query.type }, (err, karot) => {
        if (err) return (err);
        res.type('text/html');
        res.render('details', {result: karot} );
    });
});

app.post('/get', (req,res, next) => {
    Music.findOne({ type:req.body.type }, (err, karot) => {
        if (err) return (err);
        res.type('text/html');
        res.render('details', {result: karot} );
    });
});

app.get('/delete', (req,res) => {
    Music.remove({ type:req.query.type }, (err, result) => {
        if (err) return (err);
        let deleted = result.result.n !== 0;
        Music.count((err, total) => {
            if (err) return (err);
            res.type('text/html');
            res.render('delete', {type: req.query.type, deleted: deleted , total: total } );
        });
    });
});


app.get('/api/music/:type', (req, res) => {
    let type = req.params.type;
    console.log(type);
    Music.findOne({type: type}, (err, result) => {
        if (err) return (err);
        if (!result) {
            res.json([]);
        }
        res.json( result );
    });
});


app.get('/api/music', (req,res, next) => {
    Music.find((err,results) => {
        if (err || !results) return (err);
        res.json(results);
    });
});

app.get('/api/delete/:type', (req,res) => {
    Music.remove({"type":req.params.type }, (err, result) => {
        if (err) return (err);
        //return
        res.json({"deleted": result.result.n});
    });
});

app.get('/api/add/:type/:band/:singer', (req,res, next) => {
//add
    let type = req.params.type;
    Music.update({ type: type}, {type:type, band: req.params.band, singer: req.params.singer }, {upsert: true }, (err, result) => {
        if (err) return next(err);

        res.json({updated: result.nModified});
    });
});

// 404
app.use((req,res) => {
    res.type('text/html');
    res.status(404) ;
    res.sendFile(__dirname + '/views/404.html');
});

app.listen(app.get('port'), function() {
    console.log('Express started');
});
