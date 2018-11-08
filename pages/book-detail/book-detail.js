// pages/book-detail/book-detail.js
import {
  BookModels
} from '../../models/book.js'
import {
  LikeModel
} from '../../models/like.js'
const bookModel = new BookModels();
const likeModel = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:null,
    like_Status:false,
    likeCount:0,
    comment:[],
    posting:false,
    inputVal:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading();
    const bid = options.bid;
    const detail = bookModel.getDetailbook(bid);
    const comment = bookModel.getBookComment(bid);
    const likeStatus = bookModel.getBookFavor(bid);
    // 所有请求成功之后才会触发回调，，，回调结果是所有异步请求结果组成的数组，顺序和请求顺序一致
    // promise.race   是只要有一个成功就会触发回调，，结果为成功的那个回调结果
    Promise.all([detail,comment,likeStatus])
    .then(res=>{
      wx.hideLoading();
        this.setData({
          book:res[0],
          comment:res[1].comments,
          like_Status:res[2].like_status,
          likeCount:res[2].fav_nums
        })
    })
    // detail.then((res)=>{
    //   this.setData({
    //     book:res
    //   })
    // })
    // comment.then((res)=>{
    //   this.setData({
    //     comment:res.comments,
    //   })
    // })
    // likeStatus.then((res)=>{
    //   this.setData({
    //     like_Status:res.like_status,
    //     likeCount:res.fav_nums
    //   })
    // })
  },
  onLike(event){
    likeModel.getLike(event.detail.behaviors,this.data.book.id,400)
  },
  onPostFake(event){
    this.setData({
      posting:true,
    })
  },
  onCancel(event){
    this.setData({
      posting:false
    })
  },
  onPost(event){
    const contents = event.detail.text || event.detail.value;
    if(!contents){
      wx.showToast({
        title: "亲~内容不能为空哦~",
        icon: 'none'
      })
      return;
    }
    if(contents.length>12){
      wx.showToast({
        title: "最多12个字符哦",
        icon: 'none'
      })
      return;
    }
    bookModel.getAddComments(this.data.book.id,contents)
    .then(res=>{
      const comments = this.data.comment
      comments.unshift({
          content:contents,
          nums:1
        })
        this.setData({
          comment: comments,
          posting:false
        })
        wx.showToast({
          title: "+1",
          icon: 'none'
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