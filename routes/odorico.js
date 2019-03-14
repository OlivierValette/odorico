var express = require('express');
var router = express.Router();

// Get multer and define uploads directory
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

/* POST Odorico API */
router.post('/', upload.single('picture'), function(req, res, next) {
    console.log(req.file);
    res.sendStatus(200);
});

/* GET spots API */
router.get('/', function (req, res) {
    const data = [
        {title: '35 av. Janvier', description: 'près de la gare'},
        {title: 'rue de Fougère', description: 'au dessus du porche'},
    ];
    res.json(data);
});

module.exports = router;