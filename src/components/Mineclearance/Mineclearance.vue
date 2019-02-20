<template>
  <div class="Mineclearance">
    <!-- v-touch:right="onSwipeRight" -->
    <!-- 循环 -->
    <!-- <div class="warpo">
      <span class="spanv">14.18</span>
    </div>-->
    <div class="Mineclearanceyy">
      <div v-for="(item,index) in num" :key="index" class="hongbao">
        <!-- <transition
          enter-active-class="animated fadeInLeft"
          leave-active-class="animated fadeOutRight"
        >-->
        <div
          @click="xiqing(item.id,item.game_name)"
          class="saihongbaoy"
          v-if="item.type == 1"
          :class="{'hongbao1':item.uid == uid1 }"
        >
          <!--  -->
          <img src="../../assets/imgs/heaertttt.png" alt>
          <p>{{ item.phone }}</p>
          <!-- {{ item.uid }} -->
          <div>
            <p>{{ msg }}</p>
            <br>
            <p>{{ item.money }}-{{ item.spot }}</p>
          </div>
        </div>
        <!-- </transition> -->
        <!-- <p
          v-if="item.rewarder > 0"
        >恭喜{{ item.phone }}领取 , 奖励 ({{ item.money }}) + {{ item.rewarder}}</p>-->
        <!-- 红包的中奖提示 -->
        <!-- <div v-if="item.type == 2 && item.uid == uid1 " class="warpu">
          <div>
        <img v-if="it   em.is_spot == 0" src="../../assets/imgs/tbb.png" alt>-->
        <!-- 这个注释的不要 <img v-if="item.is_spot == 1" src="../../assets/imgs/qinglei.png" alt> -->
        <!-- <p style="width:100%; " v-if="item.is_spot == 0">
              恭喜{{ item.phone }} 领取了你的红包
              <span style="color:red">红包</span>
        </p>-->
        <!-- <p
              v-if="item.is_spot == 1"
        >{{ item.phone }}不幸 , 奖励 ({{ item.rewarder }}) + {{item.money}}</p>-->
        <!-- <p style="width:60%;margin-left:20%" v-if="item.is_spot == 1">
              <img style="width:6%" v-if="item.is_spot == 1" src="../../assets/imgs/tbb.png" alt>
              {{ item.phone }}不幸 中雷
            </p>
        </div>-->
        <!-- </div> -->
        <!-- 中雷的样式 -->
        <!-- <div class="warpu">
          <div>
            
            <p>恭喜{{ msg }}中奖 , 奖励 ({{ msg1 }}) + {{money}}</p>
          </div>
        </div>-->
        <!-- <p
          class="warpu"
          style="background:#ccc;width:66%;margin-left:16%;color:#fff"
          v-if="item.status == 2 && item.uid == uid1"
        >
          <img style="height:90%" src="../../assets/imgs/tbb.png" alt>
          你的红包 {{item.money}}-{{ item.spot }} 的红包已被领完
        </p>-->
        <p
          class="warpu"
          style="background:#ccc;width:90%;color:#fff;margin-left:5%"
          v-if="item.rewarder > 0"
        >
          <img style="height:100%" src="../../assets/imgs/tbb.png" alt>
          恭喜{{ item.phone }}领取 , 奖励 ({{ item.money }}) + {{ item.rewarder}}
        </p>
      </div>
    </div>
    <!-- <div class="warpo">
      <span class="spanv">14.18</span>
    </div>-->
    <!-- <div class="hongbao1" @click="qinglei()">
      <img class="touxian1" src="../../assets/imgs/my.png" alt>
      <p class="pf1">123232132</p>
      <div class="bao1">
        <p>{{ msg }}</p>
        <br>
        <p>{{ msg1}}</p>
      </div>
    </div>-->
    <div class="bottom">
      <button @click="fabao()">一键发包</button>
      <button @click="xainshi()">余额</button>
    </div>
    <!-- 余额 -->
    <van-popup v-model="show" class="hiy">
      <div class="hiy">
        <p>余额</p>
        <div>账户余额 ：{{money}}</div>
      </div>
    </van-popup>
    <!-- 中红包 -->
    <van-popup v-model="show1" class="qiang">
      <div>
        <img src="../../assets/imgs/qiang.png" alt>
      </div>
    </van-popup>
    <!-- 中雷 -->
    <van-popup v-model="show2" class="qiang1">
      <div>
        <img src="../../assets/imgs/qinglei.png" alt>
      </div>
    </van-popup>
    <audio id="music">
      <source src="../../assets/music/iphone.mp3">
    </audio>
  </div>
</template>
<script>
import { Popup, Toast } from "vant";
export default {
  data() {
    return {
      msg: "恭喜发财 , 大吉大利",
      msg1: localStorage.getItem("guize"),
      money: "",
      show: false,
      uid1: localStorage.getItem("uid"),
      // 红包
      show1: false,
      // 雷
      show2: false,
      timer: null,
      websock: null,
      num: [],
      count: 0,
      // 随机人数
      // 最小
      min: 1,
      // 最大
      max: "",
      timery: null
    };
  },
  created() {
    this.initWebSocket();
  },

  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("header", localStorage.getItem("roomname"));
    this.$store.commit("ld", false);
    this.$store.commit("fanhui", false);
    this.$store.commit("fanhui3", true);
    this.$store.commit("fanhuiin", false);
    this.scrollToBottom();
    localStorage.setItem("panduan", 0);
    this.$store.commit("propers", true);
    this.$store.commit("qing", false);
    localStorage.setItem("avatar", this.$route.params.biaoshi);
    clearInterval(this.$store.state.timer);
    // 定时发起ws的请求  确定ws在链接装态
    // setInterval(() => {
    //   this.initWebSocket();
    // }, 6000);

    // var scrollTop = document.Toast.clear(); // console.log(this.$route.params.biaoshi);
    // console.log(this.$route.params.biaoshi);
    if (localStorage.getItem("num" + this.$route.params.biaoshi)) {
    } else {
      localStorage.setItem("num" + this.$route.params.biaoshi, 0);
    }
    localStorage.setItem("avatar", this.$route.params.biaoshi);

    // 随机人数
    // this.http
    //   .post("/api/room_personal", {
    //     room_id: this.$route.params.biaoshi
    //   })
    //   .then(res => {
    //     if (res.code == 200) {
    //       // console.log(res);
    //       this.min = res.data.data[0];
    //       this.max = res.data.data[1];
    //       clearInterval(this.$store.state.timer);
    //       this.$store.commit("pors", res.data.data[0]);
    //       this.$store.commit(
    //         "timer",
    //         setInterval(() => {
    //           //
    //           var suij = Math.ceil(Math.random() * 10);
    //           if (this.min > this.max) {
    //             this.min = parseInt(this.min) - parseInt(suij);
    //             this.$store.commit("pors", this.min);
    //           } else {
    //             this.min = parseInt(this.min) + parseInt(suij);
    //             this.$store.commit("pors", this.min);
    //           }
    //           // this.initWebSocket();
    //         }, 5000)
    //       );
    //     }
    //   });
  },
  methods: {
    fabao() {
      this.$router.push("/saihongb");
    },
    // 滑动的返回
    onSwipeRight() {
      this.$router.go(-1);
    },
    xainshi() {
      this.show = true;
      this.http
        .post("/api/my_center")
        .then(res => {
          if (res.code == 200) {
            console.log(res);
            this.money = res.data.wallet;
          } else if (res.code == 400) {
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
    },
    // 抢红包
    xiqing(id, name) {
      if (localStorage.getItem("panduan") == 0) {
        localStorage.setItem("panduan", 1);
        // console.log(id, name);
        var _this = this;
        clearInterval(this.timer);
        _this.http
          .post("/api/rob_package", { game_name: name })
          .then(
            res => {
              if (res.code == 200) {
                this.$toasted.success(res.message).goAway(1000);
                if (res.data.code == 2) {
                  localStorage.setItem("panduan", 0);
                  this.$toasted.error("您的余额不足").goAway(1000);
                } else if (res.data.code == 1) {
                  if (res.data.is_spot == 0) {
                    this.show1 = true;
                    this.show2 = false;
                    this.timer = setInterval(() => {
                      _this.show1 = false;
                      _this.$router.push("/redenvelope/" + id);
                      clearInterval(this.timer);
                    }, 500);
                  } else {
                    this.show1 = false;
                    this.show2 = true;
                    this.timer = setInterval(() => {
                      _this.show2 = false;
                      _this.$router.push("/redenvelope/" + id);
                      clearInterval(this.timer);
                    }, 500);
                  }
                } else {
                  clearInterval(this.timer);
                  this.$toasted.error(res.message).goAway(1000);
                  this.$router.push("/redenvelope/" + id);
                }
                // _this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
                console.log(res);
              } else if (res.code == 400) {
                clearInterval(this.timer);
                // console.log(res);
                // _this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
                this.$toasted
                  .error(res.message, { icon: "error" })
                  .goAway(1000);
              }
            },
            err => {
              localStorage.setItem("panduan", 0);
              this.$toasted.error(err.message, { icon: "error" }).goAway(1000);
            }
          )
          .catch(res => {
            clearInterval(this.timer);
            _this.$toasted.error(res.messsage, { icon: "error" }).goAway(1000);
          });
        clearInterval(this.timer);
      }
    },
    // 抢雷

    // 滚动条
    // scrollToBottom: function() {
    //   var _this = this;
    //   var div = document.getElementsByClassName("Mineclearance")[0];
    //   // this.timer1 = setInterval(function() {
    //   if (_this.count <= div.scrollHeight) {
    //     div.scrollTop = _this.count += 64;
    //     // div.scrollTop = div.scrollHeight;
    //     // console.log(div.scrollTop, div.scrollHeight);
    //     // document.getElementById("music").currentTime = 0;
    //     // document.getElementById("music").play();
    //   } else {
    //     // document.getElementById("music").currentTime = 0;
    //     this.count = div.scrollHeight;
    //   }
    //   // }, 50);
    //   // console.log();
    //   // div.scrollTop = ;
    // },
    scrollToBottom() {
      this.$nextTick(() => {
        var div = document.getElementsByClassName("Mineclearanceyy")[0];
        // console.log();
        console.log(div.scrollTop, div.scrollHeight);
        div.scrollTop = div.scrollHeight;
      });
    },
    // ------------webscoket
    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://mi.frqrjg.top/ws";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
      // console.log("连接成功");
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      let actions = {
        type: "joinRoom",
        lastMsgId: localStorage.getItem("num" + this.$route.params.biaoshi),
        // lastMsgId: 0,
        roomId: this.$route.params.biaoshi
      };
      this.websocketsend(JSON.stringify(actions));
      //				console.log()
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      var arr = JSON.parse(e.data);
      // var arr = e.data;
      console.log(arr);
      if (arr.data) {
        // var ceshi = arr.data;
        var ceshi = arr.data;
        var arr1 = ceshi;

        for (var i = 0; i < arr1.length; i++) {
          this.num.push(arr1[i]);
        }
      } else {
        console.log(arr);
        if (arr.type == 1) {
          document.getElementById("music").currentTime = 0;
          document.getElementById("music").play();
        }
        this.num.push(arr);
      }
      console.log(this.num);
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
      console.log(Data);
      console.log("发送成功----");
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    }
  },
  updated() {
    this.scrollToBottom();
    // console.log(this.num[this.num.length - 1]);
    if (this.$route.params.biaoshi == 1) {
      if (this.$store.state.county == 0) {
        this.$store.commit("county", 1);
        if (this.num.length > 0) {
          localStorage.setItem(
            "num" + this.$route.params.biaoshi,
            this.num[0].id
          );
        }
      }
    } else {
      if (this.$store.state.county1 == 0) {
        this.$store.commit("county1", 1);
        if (this.num.length > 0) {
          localStorage.setItem(
            "num" + this.$route.params.biaoshi,
            this.num[0].id
          );
        }
      }
    }
    // this.websocketonmessage();
  },
  destroyed() {
    // console.log(this.num);
    this.websock.close(); //离开路由之后断开websocket连接
  }
};
</script>
<style scoped>
.Mineclearance {
  /* min-height: 100%; */
  height: 100%;
  background: #f5f5f5;
  width: 100%;

  padding-top: 1.44rem;
  text-align: center;
  padding-bottom: 1.4rem;
  /* overflow: scroll; */
}
.Mineclearanceyy {
  height: 100%;
  padding: 0 0.3rem;
  overflow: scroll;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
}
.hiy {
  width: 5rem;
  height: 2.4rem;
  background: #fff;
  border-radius: 0.2rem;
}
.hiy > p {
  height: 0.8rem;
  background: #f1941d;
  font-size: 0.3rem;
  line-height: 0.8rem;
  color: #fff;
}
.hiy > div {
  height: 1.6rem;
  line-height: 1.6rem;
  text-align: center;
  color: #f1941d;
  font-size: 0.3rem;
}
.spanv {
  display: inline-block;
  height: 0.32rem;
  width: 1.34rem;
  border-radius: 0.6rem;
  background: #cccccc;
  text-align: center;
  color: #fff;
  line-height: 0.32rem;
  margin: 0 auto;
}
.warpo {
  width: 100%;
  height: 0.9rem;
  line-height: 0.9rem;
  margin-top: 0.2rem;
}
.saihongbaoy {
  width: 60%;
  height: 1.9rem;
  margin-top: 0.3rem;
  float: left;
}
.saihongbaoy > img {
  background: red;
  float: left;
  height: 0.6rem;
  width: 0.6rem;
  border-radius: 50%;
}
.saihongbaoy > p {
  float: left;
  margin-left: 0.2rem;
  color: #999999;
  padding-bottom: 0.2rem;
}
.saihongbaoy > div {
  width: 80%;
  height: 75%;
  background: url("../../assets/imgs/7.png") no-repeat;
  background-size: cover;
  float: right;
  border-radius: 0.1rem;
  color: #fff;
}

.saihongbaoy > div > :first-child {
  font-size: 0.24rem;
  float: left;
  padding-top: 0.2rem;
  margin-left: 25%;
  padding-bottom: 0.1rem;
}
.saihongbaoy > div > :last-child {
  font-size: 0.2rem;
  float: left;
  margin-left: 25%;
}
.warpu {
  height: 0.3rem;
  width: 100%;
  margin-top: 0.4rem;
  text-align: center;
  /* margin-bottom: 0.3rem; */
  float: left;
}
.warpu > div {
  width: 80%;
  height: 100%;
  background: #ccc;
  margin: 0 auto;
  /* border-radius: 0.3rem; */
}
.warpu > div > img {
  height: 90%;
  float: left;
  margin-left: 4%;
}
.warpu > div > p {
  color: #fff;
  font-size: 0.22rem;
  line-height: 0.3rem;
}
.hongbao1 {
  width: 60%;
  /* background: red; */
  height: 1.9rem;
  float: right;
  margin-top: 0.3rem;
}
.hongbao1 > img {
  /* background: red; */
  float: right;
  height: 0.6rem;
  width: 0.6rem;
  border-radius: 50%;
}
.hongbao1 > p {
  float: right;
  margin-right: 0.2rem;
  color: #999999;
  padding-bottom: 0.2rem;
}
.hongbao1 > div {
  width: 80%;
  height: 75%;
  background: url("../../assets/imgs/7.png") no-repeat;
  background-size: cover;
  float: left;
  border-radius: 0.1rem;
  /* padding-top: 0.1rem; */
  color: #fff;
}
.hongbao1 > div > :first-child {
  font-size: 0.24rem;
  float: left;
  margin-left: 25%;
}
.hongbao1 > div > :last-child {
  font-size: 0.2rem;
  float: left;
  margin-left: 25%;
}
.bottom {
  height: 1rem;
  width: 100%;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0 0.3rem;
}
.bottom > :first-child {
  width: 70%;
  background: #f1941d;
  color: #fff;
  float: left;
  height: 0.8rem;
  margin-top: 0.1rem;
  border-radius: 0.1rem;
}
.bottom > :last-child {
  float: right;
  margin-top: 0.1rem;
  height: 0.8rem;
  width: 25%;
  background: #ff5858;
  color: #fff;
  border-radius: 0.1rem;
}
.qiang {
  width: 100%;
  height: 74%;
  background: none;
}
.qiang > div > img {
  display: block;
  height: 100%;
  width: 100%;
}
.qiang1 {
  width: 85%;
  height: 54%;
  background: none;
}
.qiang1 > div > img {
  display: block;
  height: 100%;
  width: 100%;
}
</style>
