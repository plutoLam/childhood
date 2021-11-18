<template>
  <div class="vedio">
    <VedioBg />
    <div ref="bilibili" class="bilibili">
      <div class="title1">这才叫童年！</div>
      <div class="title2">童年的纸飞机，现在终于飞回我手里~</div>
      <div class="bilibili-left vedio_wow slideInLeft">
        <iframe
          src="//player.bilibili.com/player.html?aid=967952577&bvid=BV1Zp4y1X7Qm&cid=183101784&page=1"
          scrolling="no"
          border="0"
          frameborder="no"
          framespacing="0"
          allowfullscreen="true"
          width="100%"
          height="100%"
          ref="v1"
        >
        </iframe>
      </div>
      <div class="bilibili-right vedio_wow slideInRight">
        <!-- src="//player.bilibili.com/player.html?aid=41737051&bvid=BV1it41147yp&cid=73253489&page=1&danmaku=0" -->
        <iframe
          src="//player.bilibili.com/player.html?aid=591309983&bvid=BV1jq4y1R71q&cid=431228148&page=1"
          scrolling="no"
          border="0"
          frameborder="no"
          framespacing="0"
          allowfullscreen="true"
          width="100%"
          height="100%"
        >
        </iframe>
      </div>
    </div>

    <div class="vedio-text vedio-reveal">
      <img src="~@/assets/img/vedio_text.png" alt="" />
    </div>
    <img src="@/assets/img/last.png" class="last" alt="" />
    <img src="@/assets/img/houzi.png" class="houzi vedio-reveal" alt="" />
  </div>
</template>

<script>
import { WOW } from "wowjs";
import scrollReveal from "scrollreveal";
import VedioBg from "./vedioBg.vue";
export default {
  name: "Vedio",
  components: {
    VedioBg,
  },
  data() {
    return {
      scrollReveal: scrollReveal(),
    };
  },
  mounted() {
    const { bilibili, v1 } = this.$refs;
    console.log("v1: ", v1);

    let vedioOberser = new IntersectionObserver((entries) => {
      MediaSource.muted = true;
      console.log(entries[0]);
      if (!entries[0].isIntersecting) {
        console.log("vedio wow初始化");
        new WOW({
          boxClass: "vedio_wow",
        }).init();
      }
    });
    vedioOberser.observe(bilibili);
    // document.addEventListener("scroll", this.onScroll, true);
    this.$nextTick(() => {
      new WOW({
        boxClass: "vedio_wow",
      }).init();
    });
    this.reveal_init();
  },
  methods: {
    reveal_init() {
      this.scrollReveal.reveal(".vedio-reveal", {
        // 动画的时长
        duration: 1500,
        // 延迟时间
        // delay: 500,
        // 动画开始的位置，'bottom', 'left', 'top', 'right'
        origin: "top",
        // 回滚的时候是否再次触发动画
        reset: true,
        // 在移动端是否使用动画
        mobile: false,
        // 滚动的距离，单位可以用%，rem等
        distance: "200px",
        // 其他可用的动画效果
        // opacity: 0.001,
        easing: "linear",
        scale: 0.9,
        viewOffset: {
          //在计算元素可见性时扩展/收缩视口的活动边界。
          top: -300,
          right: 0,
          bottom: 0,
          left: 0,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin bilibili {
  width: 400px;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: $box-shadow;
  // border: solid 5px black;
}
.vedio {
  width: 100%;
  height: 230vh;
  position: relative;

  .vedio-text {
    position: absolute;
    top: 20%;
    right: 22%;

    img {
      width: 600px;
    }
  }

  .bilibili {
    width: 100%;
    height: 300px;
    position: absolute;
    top: 40%;

    .title1 {
      position: absolute;
      left: 20%;
      bottom: -50px;
      font-size: 20px;
      font-family: "YouYuan";
      color: white;
    }
    .title2 {
      position: absolute;
      right: 13%;
      bottom: -50px;
      font-size: 20px;
      font-family: "YouYuan";
      color: white;
    }
    .bilibili-left {
      @include bilibili;
      position: absolute;
      left: 10%;
      // top: 30%;
    }
    .bilibili-right {
      @include bilibili;
      position: absolute;
      right: 10%;
      // top: 30%;
    }
  }

  .last {
    width: 90%;
    @include horizontal-center;
    bottom: 0;
  }
  .houzi {
    transform: rotateY(180deg);
    width: 25%;
    position: absolute;
    top: -50px;
    left: 6%;
  }
}
</style>