<template>
  <div class="divm">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="waep">
        <div v-for="(item,index) in list" :key="index">
          <p class="p">
            <span class="daili">代理{{ index +1 }}</span>
            <!-- <br> -->
            <span class="daili1">扫描二维码联系</span>
          </p>
          <img class="img" :src="item.my_qrcode" alt>
        </div>
      </div>
      <div v-if="bool" class="dailishang">暂无代理商</div>
    </van-pull-refresh>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      msg: "345",
      list: [],
      bool: false,
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
    this.$store.commit("ld", false);
    this.$store.commit("header", "人工充值");
    this.$store.commit("fanhui", true);
    this.http
      .post("/api/agent_qrcode")
      .then(res => {
        if (res.code == 200) {
          console.log(res);
          // Toast.clear();
          if (res.message == "暂无代理商") {
            this.bool = true;
          } else {
            this.bool = false;
            this.list = res.data.data;
          }
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
  methods: {
    onRefresh() {
      this.http
        .post("/api/agent_qrcode")
        .then(res => {
          if (res.code == 200) {
            console.log(res);
            // Toast.clear();
            this.isLoading = false;
            if (res.message == "暂无代理商") {
              this.bool = true;
            } else {
              this.bool = false;
              this.list = res.data.data;
            }
          } else if (res.code == 400) {
            // Toast.clear();
            this.$toasted.error(res.message, { icon: "erro" }).goAway(1000);
          }
        })
        .catch(res => {
          // Toast.clear();
          this.$toasted.error(res.message, { icon: "erro" }).goAway(1000);
        });
    }
  }
};
</script>
<style scoped>
.divm {
  padding-top: 1.32rem;
  min-height: 100%;
  background: #f5f5f5;
  width: 100%;
}
.waep > div {
  height: 3rem;
  width: 90%;
  margin-left: 5%;
  background: url("../../assets/imgs/hed.png") no-repeat left;
  background-size: cover;
  margin-top: 0.3rem;
  border-radius: 0.3rem;
  padding-left: 0.3rem;
  padding-top: 0.4rem;
  padding-right: 0.3rem;
}
.daili {
  font-size: 0.36rem;
  color: #fff;
}
.daili1 {
  display: inline-block;
  padding-top: 0.2rem;
  color: #fff;
}
.img {
  height: 2.25rem;
  width: 2.25rem;
  float: right;
  /* background: red; */
}
.p {
  display: inline-block;
  width: 2rem;
}
.dailishang {
  height: 1rem;
  background: #fff;
  text-align: center;
  line-height: 1rem;
  font-size: 0.3rem;
  color: #999;
}
</style>
