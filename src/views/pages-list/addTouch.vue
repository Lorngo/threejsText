<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div id="three" ref="three"></div>
  </div>
</template>

<script>
import {
  initThree,
  initControls,
  addLight,
  rotationMesh,
  addCube,
  addTouch,
} from "../../assets/js/initThree";
import MyHeader from "components/header.vue";
export default {
  name: "",
  data() {
    return {
      pageTitle: "点击事件",
    };
  },
  mounted() {
    this.initThree();
    this.initControls();
    this.addLight();
    this.addCube();
    this.addTouch();
    this.$refs.three.addEventListener("touchstart", (res) => {
      var targetMesh = this.$refs.three.targetMesh;
      if (targetMesh) {
        targetMesh.object.material.color.set(0xff0000);
      }
    });
  },
  methods: {
    initThree() {
      let Threeoptions = {
        render: {
          color: 0xffffff,
          shadow: true,
        },
        scene: {
          skyBox: false,
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
    initControls() {
      let controlsOptions = {
        autoRotate: false, //是否开启自动旋转
        enableDamping: true, //是否开启惯性
        enableZoom: true, //是否可以缩放
        minDistance: 1, //设置相机距离原点的最远距离
        maxDistance: 2000, //设置相机距离原点的最远距离
      };
      initControls(controlsOptions);
    },
    addLight() {
      var options = {
        ambient: {
          color: 0xffffff,
        },
        direction: [
          {
            name: "灯1",
            color: 0xffff00,
            shadow: true,
            position: {
              x: 0,
              y: 15,
              z: 20,
            },
            help: true,
          },
        ],
      };
      addLight(options);
    },
    addCube() {
      var options = {
        num: 200,
        size: 400,
        name: "区域",
        width: 20,
      };
      addCube(options);
    },
    addTouch() {
      let model = addTouch();
    },
  },
  components: {
    MyHeader,
  },
};
</script>

<style scoped >
#three {
  position: relative;
  height: 100vh;
}
</style>