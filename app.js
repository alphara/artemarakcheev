const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const morgan = require('morgan');

// --- Express --- //

var app = express();
var env = process.env;

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(bodyParser.json());         // to support JSON-encoded bodies

// app.use(express.static('public'));
app.use('/public', express.static(__dirname + '/public'));

// --- Routes --- //

// IMPORTANT: Your application HAS to respond to GET /health with status 200
//            for OpenShift health monitoring
app.get('/health', (req, res) => {
  res.writeHead(200);
  res.end();
});

app.get('/hyposis', function(req, res) {
  fs.readFile(__dirname + '/hypnosis.html', 'utf8', function(err, text) {
    res.send(text);
  });
});

app.get('/unicorn', function(req, res) {
  fs.readFile(__dirname + '/unicorn.html', 'utf8', function(err, text) {
    res.send(text);
  });
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

