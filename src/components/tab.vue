<template>
  <div class="tab">
    <dl class="flex-aro">
      <dd v-for="(item, $index) in tabList" :key="$index" @click="jumps($index)" :class="[curIndex == $index ? 'cur' : '']"> 
        <img v-if="tabType" :src="$index == curIndex ? item.icons : item.icon" alt="">
        <i v-else class="iconfont" :class="$index == curIndex ? item.icons : item.icon"></i>
        <p>{{item.title}}</p>
      </dd>
    </dl>  
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "",
    props: {
      // curIndex: {
      //   type: Number,
      //   default: 0
      // }
    },
    data() {
      return {
        tabType: 0,//0为字体图标、1为图片
        tabList: [
          { title: "首页", path:"/",  icon: "icon-shouye_xianxing", icons: "icon-shouye_tianchong"},
          { title: "我的", path:"/about",  icon: "icon-wode_xianxing", icons: "icon-wode_tianchong"}
        ],
        curIndex: 0
      }
    },
    created() {
      let _url = window.location.href.toLowerCase() || ''
      if (_url.indexOf('about') != -1) {
        this.curIndex = 1   
      } else {
        this.curIndex = 0
      }
    },
    mounted() {
      
    },
    methods: {
      jumps($index) {
        if (this.curIndex == $index) return
        this.$router.replace(this.tabList[$index].path)
        this.curIndex = $index  
      }    
    }
  }
</script>

<style scoped>
  .tab{max-width:750px;width: 100%;position: fixed;left:0;bottom:0;z-index: 9999;text-align: center;background: #fff;box-shadow: 0 .3rem .5rem 0 rgba(82, 86, 90, 0.81);}
  .tab img{width:.52rem;height: .52rem;}
  .tab dd{font-size: 0;padding:.12rem 0;width: 20%;position: relative;z-index: 5;}
  .tab dd i{font-size: .42rem;color:#878787;}
  .tab dd.cur i,.tab dd.cur p{color:#000;}
  .tab dd p{font-size: .22rem;color:#000;padding-top: 0.1rem;color: #878787;}
  @media screen and (min-width: 640px) {
    .tab{left:50%;transform: translateX(-50%);}
  }
</style>