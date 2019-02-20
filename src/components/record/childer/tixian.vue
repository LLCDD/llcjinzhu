<template>
  <div class="div4">
    <table class="tabley" v-if="bool">
      <th>时间</th>
      <th style="border-left:2px solid #f5f5f5;border-right:2px solid #f5f5f5">金额</th>
      <th>说明</th>
      <tr v-for="(item,index) in list" :key="index">
        <td style="color:#999999">{{ item.created_at }}</td>
        <td
          style="color:#f1941d;border-left:2px solid #f5f5f5;border-right:2px solid #f5f5f5"
        >{{ item.money }}</td>
        <td style="color:#000">{{ item.explain }}</td>
      </tr>
    </table>
    <img class="null" v-if="!bool" src="../../../assets/imgs/null.png" alt>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "4343",
      list: [],
      bool: false
    };
  },
  mounted() {
    // if (this.list.length > 0) {
    //   this.bool = true;
    // }
    this.http
      .post("/api/recharge_record", { type: 3 })
      .then(res => {
        if (res.code == 200) {
          if (res.data.data.length <= 0) {
            this.bool = false;
          } else {
            this.bool = true;
            this.list = res.data.data;
          }
        } else if (res.code == 400) {
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        }
      })
      .catch(res => {
        this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
      });
  }
};
</script>
<style scoped>
.div4 {
  color: red;
  width: 100%;
  min-height: 100%;
  background: #f5f5f5;
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
