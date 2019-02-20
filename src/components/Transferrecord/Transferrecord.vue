<template>
  <div class="divb">
    <div class="div3">
      <header>
        <img @click="tap()" class="fanhui" src="../../../public/image/return.png">转账记录
      </header>
      <p class="p">转账总金额 ( 元 )</p>
      <p class="p1">{{ msg }}</p>
    </div>
    <table class="tabley" v-if="bool">
      <th>昵称</th>
      <th style="border-left:2px solid #f5f5f5;border-right:2px solid #f5f5f5">金额</th>
      <th>时间</th>
      <tr v-for="(item,index) in list" :key="index">
        <td style="color:#000">
          {{ item.real_name
          }}
        </td>
        <td
          style="color:#f1941d;border-left:2px solid #f5f5f5;border-right:2px solid #f5f5f5"
        >{{ item.money }}</td>
        <td style="color:#999999">{{ item.created_at }}</td>
      </tr>
    </table>
    <img class="null" v-if="!bool" src="../../assets/imgs/null.png" alt>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      msg: "9.99",
      list: [1],
      bool: false
    };
  },
  // beforeCreate() {
  //   Toast.loading({
  //     mask: true,
  //     message: "加载中..."
  //   });
  // },
  mounted() {
    this.$store.commit("footerTab", false);
    this.$store.commit("headerTab", true);
    this.$store.commit("fanhui", true);
    this.$store.commit("header", "转账记录");
    // if (this.list.length > 0) {
    //   this.bool = true;
    // }
    this.http
      .post("/api/recharge_record", { type: 2 })
      .then(res => {
        if (res.code == 200) {
          // Toast.clear();
          this.msg = res.data.money;
          if (res.data.data.length <= 0) {
            this.bool = false;
          } else {
            this.bool = true;
            this.list = res.data.data;
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
  },
  methods: {
    tap() {
      this.$router.go(-1);
    },
    // 转账
    top() {
      console.log("转账");
    },
    // 转账记录
    zhuan() {
      this;
    },
    onSwipeRight() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.divb {
  /* padding-top: 0.88rem; */
  min-height: 100%;
  background: #f5f5f5;
  width: 100%;
}
.div3 {
  /* overflow: hidden; */
  background: url("../../assets/imgs/heady.png") no-repeat left;
  background-size: cover;
  position: relative;
  height: 2.84rem;
  margin-bottom: 0.3rem;
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
  padding-top: 1.7rem;
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
.record {
  width: 100%;
  background: #fff;
  height: 0.9rem;
  line-height: 0.9rem;
  margin-bottom: 0.2rem;
}
.record > p {
  display: inline-block;
  width: 25%;
  height: 0.8rem;
  text-align: center;
  color: #b6b6b6;
}

.record > p > span {
  display: inline-block;
  height: 98%;
}
.fanhui {
  position: absolute;
  left: 0.3rem;
  width: 0.25rem;
  height: 0.4rem;
  top: 24%;
  z-index: 99;
}
.vip {
  width: 90%;
  margin-left: 5%;
  display: flex;
  background: #fff;
  height: 0.9rem;
  justify-content: space-between;
  border-radius: 5px;
  line-height: 0.9rem;
  padding-left: 0.3rem;
  margin-bottom: 0.2rem;
}
.vip > input {
  width: 2rem;
}
.buty {
  width: 88%;
  background: #f1941d;
  margin-left: 6%;
  margin-top: 0.6rem;
  height: 0.8rem;
  color: #fff;
  border-radius: 0.5rem;
}

.tan > tr > td {
  width: 33.3%;
}
.tabley {
  width: 100%;
  text-align: center;
  background: #fff;
}
.tabley > th {
  border: 0;
  height: 0.9rem;
  color: #f1941d;
  font-size: 0.3rem;
  border-bottom: 2px solid #f5f5f5;
}
.tabley > tr {
  border: 0;
  height: 0.9rem;
}
.tabley > tr > td {
  border: 0;
  height: 0.9rem;
  width: 33.3%;
  font-size: 0.3rem;
  border-bottom: 2px solid #f5f5f5;
}
.null {
  width: 50%;
  margin-left: 25%;
  margin-top: 2rem;
}
</style>
