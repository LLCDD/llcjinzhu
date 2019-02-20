<template>
  <!-- <div class="entry">
           <input type="text" placeholder="请输入手机号" v-model="phone">
           <input type="text" placeholder="请输入昵称" v-model="username">
           <p>
             <input type="text" placeholder="输入手机验证码" v-model="phone_code">
             <span v-show="inentify" @click="send">发送验证码</span>
             <span v-show="timer">{{count}}s</span>
           </p>
           <input type="password" placeholder="请输入密码" v-model="password">
           <input type="password" placeholder="请再次输入密码" v-model="password_confirmation">
           <input type="password" placeholder="输入支付密码" v-model="security">
           <input type="password" placeholder="请再次输入支付密码" v-model="security_confirmation">
           <input type="text" placeholder="邀请码:888888" v-model="recommend">
        </div>
        <div class="foot" @click="register">
             立即注册
  </div>-->
  <div class="regiset">
    <div class="baozhud">
      <img class="baozhu1" src="../../../assets/imgs/3.png" alt>
    </div>
    <!-- <div class="put">
      <span>呢称</span>
      <input type="text" placeholder="请输入昵称" v-model="username">
    </div>-->
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
    <!-- <div class="put">
      <span>邀请码</span>
      <input type="text" placeholder="请输入邀请码" v-model="recommend">
    </div>-->
    <button @click="register">确定</button>
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
      //   recommend: "",
      inentify: true,
      timer: false,
      count: 60,
      time: "",
      // 倒计时
      daojishi: null,
      pandu: 0
    };
  },
  methods: {
    // 一个简单的定时器 点击的时候 计入倒计时 如果倒计时等于1的时候显示点击按钮清除定时器
    // async send() {
    //   clearInterval(this.time);
    //   if (!this.phone) {
    //     this.$toasted.error("请输入手机号", { icon: "error" }).goAway(2000);
    //     return;
    //   }
    //   try {
    //     clearInterval(this.time);
    //     // await等待一个异步返回的结果 如果没有await 会报user is undefined 获取不到
    //     let res = await this.http.post("/api/send_code", {
    //       phone: this.phone
    //     });
    //     console.log(res);
    //     this.$toasted.success("发送成功").goAway(1500);
    //   } catch (error) {
    //     this.$toasted.error(error.message, { icon: "error" }).goAway(2000);
    //   }
    //   (this.inentify = !this.inentify),
    //     (this.timer = true),
    //     (this.time = setInterval(() => {
    //       this.count -= 1;
    //       if (this.count == 0) {
    //         clearInterval(this.time);
    //         this.inentify = !this.inentify;
    //         this.timer = false;
    //         this.count = 60;
    //       }
    //     }, 1000));
    // },
    send() {
      var count = 60;
      var _this = this;
      clearInterval(this.daojishi);
      if (this.pandu == 0) {
        this.pandu = 1;
        this.http
          .post("/api/send_code", { phone: this.phone })
          .then(res => {
            if (res.code == 200) {
              this.inentify = false;
              this.timer = true;
              this.daojishi = setInterval(() => {
                count--;
                this.count = count;
                if (count <= 0) {
                  clearInterval(this.daojishi);
                  this.inentify = true;
                  this.timer = false;
                  this.pandu = 0;
                }
              }, 1000);
            } else if (res.code == 400) {
              this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
            }
          })
          .catch(res => {
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          });
      }
    },
    async register() {
      if (
        !this.phone ||
        // !this.username ||
        !this.password ||
        !this.password_confirmation ||
        !this.phone_code
        // !this.recommend
      ) {
        this.$toasted.error("请输入完善信息", { icon: "error" }).goAway(2000);
        return;
      }

      try {
        // await等待一个异步返回的结果 如果没有await 会报user is undefined 获取不到
        let res = await this.http.post("/api/forget", {
          // username: this.username,
          phone: this.phone,
          password: this.password,
          repassword: this.password_confirmation,
          phone_code: this.phone_code
          //   recommend: this.recommend
        });
        console.log(res);
        this.$toasted.success("修改成功").goAway(1500);
        this.$router.replace({ name: "login" });
      } catch (error) {
        this.$toasted.error(error.message, { icon: "error" }).goAway(2000);
      }
    }
  }
};
</script>

<style scoped>
.regiset {
  min-height: 100%;
  /* background: #f5f5f5; */
}
.baozhud {
  /* background: red; */
  padding: 0.4rem 0;
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
  /* background: #fff; */
  /* padding: 0.28rem; */
  /* padding: 0 0.28rem; */
  /* background: red; */
  border: 1px solid #fff;
  border-radius: 5px;
  margin-bottom: 0.2rem;
  height: 0.8rem;
}
.put > input {
  border: 0;
  background: none;
  color: #fff;
  width: 38%;
  line-height: 0.4rem;
  padding: 0.2rem 0;
  float: left;
}
.put > span {
  display: inline-block;
  width: 1.8rem;
  color: #fff;
  padding-left: 0.2rem;
  height: 0.8rem;
  float: left;
  line-height: 0.8rem;
}
.code {
  width: 36%;
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


