<template>
  <div class="barrage">
    <div
      class="barrage-item"
      v-for="item in showingBullets"
      @animationend="removeBullet"
      :key="item.id"
      :data-line="item.line"
      ref="barrage"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
const getUUID = () => Math.random() + Math.random();
export default {
  name: "Barrage",
  data() {
    return {
      // 将要显示的弹幕队列
      // waitBullets: [
      //   { id: getUUID(), name: "1一场说走就走的旅行", line: 0 },
      //   { id: getUUID(), name: "2结束单身汪", line: 0 },
      //   { id: getUUID(), name: "3明年暴瘦10斤", line: 0 },
      //   { id: getUUID(), name: "4多陪伴父母", line: 0 },
      //   { id: getUUID(), name: "5赚到1个亿,买别墅", line: 0 },
      // ],
      showingBullets: [],
      lines: 13, //13
      currentLine: 1,
      newBullet: "",
      isInfinite: true,
    };
  },
  props: {
    waitBullets: {
      type: Array,
    },
  },
  mounted() {
    this.showNextBullet();
    const timer = setInterval(this.showNextBullet, 700);
    // 组件销毁前，清除定时器
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    showNextBullet() {
      // console.log("showNextBullet");
      if (!this.waitBullets.length) {
        return;
      }
      // 先确定弹道，跟上一个弹道错开即可
      this.currentLine = Math.floor(Math.random() * this.lines) + 1;

      const { barrage } = this.$refs;
      let isDone = false; // 记录这条弹幕是否作废
      if (barrage) {
        Array.from(barrage).forEach((item) => {
          const line = item.attributes["data-line"].nodeValue;
          // console.log(line, this.currentLine);
          if (line == this.currentLine) {
            const { width, x } = item.getBoundingClientRect();
            const clientWidth =
              document.body.clientWidth || document.documentElement.clientWidth;
            // console.log(
            //   "document.documentElement.clientWidth: ",
            //   document.documentElement.clientWidth
            // );
            // console.log(
            //   "document.body.clientWidth: ",
            //   document.body.clientWidth
            // );
            // console.log("clientWidth: ", clientWidth);
            // console.log("width+x", width + x);
            if (clientWidth - (width + x) < 100) {
              //两条弹幕的间距大于100px
              // console.log("弹幕还没有出去,重新选择轨道");
              isDone = true;
              return;
            }
          }
        });
      }
      if (isDone) {
        return;
      }
      // console.log("继续往下");
      // 从等待集合里取出第一个
      const currentBullet = this.waitBullets.shift();
      // 想要无限循环的话
      this.isInfinite &&
        this.waitBullets.push({
          id: getUUID(),
          name: currentBullet.name,
          isWished: false,
          line: 0,
        });
      // 设置弹幕的弹道
      currentBullet.line = this.currentLine;
      // console.log("currentBullet: ", currentBullet.name);
      // 弹幕放进显示集合里，弹幕开始滚动
      this.showingBullets.push(currentBullet);
    },
    removeBullet() {
      this.showingBullets.shift();
      // console.log(this.showingBullets);
    },
  },
};
</script>

<style lang="scss" scoped>
.barrage {
  width: 100%;
  height: 100vh;
  // background: pink;
  z-index: -1; // -1
  position: fixed;
  // top: 2%;
  // background: rgba(#000, 0.5);
  background: url(~@/assets/img/barrage_bg.png) no-repeat;
  background-size: 100% 100%;

  .barrage-item {
    position: absolute;
    animation: rightToleft 13s linear both; //7s
    color: rgba($color: #fff, $alpha: 0.5);
    font-size: 20px;
    white-space: nowrap;
  }
  .barrage-item[data-line="1"] {
    top: 0;
  }
  .barrage-item[data-line="2"] {
    top: 8%;
  }
  .barrage-item[data-line="3"] {
    top: 16%;
  }
  .barrage-item[data-line="4"] {
    top: 24%;
  }
  .barrage-item[data-line="5"] {
    top: 32%;
  }
  .barrage-item[data-line="6"] {
    top: 40%;
  }
  .barrage-item[data-line="7"] {
    top: 48%;
  }
  .barrage-item[data-line="8"] {
    top: 56%;
  }
  .barrage-item[data-line="9"] {
    top: 64%;
  }
  .barrage-item[data-line="10"] {
    top: 72%;
  }
  .barrage-item[data-line="11"] {
    top: 80%;
  }
  .barrage-item[data-line="12"] {
    top: 88%;
  }
  .barrage-item[data-line="13"] {
    bottom: 2%;
  }
  @keyframes rightToleft {
    0% {
      transform: translate(100vw);
    }
    100% {
      transform: translate(-100%);
    }
  }
}
</style>