// pages/code/code.js
Page({
  // click_name: function username(params) {
  //     wx.navigateTo({
  //         url: params,
  //       })
  // },

  click_hu: function () {
    wx.navigateTo({
      url: "../demo1/demo1",
    });
  },

  click_1: function () {
    wx.navigateTo({
      url: "../demo_sb/demo_sb",
    });
  },

  click_2: function () {
    wx.navigateTo({
      url: "../demo_women/demo_women",
    });
  },

  click_3: function () {
    wx.navigateTo({
      url: "../demo_women2/demo_women2",
    });
  },

  click_4: function () {
    wx.navigateTo({
      url: "../demo_women3/demo_women3",
    });
  },

  /**
   * 页面的初始数据
   */
  data: {
    motto_hu: "wxCodeHu",
    motto2: "wxCodeDemoLyl",
    motto3: "wxCodeDemoLhx",
    motto1: "wxCodeDemoJy",
    motto4: "wxCodeDemoCqy",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
