var express = require('express');
var router = express.Router();
var path = require('path');
var mainController = require(path.join(__dirname,'..','controllers','mainController'));

/* GET home page. */
router.get('/', mainController.index);
router.get('/test', mainController.test);
router.get('/contacto', mainController.contacto);

module.exports = router;
