// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数

exports.main = async (event, context) => {

  const res1 = await db.collection('chairs').where({ _id: "openid" }).get()
  console.log(res1);
  await db.collection('check').where({
    "_openid": res1.data[0].openid[event.num - 1]
  }).update({
    data: {
      finalCheck: true,
    }
  })


  await db.collection('chairs').where({ _id: "chairs" }).update({
    data: {
      [`chairs.${event.num - 1}`]: true
    }
  })
  return 666
}