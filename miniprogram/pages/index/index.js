// pages/index/index.js
const { globalData } = getApp()
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
      strokeWidth: "4"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.startLocationUpdate();
    wx.onLocationChange(this._locationChangeFn);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.offLocationChange(this._locationChangeFn);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  _locationChangeFn: function (res) {
    this.setData({
      right: this.juli(res.latitude, res.longitude)
    })
    console.log(globalData)

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
    console.log("check");
    wx.navigateTo({
      url: "/pages/check/check?chair=4"
    })
  }

})