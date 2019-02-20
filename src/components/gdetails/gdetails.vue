<template>
  <div class="uu">
    <div style="padding:0.3rem" v-html="msg"></div>
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
  // beforeCreate() {
  //   Toast.loading({
  //     mask: true,
  //     message: "加载中..."
  //   });
  // },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("header", "公告详情");
    this.$store.commit("ld", false);
    this.$store.commit("fanhui", true);
    // console.log(this.$route.params.name);
    this.http
      .post("/api/notice_detail", { id: this.$route.params.name })
      .then(res => {
        if (res.code == 200) {
          // Toast.clear();
          //   console.log(res);
          this.msg = res.data.data;
          console.log(res.data.data);
        } else if (res.code == 400) {
          // Toast.clear();
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        }
      })
      .catch(res => {
        // Toast.clear();
        this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
      });
  }
};
</script>
<style scoped>
.uu {
  padding-top: 1.32rem;
  min-height: 100%;
  background: #f5f5f5;
  width: 100%;
}
/* .uu > div > div {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
  height: 1.84rem;
  background: #fff;
  position: relative;
  border-bottom: 2px solid #f5f5f5;
}
.uu > div > div > .p {
  width: 3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.34rem;
  font-weight: 500;
}
.uu > div > div > .p1 {
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #666666;
  padding-top: 0.1rem;
}
.uu > div > div > .p2 {
  bottom: 0.26rem;
  position: absolute;
  right: 0.8rem;
}
.uu > div > div > img {
  position: absolute;
  right: 0.3rem;
  top: 45%;
  height: 0.4rem;
} */
</style>
