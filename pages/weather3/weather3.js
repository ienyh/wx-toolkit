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
        today: {},
        tomorrow: {},
        dayAfterTomorrow: {}
    },

    getCityMessage: function (parameter) {
        var that = this;
        
        wx.request({
            url: 'https://geoapi.heweather.net/v2/city/lookup',
            data: {
                location: parameter,
                key: this.data.heweatherKey
            },
            header: {'content-type':'application/json'},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                that.setData({
                    cityMessage: result.data.location[0]
                })
                // console.log(this.data.cityMessage);
            },
            fail: () => {},
            complete: () => {}
        });

    },

    /**
     * "now": 查询此时的天气数据
     * "3d": 查询今明后三天的天气数据
     * @param {"now", "3d"} parameter 
     */
    getWeather: function (id, timing) {
        var that = this;
        wx.request({
            url: 'https://devapi.heweather.net/v7/weather/' + timing,
            data: {
                location: id,
                key: this.data.heweatherKey
            },
            header: {'content-type':'application/json'},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
                if (timing == "now") {
                    that.setData({
                        now: result.data.now
                    })
                    console.log(that.data.now);
                } else {
                    that.setData({
                        today: result.data.daily[0],
                        tomorrow: result.data.daily[1],
                        dayAfterTomorrow: result.data.daily[2]
                    })
                    console.log(that.data.today);
                }
                
            },
            fail: () => {},
            complete: () => {}
        });
          
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCityMessage("jinshui");
        this.getWeather(this.data.cityMessage.id, "now");
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getCityMessage("jinshui");
        this.getWeather(this.data.cityMessage.id, "now");
        console.log("onShow");
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
        // test:用户下拉重新请求天气数据
        // this.getCityMessage("101180112");
        this.getWeather(this.data.cityMessage.id, "now");
        this.getWeather(this.data.cityMessage.id, "3d");
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