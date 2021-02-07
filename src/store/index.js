import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  userInfo: {
    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/OuUlqVWSgMzXibzhD85y61GjjLpSNK33TeGjAc14hSWvAqAKDQylg5oBhDlLE2dD9GRibQRavYxw78p8eFZUwI6g/132',
    nickName: "扬帆"
  },
  balance: 8888
}
const mutations = {
  add(state, params) {
    state.balance = (state.balance + params.num) > 0 ? (state.balance + params.num) : 0
  }
}
export default new Vuex.Store({
  state,
  mutations
})