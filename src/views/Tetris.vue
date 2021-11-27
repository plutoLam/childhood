<template>
  <div class="wrap">
    <div class="tetris" id="tetris">
      <div class="rect" :class="drop ? 'drop' : ''">
        <!-- 边边上的装饰 -->
        <Decorate />
        <div class="screen">
          <div class="panel">
            <!-- 关于屏幕中间的方块，包括下落中的 -->
            <Matrix :propMatrix="matrix" :cur="cur" :reset="reset" />

            <!-- 游戏没开始时的恐龙，会定时开始动 -->
            <Logo :cur="!!cur" :reset="reset" />

            <!-- 游戏参数 -->
            <div class="state">
              <!-- 得分 -->
              <Point :cur="!!cur" :max="max" :point="points" />
              <p>{{ pContent }}</p>
              <Number :number="cur ? clearLines : startLines" />
              <p>{{ level }}</p>
              <Number :number="cur ? speedRun : speedStart" :length="1" />
              <p>{{ nextText }}</p>
              <Next :data="next" />

              <!-- 显示在屏幕上的三个状态 -->
              <div class="bottom">
                <Music :data="music" />
                <Pause :data="pause" />
                <Number :propTime="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Keyboard :filling="filling" />
    </div>

    <!-- <div class="decorated">
      <div class="index1">
        <img class="line" src="@/assets/tetris/type1.png" alt="" />
      </div>
      <div class="index2">
        <img class="block" src="@/assets/tetris/2.png" alt="" />
      </div>
      <div class="index3">
        <img class="line" src="@/assets/tetris/type2.png" alt="" />
      </div>
      <div class="index4">
        <img class="block" src="@/assets/tetris/3.png" alt="" />
      </div>
    </div> -->

    <BigMatrix :propMatrix="matrix" :cur="cur" :reset="reset" />
  </div>
</template>



<script>
import Decorate from "@/components/tetris/decorate/index.vue";
import Next from "@/components/tetris/next/index.vue";
import Music from "@/components/tetris/music/index.vue";
import Pause from "@/components/tetris/pause/index.vue";
import Number from "@/components/tetris/number/index.vue";
import Point from "@/components/tetris/point/index.vue";
import Keyboard from "@/components/tetris/keyboard/index.vue";
import Logo from "@/components/tetris/logo/index.vue";
import Matrix from "@/components/tetris/matrix/index.vue";
import BigMatrix from "@/components/tetris/big-matrix/index.vue";
import { mapState } from "vuex";
import store from "@/store";
import {
  transform,
  lastRecord,
  speeds,
  i18n,
  lan,
} from "@/components/tetris/tools/unit/const";
import { visibilityChangeEvent, isFocus } from "@/components/tetris/tools/unit";
import states from "@/components/tetris/tools/control/states";
export default {
  mounted() {
    // console.log(store);
    // console.log(this.$store);
    // this.$store.commit("test");
    // this.$store.commit("test1");
    this.render();
    window.addEventListener("resize", this.resize.bind(this), true);
  },
  data() {
    return {
      size: {},
      w: document.documentElement.clientWidth,
      h: document.documentElement.clientHeight,
      filling: "",
    };
  },
  components: {
    Decorate,
    Next,
    Music,
    Pause,
    Number,
    Point,
    Logo,
    Keyboard,
    Matrix,
    BigMatrix,
  },
  computed: {
    ...mapState(["speedRun"]),
    pContent() {
      return this.cur ? i18n.cleans[lan] : i18n.startLine[lan];
    },
    level: () => i18n.level[lan],
    nextText: () => i18n.next[lan],
    ...mapState([
      "matrix",
      "keyboard",
      "music",
      "pause",
      "next",
      "cur",
      "speedStart",
      "speedRun",
      "startLines",
      "clearLines",
      "points",
      "max",
      "reset",
      "drop",
    ]),
  },
  methods: {
    render() {
      let filling = 0;
      const size = (() => {
        const w = this.w;
        const h = this.h;
        const ratio = h / w;
        let scale;
        let css = {};
        if (ratio < 1.5) {
          scale = h / 960;
        } else {
          scale = w / 640;
          filling = (h - 960 * scale) / scale / 3;
          css = {
            "padding-top": Math.floor(filling) + 42 + "px",
            "padding-bottom": Math.floor(filling) + "px",
            "margin-top": Math.floor(-480 - filling * 1.5) + "px",
          };
        }
        css[transform] = `scale(${scale})`;
        return css;
      })();
      this.size = size;
      this.start();
      this.filling = filling;
    },
    resize() {
      this.w = document.documentElement.clientWidth;
      this.h = document.documentElement.clientHeight;
      this.render();
    },
    start() {
      if (visibilityChangeEvent) {
        // 将页面的焦点变换写入store
        document.addEventListener(
          visibilityChangeEvent,
          () => {
            states.focus(isFocus());
          },
          false
        );
      }

      if (lastRecord) {
        // 读取记录
        if (lastRecord.cur && !lastRecord.pause) {
          // 拿到上一次游戏的状态, 如果在游戏中且没有暂停, 游戏继续
          const speedRun = this.speedRun;
          let timeout = speeds[speedRun - 1] / 2; // 继续时, 给予当前下落速度一半的停留时间
          // 停留时间不小于最快速的速度
          timeout =
            speedRun < speeds[speeds.length - 1]
              ? speeds[speeds.length - 1]
              : speedRun;
          states.auto(timeout);
        }

        if (!lastRecord.cur) {
          states.overStart();
        }
      } else {
        states.overStart();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// @import "@/app.less";
// @import "./loader.scss";

.wrap {
  width: 100%;
  height: 100vh;
  background: #444444;
  background: url(~@/assets/tetris/bg.jpg) no-repeat;
  background-size: 100% 100%;
  background-position: 0 0;
  padding: 0;
  margin: 0;
  font: 20px/1 "HanHei SC", "PingHei", "PingFang SC", "STHeitiSC-Light",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  overflow: hidden;
  cursor: default;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-font-feature-settings: "liga", "kern";
  direction: ltr;
  text-align: left;
  position: relative;
}

.decorated {
  position: absolute;
  left: 44%;
  top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: rotate(20deg);
  img {
    height: 100px;
  }
  .index1 {
    // transform: rotate(20deg);
  }
  .index2 {
    // transform: rotate(20deg);
  }
  .index3 {
    // transform: rotate(20deg);
  }
  .index4 {
    // transform: rotate(20deg);
  }
  @keyframes sw {
  }
}

.tetris {
  width: 640px;
  // height: 90%;
  padding-top: 42px;
  // box-shadow: 0 0 10px #fff inset;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  right: -5%;
  transform: scale(0.6);
  margin: -480px 0 0 0;
  background: #efcc19;
  // background: #7cb43b;
}

.rect {
  width: 480px;
  padding: 45px 0 35px;
  border: #000 solid;
  border-width: 0 10px 10px;
  margin: 0 auto;
  position: relative;
  &.drop {
    -webkit-transform: translateY(5px);
    transform: translateY(5px);
  }
}

.screen {
  width: 390px;
  height: 478px;
  border: solid 5px;
  border-color: #987f0f #fae36c #fae36c #987f0f;
  margin: 0 auto;
  position: relative;
  .panel {
    width: 380px;
    height: 468px;
    margin: 0 auto;
    background: #9ead86;
    padding: 8px;
    border: 2px solid #494536;
  }
}

.state {
  width: 108px;
  position: absolute;
  top: 15px;
  right: 15px;
  p {
    line-height: 47px;
    height: 57px;
    padding: 10px 0 0;
    white-space: nowrap;
    clear: both;
  }
  .bottom {
    position: absolute;
    width: 114px;
    top: 415px;
    left: 0;
  }
}
</style>