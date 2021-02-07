<template>
  <div class="body index">
    <scroll class="ul">
      <ul>
        <li
          v-for="(item, index) in jumpList"
          :class="{ dis: !item.url }"
          :key="'key' + index"
          @click="jump(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from "base/scroll/scroll.vue";

import {
  initThree,
  initControls,
  createCir,
  addLight,
  addGltfmodel,
  addTouch,
  create360,
  addFbxmodel,
  rotationMesh,
  initStats,
  addPlane,
} from "../assets/js/initThree";
export default {
  name: "index",
  data() {
    return {
      name: "首页",
      percentNum: 0,
      jumpList: [
        { name: "添加场景", url: "/addScene" },
        { name: "添加平面", url: "/addPlane" },
        { name: "添加球体", url: "/addCir" },
        { name: "球形全景", url: "/cir360" },
        { name: "添加GLT模型", url: "/addGlt" },
        { name: "添加FBX模型", url: "/addFbx" },
        { name: "添加点击事件", url: "/addTouch" },
        { name: "场景雾化效果", url: "/atomizeScene" },
        { name: "定制鞋", url: "/customShoes" },
        { name: "初识Shader", url: "/addShader" },
        { name: "城市标点", url: "/citySprite" },
        { name: "银河系", url: "/system" },
        { name: "开启陀螺仪", url: "/deviceOrientation" },
        { name: "Ar", url: "/ar" },
        { name: "添加地球", url: "/addEarth" },
      ],
      threeDate: {}, //threejs初始信息
    };
  },
  mounted() {},
  methods: {
    //跳转
    jump(index) {
      if (!this.jumpList[index].url) return;
      // sessionStorage.setItem('prevPage', this.jumpList[index].url)
      this.$router.replace(this.jumpList[index].url);
    },
    //添加平面
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
    //初始化three
    three() {
      let Threeoptions = {
        render: {
          color: 0x000000,
        },
        scene: {
          skyBox: false,
          skyBoxurl: "",
          skyBoxarr: [
            require("../assets/images/dark-s_nx.jpg"),
            require("../assets/images/dark-s_ny.jpg"),
            require("../assets/images/dark-s_nz.jpg"),
            require("../assets/images/dark-s_px.jpg"),
            require("../assets/images/dark-s_py.jpg"),
            require("../assets/images/dark-s_pz.jpg"),
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
    //初始化相机轨道控制器
    control() {
      let controlsOptions = {
        autoRotate: false, //是否开启自动旋转
        enableDamping: true, //是否开启惯性
        enableZoom: true, //是否可以缩放
        minDistance: 1, //设置相机距离原点的最远距离
        maxDistance: 2000, //设置相机距离原点的最远距离
      };
      initControls(controlsOptions);
    },
    createCir() {
      var cirOption = {
        radius: 10,
        widthSegments: 60,
        heightSegments: 30,
        materialColor: "0xff00ff",
        name: "球1",
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      };
      createCir(cirOption);
    },
    //初始化性能插件
    initStats() {
      initStats();
    },
    initLight() {
      var options = {
        // ambient: {
        //   color: 0xffff00,
        // },
        direction: [
          {
            name: "灯1",
            color: 0xffffff,
            position: {
              x: -30,
              y: 20,
              z: 20,
            },
            help: true,
          },
          {
            name: "灯2",
            color: 0xff00ff,
            position: {
              x: -30,
              y: 20,
              z: 20,
            },
            help: true,
          },
        ],
      };
      addLight(options);

      var lightMove = {
        name: "灯1",
        x: 0,
        y: 0,
        z: 0.01,
      };
      // rotationMesh(lightMove);
    },
    addModel() {
      // var options = {
      //   modelUrl: "https://img.vrupup.com/web/cdn/wyl/three/carGltf/car2.glb",
      //   position: { x: 0, y: 0, z: 0 },
      //   scale: { x: .05, y: .05, z: .05 },
      // };
      // addGltfmodel(options);

      var options = {
        modelUrl: "https://img.vrupup.com/web/cdn/wyl/three/carGltf/car_02.fbx",
        position: { x: 0, y: 0, z: 0 },
        scale: { x: 0.05, y: 0.05, z: 0.05 },
        name: "car",
      };
      addFbxmodel(options).then((res) => {
        var data = res.mesh;
        data.rotateX((Math.PI * 3) / 2);
        data.rotateZ(Math.PI / 2);
        var rotation = {
          name: data.name,
          x: 0,
          y: 0,
          z: 0.01,
        };
        rotationMesh(rotation);
      });
    },
    addTouch() {
      addTouch();
    },
    //创建360全景图
    create360() {
      let options = {
        cirRadius: 60,
        widthSegments: 100,
        heightSegments: 40,
      };
      create360(options);
    },
  },
  components: {
    Scroll,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p.name {
  width: 4.2em;
  margin: 0.2rem auto;
  border: 1px solid green;
}
.index {
  background: linear-gradient(135deg, #027c60 0%, #a8271e 100%);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ul {
  height: calc(100vh - 2.84rem);
  overflow: hidden;
}
ul li {
  width: 2.5rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 0.1rem;
  margin: 0 auto 0.15rem;
  background: #fff;
  font-size: 0.28rem;
}
ul li.dis {
  color: #bbb;
}
</style>