<template>
  <div class="divj">
    <div>
      <p>
        <span>支付宝账号</span>
        <input type="text" placeholder="请输入支付宝账号" v-model="num">
      </p>
      <p>
        <span>支付宝昵称</span>
        <input type="text" placeholder="请输入支付宝昵称" v-model="name">
      </p>
    </div>
    <button class="buttonty" @click="gai()">确认添加</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      num: ""
    };
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("ld", false);
    this.$store.commit("header", "添加银行卡");
    this.$store.commit("fanhui", true);
  },
  methods: {
    gai() {
      // console.log("确定添加");
      this.http
        .post("/api/add_bao", { real_name: this.name, bao_num: this.num })
        .then(res => {
          if (res.code == 200) {
            console.log(res);
            this.$router.replace({ name: "zhifubao" });
            this.$toasted.success(res.message).goAway(1000);
          } else if (res.code == 400) {
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
    },
    onSwipeRight() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.divj {
  padding-top: 1.32rem;
  min-height: 100%;
  background: #f5f5f5;
  width: 100%;
}
.divj > div > p {
  height: 0.9rem;
  width: 100%;
  padding: 0 0.3rem;
  line-height: 0.9rem;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
}
/* .divj > div > p > span {
  display: inline-block;
  width: 1rem;
} */
span {
  display: inline-block;
  width: 2rem;
}
input {
  color: #999;
  line-height: 0.4rem;
  padding: 0.2rem 0;
}
.buttonty {
  width: 84%;
  height: 0.8rem;
  color: #fff;
  margin-left: 8%;
  margin-top: 0.8rem;
  background: #f1941d;
  border-radius: 0.5rem;
}
</style>
