<template>
  <div class="divj" >
    <div>
      <p>
        <span>银行名称</span>
        <input type="text" placeholder="银行名称" v-model="bank_name">
      </p>
      <p>
        <span>银行卡号</span>
        <input type="text" placeholder="银行卡号" v-model="bank_num">
      </p>
      <p>
        <span>持卡人姓名</span>
        <input type="text" placeholder="持卡人姓名" v-model="user_name">
      </p>
    </div>
    <button class="buttonty" @click="gai()">确认添加</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bank_name: "",
      bank_num: "",
      user_name: ""
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
      this.http
        .post("/api/add_bank", {
          bank_name: this.bank_name,
          bank_num: this.bank_num,
          user_name: this.user_name
        })
        .then(res => {
          if (res.code == 200) {
            console.log(res);
            this.$toasted.success(res.message).goAway(1000);
            this.$router.replace({ name: "advertising" });
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
