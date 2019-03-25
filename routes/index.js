const express = require('express');
const router = express.Router();
const prpl = require('prpl-server');
/* GET home page. */
router.get('/', prpl.makeHandler('.', {
  httpsRedirect: false,
  entrypoint: 'index.html',
  unregisterMissingServiceWorkers: false,
  /* builds: [
     { name: 'build/es6-bundled/', browserCapabilities: ['es2015', 'push'] },
     { name: 'build/esm-bundled', browserCapabilities: ['modules', 'push'] },
     { name: 'build/es5-bundled' }
   ]*/
}));
/*
router.get('cms', prpl.makeHandler('.', {
  httpsRedirect: false,
  entrypoint: 'index2.html',
  unregisterMissingServiceWorkers: false,
  builds: [
      {name: '/', browserCapabilities: ['es2015', 'push']},
      {name: 'esm-bundled', browserCapabilities: ['modules', 'push']},
      {name: 'es5-bundled'}
  ],
}));*/

module.exports = router;