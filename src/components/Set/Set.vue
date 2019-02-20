<template>
  <div class="set">
    <p @click="password()">
      <span>登录密码</span>
      <img src="../../assets/imgs/oragin.png" alt>
    </p>
    <p @click="password1()">
      <span>支付密码</span>
      <img src="../../assets/imgs/oragin.png" alt>
    </p>
    <p>
      <span>当前版本</span>
      <span style="color:#999">V1.0</span>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "345"
    };
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("ld", false);
    this.$store.commit("header", "设置");
    this.$store.commit("fanhui", true);
  },
  methods: {
    password() {
      this.$router.push("/gaipassword");
    },
    // 修改支付密码
    password1() {
      this.$router.push("/zhifupassworld");
    },
    onSwipeRight() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.set {
  padding-top: 1.32rem;
  min-height: 100%;
  background: #f5f5f5;
  width: 100%;
}
.set > p {
  padding: 0 0.3rem;
  height: 0.9rem;
  line-height: 0.9rem;
  display: flex;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
}
.set > p > img {
  height: 0.3rem;
  margin-top: 0.3rem;
}
</style>
