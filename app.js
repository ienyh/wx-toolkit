//app.js
App({
  globalData: {
    userInfo: null,
    curLang: {},
    langList: [
      {
        'lang': 'en',
        'index': 0,
        'chinese': '英文'
      },
      {
        'lang': 'zh',
        'index': 1,
        'chinese': '中文'
      },
      {
        'lang': 'jp',
        'index': 2,
        'chinese': '日语'
      },
      {
        'lang': 'kor',
        'index': 3,
        'chinese': '韩语'
      },
      {
        'lang': 'fra',
        'index': 4,
        'chinese': '法语'
      },
      {
        'lang': 'spa',
        'index': 5,
        'chinese': '西班牙语'
      },
      {
        'lang': 'ara',
        'index': 6,
        'chinese': '阿拉伯语'
      }
    ]
  },

  onLaunch: function () {
    // 展示本地存储能力
    this.globalData.curLang = wx.getStorageSync('curLang') || this.globalData.langList[0]

    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
  
})