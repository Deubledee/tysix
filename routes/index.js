const express = require('express');
const router = express.Router();
const prpl = require('prpl-server');
const INDEX = { app: 'index.html', cms: 'cms/index.html' }
/* GET home page. */
var active = 'app'
router.get((req, res, next) => {
  next()
});
router.get('/', prpl.makeHandler('.', {
  httpsRedirect: false,
  entrypoint: INDEX[active],
  unregisterMissingServiceWorkers: false,
}));

module.exports = router;
