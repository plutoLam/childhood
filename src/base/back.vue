<template>
  <div class="back" @click="back">
    <Icon type="back_android_light" color="white" :size="30" />
  </div>
</template>

<script>
export default {
  name: "back",
  methods: {
    back() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.back {
  position: fixed;
  left: 30px;
  top: 30px;
  @include round(40px);
  background-color: #035e8a;
  @include flex-center;
  cursor: pointer;
  font-weight: 900;
}
</style>