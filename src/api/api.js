import { api } from 'api/request.js' 
/**
 下面为项目接口请求  
 * return api(url, data, type, true, 1 )几个参数说明：
 * 请求地址、传参、post/get/jsonp、是否qs、0为全地址/1为半地址/2为本地代理地址 
 */ 
export default {
  //测试接口
  getPostTest: (data, url = 'http://auth.vrupup.com/sanguo/auth/share.php?appid=wx7c3ed56f7f792d84&type=js', type = 'get') => { return api(url, data, type, true, 0) },
  getPostTest2: (data, url = 'http://zhouxunwang.cn/data/?id=113&key=B76QrNFnS9j+h5+I8ow3Rm3HOwTgsJbv7upy6fwLhjSoLUjDawA&name=上海市', type = 'get') => { return api(url, data, type, true, 0) },
  getPosition: (data, url = 'https://apis.map.qq.com/ws/geocoder/v1?&poi_options=address_format=short&get_poi=1', type = 'jsonp') => { return api(url, data, type, true, 0) }
}