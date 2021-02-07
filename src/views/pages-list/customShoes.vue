<template>
  <div class="body">
    <my-header :title="pageTitle"></my-header>
    <div id="three"></div>

    <scroll class="listBox" ref="scroll1">
        <div>
          <div class="list">
            <div class="top" v-for="(item, index) in shoesArr" :key="index">
              <div class="title">{{ item.name }}</div>
              <div
                v-for="(ite, ind) in colorArr"
                :key="ind"
                @click="changeColor(item.name,ite.color1)"
                :style="`background:url(${ite.color1}) no-repeat 50% 50% / 100%`"
              ></div>
            </div>
          </div>
        </div>
      </scroll>
  </div>
</template>

<script>
import MyHeader from "components/header.vue";
import Scroll from "base/scroll/scroll.vue";
import {
  initThree,
  initControls,
  addLight,
  rotationMesh,
  addGltfmodel,
  reviseMaterial
} from "../../assets/js/initThree";

export default {
  name: "",
  data() {
    return {
      pageTitle: "定制鞋",
      shoesArr : [] , //鞋的所有面
       colorArr: [
        {
          color1:
            "https://img.vrupup.com/web/cdn/wyl/three/shoesGltf/shoesMaterial/material1.jpg",
        },
        {
          color1:
            "https://img.vrupup.com/web/cdn/wyl/three/shoesGltf/shoesMaterial/material2.jpeg",
        },
        {
          color1:
            "https://img.vrupup.com/web/cdn/wyl/three/shoesGltf/shoesMaterial/material3.jpg",
        },
        {
          color1:
            "https://img.vrupup.com/web/cdn/wyl/three/shoesGltf/shoesMaterial/material4.jpeg",
        },
      ], //颜色数组
    };
  },
  mounted() {
    this.initThree();
    this.addLight();
    this.initControls();
    this.addGltfmodel();
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
    //添加gltf模型
    addGltfmodel() {
      var options = {
        modelUrl:
          "https://img.vrupup.com/web/cdn/wyl/three/shoesGltf/shoes2.glb",
        position: { x: 3, y: -3, z: 6 },
        scale: { x: 20, y: 20, z: 20 },
        help : true , 
        name : 'shoes'
      };
      addGltfmodel(options).then((res) => {
         this.shoesArr = res.mesh.children
        this.shoesArr.forEach((item,index) => {
            if(item.name == '鞋面002'){
                item.position.y = .14
                item.scale.set(-0.0009,-0.0009,-0.0009)
            }
        })
      });
    },
    //修改材质
    changeColor(name,material){
        var data = {
             materialUrl : material ,
             groupName : 'shoes',
             meshName : name
        }
        reviseMaterial(data)
    }
  },
  components: {
    MyHeader,
    Scroll
  },
};
</script>

<style scoped >
#three {
  height: 100vh;
  position: relative;
}
.listBox {
  width: 100%;
  position: relative;
  bottom: 3rem;
  height: 2.4rem;
  overflow: hidden;
  z-index: 100;
}

.list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.list .top {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.3rem;
}

.list .top div {
  width: 1rem;
  height: 1rem;
}

.list .top .title {
  font-size: 0.16rem;
  background-color: skyblue;
  text-align: center;
  line-height: 1rem;
}
</style>