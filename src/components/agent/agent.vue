<template>
  <div class="divb" >
    <div class="div3">
      <header>
        <img @click="tap()" class="fanhui" src="../../../public/image/return.png">代理商中心
        <span @click="zhuan()" class="zhuan">转账记录</span>
      </header>
      <p class="p">我的余额 ( 元 )</p>
      <p class="p1">{{ money1 }}</p>
    </div>
    <div class="vip">
      <span>会员账号</span>
      <input type="number" v-model="vip" placeholder="输入会员账号">
    </div>
    <div class="vip">
      <span>充值金额</span>
      <input type="number" v-model="money" placeholder="输入充值金额">
    </div>
    <div class="vip">
      <span>支付密码</span>
      <input type="password" v-model="passworld" placeholder="输入支付密码">
    </div>
    <button class="buty" @click="top()">确认充值</button>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      money: "",
      vip: "",
      passworld: "",
      money1: ""
    };
  },
  // beforeCreate() {
  //   Toast.loading({
  //     mask: true,
  //     message: "加载中..."
  //   });
  // },
  mounted() {
    this.$store.commit("footerTab", false);
    this.$store.commit("headerTab", false);
    this.http
      .post("/api/my_center")
      .then(res => {
        if (res.code == 200) {
          // Toast.clear();
          this.money1 = res.data.wallet;
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
    tap() {
      this.$router.go(-1);
    },
    // 转账
    top() {
      this.http
        .post("/api/pay_order", {
          phone: this.vip,
          money: this.money,
          pay_password: this.passworld
        })
        .then(res => {
          if (res.code == 200) {
            this.$toasted.success(res.message).goAway(1000);
            this.vip = this.money = this.passworld = "";
          } else if (res.code == 400) {
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
    },
    // 转账记录
    zhuan() {
      this.$router.push("/Transferrecord");
    },
    onSwipeRight() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.divb {
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
  margin-bottom: 0.3rem;
}
header {
  height: 0.88rem;
  padding-top: 0.44rem;
  width: 100%;
  position: fixed;
  top: 0;
  /* background: red; */
  text-align: center;
  line-height: 0.88rem;
  font-size: 0.3rem;
  color: #fff;
  /* background: red; */
}
.zhuan {
  position: absolute;
  right: 0.3rem;
  font-size: 0.24rem;
}
.p {
  padding-top: 1.58rem;
  padding-left: 0.3rem;
  color: #fff;
  font-size: 0.24rem;
}
.p1 {
  padding-top: 0.4rem;
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
  width: 0.2rem;
  height: 0.3rem;
  bottom: -0.2rem;
  z-index: 99;
}
.vip {
  width: 90%;
  margin-left: 5%;
  display: flex;
  background: #fff;
  height: 0.9rem;
  justify-content: space-between;
  border-radius: 5px;
  line-height: 0.9rem;
  padding-left: 0.3rem;
  margin-bottom: 0.2rem;
}
.vip > input {
  width: 2rem;
}
.buty {
  width: 88%;
  background: #f1941d;
  margin-left: 6%;
  margin-top: 0.6rem;
  height: 0.8rem;
  color: #fff;
  border-radius: 0.5rem;
}
</style>
