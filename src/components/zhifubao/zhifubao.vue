<template>
  <div class="diva">
    <div v-if="bool">
      <p>
        <span>支付宝账号</span>
        <span style="color:#999">{{zhna}}</span>
      </p>
      <p>
        <span>支付宝昵称</span>
        <span style="color:#999">{{ name}}</span>
      </p>
    </div>
    <button class="buttonty" v-if="bool" @click="xiugia()">修改</button>
    <button class="buttonty" @click="add()" v-if="!bool">添加支付宝</button>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      msg: 23423,
      name: "",
      list: {},
      bool: false,
      zhna: "",
      id: ""
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
    this.$store.commit("header", "我的支付宝");
    this.$store.commit("fanhui", true);
    this.http
      .post("/api/list_bao")
      .then(res => {
        if (res.code == 200) {
          // Toast.clear();
          console.log(res);
          if (res.message == "未添支付宝账号") {
            this.bool = false;
          } else {
            this.bool = true;
            this.id = res.data.data[0].id;
            this.name = res.data.data[0].real_name;
            this.zhna = res.data.data[0].bao_num;
          }
        } else if (res.code == 400) {
          // Toast.clear();
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        }
      })
      .catch(res => {
        // Toast.clear();
        this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
      });
    // if (this.list.length > 0) {
    //   this.bool = true;
    // } else {
    //   this.bool = false;
    // }
  },
  methods: {
    //   修改银行卡
    xiugia() {
      this.$router.push("/xiugaiali/" + this.id);
    },
    add() {
      this.$router.replace({ name: "addzhifubao" });
    },
    onSwipeRight() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.diva {
  padding-top: 1.32rem;
  min-height: 100%;
  background: #f5f5f5;
  width: 100%;
}
.diva > div > p {
  height: 0.9rem;
  width: 100%;
  padding: 0 0.3rem;
  line-height: 0.9rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f5f5f5;
}
.buttonty {
  width: 84%;
  height: 0.8rem;
  color: #fff;
  margin-left: 8%;
  margin-top: 0.8rem;
  background: #f1941d;
  border-radius: 0.5rem;
}
</style>
