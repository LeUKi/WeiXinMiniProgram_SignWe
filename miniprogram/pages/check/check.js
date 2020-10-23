// pages/check/check.js
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
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.openId)
        var openid = res.result.openId;
        console.log(openid);
        
      }
    })
    wx.showLoading({
      title: "加载中"
    })
    db.collection('chairs').where({ _id: "chairs" }).get({
      success: (res) => {
        this.setData({
          chair: options.chair,
          isFree: res.data[0].chairs[options.chair],
          isMe: false
        })
        wx.hideLoading()
        console.log(res.data[0].chairs[options.chair])
      }
    })



  }
})