//获取应用实例
const app = getApp();

Page({
  data: {
    heweatherKey: "711e2e6862d84ce78811845afb652338",
    cityMessage: {},
    now: {},
    today: {},
    tomorrow: {},
    dayAfterTomorrow: {},
  },

  /**
   * @description picker组件绑定事件 bindchange="picker_getWeather"
   * @param {Object} location
   * e.g. location.detail.value = ["河北省", "石家庄市", "长安区"]
   */
  picker_getWeather: function (location) {
    var that = this;
    // console.log(location);
    var _location = location.detail.value[2];
    var _adm = location.detail.value[1];
    wx.request({
      url: "https://geoapi.heweather.net/v2/city/lookup",
      data: {
        location: _location,
        adm: _adm,
        key: that.data.heweatherKey,
      },
      success: (result) => {
        that.setData(
          {
            cityMessage: result.data.location[0],
          },
          () => {
            this.updateWeatherData(
              this.data.cityMessage.name,
              this.data.cityMessage.adm2
            );
          }
        );
      },
    });
  },

  /**
   * @deprecated 暂时不使用此方法
   * @description 获取天气信息
   * @param {string} timing "now"||"3d"
   */
  getWeather: function (timing) {
    var that = this;
    wx.request({
      url: "https://devapi.heweather.net/v7/weather/" + timing,
      data: {
        location: that.data.cityMessage.id,
        key: that.data.heweatherKey,
      },
      success: (result) => {
        if ("3d" == timing) {
          that.setData({
            today: result.data.daily[0],
            tomorrow: result.data.daily[1],
            dayAfterTomorrow: result.data.daily[2],
          });
          // console.log(that.data.tomorrow);
          // console.log(that.data.dayAfterTomorrow);
        } else if ("now" == timing) {
          that.setData({
            now: result.data.now,
          });
          // console.log(that.data.now);
        }
      },
    });
  },

  /**
   * @description 更新天气信息，方法中也会更新城市信息并写入本地缓存
   * @param {string} _location 城市名称  e.g.金水
   * @param {string} _adm 城市所属行政区划  e.g.郑州
   */
  updateWeatherData: function (_location, _adm) {
    var that = this;
    /**
     * 使用参数_location&_adm请求城市信息
     * 成功回调中使用城市信息再请求天气信息
     */
    wx.request({
      url: "https://geoapi.heweather.net/v2/city/lookup",
      data: {
        location: _location,
        adm: _adm,
        key: that.data.heweatherKey,
      },
      success: (result) => {
        // 成功设置城市信息后，回调中将城市信息写入本地缓存
        that.setData(
          {
            cityMessage: result.data.location[0],
          },
          () => {
            try {
              wx.setStorageSync("cityMessage", {
                adm2: this.data.cityMessage.adm2,
                name: this.data.cityMessage.name,
              });
            } catch (e) {
              console.log(e);
            }
          }
        );
        // 更新now
        wx.request({
          url: "https://devapi.heweather.net/v7/weather/now",
          data: {
            location: that.data.cityMessage.id,
            key: that.data.heweatherKey,
          },
          success: (_result) => {
            that.setData({
              now: _result.data.now,
            });
            // 弹窗关闭，为使动画流畅，延时0.8秒关闭
            setTimeout(() => {
              this.setData({
                loadModal: false,
              });
            }, 800);
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
          },
        });
        // 更新 today&tomorrow
        wx.request({
          url: "https://devapi.heweather.net/v7/weather/3d",
          data: {
            location: that.data.cityMessage.id,
            key: that.data.heweatherKey,
          },
          success: (_result) => {
            that.setData({
              today: _result.data.daily[0],
              tomorrow: _result.data.daily[1],
              dayAfterTomorrow: _result.data.daily[2],
            });
            // 弹窗关闭，为使动画流畅，延时0.8秒关闭
            setTimeout(() => {
              this.setData({
                loadModal: false,
              });
            }, 800);
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
          },
        });
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /**
     * 从本地缓存获取上次退出时选取的城市位置
     * 如果获取失败说明是第一次小程序初始化没有本地初始化
     * 则默认使用 { adm2: "北京", name: "朝阳" }
     */
    wx.getStorage({
      key: "cityMessage",
      success: (result) => {
        // console.log(result);
        that.setData(
          {
            cityMessage: {
              adm2: result.data.adm2,
              name: result.data.name,
            },
          },
          () => {
            that.updateWeatherData(
              that.data.cityMessage.name,
              that.data.cityMessage.adm2
            );
          }
        );
      },
      fail: () => {
        console.log("fail");
        that.setData(
          {
            cityMessage: {
              adm2: "北京",
              name: "朝阳",
            },
          },
          () => {
            that.updateWeatherData(
              that.data.cityMessage.name,
              that.data.cityMessage.adm2
            );
          }
        );
      },
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.updateWeatherData(
      this.data.cityMessage.name,
      this.data.cityMessage.adm2
    );

    // 开启弹框加载
    this.setData({
      loadModal: true,
    });
  },
});
