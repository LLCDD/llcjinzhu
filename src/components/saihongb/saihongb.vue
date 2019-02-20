<template>
  <div class="saihongb">
    <header class="headeryp">
      <img @click="tapy()" src="../../../public/image/return.png" alt>
      <span>发红包</span>
    </header>
    <div style="margin-top:1.52rem">
      <p>
        <span>请输入红包总金额</span>
      </p>
      <p>
        <input type="number" style="text-align:right" placeholder="0.00" v-model="money">
        <span>元</span>
      </p>
    </div>
    <div>
      <p>
        <span>红包个数</span>
      </p>
      <p>
        <span>{{ ge }}个</span>
      </p>
    </div>
    <div>
      <p>
        <span>雷点数</span>
      </p>
      <p>
        <input style="width:2rem;text-align:right" type="number" placeholder="填写雷点数" v-model="dian">
      </p>
    </div>
    <button class="saibu" @click="saibao">塞进红包</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      money: "",
      ge: "3",
      dian: "",
      click: 0
    };
  },
  mounted() {
    this.$store.commit("headerTab", false);
    this.$store.commit("footerTab", false);
    this.$store.commit("header", "发红包");
    this.$store.commit("ld", false);
    this.$store.commit("fanhui", true);
    this.$store.commit("fanhui3", false);
    this.ge = localStorage.getItem("geshu");
    this.$store.commit("propers", false);
  },
  methods: {
    saibao() {
      if (this.click == 0) {
        this.click = 1;
        this.http
          .post("/api/hair_package", {
            game_type: 1,
            room_id: localStorage.getItem("avatar"),
            money: this.money,
            spot: this.dian
          })
          .then(res => {
            if (res.code == 200) {
              console.log(res);
              this.$toasted.success(res.message).goAway(1000);
              // this.$router.replace({ name: "Mineclearance" });
              this.$router.replace(
                "/Mineclearance/" + localStorage.getItem("avatar")
              );
            } else if (res.code == 400) {
              this.click = 0;
              this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
            }
          })
          .catch(res => {
            this.click = 0;
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          });
      }
    },
    onSwipeRight() {
      this.$router.go(-1);
    },

    tapy() {
      this.$router.go(-1);
    }
  },
  updated() {
    plus.webview.currentWebview().setStyle({
      softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
    });
  }
};
</script>
<style scoped>
.saihongb {
  width: 100%;
  min-height: 100%;
  background: #f5f5f5;
  /* padding-top: 1.32rem; */
}
.headeryp {
  height: 1.32rem;
  background: url("../../assets/imgs/background.png") no-repeat left;
  background-size: 100% 100%;
  width: 100%;
  position: absolute;
  text-align: center;
  /* line-height: 1.32rem; */
}
.headeryp > span {
  position: absolute;
  bottom: 0;
  /* left: 44%; */
  left: 0;
  display: inline-block;
  height: 0.88rem;
  width: 100%;
  line-height: 0.88rem;
  color: #fff;
  font-size: 0.3rem;
}
.headeryp > img {
  height: 0.3rem;
  position: absolute;
  left: 0.3rem;
  bottom: 0.3rem;
  z-index: 99;
}
.saihongb > div {
  display: flex;
  justify-content: space-between;
  width: 96%;
  height: 0.9rem;
  line-height: 0.9rem;
  margin-top: 0.3rem;
  background: #fff;
  padding: 0 0.3rem;
  border-radius: 0.2rem;
  font-size: 0.3rem;
  margin-left: 2%;
}
.saihongb > div > p > input {
  /* background: red; */
  width: 1rem;
  color: #999;
  margin-right: 0.3rem;
}
.saibu {
  height: 0.9rem;
  width: 90%;
  margin-left: 5%;
  height: 0.9rem;
  color: #fff;
  background: #ff5858;
  margin-top: 0.6rem;
  border-radius: 0.5rem;
}
</style>
