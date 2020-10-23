// pages/check/check.js
const { globalData } = getApp()
const db = wx.cloud.database()
Page({
  data: {
    chair: null,
    isFree: false,
    isMe: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "加载中"
    })

    //座位查询
    db.collection('chairs').where({ _id: "chairs" }).get({
      success: (res) => {
        db.collection('chairs').where({ _id: "openid" }).get({
          success: (res1) => {
            this.setData({
              chair: options.chair,
              isFree: res.data[0].chairs[options.chair - 1],
              isMe: globalData.openid == res1.data[0].openid[options.chair - 1]
            })
            wx.hideLoading()
          }
        })
      }
    })
  },
  check: () => {
    wx.showModal({
      title: "你还没有实名",
      content: "我们仅需要你的真实姓名",
      confirmText: "去实名",
      success: () => {
        this.newPeople("lisi")
      }
    })
  },
  newPeople: (name) => {
    db.collection('check').add({
      data: {
        check: [],
        finalCheck: true,
        name: name
      }
    })
  }
})