const fs = require('fs');
const path = require('path');
const destPath = path.join(__dirname, '../..', 'webpack.config.js');
fs.createReadStream('./webpack.config.js').pipe(
    fs.createWriteStream(destPath)
);