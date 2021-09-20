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
  var yesterday = []
  for (let i = 0; i < 24; i++) {
    newC[i] = true
  }
  const a = await db.collection('check').where({
    "daysum": _.neq(0)
  }).orderBy('daysum', 'desc').get()
  for (let i = 0; i < a.data.length; i++) {
    yesterday.push({ name: a.data[i].name, daysum: a.data[i].daysum })
  }
  await db.collection('chairs').where({ _id: "yesterday" }).update({
    data: {
      yesterday: yesterday
    }
  })
  await db.collection('chairs').where({ _id: "chairs" }).update({
    data: {
      chairs: newC
    }
  })
  await db.collection('check').where({})
    .update({
      data: {
        finalCheck: true,
        daysum: 0
      }
    })
  await db.collection('chairs').doc("openDoor").update({
    data: {
      isOpen: false,
      whoClose: '11:30 自动关闭',
    }
  })

  return "666"
}