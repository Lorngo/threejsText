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
  addGltfmodel,
  getModelanm
} from "../../assets/js/initThree";
import MyHeader from "components/header.vue";
import { Toast } from 'vant'
export default {
  name: "",
  data() {
    return {
      pageTitle : '添加GLT模型'
    };
  },
  mounted() {
    this.initThree();
    this.initControls();
    this.addPlane();
    this.addLight()
    this.addGltfmodel()
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
        shadow : true , 
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
            color: 0xffffff,
            shadow: true,
            position: {
              x: 10,
              y: 60,
              z: 40,
            },
            help: true,
          },
        ],
      };
      addLight(options);
    },
    //添加模型
    addGltfmodel(){
      Toast.loading()
        var options = {
        modelUrl: "https://img.vrupup.com/web/cdn/wyl/three/GLTF/dragon/scene.gltf",
        position: { x: 0, y: -3, z: 0 },
        scale: { x: 5, y: 5, z: 5 },
        shadow : true , 
      };
      addGltfmodel(options).then(model => {
          console.log('model.model=-=====',model)
           Toast.clear()
          var options = {
              model : model.mesh,
              animateModel : model.model
          }
          var animateArr = getModelanm(options)
          console.log('animateArr==========',animateArr[0])
          animateArr[0].play()
      });
    }
  },
  components: {
    MyHeader
  },
};
</script>

<style scoped>
#three{height: 100vh;}
</style>