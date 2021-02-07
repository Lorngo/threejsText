<template>
  <div class="addEarth">
    <my-header :title="pageTitle"></my-header>
    <div id="three" @touchmove="moveCir"></div>
  </div>
</template>

<script>
import MyHeader from "components/header.vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
import { TextureLoader } from "three";
var renderer,
  scene,
  camera,
  stats,
  light,
  controls,
  number = 0;
export default {
  name: "addEarth",
  data() {
    return {
      pageTitle: "添加地球",
      dom: "",
    };
  },
  mounted() {
    this.dom = document.getElementById("three");
    // this.addEarth();
    this.draw();
    this.animate();
  
    // document.getElementById("three").addEventListener('touchmove',()=>{
    //   console.log('执行了',controls.getAzimuthalAngle())

    // },false)
    
  },
  methods: {
    //移动圆形
    moveCir(){
      console.log('执行了',controls.getAzimuthalAngle())
    },
    initRenderer() {
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      // renderer.shadowMap.enabled = true;
      //告诉渲染器需要阴影效果
      this.dom.appendChild(renderer.domElement);
    },
    //实例化three
    initScene() {
      scene = new THREE.Scene();
      var skyBoxarr = [
        require("../../assets/images/dark-s_nx.jpg"),
        require("../../assets/images/dark-s_ny.jpg"),
        require("../../assets/images/dark-s_nz.jpg"),
        require("../../assets/images/dark-s_px.jpg"),
        require("../../assets/images/dark-s_py.jpg"),
        require("../../assets/images/dark-s_pz.jpg"),
      ];
      var cubeTextureLoader = new THREE.CubeTextureLoader();
      var cubeTexture = cubeTextureLoader.load(skyBoxarr);
      scene.background = cubeTexture;
    },
    //初始化相机
    initCamera() {
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.lookAt(0, 0, 0);
    },

    initLight() {
      scene.add(new THREE.AmbientLight(0x444444));

      light = new THREE.DirectionalLight(0xffffff, 2, 0);
      light.position.set(0, 15, 20);

      // light.castShadow = true;
      // light.shadow.camera.top = 10;
      // light.shadow.camera.bottom = -10;
      // light.shadow.camera.left = -10;
      // light.shadow.camera.right = 10;

      //告诉平行光需要开启阴影投射
      // light.castShadow = true;

      scene.add(light);
    },
    //初始化控制器
    initControls() {
      controls = new OrbitControls(camera, renderer.domElement);
      //是否自动旋转
      controls.autoRotate = false;
      // controls.maxAzimuthAngle = -((Math.PI / 90) * 80);
      // controls.minAzimuthAngle = -((Math.PI / 90) * 90);
      // controls.maxPolarAngle = (Math.PI / 90) * 30;
      // controls.minPolarAngle = (Math.PI / 90) * 20;
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      controls.enableDamping = true;
      //是否可以缩放
      controls.enableZoom = true;
      controls.autoRotateSpeed = 0.5;
      //设置相机距离原点的最远距离
      controls.minDistance = 1;
      //设置相机距离原点的最远距离
      controls.maxDistance = 2000;

      controls.addEventListener('change',()=>{
        var nowXangele = controls.getAzimuthalAngle()
         console.log('执行了======',nowXangele)
        if(nowXangele >= 0){
         controls.panSpeed = .4
          console.log('执行了======',controls)
        }
        var nowYangele = controls.getPolarAngle()
      },)
    },
    render() {
      controls.update();
      renderer.render(scene, camera);
    },

    animate() {
      this.render();

      var mesh = scene.getObjectByName("cloud");
      if (mesh) {
        number += 0.01;
        if (number >= 100) {
          number = 0;
        }
        mesh.material.uniforms.time.value = number;
      }
      requestAnimationFrame(this.animate);
    },
    //添加地球
    addEarth() {
      var textureCommon = new THREE.TextureLoader().load(
        require("../../assets/images/Earth.png")
      );
      var textureSpecular = new THREE.TextureLoader().load(
        require("../../assets/images/earth_specular.png")
      );
      var otTexture = new THREE.TextureLoader().load(
        require("../../assets/images/EarthNormal.png")
      );
      var cloud = new THREE.TextureLoader().load(
        require("../../assets/images/cloud.png")
      );
      cloud.wrapS = THREE.RepeatWrapping;
      cloud.wrapT = THREE.RepeatWrapping;
      var noise = new THREE.TextureLoader().load(
        require("../../assets/images/nosie.jpg")
      );
      var geometry = new THREE.SphereGeometry(60, 100, 40);

      var material = new THREE.MeshPhongMaterial({
        shininess: 50, //高光部分的亮度
        map: textureCommon, //普通贴图
        specularMap: textureSpecular, //高光贴图
        // bumpMap: otTexture, //添加凹凸贴图
        // bumpScale: 5, //高度影响度
      });
      var mesh = new THREE.Mesh(geometry, material);

      scene.add(mesh);

      var geometry2 = new THREE.SphereGeometry(63, 100, 40);
      var vertexShader = `
       precision lowp float;
            precision lowp int;
            varying vec2 vUv;
            varying vec3 vNormalW;
            void main(){
              vUv = uv;
              vNormalW = normalize ( mat3( modelMatrix[0].xyz,modelMatrix[1].xyz,modelMatrix[2].xyz) * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
              vNormalW  = gl_Position.xyz;
            }
            `;
      // vUv = ( uvTransform * vec3( uv.x + number * xUV,uv.y + number*xUV,1 ) ).xy
      //  #include <color_vertex>
      var fragmentShader = `
             uniform float time;
            uniform sampler2D noise;
            uniform sampler2D map;
            varying vec2 vUv;
            uniform float opacity;
            void main(){
               vec4 noiseT = texture2D(noise,vUv);
               vec2 T1 = vUv + vec2(1.5,-1.5) * time * 0.01;
               vec2 T2 = vUv + vec2(-0.5,2.0) * time * 0.01;
               
               T1.x -= noiseT.r * 2.0;
               T1.y += noiseT.g * 4.0;
               T2.x += noiseT.g * 0.2;
               T2.y += noiseT.b * 0.2;
               float p = texture2D(map,T1 * 2.0).a + 0.25;
               vec4 color = texture2D(map,T2);
               vec4 temp = color * 2.0 * (vec4(p,p,p,p)) + (color * color);
               gl_FragColor = vec4(temp.rgb,temp.a*opacity);
            }`;

      var material2 = new THREE.ShaderMaterial({
        uniforms: {
          ...THREE.ShaderLib["phong"].uniforms,
          time: {
            value: 0,
          },
          noise: {
            value: null,
          },
        },
        transparent: true,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      });

      material2.lights = true;
      material2.map = cloud;

      material2.uniforms.map.value = material2.map;
      material2.uniforms.noise.value = noise;
      material2.uniforms.time.value = 0;

      var mesh2 = new THREE.Mesh(geometry2, material2);
      mesh2.name = "cloud";
      mesh.name = "earth";
      scene.add(mesh2);
      camera.position.x = -140;
    },
    draw() {
      this.initRenderer();
      this.initScene();
      this.initCamera();
      this.initControls();
      this.initLight();
      this.addEarth();
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