// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var newC = []
  for (let i = 0; i < 20; i++) {
    newC[i] = true
  }
  await db.collection('chairs').where({ _id: "chairs" }).update({
    data: {
      chairs: newC
    }
  })
  await db.collection('check').update({
    data: {
      "finalCheck": true,
      "daysum": 0

    }
  })
  return
}