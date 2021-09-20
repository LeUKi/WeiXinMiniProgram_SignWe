// pages/test/test.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "",
    imgUrl: ""
  },

  getQR: function () {
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getQR',
      // 传递给云函数的event参数
      data: {
        "flag": 0,
        "chairNum": 40,
        "indexStart": 5,
        "roomId": "000303"
      }
    }).then(res => {
      this.setData({
        url: res.result.tempFileURL
      })
      console.log(res);

    }).catch(err => {
      console.log(err);
    })
  },









  getFiles() {

    // wx.cloud.downloadFile({
    //   fileID: 'cloud://js-3ga9y80561e2a6f1.6a73-js-3ga9y80561e2a6f1-1303954508/新建文本文档.txt	', // 文件 ID
    //   success: res => {
    //     // 返回临时文件路径
    //     console.log(res.tempFilePath)
    //   },
    //   fail: console.error
    // })

    wx.cloud.getTempFileURL({
      fileList: ['cloud://js-3ga9y80561e2a6f1.6a73-js-3ga9y80561e2a6f1-1303954508/新建文本文档.txt'],
      success: res => {
        // fileList 是一个有如下结构的对象数组

        console.log(res.fileList)

      },
      fail: console.error
    })


  }
})

