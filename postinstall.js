const fs = require('fs');
const path = require('path');
const spawnSync = require('child_process').spawnSync;
const symlinkOrCopySync = symlinkOrCopy().sync;

spawnSync('npm', ['install'], { cwd: path.join(__dirname, '..', '..') });

move(getMovePaths('webpack.config.js'), log);
move(getMovePaths('.babelrc'), log);
move(getMovePaths('tns'), log);

console.log('listing files');
fs.readdirSync(path.join(__dirname, '..', '..','tns')).forEach(file => {
  console.log(file);
})

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
  console.log('linking ', path.join(__dirname, '..', '..', file), path.join(__dirname, '..', '..', 'tns', file));

  if (fs.existsSync(path.join(__dirname, '..', '..', 'tns', file))) {
    fs.unlinkSync(path.join(__dirname, '..', '..', 'tns', file));
  }
  symlinkOrCopySync(
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


function symlinkOrCopy() {
  var fs = require('fs')
  var tmpdir = require('os').tmpdir();
  var path = require('path')

  var isWindows = process.platform === 'win32'
  // These can be overridden for testing
  var options = {
    isWindows: isWindows,
    canSymlink: testCanSymlink(),
    fs: fs
  }

  function testCanSymlink() {
    // We can't use options here because this function gets called before
    // its defined
    if (isWindows === false) { return true; }

    var canLinkSrc = path.join(tmpdir, "canLinkSrc.tmp")
    var canLinkDest = path.join(tmpdir, "canLinkDest.tmp")

    try {
      fs.writeFileSync(canLinkSrc, '');
    } catch (e) {
      return false
    }

    try {
      fs.symlinkSync(canLinkSrc, canLinkDest)
    } catch (e) {
      fs.unlinkSync(canLinkSrc)
      return false
    }

    fs.unlinkSync(canLinkSrc)
    fs.unlinkSync(canLinkDest)

    return true
  }

  function setOptions(newOptions) {
    options = newOptions
  }

  function cleanup(path) {
    if (typeof path !== 'string') { return }
    // WSL (Windows Subsystem Linux) has issues with:
    //  * https://github.com/ember-cli/ember-cli/issues/6338
    //  * trailing `/` on symlinked directories
    //  * extra/duplicate `/` mid-path
    //  issue: https://github.com/Microsoft/BashOnWindows/issues/1421
    return path.replace(/\/$/, '').replace(/\/\//g, '/');
  }

  function symlinkOrCopySync(srcPath, destPath) {
    if (options.isWindows) {
      symlinkWindows(srcPath, destPath)
    } else {
      symlink(srcPath, destPath)
    }
  }

  Object.defineProperty(module.exports, 'canSymlink', {
    get: function () {
      return !!options.canSymlink;
    }
  });

  function symlink(_srcPath, _destPath) {
    var srcPath = cleanup(_srcPath);
    var destPath = cleanup(_destPath);

    var lstat = options.fs.lstatSync(srcPath)
    if (lstat.isSymbolicLink()) {
      // When we encounter symlinks, follow them. This prevents indirection
      // from growing out of control.
      // Note: At the moment `realpathSync` on Node is 70x slower than native,
      // because it doesn't use the standard library's `realpath`:
      // https://github.com/joyent/node/issues/7902
      // Can someone please send a patch to Node? :)
      srcPath = options.fs.realpathSync(srcPath)
    } else if (srcPath[0] !== '/') {
      // Resolve relative paths.
      // Note: On Mac and Linux (unlike Windows), process.cwd() never contains
      // symlink components, due to the way getcwd is implemented. As a
      // result, it's correct to use naive string concatenation in this code
      // path instead of the slower path.resolve(). (It seems unnecessary in
      // principle that path.resolve() is slower. Does anybody want to send a
      // patch to Node?)
      srcPath = process.cwd() + '/' + srcPath
    }
    options.fs.symlinkSync(srcPath, destPath);
  }

  // Instruct Win32 to suspend path parsing by prefixing the path with a \\?\.
  // Fix for https://github.com/broccolijs/broccoli-merge-trees/issues/42
  var WINDOWS_PREFIX = "\\\\?\\";

  function symlinkWindows(srcPath, destPath) {
    var stat = options.fs.lstatSync(srcPath)
    var isDir = stat.isDirectory()
    var wasResolved = false;

    if (stat.isSymbolicLink()) {
      srcPath = options.fs.realpathSync(srcPath);
      isDir = options.fs.lstatSync(srcPath).isDirectory();
      wasResolved = true;
    }

    srcPath = WINDOWS_PREFIX + (wasResolved ? srcPath : path.resolve(srcPath));
    destPath = WINDOWS_PREFIX + path.resolve(path.normalize(destPath));

    if (options.canSymlink) {
      options.fs.symlinkSync(srcPath, destPath, isDir ? 'dir' : 'file');
    } else {
      if (isDir) {
        options.fs.symlinkSync(srcPath, destPath, 'junction');
      } else {
        options.fs.writeFileSync(destPath, options.fs.readFileSync(srcPath), { flag: 'wx', mode: stat.mode })
        options.fs.utimesSync(destPath, stat.atime, stat.mtime)
      }
    }
  }

  return {
    sync: symlinkOrCopySync,
    setOptions: setOptions
  }
}