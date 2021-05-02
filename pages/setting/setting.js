var app = getApp();

Page({
  /**
   * 页面的初始数据
   * password&peopleArray为待删除数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    setting_userInfo: null,
    hasUserInfo: false,
    password: null,
    peopleArray: ["test", "test", "test", "test", "test"],
  },

  /**
   * @description 展示模态框
   */
  showModal() {
    this.setData({
      modalName: true,
    });
  },

  /**
   * 处理input框输入的值
   * @param {Object} e
   */
  inputHandle(e) {
    this.setData({
      password: e.detail.value,
    });
  },

  /**
   * @description 关闭模态框
   */
  hideModal() {
    this.setData({
      modalName: false,
    });
  },

  /**
   * 处理模态框中的确认按钮
   * 默认password: "7777"
   */
  handleConfirm() {
    // wx.setStorageSync("password", "7777");
    if ("7777" == this.data.password) {
      this.hideModal();
      this.showDrawer();
      wx.setStorageSync("password", "7777");
    }
  },

  /**
   * 跳转至all/目录下指定页面
   * @param {string} target
   */
  navigateToPage(target) {
    wx.navigateTo({
      url: "./all/" + target + "/" + target,
      fail: () => {
        console.log("navigateToFail");
      },
    });
  },

  /**
   * 抽屉内点击事件
   * @param {Object} e
   */
  clickInDrawer(e) {
    // console.log(e.currentTarget.dataset.index);
    // const condition = e.currentTarget.dataset.index;
  },

  /**
   * 关闭右侧抽屉
   */
  hideDrawer() {
    this.setData({
      drawer: false,
    });
  },

  /**
   * 展示右侧抽屉
   */
  showDrawer() {
    this.setData({
      drawer: true,
    });
  },

  /**
   * 根据本地缓存password判断弹出模态框还是右侧抽屉
   * 以确保密码只需要输对一次即可
   */
  showModalOrDrawer: function () {
    wx.getStorage({
      key: "password",
      success: (password) => {
        if ("7777" == password.data) {
          // this.hideModal();
          this.showDrawer();
          // wx.setStorageSync("password", "7777");
        }
      },
      fail: () => {
        this.showModal();
      },
    });
  },

  /**
   *
   * @param {Object} event
   */
  getUserInfo: function (event) {
    let that = this;
    console.log(event);
    // that.setData回调
    that.setData(
      {
        setting_userInfo: event.detail.userInfo,
        hasUserInfo: true,
      },
      () => {
        app.globalData.userInfo = that.data.setting_userInfo;
      }
    );
  },

  /**
   * 跳转至index界面
   * @param {*} params
   */
  toIndex: function (params) {
    wx.navigateTo({
      url: "./index/index",
      success: (result) => {
        console.log(this.data.setting_userInfo);
      },
      fail: () => {},
      complete: () => {},
    });
  },

  /**
   * 去往BackgroundInformation页面
   */
  goToBackgroundInformation: function () {
    wx.navigateTo({
      url: "/pages/setting/background-information/background-information",
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        setting_userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res) => {
        this.setData({
          setting_userInfo: res.userInfo,
          hasUserInfo: true,
        });
      };
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(app.globalData.userInfo);
    this.setData({
      setting_userInfo: app.globalData.userInfo,
      hasUserInfo: true,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
