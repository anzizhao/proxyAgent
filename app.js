var exec = require('exec');



exec('export https_proxy=https://127.0.0.1:8087 ; curl -k https://medium.com/_/api/tags/javascript/stream', function(err, out, code) {
    if (err instanceof Error) {
        process.stderr.write(err);
        throw err 
    }
    console.log('write out')
    process.stdout.write(out);
    console.log('write code')
    process.exit(code);
});
