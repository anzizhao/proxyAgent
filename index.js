var url = require('url');
var http = require('http');
var https = require('https');
var HttpProxyAgent = require('http-proxy-agent');
var HttpsProxyAgent = require('https-proxy-agent');
var fs = require('fs')

var caPath = '/home/zja/sofeware/XX-Net/data/gae_proxy/CA.crt'
var mediumCAPath = '/home/zja/sofeware/XX-Net/data/gae_proxy/certs/medium.com.crt'
// This will add the well-known CAs 
// // to `https.globalAgent.options.ca` 
//require('ssl-root-cas/latest').inject()
require('ssl-root-cas').inject()
    //.addFile( caPath )
    //.addFile( mediumCAPath )
    //.addFile(__dirname + '/ssl/01-cheap-ssl-intermediary-a.pem')
    //.addFile(__dirname + '/ssl/02-cheap-ssl-intermediary-b.pem')
    //.addFile(__dirname + '/ssl/03-cheap-ssl-site.pem');

    //;

    //var endpoint = process.argv[2] || 'https://medium.com/_/api/tags/javascript/stream';
//var endpoint = 'https://medium.com/_/api/tags/javascript/stream';
//console.log('endpoint: ', endpoint);

//https.get(endpoint, (res) => {
    //console.log('statusCode:', res.statusCode);
    //console.log('headers:', res.headers);
    //res.pipe(process.stdout);
//}).on('error', (e) => {
    //console.error(e);
//});

//var options = {
  //hostname: 'medium.com',
  //port: 443,
  //path: '/_/api/tags/javascript/stream',
  //method: 'GET',
  //ca: fs.readFileSync('client2-key.pem'),
  //headers: {
      //'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
      //'accept': 'text/html,application/xhtml+xml',
  //}
//};
    //
//var options = {
  //hostname: 'www.baidu.com',
  //port: 443,
  //path: '/',
  //ca: fs.readFileSync('./client2-key.pem'),
  //method: 'GET'
//};

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//var req = https.request(options, (res) => {
    //console.log('statusCode:', res.statusCode);
    //console.log('headers:', res.headers);
    //res.on('data', function(data) { 
        //process.stdout.write(data); 
    //}); 
//});

//req.end();

//req.on('error', (e) => {
    //console.error(e);
//});

// HTTP/HTTPS proxy to connect to 
var proxy = process.env.http_proxy || 'https://127.0.0.1:8087';
 console.log('using proxy server %j', proxy);
  
 // HTTP endpoint for the proxy to connect to 
 //var endpoint = process.argv[2] || 'https://medium.com/_/api/tags/javascript/stream';
 //console.log('attempting to GET %j', endpoint);
 //var opts = url.parse(endpoint);

var opts = {
  hostname: 'medium.com',
  port: 443,
  path: '/_/api/tags/javascript/stream',
  method: 'GET',
  ca: fs.readFileSync('client2-key.pem'),
  headers: {
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
      'accept': 'text/html,application/xhtml+xml',
  }
};

//opts.headers = {
    //'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
    //'accept': 'text/html,application/xhtml+xml',
//}
 // create an instance of the `HttpProxyAgent` class with the proxy server information 
 var agent = new HttpsProxyAgent(proxy);
 opts.agent = agent;
debugger;
 //https.get(opts, function (res) {
     //console.log('"response" event!', res.headers);
 //});

var req = https.request(opts, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
    res.on('data', function(data) { 
        process.stdout.write(data); 
    }); 
});

req.end();
