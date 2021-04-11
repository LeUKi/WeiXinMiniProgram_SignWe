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
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userLocation']) {
            wx.authorize({
              scope: 'scope.userLocation'
            })
          }
        }
      })
      wx.checkSession({
        success() {
          //session_key 未过期，并且在本生命周期一直有效
        },
        fail() {
          // session_key 已经失效，需要重新执行登录流程
          wx.login() //重新登录
        },
        complete(res) {
          console.log(res);
        }
      })

      await wx.cloud.callFunction({
        name: 'isNewGuys',
        success: res => {
          console.log(res);
          this.globalData.openid = res.result.openid
          this.globalData.isNewPeople = res.result.isNewGuys
          this.globalData.name = res.result.uname
          this.globalData.isOP = res.result.isOP
          this.globalData.distence = 0
        },
        fail: (res) => {
          wx.showToast({
            title: '云开发出现了些问题，请联系管理员排查！',
            icon: "none"
          })
          console.log(res);
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
    isOP: false,
    right: false,
    name: null
  }
})
