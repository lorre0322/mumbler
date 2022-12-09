const Router = require('./router/router')
const { SetFavicon, Discussjs } = require('./utils')

/* eslint-disable */
module.exports = async (req, res) => {

  if (!global.MumblerDB) {
    const result = require('./database/base')()
    // 如果未返回信息，则表示连接错误，直接结束请求
    if (!result) return
  console.log(result);
  global.MumblerDB = result
  }
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  // 设置favicon
  if (req.url === './favicon.ico') {
    const favicon = SetFavicon(res)
    return res.end(favicon)
  }
  // 处理业务请求
  await Router(req, res)
}
