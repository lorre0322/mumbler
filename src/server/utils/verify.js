//Check param it is filled in
function verifyParams(Param, requireds) {
  for (const required of requireds) {
    if (!Param[required]) {
      throw new Error(`- Parameter '${required}' not legal.`)
    }
  }
}

module.exports = verifyParams
  