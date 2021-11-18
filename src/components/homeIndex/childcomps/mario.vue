<template>
  <div class="mario">
    <div class="notice" :class="{ appear: isNoticeShow && isImgHover }">
      <img src="@/assets/dialog/notice.png" alt="" />
      <!-- 将鼠标放到马里奥的各个部位，你将会看到... -->
    </div>
    <div
      class="img-wrap"
      ref="img"
      :class="{ 'img-hover': isImgHover, rotate: isAn }"
    >
      <img src="@/assets/img/mario.png" alt="" />
      <div class="mouth-wrap" ref="mouth">
        <!-- <span class="dot" :class="{ dotappear: isNoticeShow && isImgHover }"
          >asfsfsdsfdsf</span
        > -->
        <img
          src="@/assets/dialog/dot.png"
          class="dot"
          :class="{ dotappear: isNoticeShow && isImgHover }"
          alt=""
        />
      </div>

      <!-- 把耳朵换成鼻子 -->
      <div class="ear-wrap" ref="ear">
        <img
          src="@/assets/dialog/dot.png"
          class="dot"
          :class="{ dotappear: isNoticeShow && isImgHover }"
          alt=""
        />
      </div>
      <div class="hat-wrap" ref="hat">
        <img
          src="@/assets/dialog/dot.png"
          class="dot"
          :class="{ dotappear: isNoticeShow && isImgHover }"
          alt=""
        />
      </div>
    </div>
    <div class="mouth-dialog" :class="{ 'mouth-hover': isMouthHover }">
      <img src="@/assets/dialog/mouth.png" alt="" />
    </div>
    <div class="mouth-dialog" :class="{ 'mouth-hover': isEarHover }">
      <img src="@/assets/dialog/nose.png" alt="" />
    </div>
    <div class="mouth-dialog" :class="{ 'mouth-hover': isHatHover }">
      <img src="@/assets/dialog/hat.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Mario",
  data() {
    return {
      isImgHover: false,
      isMouthHover: false,
      isEarHover: false,
      isHatHover: false,
      isNoticeShow: false,
      isAn: false,
    };
  },
  mounted() {
    const { img, mouth, ear, hat } = this.$refs;
    let timer;
    // 鼠标放到图片上
    const onMouseOverHandler = (e) => {
      console.log("鼠标放到图片上");
      this.isImgHover = true;
      this.isAn = true;
      // setTimeout(() => {
      //   this.isAn = true;
      //   console.log("isAn: ", this.isAn);
      // }, 0);
      timer = setTimeout(() => {
        this.isNoticeShow = true;
        mouth.onmousemove = onMouthHover;
        mouth.onmouseout = onMouthOut;
        ear.onmousemove = onEarhHover;
        ear.onmouseout = () => {
          this.isEarHover = false;
        };
        hat.onmousemove = onHatHover;
        hat.onmouseout = () => {
          this.isHatHover = false;
        };
      }, 1000);
    };

    // 鼠标经过mario部分的事件和移开事件
    const onMouthHover = (e) => {
      // e.stopPropagation();
      console.log("onMouthHover");
      this.isMouthHover = true;
    };
    const onMouthOut = (e) => {
      this.isMouthHover = false;
    };
    const onEarhHover = (e) => {
      this.isEarHover = true;
      // console.log("ear");
    };
    const onHatHover = (e) => {
      this.isHatHover = true;
      // console.log("hat");
    };

    img.onmouseover = onMouseOverHandler;
    img.onmouseleave = (e) => {
      console.log("img.onmouseleave");
      this.isAn = true;
      setTimeout(() => {
        this.isAn = false;
        console.log("isAn: ", this.isAn);
      }, 600);

      if (timer) {
        // console.log("清除定时器");
        clearTimeout(timer);
      }
      this.isImgHover = false;
      this.isNoticeShow = false;
      mouth.onmousemove = null;
      ear.onmousemove = null;
      hat.onmousemove = null;
      e.stopPropagation();
    };
  },
  methods: {},
  watch: {
    isImgHover(show) {
      this.$emit("imgshow", show);
      this.$bus.$emit("toIndex", show);
    },
    isMouthHover(show) {
      this.$emit("partshow", show);
    },
    isEarHover(show) {
      this.$emit("partshow", show);
    },
    isHatHover(show) {
      this.$emit("partshow", show);
    },
  },
};
</script>

<style lang="scss" scoped>
.mario {
  position: absolute;
  right: 100px;
  bottom: 0px;
  .img-wrap {
    @include img-wrap(190px);
    transition: 1.5s;
    animation: identifier 8s;
    animation-iteration-count: infinite;

    &.img-hover {
      @include img-wrap(500px);
      animation: none;
    }

    &.rotate {
      transform: rotate(20deg);
      animation: none;
    }

    // 无限循环动画
    @keyframes identifier {
      from,
      11.1%,
      to {
        transform: none;
      }

      20% {
        transform: scale(0.8) rotate(-12.5deg);
      }
      22.2% {
        transform: scale(1) rotate(12.5deg) skewX(-12.5deg) skewY(-12.5deg)
          translate(-2%, 0%);
      }

      33.3% {
        transform: skewX(6.25deg) skewY(6.25deg) translate(2%, 0%);
      }

      44.4% {
        transform: skewX(-3.125deg) skewY(-3.125deg) translate(0%, 3%);
      }

      55.5% {
        transform: skewX(1.5625deg) skewY(1.5625deg) translate(-2%, -3%);
      }

      66.6% {
        transform: skewX(-0.78125deg) skewY(-0.78125deg) translate(2%, 2%);
      }

      77.7% {
        transform: skewX(0.390625deg) skewY(0.390625deg) translate(2%, -2%);
      }

      88.8% {
        transform: skewX(-0.1953125deg) skewY(-0.1953125deg) translate(-2%, 3%);
      }
    }

    .dot {
      display: none;

      &.dotappear {
        display: block;
        z-index: 1;
        width: 30px;
        height: 30px;
        @include abs-center;
      }
    }

    .mouth-wrap {
      width: 33%;
      height: 20%;
      // background: pink;
      position: absolute;
      left: 26%;
      bottom: 4%;
      cursor: pointer;
    }

    .ear-wrap {
      width: 23%;
      height: 25%;
      // background: pink;
      position: absolute;
      left: 70%;
      bottom: 19%;
      cursor: pointer;
    }

    .hat-wrap {
      width: 50%;
      height: 25%;
      // background: pink;
      position: absolute;
      left: 30%;
      top: 12%;
      transform: rotate(15deg);
      cursor: pointer;
    }
  }
  @-webkit-keyframes scale-up-hor-right {
    0% {
      -webkit-transform: scaleX(0.4);
      transform: scaleX(0.4);
      -webkit-transform-origin: 100% 100%;
      transform-origin: 100% 100%;
    }
    100% {
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
      -webkit-transform-origin: 100% 100%;
      transform-origin: 100% 100%;
    }
  }
  @keyframes scale-up-hor-right {
    0% {
      -webkit-transform: scaleX(0.4);
      transform: scaleX(0.4);
      -webkit-transform-origin: 100% 100%;
      transform-origin: 100% 100%;
    }
    100% {
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
      -webkit-transform-origin: 100% 100%;
      transform-origin: 100% 100%;
    }
  }
  .mouth-dialog {
    // background: skyblue;
    position: absolute;
    left: -450px;
    top: 0px;
    display: none;
    transition: 1s;
    @include img-wrap(0, 0);
    animation: scale-up-hor-right 1s;
    &.mouth-hover {
      width: 70%;
      // height: 60%;
      display: block;
      width: 500px;
      height: 400px;
      // @include img-wrap(50%, 50%);
    }
  }
  .notice {
    position: absolute;
    top: -50px;
    left: 50px;
    transition: 1s;
    display: none;
    &.appear {
      display: block;
      // animation: appear 3s;
    }
    img {
      width: 360px;
    }
    @keyframes appear {
      0% {
        visibility: 0;
      }
      100% {
        visibility: 1;
      }
    }
  }
}
</style>