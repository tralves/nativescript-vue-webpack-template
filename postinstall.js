const fs = require('fs');
const path = require('path');
const srcPath = path.join(__dirname, 'webpack.config.js');
const destPath = path.join(__dirname, '..', '..', 'webpack.config.js');

console.log("MOOOOOOOOOOVING", srcPath, destPath);

move(srcPath,destPath, err => {
  if (err) {
    console.log(err);
  }
});

// move function copied from: https://stackoverflow.com/questions/8579055/how-i-move-files-on-node-js
function move(oldPath, newPath, callback) {
  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      if (err.code === 'EXDEV') {
        copy();
      } else {
        callback(err);
      }
      return;
    }
    callback();
  });

  function copy() {
    var readStream = fs.createReadStream(oldPath);
    var writeStream = fs.createWriteStream(newPath);

    readStream.on('error', callback);
    writeStream.on('error', callback);

    readStream.on('close', function () {
      fs.unlink(oldPath, callback);
    });

    readStream.pipe(writeStream);
  }
}