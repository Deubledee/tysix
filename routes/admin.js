const express = require('express');
var admin = require('firebase-admin');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // List batch of users, 1000 at a time.
  console.log("user fgh");
  admin.auth().listUsers(10, nextPageToken)
    .then(function (listUsersResult) {
      listUsersResult.users.forEach(function (userRecord) {
        console.log("user", userRecord.toJSON());
        //res.type("text/x-json");            
      });
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(listUsersResult.users)
      if (listUsersResult.pageToken) {
        // List next batch of users.
      //  listAllUsers(listUsersResult.pageToken)
      console.log(listUsersResult)
      }
    })
    .catch(function (error) {
      console.log("Error listing users:", error);
    });

});

module.exports = router;

    /*admin.auth().importUsers([{
        uid: 'some-uid',
        displayName: 'Diogo Dias',
        email: 'dvsdias01@gmail.com',
        emailVerified: true,
        phoneNumber: '966643301',
        // Set this user as admin.
        customClaims: {admin: true},
        // User with Google provider.
        providerData: [{
          uid: '954772075724-38u2mf5kokgm2gt4tkpno2hj60tug4o4.apps.googleusercontent.com',
          email: 'dvsdias01@gmail.com',
          displayName: 'John Doe',
          providerId: 'google.com'
        }]
      }]).then(function(results) {
        results.errors.forEach(function(indexedError) {
          console.log('Error importing user ', indexedError);
        });
      }).catch(function(error) {
        console.log('Error importing users:', error);
      });*/