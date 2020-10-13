// pages/weather3/weather3.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        heweatherKey: "711e2e6862d84ce78811845afb652338",
        cityMessage: {},
        now: {},
        tomorrow: {},
        dayAfterTomorrow: {}
    },

    getWeather: function (params) {
        var that = this;
        // 城市信息搜索request
        wx.request({
            url: 'https://geoapi.heweather.net/v2/city/lookup',
            data: {
                location: "jinshui",
                adm: "zhengzhou",
                key: that.data.heweatherKey
            },
            header: {'content-type':'application/json'},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                // 将请求得到的城市信息赋值给cityMessage
                that.setData({
                    cityMessage: result.data.location[0]
                });
                // console.log(that.data.cityMessage);
                // 搜索城市信息成功后将id传过去继续请求未来三天天气数据
                wx.request({
                    url: 'https://devapi.heweather.net/v7/weather/3d',
                    data: {
                        location: that.data.cityMessage.id,
                        key: that.data.heweatherKey
                    },
                    header: {'content-type':'application/json'},
                    method: 'GET',
                    dataType: 'json',
                    responseType: 'text',
                    success: (result) => {
                        // console.log(result);
                        // 将请求得到的三天的天气信息分别赋值给now，tomorrow，dayAfterTomorrow
                        that.setData({
                            now: result.data.daily[0],
                            tomorrow: result.data.daily[1],
                            dayAfterTomorrow: result.data.daily[2]
                        })
                        console.log(that.data.now);
                        console.log(that.data.tomorrow);
                        console.log(that.data.dayAfterTomorrow);
                    },
                    fail: () => {},
                    complete: () => {}
                });
            },

            fail: () => {
                console.log("failed!");
            },
            complete: () => {}
        });
          


        // wx.request({
        //     url: "",
        //     data: {

        //     },
        //     success: () => {

        //     },
        //     fail: () => {

        //     }
        // })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     * 
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})