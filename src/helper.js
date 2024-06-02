const fs = require('fs');
const path = require('path');


// const myRequire = module.createRequire(__filename);

const __ROOT = require('app-root-path').path;


function merge(...objects) {
  const result = {};
  for (const obj of objects) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          result[key] = merge(result[key] || {}, obj[key]);
        } else {
          result[key] = obj[key];
        }
      }
    }
  }
  return result;
}

function getRealPath(file) {
  return path.join(__ROOT, file);
}

function isFileExist(file) {
  file = path.join(__ROOT, file);
  return fs.existsSync(file);
}


function resolveFileSafe(file) {
  if (!isFileExist(file)) {
    return undefined;

  }
  file = path.join(__ROOT, file);
  const ext = path.extname(file);
  const canRequire = ['.js', '.json'];
  if (!canRequire.includes(ext)) {
    return fs.readFileSync(file, 'utf8');
  }
  return require(file);
}

module.exports = {
  merge,
  isFileExist,
  resolveFileSafe,
  getRealPath,
  __ROOT,
}