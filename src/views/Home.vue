<template>
  <div class="home" ref="home">
    <div ref="place"></div>
    <HomeIndex class="home-index" ref="homeIndex" @toIndex="toIndex" />
    <Music ref="music" />
    <Candy ref="candy" />
    <Vedio ref="vedio" />

    <Sidebar @jump="jump" />
    <BackgroundImage />
  </div>
</template>

<script>
import HomeIndex from "@/components/homeIndex";
import Music from "@/components/music";
import Candy from "@/components/candy";
import Vedio from "@/components/vedio";
import BackgroundImage from "@/components/backgroundImage";
import Sidebar from "@/components/sidebar";

export default {
  name: "Home",
  components: {
    HomeIndex,
    Music,
    Candy,
    Vedio,
    BackgroundImage,
    Sidebar,
  },
  data() {
    return {
      flowerData: [],
    };
  },
  created() {},
  mounted() {
    document.addEventListener("scroll", this.onScroll, true);
  },
  methods: {
    jump(index) {
      switch (index) {
        case 0:
          this.toIndex();
          break;
        case 1:
          this.toMusic();
          break;
        case 2:
          this.toCandy();
          break;
        case 3:
          this.toVedio();
          break;

        default:
          break;
      }
    },
    toIndex() {
      this.$refs.place.scrollIntoView({ behavior: "smooth" });
    },
    toMusic() {
      this.$refs.music.$el.scrollIntoView({ behavior: "smooth" });
    },
    toCandy() {
      this.$refs.candy.$el.scrollIntoView({ behavior: "smooth" });
    },
    toVedio() {
      this.$refs.vedio.$el.scrollIntoView({ behavior: "smooth" });
    },
    onScroll(e) {
      const { homeIndex } = this.$refs;
      const scrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
      const height =
        document.body.clientWidth || document.documentElement.clientWidth;
      // console.log("document.body.clientWidth: ", document.body.clientWidth);
      // console.log("height: ", height);
      let rate = scrollTop / height;
      // console.log("rate", 1 - rate);
      homeIndex.$el.style.opacity = 1 - rate;
    },
  },
};
</script>

<style lang="scss" scoped>
.flower1 {
  width: 20px;
  height: 20px;
}
.home {
  width: 100%;
  overflow-x: hidden; // 防止出现横向滚动条
  // background: #376c9e;
  background: #eadec4;
  // z-index: $home-z-index;
}
</style>