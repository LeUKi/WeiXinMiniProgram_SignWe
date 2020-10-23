// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  return (
    await db.collection('chairs').where({ _id: "chairs" }).update({
      data: {
        chairs: event.c
      }
    }),
    event.i != null ?
      await db.collection('chairs').where({ _id: "openid" }).update({
        data: {
          openid: event.i
        }
      }) : false


  )

}