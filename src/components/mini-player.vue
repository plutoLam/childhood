<template>
  <div class="mini-player" @click="next">Mini</div>
</template>

<script>
export default {
  name: "MiniPlayer",
  mounted() {},
  methods: {
    next() {
      console.log("next");
      this.$bus.$emit("next", "aaa");
    },
  },
};
</script>

<style lang="scss" scoped>
.mini-player {
  position: fixed;
  left: 35px;
  top: 35px;
  z-index: 9999;
}
</style>