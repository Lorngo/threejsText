// const imgPreloader = url => {
//   return new Promise((resolve, reject) => {
//     let image = new Image();
//     image.src = url;
//     image.onload = () => {
//       resolve();
//     };
//     image.onerror = () => {
//       reject();
//     };
//   });
// };
// export const imgsPreloader = imgs => {
//   let promiseArr = [];
//   imgs.forEach(element => {
//     promiseArr.push(imgPreloader(element));
//   });
//   return Promise.all(promiseArr);
// };
const loadings = (imgUrl, files) => {
  // console.log("imgUrl", imgUrl)
  // console.log("files", files)
  // const files = 
  return new Promise(resolve => {
    // console.log("files", files)
    let count = 0
    let percentNum = 0
    for (let src of files) {
      let _src = require('../images/' + src.substring(2))
      let image = new Image()
      image.src = _src
      image.onload = () => {
        count++
        percentNum = Math.floor(count / files.length * 100)
        if (percentNum == 100) resolve()
      }
    }

  })
}
const loadingLoading = {

}
const loadingPage =  {
  created() {
    this.getFiles()
  },
  // 获取全部要预加载的文件
  methods: {
    getFiles() {
      loadings('../images/', require.context('../images', true, /.(png|jpg|jpeg|gif|bmp|webp)$/).keys()).then(() => {
        this.pageLoadingOk = true
      })
      // const files = require.context('../images', true, /.(png|jpg|jpeg|gif|bmp|webp)$/).keys()
      // // console.log("files", files)
      // let count = 0
      // for (let src of files) {
      //   let _src = require('../images/' + src.substring(2))
      //   let image = new Image()
      //   image.src = _src
      //   image.onload = () => {
      //     count++
      //     this.percentNum = Math.floor(count / files.length * 100)
      //     if (this.percentNum == 100) this.pageLoadingOk = true
      //   }
      // }
    }
  }
}
export {
  loadingPage
}