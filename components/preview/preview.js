// components/preview/preview.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classics:{
      type:Object,
      observer:function(newVal){
        const textType = {
          100: "电影",
          200: "音乐",
          300: "句子"
        }[newVal.type];
        this.setData({
          textType
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    textType:'',
    readOnly:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap:function(event){
      this.triggerEvent('tapping',{
        cid:this.properties.classics.id,
        type:this.properties.classics.type
      },{})
    }
  }
})
