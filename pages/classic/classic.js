// pages/classic/classic.js
// import引入路径必须使用相对路径，不要使用绝对路径
import {ClassicModel} from "../../models/classic.js"
import {LikeModel} from "../../models/like.js"
let classicModel = new ClassicModel();
let likeModel = new LikeModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic:null,//最好先初始化一下，养成良好的编码习惯
    first:false,
    latest:true,//由于获取的是最新一期的接口，所以默认为最新一期，latest为true
    likeCount:0,
    likeStatus:false,//加入缓存后把点赞状态分离出来单独设置
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res)=>{
        // console.log(res)
        this.setData({
          classic:res,
          likeCount:res.fav_nums,
          likeStatus:res.like_status
        })
    });
   
    // console.log(latest)
    
    // console.log(this.data.num)
    // let that = this
    // wx.request({
    //   url:'http://bl.7yue.pro/v1/classic/latest',
    //   data:{

    //   },
    //   header:{
    //     appkey:'h7QS6bCWTuYJfGvY'
    //   },
    //   // success:function(res){
    //   //   console.log(that.data.num)
    //   // },
    //   success:(res) => {
    //     console.log(this.data.num)
    //   }
    // })
  },
  // 页面进行监听组件自定义事件
  onLike:function(event){
    // console.log(event.detail.behaviors //like组件里自定义组件带过来的参数,this.data.classic.id,this.data.classic.type)
    likeModel.getLike(event.detail.behaviors,this.data.classic.id,this.data.classic.type)
  },
  onNext:function(event){
    this._updateClassic('next')
    // let index = this.data.classic.index;
    // classicModel.getNext(index,(res)=>{
    //   // console.log(res);
    //   this.setData({
    //     classic:res.data,
    //     first:classicModel.isFirst(res.data.index),
    //     latest:classicModel.isLatest(res.data.index)
    //   })
    // })
  },
  onPervious:function(event){
    this._updateClassic('previous')
    // let index = this.data.classic.index;
    // classicModel.getPervious(index, (res)=>{
    //   // console.log(res)
    //   this.setData({
    //     classic:res.data,
    //     first:classicModel.isFirst(res.data.index),
    //     latest:classicModel.isLatest(res.data.index)
    //   })
    // })
  },
  // 封装函数简化代码，
  _updateClassic(nextOrPervious){
    const index = this.data.classic.index;
    classicModel.getClassic(index,nextOrPervious, (res)=>{
      // console.log(res);
      // 更新的同时更新点赞状态
      this._getLikeStatus(res.id,res.type)
      this.setData({
        classic:res,
        first:classicModel.isFirst(res.index),
        latest:classicModel.isLatest(res.index)
      })
    })
  },
  _getLikeStatus(artId,ceotory){
    likeModel.getClassicLikeStatus(artId,ceotory,(res)=>{
      // console.log(res)
      this.setData({
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    })
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