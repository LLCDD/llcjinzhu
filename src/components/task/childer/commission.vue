<template>
  <div class="_warp">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="tba">
        <div class="two">
          <span>{{ arr[1].phone }}</span>
          <p>
            <span>累计收益</span>
            
            <span class="money">{{ arr[1].yong_wallet }}</span>
          </p>
        </div>
        <div class="two1">
          <span>{{ arr[0].phone }}</span>
          <p>
            <span>累计收益</span>
            
            <span class="money">{{arr[0].yong_wallet}}</span>
          </p>
        </div>
        <div class="two2">
          <span>{{ arr[2].phone }}</span>
          <p>
            <span>累计收益</span>
            
            <span class="money">{{arr[2].yong_wallet}}</span>
          </p>
        </div>
      </div>
      <div class="table1">
        <div class="table" v-for="(item,index) in list" :key="index">
          <span class="tabl1" style="color:#f1941d">
            <!-- <span v-if="index <= 5">0</span> -->
            {{index+1}}
          </span>
          <span class="tabl2">{{ item.phone }}</span>
          <span class="tabl3">
            累计佣金 :
            <span style="color:#f1941d">{{ item.yong_wallet }}</span>
          </span>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      msg: "222",
      money: "1000.00",
      list: [],
      arr: [],
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
    this.$nextTick(() => {
      this.http
        .post("/api/rankings", { type: "1" })
        .then(res => {
          if (res.code == 200) {
            // Toast.clear();
            // console.log(res.data.data);
            // if (res.data.data.length > 3) {
            //   for (var i = 0; i < 3; i++) {
            //     this.arr.push(res.data.data[i]);
            //   }
            // }
            if (res.data.data.length >= 3) {
              for (var i = 0; i < 3; i++) {
                this.arr.push(res.data.data[i]);
              }
            } else {
              for (var i = 0; i < res.data.data.length; i++) {
                this.arr.push(res.data.data[i]);
                if (res.data.data.length < 3) {
                  console.log(res.data.data.length);
                  for (var i = 0; i <= 3 - res.data.data.length; i++) {
                    this.arr.push({ phone: "暂无数据", shou: "0.00" });
                  }
                }
              }
            }
            if (res.data.data.length == 0) {
              this.arr = [
                { phone: "暂无数据", shou: "0.00" },
                { phone: "暂无数据", shou: "0.00" },
                { phone: "暂无数据", shou: "0.00" }
              ];
            }
            this.list = res.data.data;
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
    });
  },
  methods: {
    onRefresh() {
      this.http
        .post("/api/rankings", { type: "1" })
        .then(res => {
          if (res.code == 200) {
            this.isLoading = false;
            // Toast.clear();
            // console.log(res.data.data);
            if (res.data.data.length > 3) {
              for (var i = 0; i < 3; i++) {
                this.arr.push(res.data.data[i]);
              }
            }

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
<style scope="345">
._warp {
  min-height: 100%;
  width: 100%;
  /* overflow: scroll;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch; */
  /* padding-top: 1.32rem; */
}
.tba {
  height: 5.4rem;
  width: 100%;
  background: red;
  margin-top: 0.1rem;
  /* float: left; */
  background: url(".../../../../../assets/imgs/gern.png") no-repeat bottom;
  background-size: cover;
  position: relative;
}
.tba > div {
  width: 30%;
  text-align: center;
}
.two {
  position: absolute;
  bottom: 14%;
  left: 3%;
  /* opacity: 0; */
}
.two > span {
  color: #fff;
}
.two1 > span {
  color: #fff;
}
.two2 > span {
  color: #fff;
}
.two > p {
  padding-top: 0.3rem;
  font-size: 0.3rem;
  color: #fff;
  font-size: 0.25rem;
}
.two > p > span {
  display: block;
  padding-top: 0.1rem;
}
.money {
  font-size: 0.3rem;
}
.two1 {
  position: absolute;
  bottom: 26%;
  left: 35%;
}
.two1 > p {
  padding-top: 0.3rem;
  font-size: 0.3rem;
  color: #fff;
  font-size: 0.25rem;
}
.two1 > p > span {
  display: block;
  padding-top: 0.1rem;
}
.two2 {
  position: absolute;
  bottom: 9%;
  right: 4%;
}
.two2 > p {
  padding-top: 0.3rem;
  font-size: 0.3rem;
  color: #fff;
  font-size: 0.25rem;
}
.two2 > p > span {
  display: block;
  padding-top: 0.1rem;
}
.table1 {
  height: 100%;
  margin-bottom: 1rem;
  /* float: left; */
}
.table1 > :last-child {
  margin-bottom: 1rem;
}
.table {
  width: 100%;
  /* float: left; */
  border-bottom: 2px solid #f5f5f5;
  height: 0.8rem;
  line-height: 0.9rem;
}
.tabl1 {
  display: inline-block;
  width: 16%;
  text-align: center;
  font-size: 0.26rem;
}
.tabl2 {
  display: inline-block;
  width: 46%;
  font-size: 0.26rem;
}
.tabl3 {
  font-size: 0.26rem;
}
</style>