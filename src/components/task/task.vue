<template>
  <div class="divp">
    <!-- <header>发现</header> -->
    <div class="ranking">
      <p>
        <router-link to="commission" tag="span">佣金排行</router-link>
      </p>
      <p>
        <router-link to="profit" tag="span">盈利排行</router-link>
      </p>
    </div>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "发现"
    };
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", true);
    this.$store.commit("ld", false);
    this.$store.commit("header", "发现");
    this.$store.commit("fanhui", false);
  }
};
</script>
<style scoped>
.divp {
  min-height: 100%;
  background: #ffffff;
  /* padding-top: 1.32rem; */
  position: absolute;
  /* top: 1.32rem; */
  width: 100%;
  /* width: 100%; */
  /* overflow: scroll;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch; */
}
/* .divp > header {
  height: 1.32rem;
  line-height: 1.32rem;
  background: url("../../assets/imgs/background.png") no-repeat left;
  background-size: 100% 100%;
  font-size: 0.3rem;
  color: #fff;
  text-align: center;
  position: fixed;
  width: 100%;
} */
/* .ranking {
  padding-top: 0.88rem; 
} */
.ranking > p {
  width: 50%;
  background: #ffffff;
  color: #999;
  /* float: left; */
  display: inline-block;
  text-align: center;
  height: 0.9rem;
  margin-top: 1.32rem;
}
.ranking > p > span {
  display: inline-block;
  height: 0.9rem;
  line-height: 0.9rem;
  font-size: 0.3rem;
}
.router-link-active {
  color: #f1941d;
  border-bottom: 2px solid #f1941d;
}
</style>
