var fs = require('fs');
fs.createReadStream('./webpack.config.js').pipe(
    fs.createWriteStream(__dirname + '\\..\\..\\' + 'webpack.config.js')
);