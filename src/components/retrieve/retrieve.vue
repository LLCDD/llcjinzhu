<template>
  <div class="all">
    <rs-header></rs-header>
    <rs-content></rs-content>
  </div>
</template>

<script>
import RsHeader from "./components/RegHeader";
import RsContent from "./components/RegConten";
export default {
  components: {
    RsHeader,
    RsContent
  },
  created: function() {
    this.$store.state.headerStatus = false;
    this.$store.commit("headerTab", false);
    this.$store.commit("footerTab", false);
  }
};
</script>

<style  scoped>
.all {
  min-height: 100%;
  background: url("../../assets/imgs/background.png") no-repeat left;
  background-size: cover;
  width: 100%;
}
</style>