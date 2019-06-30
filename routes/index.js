const express = require('express');
const router = express.Router();
const prpl = require('prpl-server');
/* GET home page. */
router.get('/', prpl.makeHandler('.', {
  httpsRedirect: false,
  entrypoint: 'index.html',
  unregisterMissingServiceWorkers: false,
  builds: [
    { name: '/', browserCapabilities: ['es2015', 'push'] },
    { name: 'esm-bundled', browserCapabilities: ['modules', 'push'] },
    { name: 'es5-bundled' }
  ],
})
);

module.exports = router;
