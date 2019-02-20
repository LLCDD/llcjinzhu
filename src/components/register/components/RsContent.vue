<template>
  <div class="regiset1">
    <div class="baozhud">
      <img class="baozhu1" src="../../../assets/imgs/3.png" alt>
    </div>

    <div class="put">
      <span>手机号</span>
      <input type="number" placeholder="请输入手机号" v-model="phone">
    </div>
    <div class="put">
      <span>验证码</span>
      <input class="code" type="number" placeholder="输入手机验证码" v-model="phone_code">
      <p class="p">
        <span v-if="inentify" @click="send">发送验证码</span>
        <span v-if="timer">{{count}}s</span>
      </p>
    </div>
    <div class="put">
      <span>登陆密码</span>
      <input type="password" placeholder="请输入登陆密码" v-model="password">
    </div>
    <div class="put">
      <span>确认密码</span>
      <input type="password" placeholder="请再次输入登陆密码" v-model="password_confirmation">
    </div>
    <div class="put">
      <span>邀请码</span>
      <input type="text" placeholder="请输入邀请码" v-model="recommend">
    </div>
    <button @click="register">确定注册</button>
    <!-- <p class="xz">
      <span @click="xz()">立即下载App</span>
    </p>-->
  </div>
</template>

<script>
export default {
  name: "marketfoot",
  data() {
    return {
      // username: "",
      phone: "",
      password: "",
      password_confirmation: "",
      security: "",
      security_confirmation: "",
      phone_code: "",
      recommend: "",
      inentify: true,
      timer: false,
      count: 60,
      time: ""
    };
  },
  methods: {
    // 一个简单的定时器 点击的时候 计入倒计时 如果倒计时等于1的时候显示点击按钮清除定时器
    async send() {
      clearInterval(this.time);
      if (!this.phone) {
        this.$toasted.error("请输入手机号", { icon: "error" }).goAway(2000);
        return;
      }
      try {
        clearInterval(this.time);
        // await等待一个异步返回的结果 如果没有await 会报user is undefined 获取不到
        let res = await this.http.post("/api/send_code", {
          phone: this.phone
        });
        console.log(res);
        this.$toasted.success("发送成功").goAway(1500);
      } catch (error) {
        this.$toasted.error(error.message, { icon: "error" }).goAway(2000);
      }
      (this.inentify = !this.inentify),
        (this.timer = true),
        (this.time = setInterval(() => {
          this.count -= 1;
          if (this.count == 0) {
            clearInterval(this.time);
            this.inentify = !this.inentify;
            this.timer = false;
            // this.timer = true;
            this.count = 60;
          }
        }, 1000));
    },
    async register() {
      if (
        !this.phone ||
        // !this.username ||
        !this.password ||
        !this.password_confirmation ||
        !this.phone_code ||
        !this.recommend
      ) {
        this.$toasted.error("请输入完善信息", { icon: "error" }).goAway(2000);
        return;
      }

      try {
        // await等待一个异步返回的结果 如果没有await 会报user is undefined 获取不到
        let res = await this.http.post("/api/register", {
          // username: this.username,
          phone: this.phone,
          password: this.password,
          repassword: this.password_confirmation,
          phone_code: this.phone_code,
          recommend: this.recommend
        });
        this.$toasted.success("注册成功").goAway(1500);
        this.$router.replace({ name: "login" });
      } catch (error) {
        this.$toasted.error(error.message, { icon: "error" }).goAway(2000);
      }
    },
    // 下载app
    xz() {
      let ua = navigator.userAgent.toLowerCase();
      //android终端
      let isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1; //ios终端
      let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isWeixinBrowser()) {
        // this.$router.push({
        //   path: "/product"
        // });
        console.log(isWeixinBrowser());
      } else {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //ios
          this.ShowPop = !this.ShowPop;
          this.ShowDark = !this.ShowDark;
          console.log("ios");
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //android
          // window.location = "http://www.xyfan.top/app.apk";
          console.log("安卓");
        }
      }

      function isWeixinBrowser() {
        return /micromessenger/.test(ua) ? true : false;
      }
    }
  }
};
</script>

<style scoped>
.regiset1 {
  min-height: 100%;
  /* background: #f5f5f5; */
}
.baozhud {
  /* background: red; */
  padding: 0.4rem 0;
  /* padding-top: 1rem; */
  /* margin: 0 auto; */
}
.baozhu1 {
  display: block;
  height: 1.24rem;
  width: 1.04rem;
  margin: 0 auto;
}
.put {
  width: 90%;
  margin-left: 5%;
  height: 0.8rem;
  /* background: #fff; */
  /* padding: 0.28rem; */

  /* padding: 0 0.28rem; */
  /* background: red; */
  border: 1px solid #fff;
  border-radius: 5px;
  margin-bottom: 0.2rem;
}
.put > input {
  border: 0;
  background: none;
  color: #fff;
  float: left;
  /* line-height: 0.9rem; */
  line-height: 0.4rem;
  padding: 0.2rem 0;
  width: 40%;
}
.put > span {
  display: inline-block;
  width: 1.8rem;
  color: #fff;
  padding-left: 0.2rem;
  float: left;
  line-height: 0.8rem;
}
.code {
  width: 35% !important;
}
.p {
  float: right;
  /* background: #fff; */
  width: 30%;
  text-align: center;
  height: 0.6rem;
  line-height: 0.6rem;
  margin-top: 0.12rem;
  color: #fff;
  border-radius: 4px;
  /* border: 1px solid #1e853c; */
}
button {
  width: 84.5%;
  margin: 0 auto;
  margin-left: 7.75%;
  height: 0.8rem;
  margin-top: 0.4rem;
  background: #fff;
  color: #f1941d;
  font-size: 0.28rem;
  border-radius: 0.4rem;
}
.xz {
  margin-bottom: 1rem;
  text-align: center;
  margin-top: 0.2rem;
  font-size: 0.3rem;
  color: #fff;
}
</style>


