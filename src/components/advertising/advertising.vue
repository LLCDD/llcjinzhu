<template>
  <div class="diva">
    <div v-if="bool">
      <p>
        <span>银行名称</span>
        <span style="color:#999">{{list.bank_name}}</span>
      </p>
      <p>
        <span>银行卡号</span>
        <span style="color:#999">{{ list.bank_num }}</span>
      </p>
      <p>
        <span>持卡人姓名</span>
        <span style="color:#999">{{ list.user_name }}</span>
      </p>
    </div>
    <button class="buttonty" v-if="bool" @click="xiugia()">修改</button>
    <button class="buttonty" @click="add()" v-if="!bool">添加银行卡</button>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      msg: 23423,
      list: {},
      bool: false,
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
    this.$store.commit("header", "我的银行卡");
    this.$store.commit("fanhui", true);
    this.http
      .post("/api/list_bank")
      .then(res => {
        if (res.code == 200) {
          // Toast.clear();
          if (res.message == "未添加银行卡") {
            this.bool = false;
          } else {
            this.bool = true;
            this.list = res.data.data[0];
            this.id = res.data.data[0].id;
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
    console.log(this.list);
  },
  methods: {
    //   修改银行卡
    xiugia() {
      // this.$router.replace({ name: "xiugai" });
      this.$router.push("/xiugai/" + this.id);
    },
    add() {
      this.$router.replace({ name: "add" });
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
