// pages/qrcode/qrcode.js
var QR = require("../../../utils/qrcode.js");
Page({
  data: {
    maskHidden: true,
    imagePath: "",
    placeholder: "默认文本", //默认二维码生成文本
  },

  /**
   * 生命周期函数-页面加载-onLoad
   * @param {*} options
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var size = this.setCanvasSize(); //动态设置画布大小
    var initUrl = this.data.placeholder;
    this.createQrCode(initUrl, "mycanvas", size.w, size.h);
  },

  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686; //不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width; //canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },

  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH, this, this.canvasToTempImage);
    // setTimeout(() => { this.canvasToTempImage();},100);
  },

  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath(
      {
        canvasId: "mycanvas",
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath);
          that.setData({
            imagePath: tempFilePath,
          });
        },
        fail: function (res) {
          console.log(res);
        },
      },
      that
    );
  },

  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.imagePath;
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img], // 需要预览的图片http链接列表
    });
  },

  formSubmit: function (e) {
    let that = this;
    let url = e.detail.value.url;

    // 判断用户是否有输入
    if (url === "") {
      wx.showToast({
        icon: "none",
        title: "请输入文本",
        duration: 2000,
      });
      return;
    }

    /**
     * 调用服务提供商提供的 API
     * https://developers.weixin.qq.com/community/servicemarket/detail/00040275a14468e0e689194b251015
     * 非法信息例子：特3456书yuuo莞6543李zxcz蒜7782法fgnv级完2347全dfji试3726测asad感3847知qwez到
     */
    wx.serviceMarket
      .invokeService({
        service: "wxee446d7507c68b11",
        api: "msgSecCheck",
        data: {
          Action: "TextApproval",
          Text: url,
        },
      })
      .then((res) => {
        if (res.data.Response.EvilTokens.length == 0) {
          that.setData({
            maskHidden: false,
          });
          wx.showToast({
            title: "生成中...",
            icon: "loading",
            duration: 2000,
          });
          var st = setTimeout(function () {
            wx.hideToast();
            var size = that.setCanvasSize();
            //绘制二维码
            that.createQrCode(url, "mycanvas", size.w, size.h);
            that.setData({
              maskHidden: true,
            });
            clearTimeout(st);
          }, 2000);
        } else {
          wx.showModal({
            title: "提示",
            content: "请勿携带恶意信息",
          });
        }
      });
  },
});
