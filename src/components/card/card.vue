<template>
  <div class="divk">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <p
        @click="tui(item.uid)"
        v-for="(item,index) in this.$store.state.shuju"
        :key="index"
        v-if="!bool"
      >
        <span>
          <img src="../../assets/imgs/heaertttt.png" alt>
          <span>{{ item.phone }}</span>
        </span>
        <span>直推{{item.direct}}人 间推{{item.team_num}}人</span>
      </p>

      <p class="p" v-if="bool">暂时没有更多数据了</p>
    </van-pull-refresh>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      list: this.$store.state.shuju,
      bool: false,
      isLoading: false,
      arr: []
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
    this.$store.commit("ld", false);
    this.$store.commit("header", "一级推荐");
    this.$store.commit("fanhui", false);
    this.$store.commit("tuijianf", true);

    // this.http
    //   .post("/api/first_recommend")
    //   .then(res => {
    //     if (res.code == 200) {
    //       // Toast.clear();
    //       console.log(res);
    //       if (res.message == "您没有推荐过任何人") {
    //         this.bool = true;
    //       } else {
    //         this.bool = false;
    //         this.list = res.data.data;
    //       }
    //     } else if (res.code == 400) {
    //       // Toast.clear();
    //       this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
    //     }
    //   })
    //   .catch(res => {
    //     // Toast.clear();
    //     this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
    //   });
    this.http
      .post("/api/first_recommend", { uid: localStorage.getItem("uid") })
      .then(res => {
        if (res.code == 200) {
          // console.log(res);
          this.arr.push(localStorage.getItem("uid"));
          if (res.message == "您没有推荐过任何人") {
            this.bool = true;
          } else {
            this.bool = false;
            this.$store.commit("shuju", res.data.data);
            // console.log(this.$store.state.shuju);
            // this.list = res.data.data;
          }
        } else {
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        }
      })
      .catch(res => {
        this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
      });
  },
  methods: {
    onRefresh() {
      this.http
        .post("/api/first_recommend", { uid: localStorage.getItem("uid") })
        .then(res => {
          if (res.code == 200) {
            // Toast.clear();
            console.log(res);
            this.isLoading = false;
            if (res.message == "您没有推荐过任何人") {
              this.bool = true;
            } else {
              this.bool = false;
              this.list = res.data.data;
            }
          } else if (res.code == 400) {
            this.isLoading = false;
            // Toast.clear();
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          // Toast.clear();
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
    },
    tui(id) {
      // Toast.loading({
      //   mask: true,
      //   message: "加载中..."
      // });
      this.http
        .post("/api/first_recommend", { uid: id })
        .then(res => {
          if (res.code == 200) {
            // Toast.clear();
            if (res.message != "您没有推荐过任何人") {
              this.arr.push(id);
              this.$store.commit("bao", this.arr);
              // console.log(this.$store.state.bao);
              this.$store.commit("header", res.data.lever);
              // this.list = res.data.data;
              this.$store.commit("shuju", res.data.data);
              // console.log(this.$store.state.shuju);
            } else {
              this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
            }
          } else {
            // Toast.clear();
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          // Toast.clear();
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
    }
    // onSwipeRight() {
    //   this.$router.go(-1);
    // }
  }
};
</script>
<style scoped>
.divk {
  padding-top: 1.32rem;
  min-height: 100%;
  background: #f5f5f5;
  width: 100%;
  /* overflow: scroll;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch; */
}
.divk > div > div > p {
  height: 1rem;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  line-height: 1rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.3rem;
}
p > span > img {
  background: red;
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
  margin-right: 0.2rem;
}
.p {
  color: #999;
}
</style>
