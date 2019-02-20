<template>
  <div class="redenvelope">
    <header>
      <img @click="fanhui()" src="../../../public/image/return.png" alt>
      发包详情
    </header>

    <div class="renw">
      <div class="first">
        <img src="../../assets/imgs/heaertttt.png" alt>
      </div>
      <p>{{ list.user }}</p>
      <!-- <p>{{ list.money }}</p> -->
      <p>{{ list.money }}-{{ list.spot }}</p>

      <p style="color:red;font-size:0.4rem">{{ list.problem }} 元</p>
      <div class="zong">{{ ge }}个红包共{{ list.money }}元 已抢{{ges}}/{{ge}}</div>
      <div class="jil">
        <div v-for="(item,index) in list.data" :key="index">
          <div>
            <img v-if="item.status == 1" class="xqt" src="../../assets/imgs/nextt.png" alt>
            <img v-if="item.status == 0" class="xqt" src="../../assets/imgs/heaertttt.png" alt>
            <p class="name">
              {{ item.phone }}
              <br>
              <span>{{ item.created_at.substring(0,16) }}</span>
            </p>
          </div>
          <!-- <img v-if="item.status == 1" class="msl" src="../../assets/imgs/nextt.png" alt> -->
          <img v-if="item.is_spot == 1" class="xqtl" src="../../assets/imgs/xiaolei.png" alt>
          <div class="line">{{ item.money }}元</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { PullRefresh } from "vant";
import { Toast } from "vant";
export default {
  data() {
    return {
      money: "100.00",
      ge: localStorage.getItem("geshu"),
      name: "12321-12323-23",
      list: [],
      // 已抢红包
      ges: 0
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
    this.$store.commit("headerTab", false);
    console.log(this.$route.params.id);
    this.$store.commit("fanhui3", true);
    this.$store.commit("propers", false);
    this.http
      .post("/api/push_hair", {
        game_id: 1,
        room_id: localStorage.getItem("avatar")
      })
      .then(res => {
        if (res.code == 200) {
          // Toast.clear();
          console.log(res.data.user);
          this.list = res.data;
          this.ges = res.data.data.length;
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
    fanhui() {
      this.$router.go(-1);
    },
    // 红包记录
    jilv() {
      console.log("记录");
      this.$router.replace("/envelopetorecord");
    }
  }
};
</script>
<style scoped>
.redenvelope {
  min-height: 100%;
  background: #f5f5f5;
  width: 100%;
  /* padding-top: 0.88rem; */
}
.redenvelope > header {
  height: 0.88rem;
  padding-top: 0.44rem;
  width: 100%;
  background: #cf3c36;
  text-align: center;
  line-height: 0.88rem;
  font-size: 0.36rem;
  color: #fff;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
}
.redenvelope > header > img {
  height: 0.35rem;
  position: absolute;
  left: 0.3rem;
  bottom: -0.2rem;
}
.redenvelope > header > span {
  font-size: 0.3rem;
  position: absolute;
  right: 0.3rem;
}
.renw {
  padding-top: 0.88rem;
  float: left;
  width: 100%;
  height: 2.85rem;
  background: url("../../assets/imgs/tou.png") no-repeat center;
  background-size: 100% 100%;
}
.renw > .first {
  height: 1.22rem;
  width: 1.22rem;
  border-radius: 50%;
  background: red;
  margin: 0 auto;
  margin-top: 19%;
  border: 2px solid #ffffff;
  overflow: hidden;
}
.renw > .first > img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}
.renw > p {
  text-align: center;
}
.mar {
  padding-bottom: 0.3rem;
}
.zong {
  height: 0.8rem;
  border-bottom: 1px solid #f5f5f5;
  background: #ffffff;
  line-height: 0.8rem;
  font-size: 0.24rem;
  color: #999999;
  padding-left: 0.3rem;
}

.jil > div {
  height: 1rem;
  padding: 0 0.3rem;
  background: #fff;
  /* line-height: 1rem; */
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
}
.xqt {
  height: 0.8rem;
  width: 0.8rem;
  border-radius: 50%;
  background: red;
  float: left;
  margin-top: 0.1rem;
}
.name {
  display: inline-block;
  margin-left: 0.2rem;
  padding-top: 0.2rem;
  font-size: 0.3rem;
}
.name > span {
  display: inline-block;
  padding-top: 0.2rem;
  font-size: 0.2rem;
  color: #999999;
}
.line {
  line-height: 1rem;
  color: #cf3c36;
  font-size: 0.3rem;
  font-weight: 500;
}
.xqtl {
  height: 0.8rem;
  width: 0.8rem;
  border-radius: 50%;
  /* background: red; */
  margin-top: 0.1rem;
  margin-right: -1rem;
}
.msl {
  height: 0.8rem;
  width: 0.8rem;
  border-radius: 50%;
  /* background: red; */
  margin-top: 0.1rem;
  margin-right: -1rem;
}
</style>
