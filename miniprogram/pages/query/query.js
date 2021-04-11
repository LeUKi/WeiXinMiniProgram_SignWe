// pages/query/query.js
const {
  globalData
} = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  data: {
    chairs: [],
    isOP: false,
  },

  onLoad: function (options) {
    this.getC()

  },
  onShow: function () {
    wx.startPullDownRefresh()
    this.setData({
      isOP: globalData.isOP
    })
  },
  onPullDownRefresh: function () {
    this.getC()
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1000);
  },
  getC: function () {
    db.collection('chairs').where({
      _id: "chairs"
    }).get({
      success: (res) => {
        this.setData({
          chairs: res.data[0].chairs,

        })

      }
    })
  },
  onClose: function () {
    this.setData({
      show: false
    })
  },
  clickme: function (res) {
    const num = res.currentTarget.dataset.num + 1
    if (this.data.isOP) {
      wx.showModal({
        title: num + ' 号座位',
        content: '是否被恶意占用，确认可重置此座位状态',
        cancelText: "手滑了",
        confirmText: "我确定",
        confirmColor: "#FA5151",
        cancelColor: "#999999",
        success(res1) {
          if (res1.confirm) {
            wx.showLoading({
              title: '正在重置',
              mask: true
            })
            wx.cloud.callFunction({
              name: 'forcesignout',
              data: {
                num: num
              },
              success: res => {
                wx.startPullDownRefresh()
                wx.hideLoading()
              }
            })
          }
        }
      })
    } else {
      wx.navigateTo({
        url: "/pages/check/check?chair=" + num
      })
    }
  },
  test: function () {
    var tt = wx.cloud.callFunction({
      name: 'test'
    })
    console.log(tt);
  }
})