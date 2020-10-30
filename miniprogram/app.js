//app.js
App({
  onLaunch: async function () {

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
      // wx.getSetting({
      //   success(res) {
      //     if (!res.authSetting['scope.userLocation']) {
      //       wx.authorize({
      //         scope: 'scope.userLocation'
      //       })
      //     }
      //   }
      // })
      //获取openid
      await wx.cloud.callFunction({
        name: 'isOP',
        success: (res) => {
          this.globalData.isOP = res.result
          this.globalData.distence = 0
        }
      })
      wx.cloud.callFunction({
        name: 'isNewGuys',
        success: res => {
          this.globalData.openid = res.result.openid
          this.globalData.isNewPeople = res.result.isNewGuys
        },
        fail: (res) => {
          wx.showToast({
            title: '未登入，部分操作将受限',
            icon: "none"
          })
        }
      })
    }
  },
  globalData: {
    lat: null,
    lon: null,
    distence: null,
    openid: null,
    isNewPeople: null,
    isOP: false
  }
})
