<template>
  <div class="nu">
    <div v-for="(item,index) in list " :key="index">
      <p>
        <span style="font-size:0.3rem">发红包</span>
        <br>
        <span style="font-size:0.2rem;color:#999">{{ item.pull_uid }}</span>
      </p>
      <p>
        <span style="line-height:1rem;padding:0;font-size:0.3rem;color:#cf3c36">-{{item.money}} 元</span>
      </p>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      msg: "23423",
      list: [1, 2, 3]
    };
  },
  // beforeCreate() {
  //   Toast.loading({
  //     mask: true,
  //     message: "加载中..."
  //   });
  // },
  mounted() {
    this.http
      .post("/api/myWelfare", { type: "1" })
      .then(res => {
        if (res.code == 200) {
          // Toast.clear();
          this.$store.commit("zong", res.data.money);
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
  }
};
</script>
<style scoped>
.nu {
  min-height: 100%;
  width: 100%;
}
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
  padding-top: 0.16rem;
}
</style>
