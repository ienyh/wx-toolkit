// pages/weather/weather.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        region: ["beijing", "beijing", "chaoyang"]
    },

    changeRegion: function (params) {
        //console.log(params);
        this.setData({
            region: params.detail.value
        })
    },

    getWeather: function () {
        var that = this;
        wx.request({
            url: 'https://devapi.heweather.net/v7/weather/now',
            data: {
                location: "北京",
                key: "711e2e6862d84ce78811845afb652338"
            },
            // header: {'content-type':'application/json'},
            // method: 'GET',
            // dataType: 'json',
            // responseType: 'text',
            success: (result) => {
                console.log(result.data);
            },
            fail: (result) => {
                console.log(result);
            }
        });
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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