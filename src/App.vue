<template>
  <div id="app">
    <div class="outter">
      <!--通用头部-->
      <!-- <header class="app-header" :class="{'header-hide':!$store.state.headerStatus}">
        <wx-header :pageName="pageName"></wx-header>
      </header>-->
      <!-- <div id="header1" v-if="this.$store.state.headerTab"> -->
      <div id="header" v-show="this.$store.state.headerTab" ref="header">
        <span v-if="this.$store.state.ld">
          <img @click="ldy()" class="ld" src="./assets/imgs/ld.png" alt>
        </span>
        <span v-if="this.$store.state.fanhui">
          <img @click="topy()" class="baozhu" src="../public/image/return.png" alt>
        </span>
        <span v-if="this.$store.state.fanhui3">
          <img @click="topy1()" class="baozhu" src="../public/image/return.png" alt>
        </span>
        <span v-if="this.$store.state.fanhuiin">
          <img @click="ldyopp()" class="baozhu" src="../public/image/return.png" alt>
        </span>
        <span v-if="this.$store.state.tuijianf">
          <img @click="fantuijian()" class="baozhu" src="../public/image/return.png" alt>
        </span>
        <!-- <span class="sizeii">{{ this.$store.state.header }}</span> -->
        <!-- <span v-if="this.$store.state.tuijian" @click="tuijian" class="tuijian">推荐列表</span> -->
        <span style>{{ this.$store.state.header }}</span>
        <span @click="fabao" v-if="this.$store.state.propers" class="propers">
          <!-- 房间人数: {{ this.$store.state.pors }} -->
          发包详情
        </span>
        <span v-if="this.$store.state.qing" class="propers" @click="qingkong()">一键清空</span>
      </div>
      <!-- </div> -->
      <!--搜索框 只在“微信”和“通讯录”页面下显示-->
      <!--四个门面页 “微信” “通讯录” “发现” “我”-->
      <section class="app-content" :class="{'app-content1': $store.state.footerTabl}">
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <router-view style="position:absolute"></router-view>
        </transition>
      </section>
      <!--底部导航 路由 -->
      <div class="app-footer" v-show="this.$store.state.footerTab" ref="footer">
        <wx-nav></wx-nav>
      </div>
    </div>
  </div>
</template>
<script>
import mixin from "./mixin"; // 混合被单独放在 mixin.js 中管理
window.mixin = mixin; // 将 混合/mixin 暴露在窗口对象中，某些组件需要时，直接提取 window.mixin
// import WxHeader from "@/components/common/wx-header";
import WxNav from "@/components/common/wx-nav";

export default {
  name: "app",
  components: {
    // WxHeader,
    WxNav
  },
  data() {
    return {
      pageName: "",
      mag: "",
      routerAnimate: false,
      enterAnimate: "", //页面进入动效
      leaveAnimate: "" //页面离开动效
    };
  },
  mounted() {
    // 页面的总高度
    // var html = document.getElementsByTagName("html")[0];
    // console.log(html.clientHeight);
    // // 头部的高度
    // let header1 = document.getElementById("header");
    // console.log(header1.clientHeight);
    // // 底部的高度
    // let footer = document.getElementsByClassName("app-footer")[0];
    // console.log(footer.clientHeight);
    // if (this.$store.state.headerTab) {
    //   // 头部存在不
    //   document.getElementsByClassName("app-content")[0].style.height = +"px";
    // }
    // document.getElementsByClassName("app-content")[0].style.height =
    //   html.clientHeight - 132 + "px";
    // if (this.$store.state.footerTab) {
    //   document.getElementsByClassName("app-content")[0].style.height =
    //     html.clientHeight - 132 - 100 + "px";
    // }
  },
  methods: {
    topy() {
      this.$router.go(-1);
    },
    ldy() {
      this.$router.push("/announcement");
    },
    tuijian() {
      console.log("tuijina");
    },
    topy1() {
      console.log("3");

      this.$router.replace("/clearance");
    },
    ldyopp() {
      this.$router.push("/index");
    },
    // 清空
    qingkong() {
      this.http
        .post("/api/emptys")
        .then(res => {
          if (res.code == 200) {
            this.$store.commit("qingr", []);
            console.log(res);
          } else if (res.code == 400) {
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
    },
    // 返回推荐
    fantuijian() {
      var arr = this.$store.state.bao;
      // console.log(arr);
      arr.pop();
      var uid = arr[arr.length - 1];
      // console.log(uid);
      if (uid != undefined) {
        this.http
          .post("/api/first_recommend", { uid: uid })
          .then(res => {
            if (res.code == 200) {
              this.$store.commit("header", res.data.lever);
              this.$store.commit("shuju", res.data.data);
            } else {
              this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
            }
          })
          .catch(res => {
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          });
      } else {
        this.$router.go(-1);
      }
    },
    // 发包详情
    fabao() {
      this.http
        .post("/api/push_hair", {
          game_id: 1,
          room_id: localStorage.getItem("avatar")
        })
        .then(res => {
          if (res.code == 200) {
            this.$router.push("/Contractdetails");
          } else {
            this.$toasted.error(res.message).goAway(1000);
          }
        })
        .catch(res => {
          this.$toasted.error(res.message).goAway(1000);
        });
    }
  },
  watch: {
    // 监听 $route 为店内页设置不同的过渡效果
    $route(to, from) {
      const toDepth = to.path.length;
      const fromDepth = from.path.length;
      if (toDepth === 2) {
        this.$store.commit("setPageName", to.name);
      }
      //同一级页面无需设置过渡效果
      if (to.meta.Athesamelevel) {
        return;
      }
      // this.enterAnimate =
      //   toDepth > fromDepth ? "animated fadeInRight" : "animated fadeInLeft";
      // this.leaveAnimate =
      //   toDepth > fromDepth ? "animated fadeOutLeft" : "animated fadeOutRight";
    }
  },
  updated() {
    // 只要组件发生变化都会触发可用于切换组件时公共数据的刷新
    // this.$store.dispatch('newbalance')
  }
};
</script>


<style lang="scss">
// .action-block{
//   display: none !important;
// }
$material-icons-font-path: "~material-icons/iconfont/";
@import "material-icons/iconfont/material-icons.scss";
@import "./assets/css/toast.css";
@import "assets/css/base.css";
@import "assets/css/common.css";
@import "assets/css/wx-header.css";
/*阿里 fonticon*/
@import "assets/css/lib/iconfont.css";
/*过渡效果需要的动画库*/
@import "assets/css/lib/animate.css";
/*weui 样式库 非常适合高仿微信*/
@import "assets/css/lib/weui.min.css";
.app-content {
  // min-height: 100%;
  // background: url("./assets/imgs/background.png") no-repeat top;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
#header {
  // margin-top: 0.44rem;
  // height: 0.88rem;
  height: 1.32rem;
  padding-top: 0.44rem;
  width: 100%;
  background: url("./assets/imgs/background.png") no-repeat left;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  // transform: translate()
  text-align: center;
  line-height: 0.88rem;
  font-size: 0.3rem;
  color: #fff;
  z-index: 9999;
}

.ld {
  height: 0.3rem;
  width: 0.3rem;
  position: absolute;
  left: 0.3rem;
  bottom: 0.26rem;
}
.baozhu {
  width: 0.2rem;
  height: 0.3rem;
  // margin: 0.26rem 0 0 0.3rem;
  position: absolute;
  bottom: 0.26rem;
  left: 0.3rem;
  z-index: 9;
}
.tuijian {
  font-size: 0.3rem;
  position: absolute;
  right: 0.3rem;
}
.propers {
  font-size: 0.24rem;
  position: absolute;
  right: 0.24rem;
}
.app-content1 {
  -webkit-overflow-scrolling: auto;
}
</style>
