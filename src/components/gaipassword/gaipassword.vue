<template>
  <div class="divj">
    <div>
      <p>
        <span>新密码</span>
        <input type="password" placeholder="请输入新密码" v-model="passworld">
      </p>
      <p>
        <span>重复新密码</span>
        <input type="password" placeholder="请再次输入新密码" v-model="passworld1">
      </p>

      <p>
        <span>手机号</span>
        <input type="text" placeholder="请输入手机号" v-model="phone">
      </p>
      <p>
        <span>验证码</span>
        <input class="code" type="text" placeholder="请输入验证码" v-model="code1">
        <span v-if="bool" style="width:1.4rem;float:right;color:#f1941d" @click="code()">发送验证码</span>
        <span v-if="!bool" style="width:1.4rem;float:right;color:#f1941d">{{count}}s</span>
      </p>
    </div>
    <button class="buttonty" @click="gai()">确认修改</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      bool: true,
      count: 60,
      code1: "",
      passworld: "",
      passworld1: ""
    };
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("ld", false);
    this.$store.commit("header", "修改登陆密码");
    this.$store.commit("fanhui", true);
  },
  methods: {
    gai() {
      this.http
        .post("/api/updatepass", {
          phone: this.phone,
          phone_code: this.code1,
          password: this.passworld,
          repassword: this.passworld1
        })
        .then(res => {
          if (res.code == 200) {
            this.$toasted.success("修改成功").goAway(1000);
            localStorage.clear();
            this.$router.replace({ name: "login" });
          } else if (res.code == 400) {
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
    },
    code() {
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
