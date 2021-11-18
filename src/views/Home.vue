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
    flowerAnimation() {
      // console.log("flowerAnimation");
      const { flower, home } = this.$refs;
      let time = 1 + Math.ceil(Math.random() * 3 * 1000) / 1000; //生成1 ~ 4之间的一个随机数，即下一个花瓣生成的时间间隔

      // 随机生成scal
      let scale = Math.floor(Math.random() * 5);
      scale = (10 - scale) / 10; //生成0.5 ~ 1之间的一个随机数，即为当前花瓣的缩放尺度

      // 随机生成left
      const clientWidth =
        document.body.clientWidth || document.documentElement.clientWidth;
      // console.log("clientWidth: ", clientWidth);
      let left = Math.floor(Math.random() * clientWidth);

      // console.log(time, scale, left);

      this.flowerData.push({
        transform: `scale(${scale})`,
        left: `${left}px`,
      });

      // console.log("flow", flower);
      if (flower) {
        Array.from(flower).forEach((item, index) => {
          DOMRect = item.getBoundingClientRect();
          // console.log("DOMRect: ", DOMRect.y);
          // console.log(document.documentElement.scrollHeight);
          if (DOMRect.y >= document.documentElement.scrollHeight - 200) {
            console.log("超过接", index);
            this.flowerData.splice(index, 1);
          }
        });
      }

      console.log(this.flowerData);
      setTimeout(this.flowerAnimation, time * 200); //在前面生成的时间过后，再次调用生成花瓣的方法
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