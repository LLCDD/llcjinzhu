<template>
  <div class="divyyyy">
    <lg-header></lg-header>
    <!-- <img class="img" src="../../assets/img/logo.png" alt> -->
    <lc-conent></lc-conent>
  </div>
</template>

<script>
import LgHeader from "./components/LoginHeader";
import LcConent from "./components/LoginContent";
import Vue from "vue";
export default {
  components: {
    LgHeader,
    LcConent
  },
  created() {
    this.$store.state.headerStatus = false;
    this.$store.commit("headerTab", false);
    this.$store.commit("footerTab", false);
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.$router.replace({ name: "index" });
    }
  }
};
</script>

<style scoped>
.divyyyy {
  background: url("../../assets/imgs/background.png") no-repeat bottom;
  background-size: 100% 100%;
  margin: 0 auto;
  min-height: 100%;
  width: 100%;
  /* padding-top: 3.23rem; */
  /* overflow-y: auto; */
}
</style>