const { isFileExist, resolveFileSafe, __ROOT } = require("./helper");
const path = require('path');
const config = require('./config');


function route(app) {
  app.all('*', function (req, res, next) {
    if (req.method == 'GET') req.body = req.query // get强制转post参数
    renderPage(req, res);
  })
}

async function renderFile(file, res) {
  if (file.startsWith('/')) {
    // 渲染静态文件
    // console.log(file)
    return res.sendFile(path.join(config.server.path.static, file), { root: __ROOT }, err => {
      // console.error(err)
      if (err) {
        return renderError(res, 404);
      }
    })
  } else {
    // 非法文件路径
    // FIXME: 访问当前css或者js文件呢？例如通过 ./app.css 访问当前目录下的app.css文件
    return renderError(res, 404);
  }
}

async function renderPage(req, res) {
  let reqPath = req.path;
  if (reqPath === '/') {
    reqPath = '/index';
  }
  if (reqPath.indexOf('.') !== -1) {
    // 访问静态文件
    return renderFile(reqPath, res);
  }

  const dir = path.join(config.server.path.page, reqPath);
  const controllerPath = path.join(dir, 'controller.js').toLowerCase();
  const viewPath = path.join(dir, 'view.html').toLowerCase();

  const hasController = isFileExist(controllerPath);
  const hasView = isFileExist(viewPath);
  // console.log(controllerPath, hasController)
  // console.log(viewPath, hasView)
  if (!hasController || !hasView) {
    return renderError(res, 404);
  }

  const Controller = resolveFileSafe(controllerPath);
  const viewTemplate = resolveFileSafe(viewPath);

  const Mustache = require('mustache')
  let data = {};
  try {
    const controller = new Controller();
    data = await controller.main(req, res);
  } catch (error) {
    console.error(error);
    return renderError(res, 500);
  }
  const html = Mustache.render(viewTemplate, data);
  res.end(html);
}

function renderError(res, code) {
  let msg = '';
  switch (code) {
    case 404:
      msg = '404 Not Found'
      break
    case 500:
      msg = '500 Internal Server Error'
      break
    default:
      msg = 'Server Error'
  }
  res.end('<h1>' + msg + '</h1>')
}

module.exports = route