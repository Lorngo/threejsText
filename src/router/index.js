import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name: 'index',
    component: resolve => require(['../views/index.vue'], resolve)    
  },
  {
    path:'/about',
    name: 'about',
    component: resolve => require(['../views/about.vue'], resolve)    
  },
  {
    path:'/addScene',
    name: 'addScene',
    component: resolve => require(['../views/pages-list/addScene.vue'], resolve)    
  },
  {
    path:'/addPlane',
    name: 'addPlane',
    component: resolve => require(['../views/pages-list/addPlane.vue'], resolve)    
  },
  {
    path:'/addCir',
    name: 'addCir',
    component: resolve => require(['../views/pages-list/addCir.vue'], resolve)    
  },
  {
    path:'/cir360',
    name: 'cir360',
    component: resolve => require(['../views/pages-list/cir360.vue'], resolve)    
  },
  {
    path:'/addGlt',
    name: 'addGlt',
    component: resolve => require(['../views/pages-list/addGlt.vue'], resolve)    
  },
  {
    path:'/addFbx',
    name: 'addFbx',
    component: resolve => require(['../views/pages-list/addFbx.vue'], resolve)    
  },
  {
    path:'/addTouch',
    name: 'addTouch',
    component: resolve => require(['../views/pages-list/addTouch.vue'], resolve)    
  },
  {
    path:'/atomizeScene',
    name: 'atomizeScene',
    component: resolve => require(['../views/pages-list/atomizeScene.vue'], resolve)    
  },
  {
    path:'/customShoes',
    name: 'customShoes',
    component: resolve => require(['../views/pages-list/customShoes.vue'], resolve)    
  },
  {
    path:'/addShader',
    name: 'addShader',
    component: resolve => require(['../views/pages-list/addShader.vue'], resolve)    
  },
  {
    path:'/citySprite',
    name: 'citySprite',
    component: resolve => require(['../views/pages-list/citySprite.vue'], resolve)    
  },
  {
    path:'/system',
    name: 'system',
    component: resolve => require(['../views/pages-list/system.vue'], resolve)    
  },
  {
    path:'/ar',
    name: 'ar',
    component: resolve => require(['../views/pages-list/ar.vue'], resolve)    
  },
  {
    path:'/deviceOrientation',
    name: 'deviceOrientation',
    component: resolve => require(['../views/pages-list/deviceOrientation.vue'], resolve)    
  },
  {
    path:'/addEarth',
    name: 'addEarth',
    component: resolve => require(['../views/pages-list/addEarth.vue'], resolve)    
  }
 
]

const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes
})

export default router
