// pages/check/check.js
Page({

  data: {
    chair: null,
    isFree:false,
    isMe:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      chair: options.chair
    })


  }
})