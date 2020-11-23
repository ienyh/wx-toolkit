// pages/demo1/demo1.js

const app = getApp();
var util = require("../../../../utils/util2.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    time: new Date(),
    time2: "",
  },

  getNowTime: function (e) {
    var that = this;
    var currentTime = util.formatTime(new Date());
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    setInterval(function () {
      that.setData({
        time2: util.formatTime(new Date()),
      });
    }, 1000);

    setInterval(function () {
      //var time = util.formatTime(new Date())
      //为页面中time赋值
      this.setData({
        time: util.formatTime(new Date()),
      });
    }, 1000);
  },

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
