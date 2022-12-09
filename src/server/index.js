const http = require('http')
const main = require('./main')
// const main = require('./main')

const PORT = process.env.MUMBLER_PORT || process.env.PORT || 4001

function init() {
  const server = http.createServer(main)
  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(' 🚀 Service is up and running port: ' + PORT)
  })
}

module.exports = init