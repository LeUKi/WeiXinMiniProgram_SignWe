// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV

})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  var newC = []
  for (let i = 0; i < 20; i++) {
    newC[i] = true
  }
  const a = await db.collection('check').where({
    "daysum": _.neq(0)
  }).get()
  const b = await db.collection('chairs').where({ _id: "chairs" }).update({
    data: {
      chairs: newC
    }
  })
  const c = await db.collection('check').where({})
    .update({
      data: {
        finalCheck: true,
        daysum: 0
      }
    })
  // )
  return a
}