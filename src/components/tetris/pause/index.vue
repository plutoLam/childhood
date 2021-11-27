<template>
  <div class="bg pause" :class="{ c: showPause }" />
</template>

<script>
let Pause = {
  timeout: null,
};
export default {
  props: ["data"],
  mounted() {
    this.setShake(this.data);
  },
  data() {
    return {
      showPause: false,
    };
  },
  watch: {
    $props: {
      deep: true,
      handler(nextProps) {
        this.setShake(nextProps.data);
      },
    },
  },
  methods: {
    setShake(bool) {
      if (bool && !Pause.timeout) {
        Pause.timeout = setInterval(() => {
          this.showPause = !this.showPause;
        }, 250);
      }
      if (!bool && Pause.timeout) {
        clearInterval(Pause.timeout);
        this.showPause = false;
        Pause.timeout = null;
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.bg {
  background: url("//img.alicdn.com/tps/TB1qq7kNXXXXXacXFXXXXXXXXXX-400-186.png")
    no-repeat;
  overflow: hidden;
}
.pause {
  width: 20px;
  height: 18px;
  background-position: -100px -75px;
  position: absolute;
  top: 3px;
  left: 18px;
  &.c {
    background-position: -75px -75px;
  }
}
</style>
