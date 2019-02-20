<template>
  <div class="div2">
    <div class="div3">
      <header>
        <img @click="tap()" class="fanhui" src="../../../public/image/return.png">资产记录
      </header>
      <p class="p">我的钱包 ( 元 )</p>
      <p class="p1">{{ msg }}</p>
    </div>
    <div class="record">
      <p>
        <router-link to="chongzhi" replace tag="span">充值记录</router-link>
      </p>
      <p>
        <router-link to="zhuangzhang" replace tag="span">提现记录</router-link>
      </p>
      <p>
        <router-link to="tixian" replace tag="span">支付记录</router-link>
      </p>
      <p>
        <router-link to="zhifu" replace tag="span">收取记录</router-link>
      </p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      msg: "9.99"
    };
  },
  methods: {
    tap() {
      this.$router.push("/personal");
    }
  },
  // beforeCreate() {
  //   Toast.loading({
  //     mask: true,
  //     message: "加载中..."
  //   });
  // },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("header", "资产记录");
    this.$store.commit("footerTab", false);
    this.$store.commit("fanhui", true);
    this.http
      .post("/api/my_center")
      .then(res => {
        if (res.code == 200) {
          // Toast.clear();
          console.log(res);
          this.msg = res.data.wallet;
        } else if (res.code == 400) {
          // Toast.clear();
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        }
      })
      .catch(res => {
        // Toast.clear();
        this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
      });
  },
  methods: {
    left() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.div2 {
  /* padding-top: 0.88rem; */
  min-height: 100%;
  background: #f5f5f5;
  width: 100%;
}
.div3 {
  /* overflow: hidden; */
  background: url("../../assets/imgs/heady.png") no-repeat left;
  background-size: cover;
  position: relative;
  height: 2.88rem;
}
header {
  height: 0.88rem;
  width: 100%;
  position: fixed;
  top: 0.44rem;
  /* background: red; */
  text-align: center;
  line-height: 0.88rem;
  font-size: 0.34rem;
  color: #fff;
  /* background: red; */
}
.p {
  padding-top: 1.6rem;
  padding-left: 0.3rem;
  color: #fff;
  font-size: 0.24rem;
}
.p1 {
  padding-top: 0.3rem;
  padding-left: 0.3rem;
  font-size: 0.38rem;
  color: #fff;
  font-weight: 700;
}
.record {
  width: 100%;
  background: #fff;
  height: 0.9rem;
  line-height: 0.9rem;
  margin-bottom: 0.2rem;
}
.record > p {
  display: inline-block;
  width: 25%;
  height: 0.8rem;
  text-align: center;
  color: #b6b6b6;
}

.record > p > span {
  display: inline-block;
  height: 98%;
}
.fanhui {
  position: absolute;
  left: 0.3rem;
  width: 0.25rem;
  height: 0.4rem;
  top: 24%;
  z-index: 99;
}
.router-link-active {
  color: #f1941d;
  border-bottom: 2px solid #f1941d;
}
</style>
