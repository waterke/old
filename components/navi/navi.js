// components/navi/navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    latest:Boolean,//是否为最新一期
    first: Boolean,//是否为最后一期
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftSrc:"./image/triangle@left.png",
    disLeftSrc:"./image/triangle.dis@left.png",
    rightSrc:"./image/triangle@right.png",
    disRightSrc:"./image/triangle.dis@right.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft:function(event){
      if(!this.properties.latest){
        this.triggerEvent('left',{},{})
      }
    },
    onRight:function(event){
      if(!this.properties.first){
        this.triggerEvent("right",{},{})
      }
    }
  }
})
