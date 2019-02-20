<template>
  <div id="wx-nav">
    <nav id="nav">
      <router-link to="/index">
        <img src="../../assets/imgs/huangguan-h.png" alt>
        <img src="../../assets/imgs/huangguan.png" alt>
        <span>娱乐</span>
      </router-link>

      <router-link to="/task">
        <img src="../../assets/imgs/lingan-h.png" alt>
        <img src="../../assets/imgs/linggan.png" alt>
        <span>发现</span>
      </router-link>
      <router-link to="/myhone">
        <img src="../../assets/imgs/fenlei-h.png" alt>
        <img src="../../assets/imgs/fenlei.png" alt>
        <span>功能</span>
      </router-link>
      <router-link to="/personal">
        <img src="../../assets/imgs/my-h.png" alt>
        <img src="../../assets/imgs/my.png" alt>
        <span>我的</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style>
@import "../../assets/css/wx-nav.css";
#wx-nav {
  width: 100%;
  height: 1rem;
  position: absolute;
  bottom: 0;
  z-index: 99;
  border-top: 1px solid #ccc;
}
#nav > a {
  width: 24.8%;
}
#nav > a > span {
  font-size: 0.2rem;
}
</style>
