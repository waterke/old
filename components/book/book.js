// components/book/book.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:Object,
    searchs:{
      type:Boolean,
      value:false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap:function(event){
      const bid = this.properties.book.id;
      wx.navigateTo({
        // url路径中不要带.wxml,,,回报找不到页面的错误
        url: `/pages/book-detail/book-detail?bid=${bid}`,
      });
    }
  }
})
