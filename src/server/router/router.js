const { GetUserIP,SetFavicon,GetFavicon } = require('../utils')
const bodyData = require('body-data')
const { init, Login , postMumbler,getMumbler } = require('./admin')
const CORS = require('../utils/CORS')
async function Router(req, res) {
  let body = {}
  let result = { msg: 'success' }

  if (!global.Mconfig) {
    const { Admin } = global.MumblerDB
    global.Mconfig = (await Admin.select({}))[0]
  }
  // 跨域
  const isCors = await CORS(req)
  console.log(isCors);
  if (isCors) {
    res.statusCode = 403
    result.msg = 'Request rejected'
    res.end(JSON.stringify(result))
    return 
  }  
  try {
    body = await bodyData(req)
    switch (body.type) {
      case 'INIT':
        result.data = await init(body)
        break
      case 'LOGIN':
        result.data = await Login(body)
        break
      case 'POST_M':
        result.data = await postMumbler(body)
        break
      case 'GET_M':
        result.data = await getMumbler(body)
        break
        // case '':
      //   result.data = await (body)
      //   break
      default:
        result = "NotFound"
    }
  } catch (error) {
    result.msg = error === null || error === void 0 ? void 0 : error.toString()
    console.error('😈️ERROR:', error)
  }
  res.end(JSON.stringify(result))
}

module.exports = Router