const fs = require('fs');
const path = require('path');

move(getMovePaths('webpack.config.js'), log);
move(getMovePaths('.babelrc'), log);
move(getMovePaths('tns'), log);

symlinkFromTns('package.json', 'file');
symlinkFromTns('package-lock.json', 'file');
symlinkFromTns('node-modules', 'dir');
symlinkFromTns('app/App_Resources', 'dir');
symlinkFromTns('app/images', 'dir');

fs.unlinkSync('postinstall.js');

function getMovePaths(movingFile) {
  return {
    oldPath: path.join(__dirname, movingFile),
    newPath: path.join(__dirname, '..', '..', movingFile)
  }
}

function log(err) {
  if (err) {
    console.log(err);
  }
}

function symlinkFromTns(file, type) {
  fs.unlinkSync(path.join(__dirname, '..', '..', 'tns', file));
  fs.symlinkSync(
    path.join(__dirname, '..', '..', file),
    path.join(__dirname, '..', '..', 'tns', file),
    type);
}

// move function copied from: https://stackoverflow.com/questions/8579055/how-i-move-files-on-node-js
function move({ oldPath, newPath }, callback) {
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