<template>
  <!-- <div class="bg" :style="{ backgroundImage: `url(${bg})` }">

  </div> -->
  <div>
    <div class="bg">
      <img :src="bg" alt="" />
    </div>
  </div>
</template>

<script>
import bg from "@/assets/img/bg.jpg";
export default {
  name: "BackgroundImage",

  data() {
    return {
      wallpaper: "bg-1",
      bg_images: {
        "bg-1": "./bg-images/bg1.jpg",
      },
      bg: bg,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  // height: 100%;
  // background-image: url("../assets/bg-image/img2.jpg");
  z-index: $back-ground-image-z-index;
  // background-size: cover;
  // background-repeat: no-repeat;
  // background-position-x: center;
  position: absolute;
  top: -45px;
  // background-position-y: -30px;
  img {
    width: 100%;
  }
}
</style>