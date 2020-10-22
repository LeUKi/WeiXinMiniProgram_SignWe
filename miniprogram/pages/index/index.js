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
    }],
    latitude: 21.15204729309082,
    longitude: 110.302223046875
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
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation'
          })
        }
      }
    })
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
    console.log('location change', res)
    
  }

})