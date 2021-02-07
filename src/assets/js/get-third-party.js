import { loadScript } from 'assets/js/util'
import { SECRETKEY } from 'api/config'
import { api } from 'api/request.js'

/****************************************获取当前位置信息****************************************/
//获取当前位置信息----腾讯(可传type:0、1)
const getLocation_qq = (type = 0) => {
  const getLocationQq = (data, url = `https://apis.map.qq.com/ws/location/v1/ip?output=jsonp&key=${SECRETKEY.secretkey_qq_map}`, type = 'jsonp') => { return api(url, data, type, true, 0) }
  const geocoderQq = (data, url = `https://apis.map.qq.com/ws/geocoder/v1/?output=jsonp&key=${SECRETKEY.secretkey_qq_map}`, type = 'jsonp') => { return api(url, data, type, true, 0) }
  return new Promise((resolve, reject) => {
    getLocationQq().then(res => {
      if (type == '1') {
        resolve(res)
      } else {
        getLocationCity(`${res.result.location.lat},${res.result.location.lng}`)
      }
    }).catch(err => { reject(err) })
    function getLocationCity(location) {
      geocoderQq({ location: location }).then(res => {
        resolve(res)
      }).catch(err => { reject(err) })
    }
  })
}
//获取当前位置信息----百度(可传type:0、1)
const getLocation_baidu = (type = 0) => {
  loadScript(`https://api.map.baidu.com/api?v=2.0&ak=${SECRETKEY.secretkey_baidu_map}&s=1&callback=onBMapCallback`)
  return new Promise((resolve, reject) => {
    if (typeof BMap !== "undefined") {
      getLocation()
    } else {
      window.onBMapCallback = getLocation
    }
    function getLocation() {
      if (type == '1') {
        let myCity = new BMap.LocalCity()
        myCity.get(result => { resolve(result) })
      } else {
        const locationCity = new BMap.Geolocation()
        locationCity.getCurrentPosition(
          options => { resolve(options) },
          err => { reject(err) },
          { provider: "baidu" }
        )
      }
    }
  })
}
//获取当前位置信息----高德（前端需要https域名且国内网络访问较慢） 
const getLocation_amap = () => {
  return new Promise((resolve, reject) => {
    loadScript(`https://webapi.amap.com/maps?v=1.3&key=${SECRETKEY.secretkey_amap_map}`).then(res => {
      function initMap(id) {
        let mapObj = new AMap.Map(id, {})
        let geolocation;
        mapObj.plugin(['AMap.Geolocation'], function () {
          geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //  是否使用高精度定位，默认:true
            timeout: 10000, //  超过10秒后停止定位，默认：无穷大
            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
            convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, //  显示定位按钮，默认：true
            buttonPosition: 'LB',  // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true, //  定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, //  定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,  //  定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          })
          mapObj.addControl(geolocation)
          geolocation.getCurrentPosition()
        })
        return geolocation;
      }
      let geolocation = initMap("map-container")
      AMap.event.addListener(geolocation, "complete", res => {
        resolve(res)
      })
      AMap.event.addListener(geolocation, "error", err => {
        reject(err)
      })
    })
  })
}
/****************************************获取手机号归属地（传入手机号，字段为phone）****************************************/
//手机号归属地1----[来自聚合数据]
const getIpLocation_juhe = (data, url = `http://game.flyh5.cn/game/wx7c3ed56f7f792d84/yyt_quan/public/index.php/api/test/test`, type = 'post') => { return api(url, Object.assign({key: SECRETKEY.secretkey_juhe_phone_region }, data), type, true, 0) }
//手机号归属地2----[来源极速数据]
const getIpLocation_jisu = (data, url = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/yyt_quan/public/index.php/api/test/test2', type = 'post') => { return api(url, Object.assign({key: SECRETKEY.secretkey_jisu_phone_region }, data), type, true, 0) }
//手机号归属地3----[来源百度数据]
const getIpLocation_baidu = (data, url = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/yyt_quan/public/index.php/api/test/test3', type = 'post') => { return api(url, data, type, true, 0) }
//手机号归属地4----[来自api.k780数据]
const getIpLocation_k780 = (data, url = 'http://game.flyh5.cn/game/wx7c3ed56f7f792d84/yyt_quan/public/index.php/api/test/test4', type = 'post') => { return api(url, data, type, true, 0) }

export {
  getLocation_qq,
  getLocation_baidu,
  getLocation_amap,
  getIpLocation_juhe,
  getIpLocation_jisu,
  getIpLocation_baidu,
  getIpLocation_k780
}