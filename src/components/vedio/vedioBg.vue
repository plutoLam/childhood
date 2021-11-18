<template>
  <div class="vedio-bg">
    <img class="bg" src="~@/assets/img/vedio_bg.jpg" alt="" />
  </div>
</template>

<script>
export default {
  name: "VedioBg",
};
</script>

<style lang="scss" scoped>
.vedio-bg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .bg {
    width: 100%;
    height: 200vh;
    position: absolute;
  }
}
</style>