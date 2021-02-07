<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div id="three"></div>
  </div>
</template>

<script>
import MyHeader from "components/header.vue";
import {
  initThree,
  initControls,
  addLight,
  createCir,
  positionMesh,
} from "../../assets/js/initThree";
export default {
  name: "",
  data() {
    return {
      pageTitle: "银河系",
    };
  },
  mounted() {
    this.initThree();
    this.initControls();
    this.createCir();
    this.addLight();
    this.initRotation();
  },
  methods: {
    //添加灯光
    addLight() {
      var options = {
        ambient: {
          color: 0xffffff,
        },
      };
      addLight(options);
    },
    initThree() {
      let Threeoptions = {
        render: {
          color: 0x000000,
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
            y: 0,
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
    //生成球体
    createCir() {
      var cirOption = {
        widthSegments: 60,
        heightSegments: 30,
        materialType: 1,
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      };
      for (var i = 0; i < 7; i++) {
        if (i == 0) {
          cirOption.radius = 14;
          cirOption.name = "太阳";
          cirOption.materialColor = "rgb(220,20,60)";
          cirOption.position.z = 0;
        } else if (i == 1) {
          cirOption.radius = 2;
          cirOption.name = "水星";
          cirOption.materialColor = "rgb(124,131,203)";
          cirOption.position.z = 20;
        } else if (i == 2) {
          cirOption.radius = 4;
          cirOption.name = "金星";
          cirOption.materialColor = "rgb(190,138,44)";
          cirOption.position.z = 30;
        } else if (i == 3) {
          cirOption.radius = 5;
          cirOption.name = "地球";
          cirOption.materialColor = "rgb(46,69,119)";
          cirOption.position.z = 40;
        } else if (i == 4) {
          cirOption.radius = 4;
          cirOption.name = "火星";
          cirOption.materialColor = "rgb(210,81,16)";
          cirOption.position.z = 50;
        } else if (i == 5) {
          cirOption.radius = 9;
          cirOption.name = "木星";
          cirOption.materialColor = "rgb(254,208,101)";
          cirOption.position.z = 70;
        } else if (i == 6) {
          cirOption.radius = 7;
          cirOption.name = "天王星";
          cirOption.materialColor = "rgb(210,140,39)";
          cirOption.position.z = 100;
        }

        createCir(cirOption);
      }
    },
    //注册公转
    initRotation() {
      let options = {
        meshArr: [
          {
            name: "太阳",
          },
          {
            name: "水星",
          },
          {
            name: "金星",
          },
          {
            name: "地球",
          },
          {
            name: "火星",
          },
          {
            name: "木星",
          },
          {
            name: "天王星",
          },
        ],
      };
      positionMesh(options);
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