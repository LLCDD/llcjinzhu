<template>
  <div class="solitaire">
    <div class="qu">
      <p>新手1区</p>
      <span>10-50 赔率1.6赔</span>
    </div>
    <div class="qu">
      <p>新手2区</p>
      <span>10-50 赔率1.6赔</span>
    </div>
    <div class="qu">
      <p>休闲区</p>
      <span>50-100 赔率1.6赔</span>
    </div>
    <div class="qu">
      <p>王者区</p>
      <span>100-500 赔率1.6赔</span>
    </div>
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
    this.$store.commit("header", "红包接龙");
    this.$store.commit("ld", false);
    this.$store.commit("fanhui", true);
  },
  methods: {}
};
</script>
<style scoped>
.solitaire {
  padding: 0 0.3rem;
  padding-top: 1.32rem;
  min-height: 100%;
  background: #f5f5f5;
  width: 100%;
}
.solitaire > div {
  width: 100%;
  height: 1.8rem;
  margin-top: 0.3rem;
  background: red;
  border-radius: 0.2rem;
  padding-left: 0.3rem;
  background: url("../../assets/imgs/jielong.png") no-repeat right;
  background-size: cover;
}
.qu > p {
  font-size: 0.5rem;
  color: #fff;
  padding-top: 0.3rem;
}
.qu > span {
  display: inline-block;
  padding-top: 0.3rem;
  font-size: 0.3rem;
  color: #fff;
}
</style>
