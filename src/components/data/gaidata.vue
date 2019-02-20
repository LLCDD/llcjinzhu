<template>
  <div class="div1">
    <div>
      <span class="first">昵称</span>
      <input type="text" placeholder="请输入昵称" v-model="name">
    </div>
    <div>
      <span class="first">真实姓名</span>
      <input type="text" placeholder="请输入真实姓名" v-model="nname">
    </div>
    <div class="sty" style="position: relative;">
      <span class="first">性别</span>
      <van-radio-group v-model="radio" style="display:inline-block;height:0.9rem;margin-left:-5%">
        <van-radio checked-color="#f1941d" style="display:inline;" name="1">男</van-radio>
        <van-radio checked-color="#f1941d" style="display:inline" name="2">女</van-radio>
      </van-radio-group>
      <!-- <el-radio-group v-model="radio2" fill="#f1941d" text-color="#f1941d">
        <el-radio text-color="#f1941d" :label="3">备选项</el-radio>
        <el-radio text-color="#f1941d" :label="6">备选项</el-radio>
      </el-radio-group>-->
    </div>
    <div>
      <span class="first">手机号</span>
      <input type="text" readonly placeholder="请输入手机号" v-model="phoen">
    </div>

    <button class="buttonq1" @click="xiuigai()">确定修改</button>
  </div>
</template>
<script>
import { RadioGroup, Radio } from "vant";
export default {
  data() {
    return {
      name: "",
      nname: "",
      gren: "",
      phoen: "",
      radio: "1"
    };
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("ld", false);
    this.$store.commit("header", "个人资料");
    this.$store.commit("fanhui", true);
    this.phoen = localStorage.getItem("phoney");
  },
  methods: {
    xiuigai() {
      // console.log("修改成功");
      this.http
        .post("/api/update_personal", {
          name: this.name,
          real_name: this.nname,
          phone: this.phoen,
          sex: this.radio
        })
        .then(res => {
          if (res.code == 200) {
            this.$toasted.success(res.message).goAway(1000);
            this.$router.replace({ name: "personal" });
          } else if (res.code == 400) {
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
      //
    },
    // 左滑返回
    onSwipeLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped="b">
.div1 {
  padding-top: 1.32rem;
  width: 100%;
  height: 100%;
}
.div1 > div {
  height: 0.9rem;
  line-height: 0.9rem;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  padding: 0 0.3rem;
  font-size: 0.3rem;
}
.first {
  display: inline-block;
  width: 22%;
  height: 100%;
}
.div1 > div > input {
  height: 80%;
}
.name {
  color: #999999;
}
.buttonq1 {
  height: 0.8rem;
  width: 84%;
  margin-left: 8%;
  color: #fff;
  border-radius: 0.5rem;
  background: #f1941d;
  margin-top: 0.8rem;
}
.div1 >>> .van-radio__input {
  height: 2em;
  margin-left: 0.3rem;
}
</style>
