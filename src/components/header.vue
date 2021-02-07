<template>
  <div class="header">
    <div class="wrap">
      <div class="back" v-if="isBack" @click="back"><i class="iconfont icon-fanhui1"></i></div>
      <h3>{{title}}</h3>
    </div>  
  </div>
</template>

<script type="text/ecmascript-6">
// import { MessageBox, Indicator } from 'mint-ui'
export default {
  name: "",
  props: {
    title: {
      type: String,
      default: '页面标题'    
    },
    isBack: {
      type: Boolean,
      default: true  
    } 
  },
  data() {
    return {

    }
  },
  methods: {
    back() {
      let _url = sessionStorage.getItem('prevPage') || '/'
      this.$router.replace(_url)
      sessionStorage.setItem('prevPage', '')
    }    
  }
}
</script>

<style scoped>
  .header{max-width:750px;height:.92rem;line-height: .92rem;background: #027C60;font-size: .36rem;color:#fff;text-align: center;position: fixed;width:100%;left:0;top:0;z-index: 450;}  
  .header .back{width:.4rem;padding-right: 4%;height:100%;position: absolute;left: 0;top:0;background-size: .4rem;transition: all .5s;transform-origin: .2rem center;padding-right: 0;padding-left: 4%;background-position: right .11rem center;}
  .header .back i{font-size:.44rem;}
  @media screen and (min-width: 640px) {
    .header{left:50%;transform: translateX(-50%);}
  }
</style>