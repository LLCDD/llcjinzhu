<template>
  <div class="envelopetorecord">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div>
        <div v-for="(item,index) in list " :key="index">
          <div>
            <p style="padding-top:0.22rem;font-size:0.34rem">抢到红包</p>
            <p style="color:#999999;padding-top:0.1rem">{{ item.created_at }}</p>
          </div>
          <div style="color:#cf3c36;line-height:1rem">{{ item.money }} 元</div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import { PullRefresh } from "vant";
// import { Toast } from "vant";
export default {
  data() {
    return {
      msg: "23",
      isLoading: false,
      list: []
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
    this.$store.commit("header", "红包记录");
    this.$store.commit("fanhui", true);
    this.$store.commit("fanhui3", false);
    this.http
      .post("/api/bertoncini")
      .then(res => {
        if (res.code == 200) {
          // Toast.clear();
          console.log(res);
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
    onRefresh() {
      this.http
        .post("/api/bertoncini")
        .then(res => {
          if (res.code == 200) {
            // Toast.clear();
            console.log(res);
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
    }
  }
};
</script>
<style scoped>
.envelopetorecord {
  padding-top: 1.32rem;
  min-height: 100%;
  background: #f5f5f5;
  width: 100%;
}
.envelopetorecord > div > div > div > div {
  height: 1rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0 0.3rem;
  border: 1px solid #f5f5f5;
}
</style>
