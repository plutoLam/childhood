<template>
  <div class="bg music" :class="data ? '' : 'c'"></div>
</template>

<script>
export default {
  props: ["data"],
};
</script>


<style lang="scss" scoped>
.bg {
  background: url("//img.alicdn.com/tps/TB1qq7kNXXXXXacXFXXXXXXXXXX-400-186.png")
    no-repeat;
  overflow: hidden;
}
.music {
  width: 25px;
  height: 21px;
  background-position: -175px -75px;
  position: absolute;
  top: 2px;
  left: -12px;

  &.c {
    background-position: -150px -75px;
  }
}
</style>