<template>
  <div class="renggongg">
    <header>
      <div>
        <img @click="go" src="../../../public/image/return.png" alt>
        人工充值
      </div>
    </header>
    <!-- 内容区 -->
    <div class="nr">
      <img :src="url" alt>
      <p style="margin-top:0.14rem;font-size:0.24rem;color:#f1941d">温馨提示 : 请用支付宝扫码支付</p>
    </div>
    <div class="nr12">
      <div>
        <span>充值金额</span>
        <input v-model="money" placeholder="0.00" type="number" name id>
        元
      </div>
      <div>
        <span>支付宝账号</span>
        <input v-model="zhanghao" placeholder="请填写支付宝账号" type="text" name id>
      </div>
      <div>
        <span>真实姓名</span>
        <input v-model="name" placeholder="请填写真实姓名" type="text" name id>
      </div>
      <p style="font-size:0.22rem;color:#f1941d">温馨提示 : 准确填写所充值的金额 , 请勿重复提交 !</p>
      <button class="butt" @click="butt">提交记录</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      money: "",
      zhanghao: "",
      name: "",
      url: ""
    };
  },
  mounted() {
    // this.$store.commit("headerTab", false);
    this.$store.commit("headerTab", false);
    this.$store.commit("footerTab", false);
    this.http.post("/api/rg_code").then(res => {
      if (res.code == 200) {
        console.log(res);
        this.url = res.data.url + "" + res.data.data;
      }
    });
  },
  methods: {
    //   返回上一页
    go() {
      this.$router.go(-1);
    },
    // 最后的提价事件
    butt() {
      this.http
        .post("/api/rg_pay", {
          real_name: this.name,
          money: this.money,
          phone: this.zhanghao
        })
        .then(res => {
          if (res.code == 200) {
            this.$toasted.success(res.message).goAway(1000);
            this.money = this.zhanghao = this.name = "";
          } else {
            this.$toasted.error(res.message).goAway(1000);
          }
        })
        .catch(res => {
          this.$toasted.error(res.message).goAway(1000);
        });
    }
  }
};
</script>
<style scope="">
.renggongg {
  height: 100%;
  width: 100%;
  background: #f5f5f5;
}
.renggongg > header {
  height: 1.32rem;
  background: url("../../assets/imgs/background.png") no-repeat left;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.renggongg > header > div {
  height: 0.88rem;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  line-height: 0.88rem;
  color: #fff;
  font-size: 0.3rem;
}
.renggongg > header > div > img {
  height: 0.3rem;
  position: absolute;
  left: 0.3rem;
  bottom: 0.3rem;
}
.renggongg > .nr {
  margin-top: 1.32rem;
  height: 5rem;
  text-align: center;
}
.renggongg > .nr > img {
  margin-top: 0.4rem;
  height: 3.5rem;
}
.renggongg > .nr12 {
  padding: 0 0.3rem;
  text-align: center;
}
.renggongg > .nr12 > div {
  width: 100%;
  background: #ffffff;
  height: 0.9rem;
  margin-bottom: 0.2rem;
  border-radius: 0.1rem;
  line-height: 0.9rem;
  padding: 0 0.3rem;
  display: flex;
  justify-content: space-between;
}
.renggongg > .nr12 > div > input {
  padding: 0.25rem 0;
  text-align: right;
}
.butt {
  width: 94%;
  height: 0.84rem;
  background: #f1941d;
  margin-top: 0.3rem;
  border-radius: 0.4rem;
  color: #ffffff;
}
</style>
