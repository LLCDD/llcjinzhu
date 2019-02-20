<template>
  <div class="divl">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="faxain">
        <p v-if="bool">有新消息。。</p>
        <button @click="kefu()">立即进入</button>
      </div>
      <div class="faxain faxain1">
        <button @click="daili()">立即进入</button>
      </div>
      <div class="faxain2">
        <button class="red" @click="genduo()">立即进入</button>
      </div>
      <div class="faxain2 faxain3" @click="zank()">
        <button class="red">立即进入</button>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "3",
      bool: true,
      isLoading: false
    };
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", true);
    this.$store.commit("header", "功能");
    this.$store.commit("ld", false);
    this.$store.commit("fanhui", false);
    this.$store.commit("qing", false);
    this.$store.commit("footerTabl", false);
  },
  methods: {
    //   客服
    kefu() {
      // Customerservice
      this.$router.push("/Customerservice");
    },
    // 代理
    daili() {
      this.http
        .post("/api/agent_wallet")
        .then(res => {
          if (res.code == 200) {
            this.$router.push("/agent");
          } else if (res.code == 400) {
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
    },
    // 更多期待
    genduo() {
      console.log("更多期待");
      this.$router.push("/welfare");
    },
    onRefresh() {
      setInterval(() => {
        this.isLoading = false;
      }, 600);
    },
    zank() {
      this.$toasted.error("暂未开放").goAway(1000);
    }
  }
};
</script>
<style scope>
.divl {
  min-height: 100%;
  background: #fff;
  padding: 0 0.3rem;
  /* padding-top: 1.32rem; */
  position: absolute;
  top: 1.32rem;
  width: 100%;
}
.divl > div > div > div {
  height: 3rem;
  width: 100%;
  margin-top: 0.3rem;
  border-radius: 0.2rem;
}
.faxain {
  background: url("../../assets/imgs/kefu.png") no-repeat left;
  background-size: 100% 100%;
  position: relative;
}
.faxain1 {
  background: url("../../assets/imgs/daili.png") no-repeat left;
  background-size: 100% 100%;
}
.faxain2 {
  background: url("../../assets/imgs/fuli.png") no-repeat left;
  background-size: 100% 100%;
  position: relative;
}
.faxain > button {
  height: 0.64rem;
  width: 1.8rem;
  border-radius: 0.16rem;
  position: absolute;
  bottom: 0.3rem;
  left: 0.3rem;
  background: #4daefe;
  color: #fff;
  border: 1px solid #fee3d7;
  box-shadow: 1px 1px 10px #fee3d7;
}
.faxain1 > button {
  background: #fa7041;
}
.faxain > p {
  font-size: 0.3rem;
  color: #fff;
  position: absolute;
  top: 34%;
  left: 0.3rem;
}
.faxain2 > p {
  position: absolute;
  top: 34%;
  left: 0.3rem;
  font-size: 0.3rem;
  color: #fff;
}
.red {
  background: url("../../assets/imgs/three.png") no-repeat left;
  background-size: 100% 100%;
  height: 0.64rem;
  width: 1.8rem;
  border-radius: 0.16rem;
  position: absolute;
  bottom: 0.3rem;
  left: 0.3rem;
  color: #fff;
  /* border: 1px solid #fee3d7; */
  /* box-shadow: 1px 1px 10px #fee3d7; */
}
.faxain3 {
  background: url("../../assets/imgs/555.png") no-repeat left;
  background-size: 100% 100%;
  margin-bottom: 1.4rem;
}
</style>
