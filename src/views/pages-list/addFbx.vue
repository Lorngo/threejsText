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
  addFbxmodel,
  rotationMesh
} from "../../assets/js/initThree";
import * as THREE from "three";
import MyHeader from "components/header.vue";
import { Toast } from 'vant'
export default {
  name: "",
  data() {
    return {
      pageTitle: "添加FBX模型",
    };
  },
  mounted() {
    this.initThree();
    this.initControls();
    this.addPlane();
    this.addLight();
    this.addFbxmodel();
  },
  methods: {
    initThree() {
      let Threeoptions = {
        render: {
          color: 0xffffff,
          shadow: true,
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
        color: 0xffffff,
        name: "平面1",
        side: true,
        shadow: true,
        position: {
          x: 0,
          y: -2,
          z: 0,
        },
        help: {},
      };
      addPlane(options);
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
    addFbxmodel() {
      Toast.loading()
      var options = {
        modelUrl: "https://img.vrupup.com/web/cdn/wyl/three/carGltf/car_02.fbx",
        position: { x: 0, y: 0, z: 0 },
        scale: { x: 0.05, y: 0.05, z: 0.05 },
        name: "car",
      };
      addFbxmodel(options).then((res) => {
        Toast.clear()
        var data = res.mesh;
        console.log("【执行了】======", res.mesh);
        data.rotateX((Math.PI * 3) / 2);
        data.rotateZ(Math.PI / 2);
        var material = new THREE.MeshPhongMaterial({
          color: 0x111e3d,
          depthWrite: true,
        });

        data.children.forEach((item, index) => {
          if (item.name == "前身") {
            item.material = material;
          }
          if (item.name == "玻璃") {
            item.material.transparent = true;
            item.material.opacity = 0.2;
          }
        });

        var rotation = {
          name: data.name,
          x: 0,
          y: 0,
          z: 0.01,
        };
        rotationMesh(rotation);
      });
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