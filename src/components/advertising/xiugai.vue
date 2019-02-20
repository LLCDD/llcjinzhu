<template>
  <div class="divj">
    <div>
      <p>
        <span>银行名称</span>
        <input type="text" placeholder v-model="name">
      </p>
      <p>
        <span>银行卡号</span>
        <input type="number" placeholder v-model="bank_num">
      </p>
      <p>
        <span>持卡人姓名</span>
        <input type="text" placeholder v-model="bankname">
      </p>
      <!-- <p>
        <span>手机号</span>
        <input type="number" placeholder="请输入手机号" v-model="phone">
      </p>
      <p>
        <span>验证码</span>
        <input class="code" type="number" placeholder="请输入验证码" v-model="code">
        <span v-if="bool" style="width:1.4rem;float:right;color:#f1941d" @click="code1">发送验证码</span>
      <span v-if="!bool" style="width:1.4rem;float:right;color:#f1941d">{{count}}s</span>-->
      <!-- <p  style="width:1.4rem;float:right;color:#f1941d" class="p">
          <span v-if="inentify" @click="send">发送验证码</span>
          <span v-if="timer">{{count}}s</span>
      </p>-->
      <!-- </p> -->
      <p>
        <span>支付密码</span>
        <input type="password" placeholder="请输入支付密码" v-model="pass">
      </p>
    </div>
    <button class="buttonty" @click="gai()">确认修改</button>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      msg: 23423,
      list: [1],
      name: "23423",
      bank_num: "",
      phone: "",
      bool: true,
      count: 60,
      code: "",
      bankname: "",
      pass: ""
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
    this.$store.commit("ld", false);
    this.$store.commit("header", "修改银行卡");
    this.$store.commit("fanhui", true);
    console.log(this.$route.params.id);
    this.http
      .post("/api/detail_bank", { id: this.$route.params.id })
      .then(res => {
        if (res.code == 200) {
          // Toast.clear();
          console.log(res);
          this.name = res.data[1].bank_name;
          this.bank_num = res.data[1].bank_num;
          this.bankname = res.data[1].user_name;
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
    gai() {
      this.http
        .post("/api/update_bank", {
          id: this.$route.params.id,
          bank_name: this.name,
          bank_num: this.bank_num,
          user_name: this.bankname,
          // phone: this.phone,
          // phone_code: this.code,
          pay_password: this.pass
        })
        .then(res => {
          if (res.code == 200) {
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
    code1() {
      this.http
        .post("/api/send_code", { phone: this.phone })
        .then(res => {
          if (res.code == 200) {
            var count = 60;
            var _this = this;
            this.bool = false;
            var tiemr = setInterval(function() {
              _this.count = --count;
              // console.log();
              if (count <= 0) {
                clearInterval(tiemr);
                count = 60;
                _this.bool = true;
              }
            }, 1000);
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
  /* height: 80%; */
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
.code {
  display: inline-block;
  width: 38%;
}
</style>
