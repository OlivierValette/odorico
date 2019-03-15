const express = require('express');
const router = express.Router();
const Spot = require('../model/OdoricoSpot');

/* GET spots API */
router.get('/', function (req, res, next) {
    // get spots in odorico
    Spot.find( (err, spots) => {
        if (err) console.log(err);
        res.json(spots);
    }).sort( { title: 1 } );
});

// Get multer and define uploads directory
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

/* POST Odorico API */
router.post('/', upload.single('image'), function(req, res, next) {
    console.log(req.file);
    const spot = new Spot({
        title: req.body.title,
        address: req.body.address,
        description: req.body.description,
        image: req.file.filename,
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
