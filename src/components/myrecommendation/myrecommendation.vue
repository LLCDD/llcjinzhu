<template>
  <div class="myrecommendation">
    <div class="div3">
      <header>
        <img @click="tap()" class="fanhui" src="../../../public/image/return.png">我的推荐
        <span v-if="true" @click="tuijian" class="tuijian">推荐列表</span>
      </header>

      <div class="hey">
        <div>
          <p class="p">收益总收益 ( 元 )</p>
          <p class="p1">{{ msg }}</p>
          <p style="padding-top:0.14rem" class="p">团队总人数 ( 人 )</p>
          <p class="p1">{{ prem }}</p>
        </div>
        <div>
          <p class="p zhuanj">今日收益 ( 元 )</p>
          <p class="p1 zhuanj1">{{ msg1 }}</p>
          <p style="padding-top:0.14rem" class="p zhuanj">直推人数 ( 人 )</p>
          <p class="p1 zhuanj1">{{ prem1 }}</p>
        </div>
      </div>
    </div>
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
    <table class="tabley">
      <th>昵称</th>
      <th style="border-left:2px solid #f5f5f5;border-right:2px solid #f5f5f5">金额 (元)</th>
      <th style="color:#f1941d;border-right:2px solid #f5f5f5;">级别</th>
      <th style="width:40%">时间</th>
      <tr v-for="(item,index) in list" :key="index">
        <td
          style="line-height: 0.9rem;color:#000;overflow: hidden;font-size:0.22rem;
text-overflow:ellipsis;
white-space: nowrap;"
        >{{ item.name }}</td>
        <td
          style="font-size:0.3rem;line-height: 0.9rem;color:#f1941d;border-left:2px solid #f5f5f5;border-right:2px solid #f5f5f5"
        >{{ item.money }}({{ item.type == 3 ? '发' : '抢' }})</td>
        <td
          style="font-size:0.3rem;line-height: 0.9rem;color:#f1941d;border-right:2px solid #f5f5f5;"
        >{{ item.level }}</td>
        <td style="width:40%;color:#999999;font-size:0.22rem">{{ item.created_at }}</td>
      </tr>
    </table>
    <!-- </van-pull-refresh> -->
    <!-- <van-pagination
      v-if="bool2"
      v-model="page"
      :page-count="zong"
      mode="simple"
      @change="page1($event)"
      style="margin-bottom:1rem"
    />-->
    <img class="null" v-if="!bool" src="../../assets/imgs/null.png" alt>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      msg: "",
      msg1: "",
      list1: [1],
      bool: false,
      page: 1,
      zong: 1,
      list: [],
      bool2: false,
      // 总人数
      prem: "",
      // 直推人数
      prem1: "",
      isLoading: false
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
    this.$store.commit("footerTab", false);
    this.$store.commit("headerTab", false);
    this.$store.commit("tuijianf", false);
    this.$store.commit("footerTabl", true);
    // if (this.list.length > 0) {
    //   this.bool = true;
    // }
    this.http.post("/api/rrand").then(res => {
      if (res.code == 200) {
        // Toast.clear();
        console.log(res.data.total);
        this.msg = res.data.total;
        this.msg1 = res.data.todays;
        this.prem = res.data.team_num;
        this.prem1 = res.data.direct;
        // this.list = res.data.arr;
        if (res.data.arr.length <= 0) {
          this.bool = false;
        } else {
          if (res.data.arr.length >= 15) {
            var arr = [];
            this.bool2 = true;
            for (var i = 0; i < 15; i++) {
              arr.push(res.data.arr[i]);
              this.list = arr;
            }
          } else {
            this.list = res.data.arr;
          }
          this.bool = true;
          this.list1 = res.data.arr;
          this.zong = Math.floor(res.data.arr.length / 10);
        }
      }
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
    // 推荐列表
    tuijian() {
      this.$router.push("/cardy");
    },
    onRefresh() {
      this.http
        .post("/api/rrand")
        .then(res => {
          if (res.code == 200) {
            // Toast.clear();
            this.isLoading = false;
            console.log(res.data.total);
            this.msg = res.data.total;
            this.msg1 = res.data.todays;
            this.prem = res.data.team_num;
            this.prem1 = res.data.direct;

            // this.list = res.data.arr;
            if (res.data.arr.length <= 0) {
              this.bool = false;
            } else {
              if (res.data.arr.length >= 15) {
                var arr = [];
                this.bool2 = true;
                for (var i = 0; i < 15; i++) {
                  arr.push(res.data.arr[i]);
                  this.list = arr;
                }
              } else {
                this.list = res.data.arr;
              }
              this.bool = true;
              this.list1 = res.data.arr;
              this.zong = Math.floor(res.data.arr.length / 10);
            }
          } else {
            this.isLoading = false;
            this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
          }
        })
        .catch(res => {
          this.isLoading = false;
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        });
    },
    onSwipeRight() {
      this.$router.go(-1);
    }
    // 分页
    // page1(id) {
    //   this.list = [];
    //   // console.log();
    //   for (var i = id * 10 - 10; i < id * 10; i++) {
    //     console.log(i);
    //     this.list.push(this.list1[i]);
    //   }
    // }
  }
};
</script>
<style scoped>
.myrecommendation {
  /* padding-top: 0.88rem; */
  height: 100%;
  background: #f5f5f5;
  width: 100%;
  position: absolute;
  top: 0;
}
.myrecommendation >>> .van-pagination .van-pagination--simple {
  width: 100%;
}
.myrecommendation > .div3 {
  /* overflow: hidden; */
  background: url("../../assets/imgs/heady.png") no-repeat left;
  background-size: cover;
  /* position: relative; */
  height: 3.1rem;
  margin-bottom: 0.3rem;
  position: fixed;
  z-index: 99;
  width: 100%;
  top: 0;
  left: 0;
}
header {
  height: 1.32rem;
  width: 100%;
  /* position: fixed; */
  position: absolute;
  top: 0.44rem;
  /* background: red; */
  text-align: center;
  line-height: 0.88rem;
  font-size: 0.3rem;
  color: #fff;
  /* background: red; */
}
.zhuan {
  position: absolute;
  right: 0.3rem;
  font-size: 0.3rem;
}
.hey {
  padding-top: 1.6rem;
  display: flex;
  justify-content: space-between;
}
.p {
  /* padding-top: 1.18rem; */
  padding-left: 0.3rem;
  color: #fff;
  font-size: 0.24rem;
  /* float: left; */
}
.p1 {
  /* padding-top: 0.3rem; */
  padding-left: 0.3rem;
  font-size: 0.38rem;
  color: #fff;
  font-weight: 700;
  /* float: left; */
  /* display: inline-block; */
  /* padding-top: 2rem; */
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
  width: 0.2rem;
  height: 0.3rem;
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

/* .tan > tr > td {
  width: 20%;
} */
.tabley {
  width: 100%;
  /* display: block; */
  text-align: center;
  background: #fff;
  margin-top: 3.1rem;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  /* height: 100%; */
}
.tabley > th {
  border: 0;
  height: 0.9rem;
  width: 24%;
  /* display: inline-block; */
  /* float: left; */
  color: #f1941d;
  font-size: 0.3rem;
  border-bottom: 2px solid #f5f5f5;
  line-height: 0.9rem;
}
.tabley > tr {
  border: 0;
  height: 0.9rem;
  /* width: 25%; */
  /* display: block; */
  width: 100%;
}
.tabley > tr > td {
  border: 0;
  height: 0.9rem;
  width: 20%;
  width: 20%;
  font-size: 0.3rem;
  border-bottom: 2px solid #f5f5f5;
  /* display: block; */
  /* float: left; */
}
.null {
  width: 50%;
  margin-left: 25%;
  margin-top: 46%;
}
.zhuanj {
  padding-right: 1.4rem;
}
.tuijian {
  font-size: 0.24rem;
}
</style>
