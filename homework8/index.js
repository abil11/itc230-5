'use strict';
var music = require('./models/musics.js');
let bodyParser = require("body-parser");
var express = require("express");
var app = express();



// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/../public'));
app.use('/api', require("cors")());
app.use(require("body-parser").urlencoded({extended: true}));
app.use((err, req, res, next) => {
  console.log(err);
});

// set views
let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: 'main' }));
app.set("view engine", ".html");

app.get('/', (req,res) => {
    music.find((err,results) => {
        if (err) return (err);
        res.render('home', {music: JSON.stringify(results) });
    });
});


app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});

app.get('/api/music/:type', (req, res) => {
    let type = req.params.type;
    console.log(type);
    music.findOne({type: type}, (err, result) => {
        if (err) return (err);
        res.json( result );
    });
});


app.get('/api/musics', (req,res, next) => {
    music.find((err,results) => {
        if (err || !results) return (err);
        res.json(results);
    });
});


//delete
app.get('/api/music/delete/:id', (req,res) => {
    music.remove({"_id":req.params.id }, (err, result) => {
        if (err) return (err);
        // return
        res.json({"deleted": result.result.n});
    });
});

app.post('/api/add/', (req,res, next) => {
    // find & update existing item, or add new
    if (!req.body._id) { // insert new document
        let music = new music({type:req.body.type, band:req.body.band,singer:req.body.singer,label:req.body.label,bandmembers:req.body.bandmembers});
        music.save((err,newMusic) => {
            if (err) return next(err);
            console.log(newMusic);
            res.json({updated: 0, _id: newMusic._id});
        });
    } else { // update existing document
        music.updateOne({ _id: req.body._id}, {type:req.body.type, band:req.body.band,singer:req.body.singer,label:req.body.label,bandmembers:req.body.bandmembers }, {upsert: true }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});


//f
app.get('/api/music/add/:type/:band/:use', (req,res, next) => {
    //find & update
    let type = req.params.type;
    music.update({ type: type}, {type:type, band:req.params.band, singer: req.params.singer}, {upsert: true }, (err, result) => {
        if (err) return next(err);

        res.json({updated: result.nModified});
    });
});

// 404
app.use((req,res) => {
    res.type('text/html');
    res.status(404) ;
    res.sendFile(__dirname + '/public/404.html');
});

app.listen(app.get('port'), function() {
    console.log('Express started');
});
