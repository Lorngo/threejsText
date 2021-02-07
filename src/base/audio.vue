<template>
  <div class="audio">
    <audio :src="musicSrc" id="audio" loop></audio>
    <transition name="right-left">
      <div class="btns" id="audio-btn" v-show="isPlay > 0" @click="playPause()">
        <img :src="PROJECT_CONFIG.is_background_music.constrols_btn_url[0]" alt="" class="btn-play" v-show="isPlay == 1">
        <img :src="PROJECT_CONFIG.is_background_music.constrols_btn_url[1]" alt=""  v-show="isPlay == 2">
      </div>
    </transition>
  </div>
</template>

<script>
import { PROJECT_CONFIG } from 'api/project.config'
import { isSystem, audioContextMusic } from 'assets/js/util'
import { getProjectConfig } from 'api/api'
export default {
  data() {
    return {
      // musicSrc: 'https://game.flyh5.cn/resources/game/wechat/szq/gaoxiao/music.mp3',
      isAudioType: 0,//当前播放模式:0为原生audio标签播放，1为AudioContext播放
      musicSrc: '',//背景音乐地址
      isPlay: 0//播放状态：1为播放，2为暂停
    }
  },
  created() {
    this.PROJECT_CONFIG = PROJECT_CONFIG
  },
  mounted() {
    this.musicInit()
  },
  methods: {
   //背景音乐初始化
    musicInit() {
      getProjectConfig().then(res => {
        let _data = JSON.parse(decodeURIComponent(res.data.data.content.info))
        this.musicSrc = _data.res_music
        this.playAudio(this.musicSrc, "audio", "audio-btn")
      }).catch(err => {
        console.log(err)
        this.autoPlayAudio("audio")
      })
    },
    //音乐播放
    playAudio(mp3Url, audioId, controls) {
      let _type = this.PROJECT_CONFIG.is_background_music.type
      isSystem().then(res => {
        if (_type == 0 || (_type == 1 && res.isiOS)) {
          this.autoPlayAudio(audioId)
        } else if (_type == 2 || (_type == 1 && res.isAndroid)) {
          this.isAudioType = 1
          audioContextMusic(mp3Url, controls, res => {
            if (res.status == 1) console.log("【背景音乐自动播放OK3】")
            this.isPlay = res.status
          })
        }
      })
    },
    //audio播放
    autoPlayAudio(audioId) {
      let _audio = document.getElementById(audioId)
      _audio.oncanplay = () => {
        _audio.play()
        this.isPlay = 1
        console.log("【背景音乐自动播放OK1】")
      }
      document.addEventListener("WeixinJSBridgeReady", () => {
        _audio.play();
        this.isPlay = 1
        console.log("【背景音乐自动播放OK2】")
      }, false)
    },
    //播放暂停
    playPause() {
      if (this.isAudioType) return
      let _audio = document.getElementById('audio')
      if (_audio.paused) {
        _audio.play()
        this.isPlay = 1
      } else { 
        _audio.pause() 
        this.isPlay = 2 
      }
    }
  }
}
</script>

<style scoped>
  .btns{position: fixed;right:0;top:0;padding: .3rem;z-index:999;transition: all .8s;}
  .btns img.btn-play{animation: rotate 2s linear infinite;}
  .btns img{box-shadow: 0 0 20px -2px #FFB8C4;border-radius: 50%;}
  .btns, .btns img{width:.5rem;height:.5rem;}
  .right-left-leave-active{right: -2rem;opacity: 0;}
  .right-left-enter{right: -2rem;opacity: 0;}
  @keyframes rotate{
    from {transform: rotate(0)}
    to {transform: rotate(360deg)}
  }
</style>

