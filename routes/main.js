'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('root', {
    js: ['/assets/bundle.js', '/assets/main.js']
  });
});

module.exports = router;
