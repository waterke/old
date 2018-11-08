// components/link/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type:Boolean,//值的类型  必填项
      value:false,//默认值   选填项
      observe:function(){

      }
    },
    count:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc:'images/like.png',
    noSrc:'images/like@dis.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function(e){
        // console.log(e);
        let like = this.properties.like
        let count = this.properties.count
        count = like?count-1 : count+1
        this.setData({
          like : !like,
          count: count
        })
        // this.properties.like = !this.properties.like;
        // 自定义组件
        let behaviors = this.properties.like ? "like": "cancel" ; 
        this.triggerEvent("like",{
          behaviors:behaviors,
        },{})
    }
  }
})
