<template>
  <div class="body">
    <div class="con flex-cen">我的</div>
    <tab></tab>
  </div>
</template>

<script type="text/ecmascript-6">
import Tab from 'components/tab.vue'
export default {
  name: "",
  data() {
    return {
      
    }
  },
  components: {
    Tab
  }
}
</script>

<style scoped>
  .body{padding-bottom: 1rem;background: linear-gradient(135deg,#fff 0%, #977924 100%);}
  .body,.con{height:100%;font-size:.6rem;font-style:italic;color:#000;}
</style>