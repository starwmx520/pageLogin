var fs=require('fs')
var AipOcrClient = require('aip-node-sdk-1.4.1').ocr
var APP_ID = '23556528'
var API_KEY = 'HCKyTY6QHM74rFQVvjI8Sd29'
var SECRET_KEY = 'jKUGyt4RpwGt4f7ukAAfow0eq6nOGhue'

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY)
var image = fs.readFileSync('./public/a.jpg')
console.log(image)
var base64Img = new Buffer(image).toString('base64')
client.generalBasic(base64Img).then(function(result) {
  //res.end(JSON.stringify(result));
  console.log(result)
})
