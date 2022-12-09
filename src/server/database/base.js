const { LC_ID, LC_KEY, LC_MKEY , LC_SERVER } = process.env
const opt = {
  appId: LC_ID,
  appKey: LC_KEY,
  masterKey: LC_MKEY,
  serverURL: LC_SERVER
}

const connect = (options) => {
  const Model = require('dittorm')('leancloud')
  const Admin = new Model('M_admin', options)
  const Mumbler = new Model('M_mumbler', options)
  const Comment = new Model('M_comment', options)
  const Counter = new Model('M_counter', options)
  return { Admin, Mumbler, Comment, Counter }
}
module.exports = () =>{
  try {
    return connect(opt)
  } catch (error) {
    console.log(error);
  }
}