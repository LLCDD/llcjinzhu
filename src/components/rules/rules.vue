<template>
  <div class="uu">
    <div style="padding:0.3rem" v-html="msg"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "45345"
    };
  },
  mounted() {
    this.$store.commit("headerTab", true);
    this.$store.commit("footerTab", false);
    this.$store.commit("header", "游戏规则");
    this.$store.commit("ld", false);
    this.$store.commit("fanhui", true);
    this.http
      .post("/api/rulesGame", { game_id: 1 })
      .then(res => {
        if (res.code == 200) {
          console.log(res);
          this.msg = res.data.data.game_rule;
        } else if (res.code == 400) {
          this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
        }
      })
      .catch(res => {
        this.$toasted.error(res.message, { icon: "error" }).goAway(1000);
      });
  },
  methods: {}
};
</script>
<style scoped>
.uu {
  padding-top: 1.32rem;
  min-height: 100%;
  background: #f5f5f5;
  width: 100%;
}
</style>
