// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { OPENID } = wxContext

  switch (event.f) {
    case 'clear': {
      return clear(event)
    }
    case 'clearHistory': {
      return clearHistory(event)
    }
    case 'forceSignOut': {
      return forceSignOut(event)
    }
    default: {
      return { msg: "no flag!" }
    }
  }
}

async function clear(event) {
  return await db.collection('check')
    .where({
      "allsum": _.neq(0)
    })
    .update({
      data: {
        allsum: 0
      }
    })
}

/**
 * 清除记录
 */
async function clearHistory(event) {
  return await db.collection('check')
    .where({})
    .update({
      data: {
        check: []
      }
    })
}

/**
 * 强制签退
 * @param {Number} event.num 强制签退的座位号 非index 1开始
 */
async function forceSignOut(event) {
  await db.collection('chairs').where({ _id: "chairs" }).update({
    data: {
      [`chairs.${event.num - 1}`]: false
    }
  })
  return
}
