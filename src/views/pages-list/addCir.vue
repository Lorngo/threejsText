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
  createCir,
} from "../../assets/js/initThree";
import MyHeader from "components/header.vue";
export default {
  name: "",
  data() {
    return {
      pageTitle: "添加球体",
    };
  },
  mounted() {
    this.initThree();
    this.initControls();
    this.addPlane();
    this.addLight();
    this.createCir();
  },
  methods: {
    initThree() {
      let Threeoptions = {
        render: {
          color: 0x000000,
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
    addPlane() {
      var options = {
        width: 300,
        height: 300,
        color: 0xaaaaaa,
        // color: 0xffffff,
        shadow: true,
        side: true,
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
    //添加灯光
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
        point: [
          {
            name: "点光1",
            color: 0xff00ff,
            shadow: true,
            distance: 1000,
            intensity: 1,
            position: {
              x: 0,
              y: 10,
              z: -10,
            },
            help: true,
          },
        ],
      };
      addLight(options);
    },
    //添加球体
    createCir() {
      var cirOption = {
        radius: 5,
        widthSegments: 60,
        heightSegments: 30,
        materialColor: 0xeeeeee,
        name: "球1",
        shadow: true,
        materialType: 1,
        position: {
          x: 0,
          y: 10,
          z: 0,
        },
      };
      createCir(cirOption);
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