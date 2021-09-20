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
      desc: '描述信 息描述 信描述 信描信',
    },
    {
      text: 'x月x日',
      desc: '描述信 息描述 信描述 信描信',
    },
    {
      text: 'x月x日',
      desc: '描述信 息描述 信描述 信描信',
    },
    {
      text: 'x月x日',

      desc: '描述信 息描述 信描述 信描信',
    },
    {
      text: 'x月x日',

      desc: '描述信 息描述 信描述 信描信',
    },
    {
      text: 'x月x日',

      desc: '描述信 息描述 信描述 信描信',
    },
    ],
    noticetit: "标题加载中",
    noticecon: "内容加载中",
    noticetim: "日期加载中"
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
          // steps: res.data[0].steps,
          noticetit: res.data[0].noticetit,
          noticecon: res.data[0].noticecon,
          noticetim: res.data[0].noticetim,
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