const express = require('express');
const router = express.Router();
const prpl = require('prpl-server');
/* GET home page. */
  router.get('/', prpl.makeHandler('.', {
    httpsRedirect: false,
    entrypoint: 'views/index.html',
    unregisterMissingServiceWorkers: true,
   /* builds: [
      {name: 'build/modern', browserCapabilities: ['es2015', 'push']},
      {name: 'build/fallback'}
    ],*/
  })
);

module.exports = router;