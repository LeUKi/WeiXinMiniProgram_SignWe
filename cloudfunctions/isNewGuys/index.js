// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const a = await db.collection('check').where({
    "_openid": wxContext.OPENID
  }).get()
  var isNewGuys = a.data[0] == undefined ? true : false
  return {
    openid: wxContext.OPENID,
    isNewGuys: isNewGuys
  }
}