// pages/index/index.js
const { globalData } = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    right: true,
    circles: [{
      latitude: 21.15204729309082,
      longitude: 110.302223046875,
      radius: 80,
      fillColor: '#00000011',
      color: "#74b9ff",
      strokeWidth: "4",
    }],
    notice: { text: "null" },


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.chair) {
      wx.showLoading({
        title: '加载定位中',
        mask: true
      })
      wx.getSetting({
        success(res) {
          wx.hideLoading()
          if (res.authSetting['scope.userLocation']) {
            wx.navigateTo({
              url: '/pages/check/check?chair=' + options.chair,
            })
          } else {
            wx.showToast({
              title: '未取得定位权限',
              icon: "none"
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.startLocationUpdate();
    if (globalData.isOP) {
      this.setData({
        right: true,
        notice: { text: "当前为管理员状态，可无视范围打卡" }
      })
    } else {
      wx.onLocationChange(this._locationChangeFn);
      db.collection('chairs').where({ _id: "notic" }).get({
        success: (res) => {
          this.setData({
            notice: res.data[0].notice
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.offLocationChange(this._locationChangeFn);
  },

  _locationChangeFn: function (res) {
    this.setData({
      right: this.juli(res.latitude, res.longitude)
    })

  },
  // 计算两地之间的距离
  juli: function (lat1, lng1, lat2 = this.data.circles[0].latitude, lng2 = this.data.circles[0].longitude) {
    globalData.lat = lat1;
    globalData.lon = lng1;
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    globalData.distence = s * 1000
    return s * 1000 <= this.data.circles[0].radius ? true : false
  },
  check: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success: function (res) {
        console.log(res);
        wx.reLaunch({
          url: res.path
        })
      }
    })
  }
})