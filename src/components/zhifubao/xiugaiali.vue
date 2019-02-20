<template>
  <div class="divj">
    <div>
      <p>
        <span>支付宝账号</span>
        <input type="number" placeholder v-model="num">
      </p>
      <p>
        <span>支付宝昵称</span>
        <input type="text" placeholder v-model="name">
      </p>
      <!-- <p>
        <span>手机号</span>
        <input type="number" placeholder="请输入手机号" v-model="phone">
      </p>
      <p>
        <span>验证码</span>
        <input class="code" type="number" placeholder="请输入验证码" v-model="code">
        <span v-if="bool" style="width:1.4rem;float:right;color:#f1941d" @click="code1">发送验证码</span>
        <span v-if="!bool" style="width:1.4rem;float:right;color:#f1941d">{{count}}s</span>
      </p>-->
      <p>
        <span>支付密码</span>
        <input type="password" placeholder="请输入支付密码" v-model="pass">
      </p>
    </div>
    <button class="buttonty" @click="gai()">确认修改</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      count: 60,
      bool: true,
      code: "",
      phone: "",
      num: "",
      pass: ""
    };
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("ld", false);
    this.$store.commit("header", "修改支付宝");
    this.$store.commit("fanhui", true);
    this.http.post("/api/detail_bao").then(res => {
      if (res.code == 200) {
        console.log(res);
        this.num = res.data[1].bao_num;
        this.name = res.data[1].real_name;
      }
    });
  },
  methods: {
    gai() {
      this.http
        .post("/api/update_bao", {
          real_name: this.name,
          bao_num: this.num,
          // phone: this.phone,
          // phone_code: this.code,
          pay_password: this.pass
        })
        .then(res => {
          if (res.code == 200) {
            this.$router.replace({ name: "zhifubao" });
            this.$toasted.success(res.message).goAway(1000);
            this.$router.replace({ name: "zhifubao" });
          } else if (res.code == 400) {
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
    },
    // 验证码
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
  height: 80%;
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
