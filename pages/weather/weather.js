//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    heweatherKey: "711e2e6862d84ce78811845afb652338",  
    cityMessage: {},
    now: {},
    today: {},
    tomorrow: {}
  },

  /**
   * picker组件绑定事件 bindchange="picker_getWeather"
   * @param {*} location 
   */
  picker_getWeather: function (location) {
    var that = this;
    var _location = location.detail.value[2];
    var _adm = location.detail.value[1];
    wx.request({
      url: 'https://geoapi.heweather.net/v2/city/lookup',
      data: {
        location: _location,
        adm: _adm,
        key: that.data.heweatherKey
      },
      success: (result) => {
        that.setData({
          cityMessage: result.data.location[0]
        })
        this.getWeather("now");
        this.getWeather("3d");
      },
      complete: () => {}
    });  
  },

  getWeather: function (timing) {
    var that = this;
    wx.request({
      url: 'https://devapi.heweather.net/v7/weather/' + timing,
      data: {
        location: that.data.cityMessage.id,
        key: that.data.heweatherKey
      },
      success: (result) => {
        if (timing == "3d") {
          that.setData({
            today: result.data.daily[0],
            tomorrow: result.data.daily[1]
          });
          console.log(that.data.today);
          console.log(that.data.tomorrow);
        } else if (timing == "now") {
          that.setData({
            now: result.data.now
          })
          console.log(that.data.now);
        }
      }
    }); 
  },

  updateWeatherData: function (_location, _adm) {
    var that = this;
    wx.request({
      url: 'https://geoapi.heweather.net/v2/city/lookup',
      data: {
        location: _location,
        adm: _adm,
        key: that.data.heweatherKey
      },
      success: (result) => {
        that.setData({
          cityMessage: result.data.location[0]
        })
        // 更新now
        wx.request({
          url: 'https://devapi.heweather.net/v7/weather/now',
          data: {
            location: that.data.cityMessage.id,
            key: that.data.heweatherKey
          },
          success: (_result) => {
            that.setData({
              now: _result.data.now
            });
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
          }
        });
        // 更新today&tomorrow
        wx.request({
          url: 'https://devapi.heweather.net/v7/weather/3d',
          data: {
            location: that.data.cityMessage.id,
            key: that.data.heweatherKey
          },
          success: (_result) => {
            that.setData({
              today: _result.data.daily[0],
              tomorrow: _result.data.daily[1]
            });
          }
        });
      }
    });

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化值:郑州市金水区的天气数据
    this.setData({
      cityMessage: {
        adm2: "郑州",
        name: "金水"
      }
    });
    this.updateWeatherData(this.data.cityMessage.name, this.data.cityMessage.adm2);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.updateWeatherData(this.data.cityMessage.name, this.data.cityMessage.adm2);
  },
})
