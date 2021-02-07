<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div class="full-screen"></div>
  </div>
</template>

<script type="text/ecmascript-6">

import MyHeader from "components/header.vue"
export default {
  name: "",
  data() {
    return {
      pageTitle: "这是页面标题"
    }
  },
  components: {
    MyHeader
  }
}
</script>

<style scoped>
  
</style>