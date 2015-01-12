var http = require('http');
var url = require('url');

var config = {
    'port': process.env.PORT || 1212
};
var options = {};

var httpServer = http.createServer(function (req, res) {

    console.log('serve: ' + req.url);

    var requrl = url.parse(req.url);
    options = {
        host: requrl.host,
        port: requrl.port,
        method: req.method,
        path: requrl.path,
        headers: req.headers
    };

    var proxy = http.request(options, function (response) {
        response.pipe(res, {
            end: true
        }).on('error', function (e) {
            res.end(e);
        });
    });

    req.pipe(proxy, {
        end: true
    });

    // req.setEncoding('utf8');
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.end('Local Proxy is Working!');
});
httpServer.listen(config.port, function () {
    console.log('Local Proxy is listening on port ' + config.port);
});
