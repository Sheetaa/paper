var spdy = require('../../dep/spdy');
var http = require('http');

// 初始化一个Agent实例
var agent = spdy.createAgent({
  host: 'www.google.com',
  port: 443,

  // Optional SPDY options
  spdy: {
    plain: false,
    ssl: false,
    version: 3, // Force SPDY version
    headerCompression: true
  }
});

http.get({
  host: 'www.google.com',
  agent: agent
}, function(response) {
  console.log('yikes');
  console.log(agent);
  // Here it goes like with any other node.js HTTP request
  // ...
  // And once we're done - we may close TCP connection to server
  // NOTE: All non-closed requests will die!
  agent.close();
}).end();
