<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div id="three"></div>
    <button class="start" @click="webArInit" v-if="videoDeviceList.length == 0">
      一键开启AR
    </button>
    <button class="start2" @click="openDeviceClick" v-if="!openDevice">
      开启陀螺仪
    </button>
  </div>
</template>

<script>
import MyHeader from "components/header.vue";
import WebAR from "assets/js/webar";
import {
  initThree,
  initControls,
  addPlane,
  addLight,
  addGltfmodel,
  rotationMesh,
  addDeviceOrientation,
} from "../../assets/js/initThree";
import * as THREE from "three";
import { Toast } from "vant";
export default {
  name: "",
  data() {
    return {
      pageTitle: "ar",
      webAr: null, //webar实例
      videoDeviceList: [], //可用摄像头
      videoDeviceIndex: 1, //摄像头索引
      openDevice: false,
    };
  },
  mounted() {
    this.initThree();
    this.initControls();
    this.addLight();
    this.addGltfmodel();
  },
  methods: {
    //AR初始化
    webArInit() {
      this.webAr = new WebAR();
      console.log("this.webAr", this.webAr);
      this.webAr
        .listCamera()
        .then((res) => {
          console.log("可用摄像头", res);
          this.videoDeviceList = res;
          this.openCamera(true);
        })
        .catch((err) => {
          // 没有找到摄像头
          console.info(err);
        });
    },
    //打开摄像头
    openCamera(open) {
      if (!open) {
        this.videoDeviceIndex == 0
          ? (this.videoDeviceIndex = 1)
          : (this.videoDeviceIndex = 0);
      }
      this.webAr
        .openCamera(this.videoDeviceList[this.videoDeviceIndex])
        .then((msg) => {
          this.isStart = true;
          console.log("【摄像头打开成功】");
        })
        .catch((err) => {
          console.log("【摄像头打开失败】");
        });
    },
    initThree() {
      let Threeoptions = {
        render: {
          color: 0xffffff,
          alpha: true,
        },
        scene: {
          skyBox: false,
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
    //开启系统陀螺仪
    openDeviceClick() {
      window.DeviceOrientationEvent.requestPermission().then((state) => {
        if (state === "granted") {
          //允许
          console.error("用户允许", state);
          this.openDevice = true;

          this.addDeviceOrientation();
        } else if (state === "denied") {
          //拒绝
          console.error("用户拒绝", state);
        } else if (state === "prompt") {
          console.error("用户干了啥", state);
        }
      });
    },
    //开启陀螺仪
    addDeviceOrientation() {
      addDeviceOrientation();
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
    //添加模型
    addGltfmodel() {
      Toast.loading();
      var options = {
        modelUrl: "https://img.vrupup.com/web/cdn/wyl/three/boat/scene.gltf",
        position: { x: -30, y: -100, z: -12 },
        scale: { x: 6, y: 6, z: 6 },
        // shadow : true ,
        name: "boat",
      };
      addGltfmodel(options).then((model) => {
        Toast.clear();
      });
    },
  },
  components: {
    MyHeader,
  },
};
</script>

<style scoped >
.body {
  position: relative;
}
#three {
  width: 100%;
  height: 100vh;
  z-index: 400;
  position: absolute;
}
.start {
  background: linear-gradient(-135deg, #0088d2 0%, #a8271e 100%);
  color: white;
  padding: 0.2rem;
  border-radius: 0.1rem;
  font-size: 0.3rem;
  position: fixed;
  z-index: 500;
  left: 0;
  top: 2rem;
}

.start2 {
  background: linear-gradient(-135deg, #0088d2 0%, #a8271e 100%);
  color: white;
  padding: 0.2rem;
  border-radius: 0.1rem;
  font-size: 0.3rem;
  position: fixed;
  z-index: 500;
  left: 0;
  top: 3rem;
}
</style>