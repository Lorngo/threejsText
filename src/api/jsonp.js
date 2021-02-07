import Vue from 'vue'
import originJsonp from 'jsonp'
import context from '../main.js'
// import VueJsonp from 'vue-jsonp'

// export default function jsonp(url, data, option = { param: 'jsonpCallback' }) {
//   console.log("originJsonp", originJsonp)
//   console.log("url, data, option", url, data, option)
//   url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
//   console.log("url", url)
//   return new Promise((resolve, reject) => {
//     originJsonp(url, option, (err, data) => {
//       if (!err) {
//         resolve(data)
//       } else {
//         reject(err)
//       }
//     })
//   })
// }
// export function param(data) {
//   let url = ''
//   for (var k in data) {
//     let value = data[k] !== undefined ? data[k] : ''
//     url += '&' + k + '=' + encodeURIComponent(value)
//   }
//   return url ? url.substring(1) : ''
// }

export default function jsonp(url, data) {
  return new Promise((resolve, reject) => {
    Vue.prototype.$jsonp(url,data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}