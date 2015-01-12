var spdy = require('spdy'),
    fs = require('fs');

var options = {
  key: fs.readFileSync(__dirname + '/keys/spdy-key.pem'),
  cert: fs.readFileSync(__dirname + '/keys/spdy-cert.pem'),
  ca: fs.readFileSync(__dirname + '/keys/spdy-ca.pem'),

  // **optional** SPDY-specific options
  windowSize: 1024 * 1024, // Server's window size

  // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
  autoSpdy31: false
};

var server = spdy.createServer(options, function(req, res) {
  res.writeHead(200);
  res.end('hello world!');
});

server.listen(443);
