const fs = require('fs')
const path = require('path')
const mockBaseURL = 'https://note-server.hunger-valley.com'  //后端已有接口，暂时先改成这样
const realBaseURL = 'https://note-server.hunger-valley.com'

exports.config = function ({isDev = true} = {isDev: true}) {
  let fileText = `
     module.exports={
        baseURL:'${isDev ? mockBaseURL : realBaseURL}'
     }
  `
  fs.writeFileSync(path.join(__dirname, '../src/helpers/config-baseURL.js'), fileText)
}
