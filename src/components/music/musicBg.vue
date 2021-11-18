<template>
  <div class="music-bg">
    <img class="bg" :src="require('@/assets/cover_images/' + song + '.jpg')" />
    <div class="wrap"></div>
  </div>
</template>

<script>
export default {
  name: "MusicBg",
  props: {
    song: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.music-bg {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: -1;
  // background: pink;
  overflow: hidden;
  .bg {
    width: 20%;
    position: relative;
    @include abs-center;
    z-index: -3;
    border-radius: 2%;
    // overflow: hidden;
    animation: play 100s;
    animation-iteration-count: infinite;
  }
  @keyframes play {
    0% {
      width: 40%;
    }
    50% {
      opacity: 0.3;
      width: 95%;
      // transform: rotate(0.5deg);
    }
    100% {
      visibility: 1;
      width: 40%;
      // transform: rotate(-0.5deg);
    }
    // 60% {
    //   width: 80%;
    // }
    // 80% {
    //   width: 90%;
    // }
    // 100% {
    //   width: 95%;
    // }
  }

  .wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(#000, 0.5);
    background: linear-gradient(
      to bottom,
      rgba(#000, 0.2),
      rgba(#000, 0.5),
      rgba(#000, 0.2)
    );
    box-shadow: 0 150px 50px -50px #eadec4 inset,
      0 -150px 50px -50px #eadec4 inset;

    // background: pink;
    z-index: -2;
  }
}
</style>