<template>
  <div class="personal">
    <!-- <van-loading v-if="loding" class="loding" size="50px" type="spinner"/> -->
    <!-- <img @click="qrcode" class="qrcode" src="../../assets/imgs/qrcode.png" alt> -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="header">
        <div class="warp">
          <div class="photo">
            <img src="../../assets/imgs/heaertttt.png" alt>
          </div>
          <div class="name">
            <p>{{ msg }}</p>
            <p>ID:{{ nickname }}</p>
          </div>
          <div class="geren" @click="gern">
            个人资料&nbsp;&nbsp;&nbsp;
            <img src="../../assets/imgs/return.png" alt>
          </div>
        </div>
      </div>
      <div class="_warp1">
        <div>
          <p>我的钱包 ( 元 )</p>
          <div>
            <span class="money">{{ money }}</span>
            <span class="caoz" @click="zijin()">
              资金记录
              <img src="../../assets/imgs/oragin.png" alt>
            </span>
          </div>
          <div class="ftdiv">
            <button @click="tixian()">提现</button>
            <button class="chongzhi" @click="chongzhi()">充值</button>
          </div>
        </div>
      </div>
      <div class="data">
        <div class="dw">
          <router-link tag="p" to="/Sign">签到</router-link>
          <img class="dw1" src="../../assets/imgs/task.png" alt>
          <img class="dw2" src="../../assets/imgs/oragin.png" alt>
        </div>
      </div>
      <div class="data1">
        <div class="dw">
          <router-link tag="p" to="/myrecommendation">我的推荐</router-link>
          <img class="dw1" src="../../assets/imgs/select.png" alt>
          <p style="position: absolute;right:0.6rem;top:0;color:#999">{{ tui1}}</p>
          <img class="dw2" src="../../assets/imgs/oragin.png" alt>
        </div>
        <div class="dw">
          <router-link tag="p" to="/advertising">我的银行卡</router-link>
          <img class="dw1" src="../../assets/imgs/headlines.png" alt>
          <img class="dw2" src="../../assets/imgs/oragin.png" alt>
        </div>
        <div class="dw">
          <router-link tag="p" to="/zhifubao">我的支付宝</router-link>
          <img class="dw1" src="../../assets/imgs/ali.png" alt>
          <img class="dw2" src="../../assets/imgs/oragin.png" alt>
        </div>
      </div>
      <div class="data2">
        <div class="dw">
          <router-link tag="p" to="/Promotionposter">推广海报</router-link>
          <img class="dw1" src="../../assets/imgs/picture.png" alt>
          <img class="dw2" src="../../assets/imgs/oragin.png" alt>
        </div>
        <div class="dw dy">
          <router-link tag="p" to="/Set">设置</router-link>
          <img class="dw1" src="../../assets/imgs/setup.png" alt>
          <img class="dw2" src="../../assets/imgs/oragin.png" alt>
        </div>
      </div>
      <van-popup v-model="show" class="hi">
        <div class="hi">
          <p>二维码</p>
          <div>
            <img :src="src" alt>
          </div>
        </div>
      </van-popup>

      <button class="button" @click="tui()">安全退出</button>
    </van-pull-refresh>
  </div>
</template>
<script>
import { Popup } from "vant";
import { Toast } from "vant";
import { Loading } from "vant";

export default {
  data() {
    return {
      msg: "",
      show: false,
      nickname: "",
      money: "",
      src: "",
      tui1: "34534",
      isLoading: false,
      loding: true
    };
  },
  // beforeCreate() {
  //   Toast.loading({
  //     mask: true,
  //     message: "加载中...",
  //     duration: 30000
  //   });
  // },
  mounted() {
    this.$store.commit("tuijian", false);
    this.$store.commit("headerTab", false);
    this.$store.commit("footerTab", true);
    this.$store.commit("ld", false);
    this.http
      .post("/api/my_center")
      .then(res => {
        if (res.code == 200) {
          console.log(res);
          this.msg = res.data.name;
          this.nickname = res.data.id;
          this.money = res.data.wallet;
          this.tui1 = res.data.recommend;
          this.loding = false;
          // Toast.clear();
        } else if (res.code == 400) {
          // Toast.clear();
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        }
      })
      .catch(res => {
        // Toast.clear();
        this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
      });
    this.http
      .post("/api/my_qrcode")
      .then(res => {
        if (res.code == 200) {
          this.src = res.data.my_qrcode;
        } else if (res.code == 400) {
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        }
      })
      .catch(res => {
        this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
      });
  },
  methods: {
    // 个人中心
    gern() {
      this.$router.push("/data");
    },
    // 二维码
    qrcode() {
      console.log("二维码");
      this.show = true;
    },
    // 资金记录
    zijin() {
      this.$router.push("/record");
    },
    // 提现
    tixian() {
      this.$router.push("/withdrawal");
    },
    chongzhi() {
      this.$router.push("/topup");
    },
    // 退出
    tui() {
      localStorage.clear();
      sessionStorage.clear();
      this.$store.commit("shuju", []);
      this.$router.replace({ name: "login" });
    },
    onRefresh() {
      this.http
        .post("/api/my_center")
        .then(res => {
          if (res.code == 200) {
            console.log(res);
            this.msg = res.data.name;
            this.nickname = res.data.id;
            this.money = res.data.wallet;
            this.tui1 = res.data.recommend;
            this.isLoading = false;
            // Toast.clear();
          } else if (res.code == 400) {
            // Toast.clear();
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          // Toast.clear();
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
    }
  }
};
</script>
<style scoped="">
.personal {
  min-height: 100%;
  background: #f2f2f2;
  width: 100%;
  /* padding-left: 0.3rem; */
  /* padding-right: 0.3rem; */
}
.qrcode {
  position: absolute;
  height: 0.42rem;
  width: 0.42rem;
  right: 0.3rem;
  top: 0.74rem;
  z-index: 99;
}
.header {
  height: 5.3rem;
  width: 100%;
  background: url("../../assets/imgs/ger.png") no-repeat top;
  background-size: cover;
  padding-top: 0.88rem;
}
.money {
  font-size: 0.4rem;
  font-weight: 900;
  color: #f1941d;
}
._warp1 {
  width: 100%;
  /* background: red; */
  height: 3rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  margin-top: -2.4rem;
  margin-bottom: 0.3rem;
}
.caoz {
  float: right;
  color: #f1941d;
  font-size: 0.24rem;
}
.caoz > img {
  height: 0.24rem;
  margin-left: 0.1rem;
  margin-bottom: 0.05rem;
}
._warp1 > div {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 0.2rem;
  box-shadow: 1px 1px 4px #ccc;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}
._warp1 > div > p {
  padding-top: 0.3rem;
}
._warp1 > div > div {
  height: 1rem;
  border-bottom: 2px solid #d1d1d1;
  line-height: 1rem;
}
.warp {
  height: 1.5rem;
  /* background: red; */
  padding-left: 0.5rem;
  width: 100%;
  position: relative;
}
.photo {
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
  border: 3px solid #ffffff;
  display: inline-block;
  overflow: hidden;
}
.photo > img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.geren {
  position: absolute;
  right: 0.3rem;
  bottom: 0.2rem;
  color: #fff;
}
.geren > img {
  height: 0.26rem;
  position: absolute;
  right: 0;
  top: 0.02rem;
  padding-left: 0.1rem;
}
.name {
  display: inline-block;
  position: absolute;
  bottom: 0rem;
  left: 2rem;
}

.name > p {
  padding-bottom: 0.2rem;
  padding-left: 0.2rem;
  font-size: 0.3rem;
  color: #fff;
}
.ftdiv {
  margin-top: 0.46rem;
}
.ftdiv > button {
  height: 0.6rem;
  line-height: 0.6rem;
  width: 46%;
  border-radius: 0.5rem;
  background: #f1941d;
  color: #fff;
  margin-bottom: 1.3rem;
}
.chongzhi {
  float: right !important;
  background: #ff5858 !important;
}
._warp {
  height: 1.8rem;
  background: red;
}
.dynamic {
  height: 2.2rem;
  background: #fff;
}
.dynamic > div {
  height: 1.64rem;
  width: 45.6%;
  border-radius: 0.15rem;
  float: left;
  margin-top: 0.28rem;
  /* background: pink; */
}
.first {
  background: url("../../assets/img/icon2b.png") no-repeat;
  background-size: cover;
  margin-left: 4%;
}
.two {
  background: url("../../assets/img/icon1b.png") no-repeat top;
  background-size: cover;
  margin-left: 4px;
}
.dynamic > div > img {
  display: block;
  border: 0;
  height: 1.24rem;
  width: 1.24rem;
  margin-left: 0.2rem;
  float: left;
  margin-top: 0.14rem;
}
.first > div {
  padding-top: 0.35rem;
  margin-left: 0.1rem;
  float: left;
  font-size: 0.36rem;
  color: #fff;
}
.two > div {
  padding-top: 0.35rem;
  margin-left: 0.1rem;
  float: left;
  font-size: 0.36rem;
  color: #fff;
}
.two > div > span {
  display: inline-block;
  margin-top: 0.24rem;
}
.first > div > span {
  display: inline-block;
  margin-top: 0.24rem;
}
.data {
  margin-top: 0.2rem;
  background: #fff;
}
.data > div {
  height: 0.82rem;
  font-size: 0.3rem;
  line-height: 0.82rem;
  padding-left: 0.9rem;
  border-bottom: 2px solid #f5f5f5;
}
.data > p {
  height: 0.82rem;
  font-size: 0.3rem;
  line-height: 0.82rem;
  padding-left: 0.9rem;
  border-bottom: 2px solid #f5f5f5;
}

.data1 {
  margin-top: 0.2rem;
  background: #fff;
}
.data1 > div {
  height: 0.82rem;
  font-size: 0.3rem;
  line-height: 0.82rem;
  padding-left: 0.9rem;
  border-bottom: 2px solid #f5f5f5;
}
.data1 > p {
  height: 0.82rem;
  font-size: 0.3rem;
  line-height: 0.82rem;
  padding-left: 0.9rem;
  border-bottom: 2px solid #f5f5f5;
}
.data2 {
  /* margin-top: 0.2rem; */
  background: #fff;
}
.data2 > div {
  height: 0.82rem;
  font-size: 0.3rem;
  line-height: 0.82rem;
  padding-left: 0.9rem;
  border-bottom: 2px solid #f5f5f5;
}
.data2 > p {
  height: 0.82rem;
  font-size: 0.3rem;
  line-height: 0.82rem;
  padding-left: 0.9rem;
  border-bottom: 2px solid #f5f5f5;
}
.button {
  /* margin-top: 0.4rem; */
  margin-bottom: 1.4rem;
  height: 0.8rem;
  width: 92%;
  margin-left: 4%;
  background: #f1941d;
  font-size: 0.3rem;
  color: #fff;
  border-radius: 6px;
}
.dw {
  position: relative;
}
.dw1 {
  position: absolute;
  left: 0.34rem;
  top: 0.24rem;
  height: 0.36rem;
}
.dw2 {
  height: 0.3rem;
  position: absolute;
  right: 0.3rem;
  top: 0.26rem;
}
.dy {
  margin-bottom: 0.6rem;
}
.hi {
  width: 5rem;
  height: 5.8rem;
  background: #fff;
  border-radius: 0.3rem;
  overflow: hidden;
  text-align: center;
}
.hi > p {
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  background: #f1941d;
  color: #fff;
}
.hi > div > img {
  width: 60%;
  margin-top: 1rem;
}
.loding {
  position: fixed;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
