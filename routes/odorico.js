const express = require('express');
const router = express.Router();
const Spot = require('../model/OdoricoSpot');

/* GET spots API */
router.get('/', function (req, res, next) {
    // get spots in odorico
    app.locals.db.collection('spot').find( (err, spots) => {
        if (err) console.log(err);
        res.json(spots);
    }).sort( { title: 1 } );
});

// Get multer and define uploads directory
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

/* POST Odorico API */
router.post('/', upload.single('image'), function(req, res, next) {
    console.log(req.file);
    const spot = new Spot({
        title: req.body.title,
        address: req.body.address,
        description: req.body.description,
        image: null,
        location: {
            type: 'Point',
            coordinates: [req.body.lat, req.body.lng],
        }
    });
    spot.save( (err, newspot) => {
        if (err) next(err);
        res.json(newspot)
    });
});

module.exports = router;
