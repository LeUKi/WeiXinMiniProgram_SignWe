// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const op = ["o8Mur5QAncbRzYbDj05yRhD_VRo4",
  ]
  return op.includes(wxContext.OPENID)
}