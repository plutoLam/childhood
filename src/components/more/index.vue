<template>
  <div class="more" :class="{ appear: isShow }" @click="changeShow">
    <video
      ref="video"
      src="@/assets/video/thanks.mp4"
      autoplay
      muted
      width="100%"
      height="100%"
      class="video"
    ></video>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isShow(newValue) {
      console.log("newValue: ", newValue);
      console.log(this.$refs.video);
      if (newValue) {
        this.$refs.video.load();
      }
    },
  },
  methods: {
    changeShow() {
      this.$emit("changeShow");
    },
  },
};
</script>

<style lang="scss" scoped>
.more {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10%;
  height: 10vh;
  opacity: 0;
  transition: 1.2s;
  // background: pink;
  z-index: $vidio-z-index;

  .video {
    // border-radius: 50px;
  }

  &.appear {
    height: 100vh;
    width: 100%;
    opacity: 1;
  }
}
</style>