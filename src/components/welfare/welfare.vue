<template>
  <div class="divb">
    <div class="div3">
      <header>
        <img @click="tap()" class="fanhui" src="../../../public/image/return.png">发包记录
      </header>
      <div style="display:flex;justify-content: space-between;padding-right:0.4rem">
        <div>
          <p class="p">当日总计 ( 元 )</p>
          <p class="p1">{{ zong }}</p>
        </div>
        <div>
          <p class="p">已反总计 ( 元 )</p>
          <p class="p1">{{ zong2 }}</p>
        </div>
      </div>
    </div>
    <p class="tishi">
      温馨提示 ：发红包和抢红包流水达到 1000-4999 反2% 5000-9999 反3% 10000-19999 反4% 20000+ 反5% 按1000的倍数统计 ,
      当天12点结算达到要求直接返到余额里
    </p>
    <div class="zirout">
      <!-- <router-link to="envelope" replace tag="p"> -->
      <p @click="fa()" :class="{'active':state == 1}">
        <span>发红包</span>
        <br>
        <strong>总计 ( {{ faz }} )</strong>
      </p>
      <!-- </router-link> -->
      <!-- <router-link to="nvelope" replace tag="p"> -->
      <p @click="qiang()" :class="{'active':state == 2}">
        <span>抢红包</span>
        <br>
        <strong>总计 ( {{ qz }} )</strong>
      </p>
      <!-- </router-link> -->
    </div>
    <div class="nu">
      <div v-for="(item,index) in list " :key="index">
        <p>
          <span style="font-size:0.3rem">{{ pan }}</span>
          <!-- <br> -->
          <!-- <span style="font-size:0.2rem;color:#999">{{ item.pull_uid }}</span> -->
        </p>
        <p>
          <span style="line-height:1rem;padding:0;font-size:0.3rem;color:#cf3c36">{{ item.money }} 元</span>
        </p>
      </div>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "9.99",
      bool: false,
      msg1: "",
      msg2: "",
      state: 1,
      zong: 0,
      list: [],
      // 今日发包
      faz: 0,
      // 今日钱包
      qz: 0,
      pan: "发红包",
      zong2: ""
    };
  },
  mounted() {
    this.$store.commit("footerTab", false);
    this.$store.commit("headerTab", true);
    this.$store.commit("header", "发包记录");
    this.$store.commit("fanhui", true);
    this.http.post("/api/myWelfare_s").then(res => {
      if (res.code == 200) {
        console.log(res);
        // this.msg1 = res.data.money2;
        // this.msg2 = res.data.money1;
        this.zong = res.data.daySum;
        this.zong2 = res.data.oldSum;
      }
    });
    this.gongong();
    this.http.post("/api/myWelfare", { type: "2" }).then(res => {
      if (res.code == 200) {
        this.qz = res.data.money;
      }
    });
  },
  methods: {
    tap() {
      this.$router.replace({ name: "myhone" });
    },
    // 转账
    top() {
      console.log("转账");
    },
    // 转账记录
    zhuan() {
      this;
    },
    gongong() {
      this.http
        .post("/api/myWelfare", { type: "1" })
        .then(res => {
          if (res.code == 200) {
            // Toast.clear();
            // this.$store.commit("zong", res.data.money);
            this.faz = res.data.money;
            this.list = res.data.data;
          } else if (res.code == 400) {
            // Toast.clear();
            this.$toasted.error(res.message, { icon: "erro" }).goAway(1000);
          }
        })
        .catch(res => {
          // Toast.clear();
          this.$toasted.error(res.message, { icon: "erro" }).goAway(1000);
        });
    },
    gongong1(type) {
      console.log(type);
      this.http
        .post("/api/myWelfare", { type: type })
        .then(res => {
          if (res.code == 200) {
            // Toast.clear();
            if (type == 1) {
              this.faz = res.data.money;
            } else {
              this.qz = res.data.money;
            }
            // this.$store.commit("zong", res.data.money);
            this.list = res.data.data;
          } else if (res.code == 400) {
            // Toast.clear();
            this.$toasted.error(res.message, { icon: "erro" }).goAway(1000);
          }
        })
        .catch(res => {
          // Toast.clear();
          this.$toasted.error(res.message, { icon: "erro" }).goAway(1000);
        });
    },
    fa() {
      this.pan = "发红包";
      this.state = 1;
      // this.zong = this.msg2;
      this.gongong1(this.state);
    },
    qiang() {
      this.state = 2;
      this.pan = "抢红包";
      // this.zong = this.msg1;
      this.gongong1(this.state);
    },
    onSwipeRight() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.divb {
  padding-top: 0.88rem;
  min-height: 100%;
  background: #f5f5f5;
  width: 100%;
  /* overflow: scroll;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch; */
}
.div3 {
  /* overflow: hidden; */
  background: url("../../assets/imgs/heady.png") no-repeat left;
  background-size: cover;
  position: relative;
  height: 2.4rem;
}
header {
  height: 0.88rem;
  width: 100%;
  position: fixed;
  top: 0;
  /* background: red; */
  text-align: center;
  line-height: 0.88rem;
  font-size: 0.34rem;
  color: #fff;
  /* background: red; */
}
.zhuan {
  position: absolute;
  right: 0.3rem;
  font-size: 0.3rem;
}
.p {
  padding-top: 1.18rem;
  padding-left: 0.3rem;
  color: #fff;
  font-size: 0.24rem;
}
.p1 {
  padding-top: 0.3rem;
  padding-left: 0.3rem;
  font-size: 0.38rem;
  color: #fff;
  font-weight: 700;
}
.fanhui {
  position: absolute;
  left: 0.3rem;
  width: 0.25rem;
  height: 0.4rem;
  top: 24%;
  z-index: 99;
}
.tishi {
  padding: 0.2rem 0.3rem;
  color: #f1941d;
  line-height: 0.4rem;
  background: #f5f5f5;
}
.zirout {
  height: 1.5rem;
  background: #fff;
  border-bottom: 2px solid #f5f5f5;
}
.zirout > p {
  display: inline-block;
  width: 50%;
  font-size: 0.3rem;
  color: #999;
  text-align: center;
  height: 90%;
  /* line-height: 1.5rem; */
}
.zirout > p > span {
  display: inline-block;
  padding-top: 0.4rem;
}
.zirout > p > strong {
  display: inline-block;
  padding-top: 0.1rem;
  /* background: red; */
  padding-bottom: 0.2rem;
}
.router-link-active > span {
  color: #f1941d;
}
.router-link-active > strong {
  color: #f1941d;
  border-bottom: 2px solid #f1941d;
}
/* .nu {
  min-height: 100%;
} */
.nu > div {
  display: flex;
  height: 1rem;
  background: #ffffff;
  justify-content: space-between;
  padding-left: 0.3rem;
  border-bottom: 1px solid #f5f5f5;
  padding-right: 0.3rem;
}
.nu > div > p > span {
  display: inline-block;
  padding-top: 0.36rem;
}
.active > span {
  color: #f1941d;
}
.active > strong {
  color: #f1941d;
  border-bottom: 2px solid #f1941d;
}
</style>
