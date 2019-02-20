<template>
  <div class="Customerservice">
    <header class="header">
      <img @click="fanhuiy" src="../../../public/image/return.png" alt>
      <div>客服中心</div>
      <span @click="qingkong()">一键清空</span>
    </header>
    <div id="data-list-content" class="cneter">
      <div class="liaotian" v-for="(item,index) in list.data1" :key="index">
        <div>
          <span class="spany">{{ item.created_at }}</span>
        </div>
        <br>
        <div :class="item.class">
          <img src="../../assets/imgs/heaertttt.png" alt>
          <div>{{ item.u_content }}</div>
        </div>
      </div>
    </div>
    <!--  -->
    <footer>
      <img src="../../assets/imgs/translation.png" alt>
      <input type="text" placeholder="说点什么" v-model="text1">
      <button @click="send()">发送</button>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "345",
      text1: "",
      list: [],
      timer: null
    };
  },
  mounted() {
    this.$store.commit("header", "客服中心");
    this.$store.commit("fanhui", true);
    this.$store.commit("headerTab", false);
    this.$store.commit("footerTab", false);
    this.$store.commit("footerTabl", true);
    this.scrollToBottom();
    this.sendy();
    this.$store.commit("qing", true);
    plus.webview.currentWebview().setStyle({
      softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
    });
  },
  methods: {
    send() {
      clearInterval(this.timer);
      this.http
        .post("/api/chatroom", { u_content: this.text1 })
        .then(res => {
          if (res.code == 200) {
            this.text1 = "";
            this.http
              .post("/api/chatroom_list")
              .then(res => {
                if (res.code == 200) {
                  this.list = res.data;
                  this.$store.commit("qingr", res.data);
                  console.log(res.data);
                } else if (res.code == 400) {
                  this.$toasted
                    .error(res.message, { icon: "error" })
                    .goAway(1000);
                }
              })
              .catch(res => {
                this.$toasted
                  .error(res.message, { icon: "error" })
                  .goAway(1000);
              });
          } else if (res.code == 400) {
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
      var _this = this;
      this.timer = setInterval(function() {
        _this.sendy();
      }, 10000);
    },
    // 每次的更改
    sendy() {
      this.http
        .post("/api/chatroom_list")
        .then(res => {
          if (res.code == 200) {
            this.list = res.data;
            this.$store.commit("qingr", res.data);
            console.log(res.data);
          } else if (res.code == 400) {
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
    },
    // 滚动条的事件
    scrollToBottom() {
      this.$nextTick(() => {
        var div = document.getElementsByClassName("cneter")[0];
        // console.log();
        div.scrollTop = div.scrollHeight;
      });
    },
    qingkong() {
      this.http
        .post("/api/emptys")
        .then(res => {
          if (res.code == 200) {
            // this.$store.commit("qingr", []);
            this.list = "";
            // console.log(res);
          } else if (res.code == 400) {
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
    },
    fanhuiy() {
      this.$router.go(-1);
    },
    onSwipeRight() {
      this.$router.go(-1);
    }
  },
  updated() {
    // this.sendy();
    this.scrollToBottom();
    plus.webview.currentWebview().setStyle({
      softinputMode: "adjustResize" // 弹出软键盘时自动改变webview的高度
    });
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style scoped>
.Customerservice {
  /* padding-top: 1.32rem;

 
  background: #f5f5f5;
  padding-bottom: 1.3rem;
  overflow: scroll; */
  height: 100%;
  width: 100%;
  /* overflow: hidden; */
}
.header {
  height: 1.32rem;
  width: 100%;
  /* position: fixed; */
  position: absolute;
  top: 0;
  left: 0;
  background: url("../../assets/imgs/background.png") no-repeat left;
  background-size: 100% 100%;
  z-index: 999;
}
.header > div {
  height: 0.88rem;
  padding-top: 0.44rem;
  line-height: 0.88rem;
  text-align: center;
  font-size: 0.3rem;
  color: #fff;
}
.header > img {
  height: 0.3rem;
  position: absolute;
  bottom: 0.3rem;
  left: 0.3rem;
}
.header > span {
  font-size: 0.24rem;
  color: #fff;
  position: absolute;
  right: 0.3rem;
  bottom: 0.3rem;
}
.Customerservice > footer {
  position: absolute;
  z-index: 99;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  background: #fff;
  padding: 0 0.3rem;
}
.Customerservice > footer > input {
  height: 0.8rem;
  width: 64%;
  margin-top: 0.1rem;
  border-radius: 0.1rem;
  padding-left: 0.1rem;
  background: #cccccc;
  float: left;
}
.Customerservice > footer > img {
  float: left;
  height: 0.5rem;
  width: 0.4rem;
  margin-top: 0.3rem;
  margin-right: 0.2rem;
}
.Customerservice > footer > button {
  width: 16%;
  height: 0.8rem;
  margin-top: 0.1rem;
  border-radius: 0.1rem;
  margin-left: 6%;
  background: #f1941d;
  color: #fff;
  float: left;
}
.Customerservice > .cneter {
  /* min-height: 100%; */
  height: 100%;
  text-align: center;
  padding: 0 0.3rem;
  /* overflow-y: auto; */
  overflow: scroll;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
  padding-top: 1.5rem;
  /* overflow: hidden; */
  /* height: 100%; */
}
.Customerservice > .cneter > :last-child {
  margin-bottom: 1.5rem;
}
.liaotian {
  float: right;
  width: 100%;
}
.spany {
  display: inline-block;
  background: #ccc;
  min-width: 3rem;
  height: 0.3rem;
  text-align: center;
  color: #fff;
  border-radius: 0.4rem;
  /* margin: 0 auto; */
  margin: 0.3rem 0;
  /* margin-bottom: 1rem; */
}
.touxiang {
  /* background: red; */
  width: 60%;
  min-height: 0.8rem;
  overflow: hidden;
  margin-top: 0.2rem;
  /* float: left; */
}
.touxiang1 {
  /* background: red; */
  width: 60%;
  min-height: 0.8rem;
  overflow: hidden;
  float: right;
  margin-top: 0.2rem;
}
.touxiang > img {
  height: 0.64rem;
  width: 0.64rem;
  border-radius: 50%;
  float: left;
}
.touxiang > div {
  background: pink;
  display: inline-block;
  float: left;
  padding: 0.2rem 0.26rem;
  font-size: 0.3rem;
  color: #fff;
  background: #ff5858;
  border-radius: 0.2rem;
  margin-left: 0.2rem;
  max-width: 60%;
}
.touxiang1 > img {
  height: 0.64rem;
  width: 0.64rem;
  border-radius: 50%;
  float: right;
}
.touxiang1 > div {
  background: pink;
  display: inline-block;
  float: right;
  padding: 0.2rem 0.26rem;
  font-size: 0.3rem;
  color: #fff;
  background: #f1941d;
  border-radius: 0.2rem;
  margin-right: 0.2rem;
  max-width: 60%;
}
</style>