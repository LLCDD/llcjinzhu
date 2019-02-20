<template>
  <div class="content1">
    <!-- <input type="text" placeholder="请输入账号" v-model="phone">
    <input type="password" placeholder="请输入密码" v-model="password">-->
    <div class="landing">
      <span>手机号</span>
      <input type="number" placeholder="请输入账号" v-model="phone">
    </div>
    <div class="landing">
      <span>密码</span>
      <input type="password" placeholder="请输入密码" v-model="password">
    </div>
    <div class="login" @click="login">登录</div>
    <div class="problemlll">
      <router-link tag="span" to="/register">立即注册</router-link>
      <router-link tag="span" to="/retrieve">忘记密码？</router-link>
    </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  data() {
    return {
      phone: "",
      password: "",
      count: 0
    };
  },
  methods: {
    async login() {
      if (!this.phone || !this.password) {
        this.$toasted.error("请输入完善信息", { icon: "error" }).goAway(2000);
        return;
      }
      if (this.count == 0) {
        this.count = 1;
        try {
          // await等待一个异步返回的结果 如果没有await 会报user is undefined 获取不到
          let res = await this.http.post("/api/login", {
            phone: this.phone,
            password: this.password
          });
          if (res.code == 200) {
            console.log(res);
            // this.$store.commit("loginbanner", res.data.banners);
            // this.$store.dispatch("login", res.data.user);
            localStorage.setItem("token", res.data.token);
            this.$toasted.success("登录成功").goAway(1000);
            localStorage.setItem("uid", res.data.uid);
            // this.$router.replace({ name: "index" });
            this.$router.push("/index");
          } else {
            this.count = 0;
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        } catch (error) {
          this.count = 0;
          this.$toasted.error(error.message, { icon: "error" }).goAway(1000);
        }
      }
    }
  }
};
</script>

<style scoped>
.content1 {
  width: 100%;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
}
.content1 > .landing {
  width: 100%;
  height: 0.9rem;
  border: 1px solid #fff;
  border-radius: 5px;
  margin-bottom: 0.2rem;
}
.content1 > .landing > span {
  line-height: 0.9rem;
  color: #fff;
  font-weight: 500;
  display: inline-block;
  width: 1.6rem;
  font-size: 0.28rem;
  padding-left: 0.3rem;
  float: left;
}
.content1 > .landing > input {
  background: none;
  color: #fff;
  float: left;
  width: 50%;
  line-height: 0.4rem;
  padding: 0.25rem 0;
  /* height: 0.4rem; */
  /* margin-top: 0.24rem; */
}
.login {
  width: 100%;
  height: 0.8rem;
  border-radius: 0.4rem;
  background: #fff;
  margin-top: 1.23rem;
  text-align: center;
  line-height: 0.8rem;
  font-size: 0.3rem;
  color: #f1941d;
  margin-bottom: 0.2rem;
}
.problemlll {
  width: 100%;
  height: 0.44rem;
  display: flex;
  justify-content: space-between;
}
.problemlll span {
  width: 1.2rem;
  height: 0.44rem;
  line-height: 0.44rem;
  text-align: center;
  font-size: 0.24rem;
  color: #fff;
}
</style>