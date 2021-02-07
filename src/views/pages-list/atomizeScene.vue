<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div id="three"></div>
  </div>
</template>

<script>
import {
  initThree,
  initControls,
  addPlane,
  addLight,
  addOctahedron,
  rotationMesh,
} from "../../assets/js/initThree";
import MyHeader from "components/header.vue";
import * as THREE from "three";
export default {
  name: "",
  data() {
    return {
      pageTitle: "添加雾化效果",
      threeDate: {}, //three的基础三个信息
    };
  },
  mounted() {
    this.initThree();
    this.initControls();
    this.addPlane();
    this.addLight();
    this.addOctahedron();
  },
  methods: {
    initThree() {
      let Threeoptions = {
        render: {
          color: 0xffffff,
        },
        scene: {
          fog : {
              color : 0xa0a0a0,
              near : 5,
              far : 100,
          },
          color: 0xa0a0a0,
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
    //添加灯光
    addLight() {
      var options = {
        ambient: {
          color: 0xffffff,
        },
      };
      addLight(options);
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
        help: {},
      };
      addPlane(options);
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
    addOctahedron() {
      var options = {
        radius: 3,
        detail: 0,
        position: {
          x: 0,
          y: 5,
          z: 0,
        },
        name: "八面体",
      };

      addOctahedron(options);

      var rotationOptions = {
        name: "八面体",
        x: 0.01,
        y: 0,
        z: 0.01,
      };
      rotationMesh(rotationOptions);
    },
  },
  components: {
    MyHeader,
  },
};
</script>

<style scoped >
#three {
  height: 100vh;
}
</style>