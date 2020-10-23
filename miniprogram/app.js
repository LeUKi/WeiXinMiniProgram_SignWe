//app.js
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'js-3ga9y80561e2a6f1',
        traceUser: true,
      })
      var that = this;
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userLocation']) {
            wx.authorize({
              scope: 'scope.userLocation'
            })
          }
        }
      })
      //获取openid
      wx.cloud.callFunction({
        name: 'getOpenid',
        success: res => {
          this.globalData.openid = res.result
        },
        fail: () => {
          this.globalData.openid = false
        }
      })
      //是否新人
      wx.cloud.database().collection('check').where({
        "_openid": this.globalData.openid
      }).get({
        success: res => {
          this.globalData.isNewPeople =
            res.data[0] != null ? true : false
          console.log(this.globalData,res.data);
        }
      })
      //获取第一次位置
      wx.getLocation({
        success(res) {
          that.globalData.lat = res.latitude;
          that.globalData.lon = res.longitude;
        }
      })
    }
  },
  globalData: {
    lat: null,
    lon: null,
    distence: null,
    openid: null,
    isNewPeople: null
  }
})
