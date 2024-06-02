require('dotenv').config();

const config = require('./config')

const app = require('express')()
const multipart = require('connect-multiparty')

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
}
app.use(allowCrossDomain)
app.use(multipart())

const route = require('./route')
route(app)

const port = config.server.port || 3000
app.listen(port, () => {
  console.log(`stella server 已启动于: http://localhost:${port}`)
})

