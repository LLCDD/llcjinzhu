<template>
  <div class="clearance">
    <!-- v-touch:right="onSwipeRight" -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div
        class="qu"
        v-for="(item,index) in list"
        :key="index"
        @click="stores(item.id,item.packet_num,item.red_packet,item.type)"
      >
        <p>{{ item.type }}</p>
        <span>{{ item.red_packet }} 赔率{{ item.odds }}赔</span>
      </div>
      <!-- <audio id="music">
      <source src="../../assets/music/music.mp3">
      </audio>-->
      <!-- <button @click="dianji()">点击</button>
      <button @click="dianji1()">点击1</button>-->
    </van-pull-refresh>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      msg: "45345",
      list: [],
      isLoading: false
    };
  },
  // beforeCreate() {
  //   Toast.loading({
  //     mask: true,
  //     message: "加载中..."
  //   });
  // },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("header", "红包扫雷");
    this.$store.commit("ld", false);
    this.$store.commit("fanhui", false);
    this.$store.commit("fanhui3", false);
    this.$store.commit("fanhuiin", true);
    this.$store.commit("propers", false);
    this.http
      .post("/api/room_list", { game_id: "1" })
      .then(res => {
        if (res.code == 200) {
          // Toast.clear();
          console.log(res);
          console.log(res.data.data);
          this.list = res.data.data;
        } else if (res.code == 400) {
          // Toast.clear();
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        }
      })
      .catch(res => {
        // Toast.clear();
        this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
      });
  },
  methods: {
    stores(id, num, pei, type) {
      console.log(id, num, pei, type);
      localStorage.setItem("geshu", num);
      localStorage.setItem("guize", pei);
      localStorage.setItem("roomname", type);
      this.$router.push("/Mineclearance/" + id);
    },
    // --------测试
    dianji() {
      var music = document.getElementById("music");
      music.play(); // 播放
    },
    dianji1() {
      var music = document.getElementById("music");
      music.currentTime = 0;
    },
    onRefresh() {
      this.http
        .post("/api/room_list", { game_id: "1" })
        .then(res => {
          if (res.code == 200) {
            // Toast.clear();
            // console.log(res);
            // console.log(res.data.data);
            this.isLoading = false;
            this.list = res.data.data;
          } else if (res.code == 400) {
            // Toast.clear();
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          // Toast.clear();
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
    },
    onSwipeRight() {
      // this.$router.go(-1);
      this.$router.push("/index");
    }
  }
};
</script>
<style scoped>
.clearance {
  min-height: 100%;
  background: #f5f5f5;
  padding: 0 0.3rem;
  padding-top: 1.32rem;
  width: 100%;
}
.clearance > div > div > div {
  width: 100%;
  height: 1.8rem;
  margin-top: 0.3rem;
  background: red;
  border-radius: 0.2rem;
  padding-left: 0.3rem;
  background: url("../../assets/imgs/leilong.png") no-repeat right;
  background-size: cover;
}
.qu > p {
  font-size: 0.4rem;
  color: #fff;
  padding-top: 0.3rem;
}
.qu > span {
  display: inline-block;
  padding-top: 0.3rem;
  font-size: 0.3rem;
  color: #fff;
}
</style>
