// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const op = [
    "o8Mur5QAncbRzYbDj05yRhD_VRo4",
    "o8Mur5WhSQe5igEYjO9Wi3pGLZNA"
  ]
  return op.includes(wxContext.OPENID)
}