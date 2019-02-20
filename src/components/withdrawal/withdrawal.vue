<template>
  <div class="div5">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="tixiany">
        <span>提现金额</span>
        <span>
          <input v-model="tmoney" class="input" type="number" placeholder="0.00">元
        </span>
      </div>
      <p class="yuey">我的余额 ：￥{{money}}</p>
      <div @click="bool()" class="ali" :class="{ 'classy' : class1 }">
        <img src="../../assets/imgs/zhifub.png" alt>
        <span>提现到支付宝</span>
        <span style="color:#999999">{{ bao }}</span>
      </div>
      <div @click="bool1()" class="cardt" :class="{ 'classy' : !class1 }">
        <img src="../../assets/imgs/yingh.png" alt>
        <span>提现到银联卡</span>
        <span style="color:#999999">{{ ka }}</span>
      </div>
      <p class="p2">提现说明：{{ tian.lowest.substring(0,2) }}元倍数起提现，手续费为{{ tian.server_money * 100 }}%</p>
      <div style="margin-top:0.2rem;padding-left:0.3rem" class="ali">
        <span>支付密码</span>
        <input
          v-model="pass"
          style="width:35%;  line-height: 0.4rem;
            padding: 0.2rem 0;text-align:right"
          type="password"
          placeholder="请输入支付密码"
        >
      </div>
      <button class="button2" @click="tixian()">立即提现</button>
    </van-pull-refresh>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      msg: "提现页面",
      money: "1000.00",
      bao: "还没绑定支付宝",
      ka: "已绑定银联卡",
      class1: true,
      type: "1",
      count: 0,
      tmoney: "",
      isLoading: false,
      pass: "",
      tian: ""
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
    this.$store.commit("header", "提现");
    this.$store.commit("ld", false);
    this.$store.commit("fanhui", true);
    this.http
      .post("/api/tixian_page")
      .then(res => {
        if (res.code == 200) {
          // Toast.clear();
          console.log(res);
          if (res.data.type == 3) {
            this.bao = "还没绑定支付宝";
            this.ka = "还没绑定银行卡";
          }
          if (res.data.type == 2) {
            this.bao = "已绑定支付宝";
          } else {
            this.bao = "还没绑定支付宝";
          }
          if (res.data.type == 1) {
            this.ka = "已绑定银行卡";
          } else {
            this.ka = "还没有绑定银行卡";
          }
          if (res.data.type == 0) {
            this.ka = "已绑定银行卡";
            this.bao = "已绑定支付宝";
          }
        } else if (res.code == 400) {
          // Toast.clear();
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        }
      })
      .catch(res => {
        this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
      });
    this.tong();
    this.http.post("/api/tx_require").then(res => {
      if (res.code == 200) {
        console.log(res);
        this.tian = res.data.data;
      }
    });
  },
  methods: {
    bool() {
      this.class1 = true;
      this.type = 1;
    },
    bool1() {
      this.class1 = false;
      this.type = 2;
    },
    tong() {
      this.http
        .post("/api/my_center")
        .then(res => {
          if (res.code == 200) {
            // Toast.clear();
            this.money = res.data.wallet;
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
    tixian() {
      if (this.count == 0) {
        this.count = 1;
        this.http
          .post("/api/tixian", {
            type: this.type,
            money: this.tmoney,
            pay_password: this.pass
          })
          .then(res => {
            if (res.code == 200) {
              this.tong();
              this.$toasted.success(res.message).goAway(1000);
              this.tmoney = "";
              this.pass = "";
            } else if (res.code == 400) {
              this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
            }
          })
          .catch(res => {
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          });
      } else {
        this.$toasted.error("不能频繁操作", { icon: "error" }).goAway(1000);
        setInterval(() => {
          this.count = 0;
        }, 3000);
      }
    },
    onRefresh() {
      this.http
        .post("/api/tixian_page")
        .then(res => {
          if (res.code == 200) {
            // Toast.clear();
            this.isLoading = false;
            console.log(res);
            if (res.data.type == 3) {
              this.bao = "还没绑定支付宝";
              this.ka = "还没绑定银行卡";
            }
            if (res.data.type == 2) {
              this.bao = "已绑定支付宝";
            } else {
              this.bao = "还没绑定支付宝";
            }
            if (res.data.type == 1) {
              this.ka = "已绑定银行卡";
            } else {
              this.ka = "还没有绑定银行卡";
            }
            if (res.data.type == 0) {
              this.ka = "已绑定银行卡";
              this.bao = "已绑定支付宝";
            }
          } else if (res.code == 400) {
            // Toast.clear();
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
      this.tong();
    },
    // 侧滑返回
    onSwipeLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.div5 {
  min-height: 100%;
  padding: 0 0.3rem;
  padding-top: 1.32rem;
  background: #f5f5f5;
  width: 100%;
}
.tixiany {
  width: 100%;
  height: 0.9rem;
  border-radius: 5px;
  background: #fff;
  margin-top: 0.3rem;
  padding-left: 0.3rem;
  line-height: 0.9rem;
  font-size: 0.3rem;
  display: flex;
  justify-content: space-between;
  padding-right: 0.3rem;
}
.input {
  /* background: red; */
  width: 1rem;
  line-height: 0.4rem;
  padding: 0.2rem 0;
}
.yuey {
  height: 0.9rem;
  line-height: 0.9rem;
  color: #f1941d;
  padding-left: 0.3rem;
  font-size: 0.3rem;
}
.ali {
  width: 100%;
  position: relative;
  height: 0.9rem;
  background: #fff;
  border-radius: 5px;
  padding-left: 0.9rem;
  display: flex;
  padding-right: 0.3rem;
  justify-content: space-between;
  line-height: 0.9rem;
  font-size: 0.3rem;
}
.ali > img {
  height: 54%;
  position: absolute;
  left: 0.3rem;
  top: 23%;
}
.cardt {
  width: 100%;
  position: relative;
  height: 0.9rem;
  background: #fff;
  border-radius: 5px;
  padding-left: 0.9rem;
  display: flex;
  padding-right: 0.3rem;
  justify-content: space-between;
  line-height: 0.9rem;
  margin-top: 0.2rem;
  font-size: 0.3rem;
}
.cardt > img {
  height: 54%;
  position: absolute;
  left: 0.3rem;
  top: 23%;
}
.classy {
  border: 1px solid #f1941d;
}
.p2 {
  color: #999999;
  font-size: 0.26rem;
  margin-top: 0.2rem;
  padding-left: 0.3rem;
}
.button2 {
  height: 0.8rem;
  width: 86%;
  background: #f1941d;
  color: #fff;
  margin-left: 7%;
  margin-top: 0.6rem;
  border-radius: 0.5rem;
}
</style>
