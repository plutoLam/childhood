<template>
  <div class="home-index" ref="homeIndex">
    <Header />
    <!-- <BackgroundImage /> -->
    <div
      class="childhood"
      :class="{ left: toLeft, 'left-bottom': toLeftBottom }"
      ref="childhood"
    >
      <img
        src="@/assets/img/childhood.png"
        alt=""
        class="childhood_wow bounceIn"
      />
    </div>

    <div class="index-text">
      <img src="~@/assets/img/index_text.png" alt="" />
    </div>
    <Mario
      class="mario childhood_wow bounceInRight"
      @imgshow="imgshow"
      @partshow="partshow"
      ref="mario"
    />
  </div>
</template>

<script>
import BackgroundImage from "@/components/backgroundImage";
import Header from "./childcomps/header";
import Mario from "./childcomps/mario";
import { WOW } from "wowjs";
export default {
  name: "HomeIndex",
  components: {
    BackgroundImage,
    Header,
    Mario,
  },
  data() {
    return {
      toLeft: false,
      toLeftBottom: false,
    };
  },
  mounted() {
    const { homeIndex } = this.$refs;
    this.$nextTick(() => {
      console.log("init");
      new WOW().init();
    });
    let homeIndeObserver = new IntersectionObserver((entries) => {
      console.log("child", entries);
      if (!entries[0].isIntersecting) {
        console.log("init2");
        new WOW({
          boxClass: "childhood_wow", // 改boxClas避免和其他组件冲突
          // offset: 1000,
        }).init();
      }
    });
    homeIndeObserver.observe(homeIndex);
  },
  methods: {
    imgshow(show) {
      this.toLeft = show;
      if (show) {
        this.$emit("toIndex");
      }

      // console.log("this.toLeft: ", this.toLeft);
    },
    partshow(show) {
      this.toLeftBottom = show;
      // console.log("this.toLeftBottom: ", this.toLeftBottom);
    },
  },
};
</script>

<style lang="scss" scoped>
.home-index {
  width: 100%;
  height: 100vh;
  // background: linear-gradient(45deg, #da4453, #89216b);
  position: relative;
  overflow: hidden;
  z-index: $home-z-index;

  .index-text {
    position: absolute;
    left: 45%;
    top: 57%;
    img {
      width: 400px;
    }
  }
  $width: 850px;
  $height: 170px;
  .childhood {
    @include img-wrap($width, $height);
    position: absolute;
    left: 13%;
    top: 27%;
    transition: 1s;

    &.left {
      @include img-wrap(600px, 200px);
      transform: translate(-25%, 29%);
      // left: 50px;
      // top: 50%;
    }

    &.left-bottom {
      @include img-wrap(250px, 70px);
      transform: translate(-140px, 300px);
      // left: 25px;
      // top: 100%;
    }
  }
}
</style>