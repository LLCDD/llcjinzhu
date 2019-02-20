<template>
  <div class="uu">
    <div></div>
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
