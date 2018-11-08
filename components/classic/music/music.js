// components/classic/music/music.js
// 组件的behavior行为实现组件之间的代码复用，
import {classic_beh} from "../classic_beh.js"
const wMgr = wx.getBackgroundAudioManager();// properties(Read only)(duration,currentTime,paused,buffered)
// properties(src(m4a, aac, mp3, wav),startTime,title,epname,singer,coverImgUrl,webUrl,protocol)

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classic_beh],
  properties: {
    // content: {
    //   type: String
    // },
    // imgSrc: {
    //   type: String
    // },
    // music_Status:Boolean,
    src:String
  },
  attached(){
    // 设置页面播放状态
    this._recoverStatus();
    // 是页面播放与小程序播放器播放状态同步
    this._monitorSwitch();
  },
  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc:'./images/player@pause.png',
    playerSrc:"./images/player@play.png",
    playing:false,//播放按钮状态
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(){
      if(!this.data.playing){
        // 播放
        this.setData({
          playing:true
        })
        wMgr.src=this.properties.src;
      }else{
        // 暂停
        this.setData({
          playing:false
        })
        wMgr.pause()
      }
    },
    _recoverStatus:function(){
      // 如果当前音乐为暂停状态，设置播放按钮状态
      if(wMgr.paused){
        this.setData({
          playing:false
        })
        return
      }
      //如果当前播放音乐，与当前页面src相同，说明播放的因为为当前页面的音乐，播放状态设置为true
      if(wMgr.src === this.properties.src){
        this.setData({
          playing:true
        })
      }

    },
    _monitorSwitch:function(){
      // 监听背景音频播放事件
      wMgr.onPlay(()=>{
        this._recoverStatus()
      })
      // 监听背景音频暂停事件
      wMgr.onPause(()=>{
        this._recoverStatus()
      })
      // 监听背景音频停止事件
      wMgr.onStop(()=>{
        this._recoverStatus()
      })
      // 监听背景音频自然播放结束事件
      wMgr.onEnded(()=>{
        this._recoverStatus()
      })
    }
  }
})
