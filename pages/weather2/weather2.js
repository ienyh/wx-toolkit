//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    realtime: {},
    today: {},
    tomorrow: {}
  },
  //事件处理函数
  onLoad: function () {
    var self = this;
    wx.request({
      url: 'http://v.juhe.cn/weather/index',
      data: {
        cityname: "郑州",
        key: "3303d86dd7af7dec67b7e67a5d3fcd5e"
      },
      success: (result) => {
        // 判断空气质量
        var aqi = res.data.result.realtime.aqi;
        if (aqi > 250) {
          var airRate = "严重污染";
          var airColor = "purple";
        } else if (aqi > 100) {
          var airRate = "污染";
          var airColor = "red";
        } else if (aqi > 50) {
          var airRate = "良";
          var airColor = "yellow";
        } else {
          var airRate = "优";
          var airColor = "green";
        }
        res.data.result.realtime.airRate = airRate;
        res.data.result.realtime.airColor = airColor;
        
        // 判断天气图标
        res.data.result.future[0].icon = res.data.result.future[0].weather.split("转")[0]
        res.data.result.future[1].icon = res.data.result.future[1].weather.split("转")[0]

        // 设置天气数据
        self.setData({
          realtime: res.data.result.realtime,
          today: res.data.result.future[0],
          tomorrow: res.data.result.future[1],
        })


        //console.log(result);
      },

      fail: (result) => {
        console.log(result);
      }
    })
  },
})
