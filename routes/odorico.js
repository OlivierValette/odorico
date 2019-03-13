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

module.exports = router;