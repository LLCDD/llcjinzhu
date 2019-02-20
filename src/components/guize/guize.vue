<template>
  <div class="uu">
    <div>
      <span style="color:#f1941d;font-size:0.3rem">签到规则：</span>7天一循环，用户可以每日进行签到，首日可领取0.1元，第二日可领取0.1元，第三日可领取0.1元，第四日可领取0.2元，第五日可领取0.2元，第六日可领取0.2第七日可领取0.2元。循环从0.1开始。间断就重新计算。
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      msg: ""
    };
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("header", "规则说明");
    this.$store.commit("ld", false);
    this.$store.commit("fanhui", true);
    // this.http
    //   .post("/api/gamerule_list")
    //   .then(res => {
    //     if (res.code == 200) {
    //       Toast.clear();
    //       //   console.log(res);
    //       this.msg = res.data[1].content;
    //     } else if (res.code == 400) {
    //       Toast.clear();
    //       this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
    //     }
    //   })
    //   .catch(res => {
    //     Toast.clear();
    //     this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
    //   });
  },
  methods: {
    onSwipeRight() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.uu {
  min-height: 100%;
  background: #f5f5f5;
  padding: 0.1rem 0.3rem;
  padding-top: 1.32rem;
  width: 100%;
}
.uu > div {
  line-height: 0.5rem;
}
</style>
