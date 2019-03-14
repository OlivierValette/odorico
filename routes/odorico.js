const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const app = express();

// database connection
const url = 'mongodb://localhost:27017';
const dbName = 'odorico';
const client = new MongoClient(url, { useNewUrlParser: true });
client.connect(err => {
    if (err) console.log(err);
    // use odorico collection and store it in local variable
    const db = client.db(dbName);
    app.locals.db = db;
    // start server once connected with database
    app.listen(8000);
});

// database initialization
function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}
async function initDatabase(){
    await sleep(3000);
    app.locals.db.collection('spot').drop();
    await sleep(1000);
    app.locals.db.collection('spot').insertMany( [
        {
            title: "Immeuble Poirier",
            address: "7 avenue Janvier",
            description: "Façade d'immeuble"
        },
        {
            title: "Immeuble du magasin Valton",
            address: "9 rue d'Antrain",
            description: "Façade d'immeuble"
        },
        {
            title: "Cité Universitaire, Maison des étudiantes",
            address: "28 Avenue Doyen Roger Houin",
            description: "Hall"
        },
        {
            title: "Cité Universitaire, Maison des étudiants",
            address: "94 boulevard de Sévigné",
            description: "Couloirs, cages d'escalier et salles de bain"
        },
        {
            title: "Palais du Commerce",
            address: "Place de la République",
            description: "Intérieur du bureau de poste"
        },
        {
            title: "Piscine Saint-Georges",
            address: "2 Rue Gambetta",
            description: "Hall de l'ancienne cité des étudiantes"
        },
        {
            title: "Crèche Papu",
            address: "4 r Jean Turmeau",
            description: "Lambris et frises"
        },
        {
            title: "Bains Saint-Georges",
            address: "1 Rue Gambetta",
            description: ""
        },
        {
            title: "Hôtel de Courcy",
            address: "9 Rue Martenot",
            description: "Mosaïques de l’escalier"
        },
        {
            title: "Maison du Docteur Joly",
            address: "",
            description: ""
        },
        {
            title: "Ecole élémentaire Carle Bahon",
            address: "3 rue Francisco Ferrer ",
            description: ""
        },
        {
            title: "Église Sainte-Thérèse",
            address: "18 Rue Sully Prudhomme",
            description: "Mosaïques de l'église"
        },
        {
            title: "Maison d'artisan, dite maison Odorico",
            address: "7 rue Joseph-Sauveur",
            description: "Mosaïques de la salle de bain"
        },
        {
            title: "Ancien hôtel Alexandre",
            address: "1 boulevard du Colombier",
            description: "Fronton de la fenêtre centrale du 2ème étage"
        },
    ]);
}
initDatabase();

/* GET spots API */
router.get('/', function (req, res, next) {
    // get document in odorico
    app.locals.db.collection('odorico').findAll( (err, spot) => {
        if (err) console.log(err);
        if (!spot) next();
        res.json(spot);
    });
});

// Get multer and define uploads directory
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

/* POST Odorico API */
router.post('/', upload.single('picture'), function(req, res, next) {
    console.log(req.file);
    res.sendStatus(200);
});

module.exports = router;
