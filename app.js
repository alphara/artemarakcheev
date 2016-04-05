const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');

// --- Express --- //

var app = express();
var env = process.env;

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(bodyParser.json());         // to support JSON-encoded bodies

app.use(express.static(__dirname + '/public'));

// --- Routes --- //

// IMPORTANT: Your application HAS to respond to GET /health with status 200
//            for OpenShift health monitoring
app.get('/health', (req, res) => {
  res.writeHead(200);
  res.end();
});

app.get('*', function(req, res) {
  fs.readFile(__dirname + '/index.html', 'utf8', function(err, text) {
    res.send(text);
  });
});

// --- Web server --- //

app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started...`);
});

