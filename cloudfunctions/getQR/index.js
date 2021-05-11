// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var scene, page
  switch (event.flag) {
    case 0:
      // page = 'pages/chair/chair'
      page = 'pages/index/index'
      scene = `chairIndex=${event.chairIndex}`
      break;
    case 1:
      page = 'pages/room/room'
      scene = `roomId=${event.roomId}`
      break;
    case 2:
      page = event.page
      scene = event.scene
      break;
    default:
      break;
  }
  const result = await cloud.openapi.wxacode.getUnlimited({
    scene,
    page
  })
  return result
}