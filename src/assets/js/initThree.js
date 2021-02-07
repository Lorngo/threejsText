import * as THREE from 'three'
import Stats from "three/examples/jsm/libs/stats.module";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
let renderer, scene, camera, controls, stats, controls2;
let mixer;
let clock = new THREE.Clock();
//传递给着色器的参数
let uniforms = {

};
let openShader = true;
//初始化three的方法
const initThree = options => {
    //将options的值分割成传入的值
    let renderOptions = options.render
    let sceneOptions = options.scene
    let cameraOptions = options.camera

    //dom元素数据
    let dom = document.getElementById('three')
    // uniforms = {
    //     iTime: { value: 1.0 },
    //     iResolution: { value: new THREE.Vector2(dom.offsetWidth * 1.0, dom.offsetHeight * 1.0) },
    //     iMouse: { value: new THREE.Vector2(0.0, 0.0) }
    // }
    uniforms = {
        ...THREE.ShaderLib["phong"].uniforms,
        time: {
            value: 0
        },
        noise: {
            value: null
        }
    }
    //初始化渲染器
    function initRenderer(options) {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: options.alpha ? true : false });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(dom.offsetWidth, dom.offsetHeight);
        if (options.color) {
            renderer.setClearColor(options.color)
        }
        if (options.shadow) {
            renderer.shadowMap.enabled = true
        }
        if (options.alpha) {
            renderer.setClearAlpha(0);
        }
        dom.appendChild(renderer.domElement);
    }
    //初始化场景
    function initScene(options) {
        scene = new THREE.Scene();
        if (options.skyBox) {
            var cubeTextureLoader = new THREE.CubeTextureLoader()
            cubeTextureLoader.setPath(options.skyBoxurl)
            var cubeTexture = cubeTextureLoader.load(options.skyBoxarr)
            scene.background = cubeTexture
        }
        if (options.color) {
            scene.background = new THREE.Color(options.color)
        }
        if (options.fog) {
            scene.fog = new THREE.Fog(options.fog.color, options.fog.near, options.fog.far);
        }
        if (options.help) {
            var helper = new THREE.AxesHelper(100) //红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
            scene.add(helper)
        }

    }
    //初始化相机
    function initCamera(option) {
        var far = option.far;
        var cameraPosition = option.position;
        camera = new THREE.PerspectiveCamera(
            45,//视野角度
            dom.offsetWidth / dom.offsetHeight, //长宽比
            0.1, //近截点
            far, //远截面
        );
        camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        camera.lookAt(0, 0, 0);
    }
    function render() {
        if (controls) {
            controls.update()
        }
        if (controls2) {
            controls2.update()
        }
        if (stats) {
            stats.update()
        }
        let time = clock.getDelta()
        if (mixer) {
            mixer.update(time)
        }
        renderer.render(scene, camera);
    }
    function animate() {
        if (openShader) {
            //测试用
            var mesh = scene.getObjectByName('cloud') 
            if(mesh){
                var delta = clock.getDelta(); // 获取本次和上次的时间间隔
                mesh.material.uniforms.time.value += delta;
                if(mesh.material.uniforms.time.value >= 10){
                    mesh.material.uniforms.time.value = 0
                }
            }
            // uniforms.time.value += delta; // 设置着色器使用的 iTime 参数
        }
        if (scene.children.length != 0) {
            scene.children.forEach((item, index) => {
                if (item.userData.rotation) {
                    item.rotation.x += item.userData.rotation.rotationX
                    item.rotation.y += item.userData.rotation.rotationY
                    item.rotation.z += item.userData.rotation.rotationZ
                }
                if (item.userData.position) {
                    let mesh = item.userData.position
                    mesh.angle += mesh.speed
                    if (mesh.angle > Math.PI * 2) {
                        mesh.angle -= Math.PI * 2;
                    }
                    item.position.set(item.userData.position.z * Math.sin(mesh.angle), 0, item.userData.position.z * Math.cos(mesh.angle))
                }
            })
        }

        render();

        requestAnimationFrame(animate);
    }
    //动态计算屏幕宽高
    function onWindowResize() {
        camera.aspect = dom.offsetWidth / dom.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(dom.offsetWidth, dom.offsetHeight);
    }
    //初始化进行
    function draw() {
        initRenderer(renderOptions)
        initScene(sceneOptions)
        initCamera(cameraOptions)
        animate()
        window.onresize = onWindowResize
    }
    draw()
    return { renderer, scene, camera }
}
/**
 *  初始化相机控件 轨道控制器
 *  options{
 *    autoRotate : false , //是否开启自动旋转
      enableDamping : true , //是否开启惯性
      enableZoom : true ,  //是否可以缩放
      minDistance : 1 ,  //设置相机距离原点的最远距离
      maxDistance : 2000 , //设置相机距离原点的最远距离
 * }
 */

const initControls = options => {
    controls = new OrbitControls(camera, renderer.domElement);

    //测试用
    controls.maxAzimuthAngle = -(Math.PI / 90 * 80)
    controls.minAzimuthAngle = -(Math.PI / 90 * 90)
    controls.maxPolarAngle = (Math.PI / 90 * 30)
    controls.minPolarAngle = (Math.PI / 90 * 20)


    controls.autoRotate = options.autoRotate;
    controls.enableDamping = options.enableDamping;
    controls.enableZoom = options.enableZoom;
    controls.autoRotateSpeed = 0.5;
    controls.minDistance = options.minDistance;
    controls.maxDistance = options.maxDistance;
    //是否开启右键拖拽
    controls.enablePan = true;
}

/** 
 *  添加球体  
 *  options = {
 *   radius  , 球体半径
 *   widthSegments  , 水平分段数
 *   heightSegments  , 垂直分段数
 *   materialColor , 材质颜色 0x开头
 *   mapUrl , 高光贴图地址
 *   mapColor , 高光颜色
 *   name : '' ,球体名字 
 * materialType : 1 , 1 代表 PhongMaterial 2 代表 lambert
 *   lightshininess ,高光平滑度
 *   position : {
 *   x , y , z
 * }
 * }
 * 
 *   材质暂时只用
 * 
 */

const createCir = options => {
    var geometry = new THREE.SphereGeometry(options.radius, options.widthSegments, options.heightSegments)
    if (options.materialType == 1) {
        var material = new THREE.MeshPhongMaterial({
            color: options.materialColor
        })
    } else if (options.materialType == 2) {
        var material = new THREE.MeshLambertMaterial({
            color: options.materialColor
        })
    }
    var material = new THREE.MeshLambertMaterial({
        color: options.materialColor
    })
    //添加高光贴图
    if (options.mapUrl) {
        material.specularMap = new THREE.TextureLoader().load(options.mapUrl)
        material.mapColor = new THREE.Color(options.mapColor);
        //添加高光的平滑度，默认为30，值越高越强烈
        material.shininess = options.lightshininess;
    }
    //添加到场景
    var earth = new THREE.Mesh(geometry, material);
    earth.name = options.name
    if (options.shadow) {
        earth.castShadow = true
    }
    earth.position.set(options.position.x, options.position.y, options.position.z)
    scene.add(earth);

    //跑出球体对象用于修改
    return earth
}

/**
 *  options ={
 *    环境光
 *    ambient : {
 *       color : 0xffffff , 环境光颜色
 *   }
 *     平行光
 *    direction ：[
 *     {
 *     name : '' ,//平行光名字
 *     color : 0xffffff , 平行光颜色
 *      position : {
 *      x , y , z      
 * }
 *     }
 *   ]
 * 
 * }
 * 
 */
const addLight = options => {
    let directionArr = []
    //添加环境光
    if (options.ambient) {
        scene.add(new THREE.AmbientLight(options.ambient.color))
    }
    //添加平行光
    if (options.direction) {
        options.direction.forEach(item => {
            let light = new THREE.DirectionalLight(item.color)
            let helper;
            light.position.set(item.position.x, item.position.y, item.position.z)
            if (item.shadow) {

                light.shadow.camera.near = 1; //产生阴影的最近距离
                light.shadow.camera.far = 1000; //产生阴影的最远距离

                //这两个值决定生成阴影密度 默认512
                light.shadow.mapSize.height = 1024;
                light.shadow.mapSize.width = 1024;
                light.castShadow = true;
            }
            if (item.help) {
                helper = new THREE.DirectionalLightHelper(light, 5);
            }
            var group = new THREE.Group();
            group.add(light, helper)
            group.name = item.name
            scene.add(group)
            directionArr.push(group)
        })
    }
    //添加点光源 
    if (options.point) {
        options.point.forEach((item) => {
            let light = new THREE.PointLight(item.color, item.intensity ? item.intensity : 1, item.distance);
            let helper;
            light.position.set(item.position.x, item.position.y, item.position.z)
            if (item.shadow) {
                light.shadow.camera.near = 1; //产生阴影的最近距离
                light.shadow.camera.far = 1000; //产生阴影的最远距离
                //这两个值决定生成阴影密度 默认512
                light.shadow.mapSize.height = 1024;
                light.shadow.mapSize.width = 1024;
                light.castShadow = true;
            }
            if (item.help) {
                helper = new THREE.PointLightHelper(light, 10);
                var group = new THREE.Group();
                group.add(light, helper)
                group.name = item.name
                scene.add(group)
            }
        })

    }

    return directionArr
}

/**
 *   添加gltf模型
 *   options = {
 *      modelUrl : '' ,//模型地址
 *      position ： '' ,//模型坐标
 *      scalc    :  '' , //模型大小
 *   }
 * 
 */
const addGltfmodel = options => {
    return new Promise((resolve, reject) => {
        var helper = new THREE.AxesHelper(100) //红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
        scene.add(helper)
        let loader = new GLTFLoader()
        let group = new THREE.Group()
        loader.load(options.modelUrl, (gltf) => {
            let obj = gltf.scene
            //模型开启阴影
            if (options.shadow) {
                gltf.scene.traverse(function (child) {
                    if (child.isMesh) {
                        child.receiveShadow = true;
                        child.castShadow = true
                    }
                })
            }
            let position = options.position
            let scale = options.scale
            let length = obj.children.length

            for (var i = 1; i <= length; i++) {
                group.add(obj.children[0])
            }
            if (position) {
                group.position.set(position.x, position.y, position.z)
            }
            if (scale) {
                group.scale.set(scale.x, scale.y, scale.z)
            }
            //添加动画
            if (gltf.animations.length != 0) {
                group.userData.animate = gltf.animations
            }
            // scene.add(group)
            group.name = options.name
            scene.add(group)
            resolve({ mesh: group, model: gltf })
        })
    })
}

/**
 *   添加fbx模型
 *   options = {
 *      modelUrl : '' ,//模型地址
 *      position ： '' ,//模型坐标
 *      scale    :  '' , //模型大小
 * name : ' ' ，模型名字
 *   }
 * 
 */
const addFbxmodel = options => {
    return new Promise((resolve, reject) => {
        let loader = new FBXLoader()

        loader.load(options.modelUrl, (fbx) => {
            let group = new THREE.Group()
            function findModel(model) {
                let fbxModel = model.children.find(item => {
                    return item.type == 'Group'
                })
                if (fbxModel) {
                    return fbxModel
                } else {
                    console.log('导出错误')
                }
            }
            let model = findModel(fbx)
            if (!model) return
            //模型每个部位都能投影
            let modelLength = model.children.length
            for (var i = 0; i <= modelLength - 1; i++) {
                group.add(model.children[0])
            }
            group.name = options.name
            group.scale.set(options.scale.x, options.scale.y, options.scale.z)
            group.position.set(options.position.x, options.position.y, options.position.z)
            scene.add(group)
            resolve({ mesh: group })
        })
    })
}

/**
 *  添加点击事件在dom元素上
 *  
 * 
 */

const addTouch = options => {
    //dom元素数据
    let dom = document.getElementById('three')
    function onMouseClick(event) {
        //声明一个射线和mouse变量
        let raycaster = new THREE.Raycaster()
        //获取2d坐标
        let mouse = new THREE.Vector2()
        //通过鼠标点击的位置计算射线所需要的点的位置,值得范围是-1到1
        mouse.x = (event.touches[0].pageX / dom.offsetWidth) * 2 - 1;
        mouse.y = -(event.touches[0].pageY / dom.offsetHeight) * 2 + 1;
        console.log('mouse========', mouse)
        //根据屏幕的二维位置以及相机的矩阵更新射线的位置
        raycaster.setFromCamera(mouse, camera)
        //获取射线直线和所有模型直接交际的数组
        let intersects = raycaster.intersectObjects(scene.children, true)
        //intersects是返回的一个数组，如果当前位置没有可选中的对象，那这个数组为空，否则为多个对象组成的数组，排列顺序为距离屏幕的距离从近到远的顺序排列
        //数组的每一个子对象内包含：
        // distance：距离屏幕的距离
        // face：与射线相交的模型的面
        // faceIndex：与射线相交的模型的面的下标
        // object：与射线相交的模型对象
        // point：射线与模型相交的点的位置坐标
        // uv：与射线相交的模型的面的uv映射位置
        dom.targetMesh = intersects[0]
    }
    dom.addEventListener('touchstart', onMouseClick, false)

}

/**
 *   360全景图 
 *   options => {
 *     cirRadius :  , //球体半径 
 *     widthSegments   //水平分段数
 *     heightSegments   //垂直分段数
 *     imgUrl   ,//全景图片
 *   }
 */
const create360 = options => {
    let geometry = new THREE.SphereBufferGeometry(options.cirRadius, options.widthSegments, options.heightSegments)
    geometry.scale(-1, 1, 1)
    let material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(`${options.imgUrl ? options.imgUrl : 'https://img.vrupup.com/web/cdn/wyl/three/quanjing.jpg'}`)
    })

    let mesh = new THREE.Mesh(geometry, material)
    camera.position.set(0, 0, 0)
    scene.add(mesh)
    console.log('mesh======', scene)
}

/**
 *   模型注册旋转
 *      name 
 */

const rotationMesh = rotation => {
    var mesh = scene.children.find(item => {
        return item.name == rotation.name
    })
    var data = {
        rotationX: rotation.x,
        rotationY: rotation.y,
        rotationZ: rotation.z,
    }
    mesh.userData.rotation = data
}

/**
 *  模型注册position移动
 *  暂时写公转
 */
const positionMesh = position => {
    position.meshArr.forEach((meshName, index) => {
        var mesh = scene.children.find(item => {
            return item.name == meshName.name
        })
        mesh.userData.position = {
            speed: (index == 0 ? 2 : index == 2 ? 1 : index == 3 ? 3 : index == 4 ? 5 : index == 5 ? 7 : 3) / 200,
            angle: 0,
            z: mesh.position.z
        }
    })

}

/**
 *  注册性能插件
 *  
 */

const initStats = options => {
    stats = new Stats()
    document.body.appendChild(stats.dom)
}

/**
 *  添加平面
 */

const addPlane = options => {
    var planeGeomertry = new THREE.PlaneBufferGeometry(options.width, options.height)
    var planeMaterial = new THREE.MeshPhongMaterial({ color: options.color, side: options.side ? THREE.DoubleSide : '', })
    var plane = new THREE.Mesh(planeGeomertry, planeMaterial)
    plane.name = options.name
    if (!options.noRotation) {
        plane.rotation.x = -Math.PI / 2
    }

    //接受阴影
    if (options.shadow) {
        plane.receiveShadow = true
    }
    plane.position.set(options.position.x, options.position.y, options.position.z)
    if (options.help) {
        var grid = new THREE.GridHelper(300, 100, 0x000000, 0x000000);
        grid.material.opacity = 0.1;
        grid.material.transparent = true;
        grid.position.set(options.position.x, options.position.y, options.position.z)
        scene.add(grid);
    }


    scene.add(plane)
}


/**
 *  获取模型自带动画
 */
const getModelanm = options => {
    mixer = new THREE.AnimationMixer(options.model) //通过当前模型创建混合器
    let animateArr = []
    options.animateModel.animations.forEach((item, index) => {
        var animate = mixer.clipAction(item)
        animateArr.push(animate)
    })
    return animateArr
}

/**
 *  循环随机添加不同颜色正方体
 *  num : 需要的数量
 *  size : 在多大的范围内生成
 *  name ： 名字
 *  width 盒子大小
 */
const addCube = options => {
    let group = new THREE.Group()
    let geometry = new THREE.BoxGeometry(options.width, options.width, options.width)

    //随机颜色
    function randomColor() {
        var arrHex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"],
            strHex = '#',
            index;

        for (var i = 0; i < 6; i++) {
            index = Math.round(Math.random() * 15);
            strHex += arrHex[index];
        }

        return strHex
    }

    for (var i = 0; i < options.num; i++) {
        let material = new THREE.MeshLambertMaterial({ color: randomColor() })
        let mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(THREE.Math.randFloatSpread(options.size), THREE.Math.randFloatSpread(options.size), THREE.Math.randFloatSpread(options.size));
        group.add(mesh)
    }
    group.name = options.name
    scene.add(group)
}

/**
 *  添加八面体
 *  radius 八面体半径
 *  detail 大于0增加顶点
 */
const addOctahedron = options => {
    var geometry = new THREE.OctahedronGeometry(options.radius, options.detail);
    var material = new THREE.MeshNormalMaterial()
    // var material = new THREE.MeshPhongMaterial({ color: 0xff00ff })
    var octahedron = new THREE.Mesh(geometry, material)
    octahedron.position.set(options.position.x, options.position.y, options.position.z)
    octahedron.name = options.name
    scene.add(octahedron)
}

/**
 *  修改某个group内mesh的材质
 *  
 *  color :       
 *  materialUrl :   二选一
 * 
 *  groupName : 组名字
 *  meshName  : 需要修改的模型
 *  
 */
const reviseMaterial = options => {
    var Meshmaterial;
    if (options.materialUrl) {
        let texture = new THREE.TextureLoader().load(options.materialUrl);
        Meshmaterial = new THREE.MeshPhongMaterial({
            map: texture,
            depthWrite: true,
        });
    } else if (options.color) {
        Meshmaterial = new THREE.MeshPhongMaterial({
            color: options.color,
            depthWrite: true,
        });
    }
    let group = scene.children.find(item => {
        if (item.name == options.groupName) {
            return item
        }
    })
    if (group) {
        let mesh = group.children.find(item => {
            return item.name == options.meshName
        })
        mesh.material = Meshmaterial
    }

}


/**
 *  给某个物体加上shader的材质
 *  name 
 * vertexShader  顶点作色器
 * fragmentShader 片面作色器
 */
const meshShader = options => {
    let mesh = scene.children.find(item => {
        return item.name == options.name
    })
    //测试用

    openShader = true
    let material = new THREE.ShaderMaterial({
        uniforms,
        // 顶点着色器文本内容
        vertexShader: options.vertexShader,
        // 片元着色器文本内容
        fragmentShader: options.fragmentShader,
        transparent: true,
    })

    mesh.material = material
}

/**
 *  添加精灵
 */
const addSprite = options => {
    let group = new THREE.Group()
    options.spriteArr.forEach((item, index) => {
        var material = new THREE.SpriteMaterial({
            map: new THREE.TextureLoader().load(item.url),
            transparent: true,
        })
        //创建精灵对象
        var sprite = new THREE.Sprite(material);
        sprite.scale.set(item.scale.x, item.scale.y, item.scale.z)
        sprite.name = item.name
        sprite.position.set(item.position.x, item.position.y, item.position.z)
        group.add(sprite)
    })


    scene.add(group)
}

/**
 *  添加陀螺仪
 */
const addDeviceOrientation = options => {
    controls2 = new DeviceOrientationControls(camera)
}













export {
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
    getModelanm,
    addCube,
    addOctahedron,
    reviseMaterial,
    meshShader,
    addSprite,
    positionMesh,
    addDeviceOrientation
}
