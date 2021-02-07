<template>
  <div class="body">
     <my-header :title="pageTitle"></my-header>
    <div id="three"></div>
  </div>
</template>

<script>
import { initThree, initControls, addPlane , addLight, } from "../../assets/js/initThree";
import MyHeader from "components/header.vue";
export default {
  name: "",
  data() {
    return {
       pageTitle : '添加平面'
    };
  },
  mounted() {
    this.initThree();
    this.addPlane();
    this.initControls()
    this.addLight()
  },
  methods: {
    initThree() {
      let Threeoptions = {
        render: {
          color: 0xffffff,
        },
        scene: {
          skyBox: true,
          skyBoxurl: "",
          skyBoxarr: [
            require("../../assets/images/dark-s_nx.jpg"),
            require("../../assets/images/dark-s_ny.jpg"),
            require("../../assets/images/dark-s_nz.jpg"),
            require("../../assets/images/dark-s_px.jpg"),
            require("../../assets/images/dark-s_py.jpg"),
            require("../../assets/images/dark-s_pz.jpg"),
          ],
        },
        camera: {
          far: 1000,
          position: {
            x: 0,
            y: 5,
            z: 30,
          },
        },
      };
      this.threeDate = initThree(Threeoptions);
    },
    //开启控件
    initControls(){
         let controlsOptions = {
        autoRotate: false, //是否开启自动旋转
        enableDamping: true, //是否开启惯性
        enableZoom: true, //是否可以缩放
        minDistance: 1, //设置相机距离原点的最远距离
        maxDistance: 2000, //设置相机距离原点的最远距离
      };
        initControls(controlsOptions)
    },
    addPlane() {
      var options = {
        width: 300,
        height: 300,
        color: 0xffffff,
        name: "平面1",
        position: {
          x: 0,
          y: -2,
          z: 0,
        },
        // help: {},
      };
      addPlane(options);
    },
    //添加灯光
    addLight(){
         var options = {
        ambient: {
          color: 0xffffff,
        },
      };
      addLight(options);
    }
  },
  components: {
    MyHeader
  },
};
</script>

<style scoped >
#three{height: 100vh;}
</style>