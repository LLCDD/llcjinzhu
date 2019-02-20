import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    uid: 0,
    name: '',
    avatar: '',
    // 头部内容
    header: "鑫峰视觉",
    headerTab: false,
    footerTab: false,
    ld: false,
    fanhui: false,
    tuijian: false,
    fanhui3: false,
    zong: "0",
    fanhuiin: false,
    propers: false,
    pors: 0,
    qing: false,
    qingr: [],
    // 推荐的一级一级的返回按钮
    tuijianf: false,
    // 一级一级返回 的数据保存
    bao: [],
    // 一级一级的总数据保存
    shuju: [],
    // 保存num1 不变和num2 不变
    county: 0,
    county1: 0,
    // 底部
    footerTabl: false,
    // 定时器
    timer: null
  },
  mutations: {
    setUser(state, payload) {
      let { uid, username, avatar } = payload
      state.uid = uid
      state.username = username
      state.avatar = avatar

      localStorage.setItem('uid', uid + '')
      localStorage.setItem('username', username)
      localStorage.setItem('avatar', avatar)
    },
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setAvatar(state, avatar) {
      state.avatar = avatar
      localStorage.setItem('avatar', avatar)
    },
    // 头部内容的修改
    header(a, b) {
      a.header = b
    },
    // 头部的显示和隐藏
    headerTab(a, b) {
      a.headerTab = b
    },
    // 底部的显示和隐藏
    footerTab(a, b) {
      a.footerTab = b
    },
    // 首页的铃铛
    ld(a, b) {
      a.ld = b
    },
    // 返回 
    fanhui(a, b) {
      a.fanhui = b
    },
    // 推荐
    tuijian(a, b) {
      a.tuijian = b
    },
    fanhui3(a, b) {
      a.fanhui3 = b
    },
    // 玩家福利总价
    zong(a, b) {
      a.zong = b
    },
    fanhuiin(a, b) {
      a.fanhuiin = b
    },
    propers(a, b) {
      a.propers = b
    },
    // 房间总人数
    pors(a, b) {
      a.pors = b
    },
    // 一键清空
    qing(a, b) {
      a.qing = b
    },
    // 聊天内容
    qingr(a, b) {
      a.qingr = b
    },
    // 数据包存
    bao(a, b) {
      a.bao = b
    },
    // 推荐的返回按钮
    tuijianf(a, b) {
      a.tuijianf = b
    },
    shuju(a, b) {
      a.shuju = b
    },
    county(a, b) {
      a.county = b
    },
    county1(a, b) {
      a.county1 = b
    },
    footerTabl(a, b) {
      a.footerTabl = b
    },
    // 定时器的修改
    timer(a, b) {
      a.timer = b
    }
  },
  actions: {
    login({ commit }, payload) {
      let { token, id, username, avatar } = payload

      commit('setToken', token)
      commit('setUser', { uid: id, username, avatar })
    }
  }
})
