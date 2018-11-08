// pages/book/book.js
import {
  BookModels
} from '../../models/book.js';
import {
  KeywordModel
} from "../../models/keyword.js";
import {
  randomMore
} from "../../util/common.js"
const bookModel = new BookModels();
const keywordModel = new KeywordModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:[],
    searching:true,
    hotKeywordList:[],
    searchResult:[],
    searchings:false,
    more:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bookmodel = bookModel.getHotList();
    bookmodel.then((res)=>{
      this.setData({
        book:res
      })
    })
    bookModel.getHotKeyword().then(res=>{
      this.setData({
        hotKeywordList:res.hot
      })
    })
  },
  onSearch(event){
    this.setData({
      searching:false,
    })
  },
  onCancel(event){
    this.setData({
      searching:true
    })
  },
  onSreaching(event){
    bookModel.getSearch(0,event.detail.val)
      .then(res=>{
        this.setData({
          searchResult:res.books
        })
        keywordModel.addHistory(event.detail.val);
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
    // console.log(randomMore(16))
    this.setData({
      more:randomMore(16),
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})