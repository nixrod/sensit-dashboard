var sigfox_service = require('./app/sigfox_service');
var config = require('./app/config');

var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/data', function (req, res) {
  var auth = req.get("authorization");

  // On the first request, the "Authorization" header won't exist, so we'll set a Response
  // header that prompts the browser to ask for a username and password.
  if (!auth) {
    res.set("WWW-Authenticate", "Basic realm=\"Authorization Required\"");
    return res.status(401).send("Authorization Required");
  } else {
    // If the user enters a username and password, the browser re-requests the route
    // and includes a Base64 string of those credentials.
    var credentials = new Buffer(auth.split(" ").pop(), "base64").toString("ascii").split(":");
    if (credentials[0] === config.webapp_user && credentials[1] === config.webapp_password) {
      sigfox_service.getMessages().then(response => {
        res.json(response);
      });
    } else {
      // The user typed in the username or password wrong.
      return res.status(403).send("Access Denied (incorrect credentials)");
    }
  }


});

app.listen(80, function () {
  console.log('App listening on port 80!');
});
