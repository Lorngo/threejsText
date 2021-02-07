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
  addPlane,
  addLight,
  addGltfmodel,
  addSprite,
} from "../../assets/js/initThree";
export default {
  name: "",
  data() {
    return {
      pageTitle: "城市标点",
    };
  },
  mounted() {
    this.initThree();
    this.initControls();
    this.addPlane();
    this.addLight();
    this.addGltfmodel();
    this.addSprite()
  },
  methods: {
    initThree() {
      let Threeoptions = {
        render: {
          color: 0xffffff,
        },
        scene: {
          color: 0xffffff,
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
    //添加平面
    addPlane() {
      var options = {
        width: 300,
        height: 300,
        color: 0xffffff,
        name: "plane1",
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
      };
      addLight(options);
    },
    //添加gltf模型
    addGltfmodel() {
      var options = {
        modelUrl: "https://img.vrupup.com/web/cdn/wyl/three/city5/scene.gltf",
        position: { x: 0, y: 0, z: 50 },
        scale: { x: 0.01, y: 0.01, z: 0.01 },
        help: true,
        name: "shoes",
      };
      addGltfmodel(options);
    },
    //添加精灵
    addSprite() {
        let options = {
            spriteArr : [
                {
                    url : 'https://img.vrupup.com/web/cdn/wyl/wdgs/index/button1.png' , 
                    position : {
                        x : 30 , 
                        y : 20 , 
                        z : 0 , 
                    },
                    scale : {
                        x : 10 , 
                        y : 2 , 
                        z : 0 ,
                    },
                    name : '点1'
                },
                 {
                    url : 'https://img.vrupup.com/web/cdn/wyl/wdgs/index/button1.png' , 
                    position : {
                        x : 35 , 
                        y : 35 , 
                        z : -30 , 
                    },
                    scale : {
                        x : 10 , 
                        y : 2 , 
                        z : 0 ,
                    },
                    name : '点2'
                },
                 {
                    url : 'https://img.vrupup.com/web/cdn/wyl/wdgs/index/button1.png' , 
                    position : {
                        x : 20 , 
                        y : 20 , 
                        z : 50 , 
                    },
                    scale : {
                        x : 10 , 
                        y : 2 , 
                        z : 0 ,
                    },
                    name : '点3'
                }
            ]
        }
      addSprite(options);
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