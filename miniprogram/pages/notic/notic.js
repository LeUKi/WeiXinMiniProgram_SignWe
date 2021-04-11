// pages/notic/notic.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [{
        text: '今天',
        desc: '描述信 息描述 信描述 信描信',
      },
      {
        text: '明天',
        desc: '描述信息',
      },
      {
        text: '11月29日',
        desc: '描述信息',
      },
      {
        text: '11月30日',
        desc: '描述信息',
      },
      {
        text: '11月30日',
        desc: '描述信息',
      },
      {
        text: '11月30日',
        desc: '描述信息',
      },
      {
        text: '11月30日',
        desc: '描述信息',
      },
    ],
    notice2: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('chairs').where({
      _id: "notic"
    }).get({
      success: (res) => {
        console.log(res);
        this.setData({
          steps: res.data[0].steps,
          notice2: res.data[0].notice2
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})