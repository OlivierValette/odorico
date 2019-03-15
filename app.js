var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var odoricoRouter = require('./routes/odorico');

const mongoose = require('mongoose');
const Spot = require('./model/OdoricoSpot');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
require('./auth/auth');
app.use(passport.initialize());

// database connection with mongoose
const url = 'mongodb://localhost:27017/odorico';
mongoose.connect(url, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

/*
// database initialization
db.once('open', () => {
    // New spot in database
    const newspot = new Spot({
        title: "Immeuble Poirier",
        address: "7 avenue Janvier",
        description: "Façade d'immeuble",
        image: null,
        location: {type: 'Point', coordinates: [0.0, 0.0],}
    });
    spot.save( (err, newspot) => {
        if (err) console.log(err);
        else console.log(newspot.title + 'document created');
    });
    // New spot in database
    const newspot = new Spot({
        title: "Immeuble du magasin Valton",
        address: "9 rue d'Antrain",
        description: "Façade d'immeuble",
        image: null,
        location: {type: 'Point', coordinates: [0.0, 0.0],}
    });
    spot.save( (err, newspot) => {
        if (err) console.log(err);
        else console.log(newspot.title + 'document created');
    });
    // New spot in database
    const newspot = new Spot({
        title: "Cité Universitaire, Maison des étudiantes",
        address: "28 Avenue Doyen Roger Houin",
        description: "Hall",
        image: null,
        location: {type: 'Point', coordinates: [0.0, 0.0],}
    });
    spot.save( (err, newspot) => {
        if (err) console.log(err);
        else console.log(newspot.title + 'document created');
    });
    // New spot in database
    const newspot = new Spot({
        title: "Cité Universitaire, Maison des étudiants",
        address: "94 boulevard de Sévigné",
        description: "Couloirs, cages d'escalier et salles de bain",
        image: null,
        location: {type: 'Point', coordinates: [0.0, 0.0],}
    });
    spot.save( (err, newspot) => {
        if (err) console.log(err);
        else console.log(newspot.title + 'document created');
    });
    // New spot in database
    const newspot = new Spot({
        title: "Cité Universitaire, Maison des étudiants",
        address: "94 boulevard de Sévigné",
        description: "Couloirs, cages d'escalier et salles de bain",
        image: null,
        location: {type: 'Point', coordinates: [0.0, 0.0],}
    });
    spot.save( (err, newspot) => {
        if (err) console.log(err);
        else console.log(newspot.title + 'document created');
    });

title: "Palais du Commerce",
address: "Place de la République",
description: "Intérieur du bureau de poste",
image: null,
location: {type: 'Point', coordinates: [0.0, 0.0],}

title: "Piscine Saint-Georges",
address: "2 Rue Gambetta",
description: "Hall de l'ancienne cité des étudiantes",
image: null,
location: {type: 'Point', coordinates: [0.0, 0.0],}

title: "Crèche Papu",
address: "4 r Jean Turmeau",
description: "Lambris et frises",
image: null,
location: {type: 'Point', coordinates: [0.0, 0.0],}

title: "Bains Saint-Georges",
address: "1 Rue Gambetta",
description: "",
image: null,
location: {type: 'Point', coordinates: [0.0, 0.0],}

title: "Hôtel de Courcy",
address: "9 Rue Martenot",
description: "Mosaïques de l’escalier",
image: null,
location: {type: 'Point', coordinates: [0.0, 0.0],}

title: "Maison du Docteur Joly",
address: "",
description: "",
image: null,
location: {type: 'Point', coordinates: [0.0, 0.0],}

title: "Ecole élémentaire Carle Bahon",
address: "3 rue Francisco Ferrer ",
description: "",
image: null,
location: {type: 'Point', coordinates: [0.0, 0.0],}

title: "Église Sainte-Thérèse",
address: "18 Rue Sully Prudhomme",
description: "Mosaïques de l'église",
image: null,
location: {type: 'Point', coordinates: [0.0, 0.0],}

title: "Maison d'artisan, dite maison Odorico",
address: "7 rue Joseph-Sauveur",
description: "Mosaïques de la salle de bain",
image: null,
location: {type: 'Point', coordinates: [0.0, 0.0],}

title: "Ancien hôtel Alexandre",
address: "1 boulevard du Colombier",
description: "Fronton de la fenêtre centrale du 2ème étage",
image: null,
location: {type: 'Point', coordinates: [0.0, 0.0],}

*/

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/spots', odoricoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json(err.message);
});

module.exports = app;
