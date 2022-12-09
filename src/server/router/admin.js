const bcrypt = require('bcryptjs')
// markdwon translate
var marked = require('marked')
const verifyParams =  require('../utils/verify')
const { jwtSign , SECRET , verifyToken } = require('../utils/jwtSign.js') 

//Initialization
async function init(body) {
  const { Admin } = global.MumblerDB
  global.Mconfig = (await Admin.select({}))[0]
  if (global.Mconfig) return
  const { username, password, mail } = body
  const options = {
    username,
    domain,
    password: bcrypt.hashSync(password, 10),
    mail,
    commentCount:5,
    avatarCdn: 'https://cravatar.cn/avatar/'
  }
  global.Mconfig = await Admin.add(options)
  console.log(global.Mconfig);
  console.log(' 🚀 Initialization succeeded . ');
}

// Login verify.
async function Login(params) {
  const config = global.Mconfig
  const { username, password, token } = params
  const result={}
    // Verify token is sure ?
    if (token) {
      const isToken = await verifyToken(token)
      console.log("use token login.");
      if (!isToken) throw new Error('Token expired')
      result.token = token
      return result
    }
    // Verify username and password isn't ampty . 
  verifyParams(params,['username','password'])
  const isUsername = username === config.username
  const isPassword = bcrypt.compareSync(password, config.password)
  if (!isUsername || !isPassword){
    throw new Error('User name or password error')
  }else{
    console.log(username+" is login.");
  }
  result.token = await jwtSign({ id: config.id }, SECRET, { expiresIn: '7d' })
  return result
}

async function postMumbler(params){
  const { Mumbler } = global.MumblerDB
  console.log(params);
  const options={
    md:params.content,
    html : await marked.parse(params.content),
    pid: '',
    rid: '',
    ip: '::ffff:127.0.0.1',
    status: 'accept',
    path: '/',
    created: Date.now(),
    updated: Date.now()
  }
  console.log(options);
  const result = await Mumbler.add(options)
  return result
}
async function getMumbler(params){
  const { Mumbler } = global.MumblerDB
  console.log(params.page);
  let options = {
    pid: '',
  }
  const mumbler = await Mumbler.select(options,{
    offset:(params.page-1)*3,
    limit:3,
    desc: 'created'
  })
  // console.log(mumbler);
  return mumbler
}


module.exports = {
  init,
  Login,
  postMumbler,
  getMumbler
}