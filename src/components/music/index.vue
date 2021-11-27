<template>
  <div class="music" ref="music">
    <MusicBg :song="song" />
    <div class="play-form candy-reveal">
      <img
        :src="require('@/assets/play-form/' + play_form[formIndex] + '.png')"
        alt=""
        id="play-form"
        @click="changeMode"
      />
    </div>
    <div class="body-left" ref="left">
      <div
        class="music-container wow bounceInUp"
        id="music-container"
        :class="{ play: isPlay }"
      >
        <div class="music-info">
          <h4 id="title">{{ song }}</h4>
          <div
            class="progress-container"
            id="progress-container"
            @click="changeProgress($event)"
            ref="progressContainer"
          >
            <div class="progress" id="progress" ref="progress"></div>
          </div>
        </div>

        <audio
          :src="require('@/assets/musics/' + song + '.mp3')"
          id="audio"
          ref="audio"
          @ended="nextSong"
          @timeupdate="updateTime"
          @canplay="ready"
        ></audio>

        <div class="img-container">
          <img
            :src="require('@/assets/cover_images/' + song + '.jpg')"
            alt=""
            id="cover"
          />
        </div>

        <div class="navigation">
          <button id="prev" class="action-btn" @click="prevSong">
            <Icon type="shangyishou" :size="20" />
          </button>
          <button
            id="play"
            @click="isPlay = !isPlay"
            class="action-btn action-btn-big"
          >
            <Icon type="bofang" :size="30" v-if="!isPlay" />
            <Icon type="24gf-pause2" :size="30" v-if="isPlay" />
          </button>
          <button id="next" class="action-btn" @click="nextSong">
            <Icon type="xiayishou" :size="20" />
          </button>
        </div>
      </div>
    </div>
    <div class="body-right">
      <div class="">
        <ul class="music-list wow bounceInUp" id="music-list">
          <li
            v-for="(item, index) in songs"
            :key="index"
            :class="{ play: songIndex === index }"
            @click="playSong(index)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <div class="img-wrap">
      <img src="~@/assets/img/labi.png" alt="" />
    </div>

    <div class="music-text candy-reveal">
      <img src="~@/assets/img/music_text.png" alt="" />
    </div>
  </div>
</template>

<script>
import scrollReveal from "scrollreveal";
import { WOW } from "wowjs";
import MusicBg from "./musicBg.vue";
import { mapState } from "vuex";
export default {
  name: "Music",
  components: {
    MusicBg,
  },
  data() {
    return {
      songs: ["外婆的澎湖湾", "童年", "奇迹再现", "稻香"],
      songIndex: 0,
      formIndex: 2,
      play_form: ["单曲循环", "随机", "顺序"],
      isPlay: false,
      songReady: false,
      scrollReveal: scrollReveal(),
    };
  },
  mounted() {
    // console.log("bus", this.$bus);
    // this.$bus.$on("next", (res) => {
    //   console.log(res);
    // });

    const { music, left } = this.$refs;
    let io = new IntersectionObserver((entries) => {
      // console.log("music", entries);
      if (!entries[0].isIntersecting) {
        // console.log("music wow初始化");
        new WOW().init();
      }
    });
    io.observe(left);
    // document.addEventListener("scroll", this.onScroll, true);
    this.$nextTick(() => {
      new WOW().init();
    });
    this.audio = this.$refs.audio;
    // window.scrollReveal = new scrollReveal();
    this.scrollReveal.reveal(".music-reveal", {
      // 动画的时长
      duration: 500,
      // 延迟时间
      delay: 0,
      // 动画开始的位置，'bottom', 'left', 'top', 'right'
      origin: "top",
      // 回滚的时候是否再次触发动画
      reset: true,
      // 在移动端是否使用动画
      mobile: false,
      // 滚动的距离，单位可以用%，rem等
      distance: "200px",
      // 其他可用的动画效果
      opacity: 0.001,
      easing: "linear",
      scale: 0.5,
      viewOffset: {
        //在计算元素可见性时扩展/收缩视口的活动边界。
        top: -250,
        right: 0,
        bottom: 0,
        left: 0,
      },
    });
  },
  computed: {
    // ...mapState(["songIndex", "formIndex", "isPlay"]),
    song() {
      return this.songs[this.songIndex];
    },
  },
  methods: {
    // onScroll(e) {
    //   const { music } = this.$refs;
    //   music.getBoundingClientRect();
    //   // console.log(
    //   //   "music.getBoundingClientRect(): ",
    //   //   music.getBoundingClientRect()
    //   // );
    //   // console.log(e);
    // },
    reset() {
      new WOW().init();
    },
    ready() {
      this.songReady = true;
      // console.log("songReady", this.songReady);
    },
    changeMode() {
      this.formIndex = (this.formIndex + 1) % 3;
    },
    async playSong(index) {
      console.log("index: ", index);
      this.isPlay = true;
      this.songIndex = index;
      if (this.songReady) {
        await this.audio.play();
        console.log("play");
      }
    },
    pauseSong() {
      this.isPlay = false;
      this.audio.pause();
    },
    prevSong() {
      if (this.formIndex == 2) {
        //顺序播放
        this.songIndex--;
      } else if (this.formIndex == 1) {
        //随机播放
        this.songIndex = Math.floor(Math.random() * 3);
      }

      if (this.songIndex < 0) {
        this.songIndex = this.songs.length - 1;
      }
      this.isPlay = true;
    },
    nextSong() {
      console.log("nextSong");
      if (this.formIndex == 2) {
        this.songIndex++;
      } else if (this.formIndex == 1) {
        this.songIndex = Math.floor(Math.random() * 3);
      }

      if (this.songIndex > this.songs.length - 1) {
        this.songIndex = 0;
      }
      console.log(this.songIndex);
    },
    updateTime() {
      const { progress } = this.$refs;
      let currentTime = this.audio.currentTime;
      let duration = this.audio.duration;
      let progressPercent = (currentTime / duration) * 100;
      // console.log("progressPercent", progressPercent);
      progress.style.width = `${progressPercent}%`; //用$要用`
    },
    changeProgress(event) {
      const { progressContainer } = this.$refs;
      const width = progressContainer.clientWidth; //包含自身和padding的宽度
      const clickX = event.offsetX; //鼠标坐标到元素的左侧的距离  https://www.jianshu.com/p/c0eae5eed0e9
      const duration = this.audio.duration;
      this.audio.currentTime = (clickX / width) * duration;
    },
  },
  watch: {
    isPlay(newValue) {
      console.log("isPlay", newValue);
      if (newValue) {
        this.playSong(this.songIndex);
      } else {
        this.pauseSong();
      }
    },
    songIndex(index) {
      this.songReady = false;
      console.log("songindex", index);

      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        // 一秒后播放，让浏览器准备好播放音乐
        this.playSong(index);
      }, 500);
    },
  },
};
</script>

<style  scoped>
/* @import url("https://fonts.googleapis.com/css?family=Lato&display=swap"); */

* {
  box-sizing: border-box;
}
.music {
  width: 100%;
  height: 250vh;
  margin-bottom: 10vh;
  /* background-image: linear-gradient(
    0deg,
    rgba(247, 247, 247, 1) 23.8%,
    rgba(252, 221, 221, 1) 92%
  ); */
  font-family: "Lato", sans-serif;
  position: relative;
  z-index: 1003;
}

li {
  list-style: none;
}
.img-wrap {
  position: absolute;
  left: 10%;
  top: -130px;
}
.img-wrap img {
  width: 40%;
}

.music-text {
  position: absolute;
  top: 20%;
  right: 7%;
  opacity: 0.7;
}
.music-text img {
  width: 600px;
}

.play-form {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  /* transform: translateY(-50%); */
  /* margin-left: 15px;
  margin-top: 15px; */
  /* background: #888888;
  opacity: 0.1; */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* cursor: pointer; */
  /* z-index: 999; */
}
.play-form img {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.body-left {
  width: 430px;
  position: absolute;
  left: 130px;
  top: 50%;
  transform: translateY(-50%);
}

.body-right {
  width: 30%;
  position: absolute;
  right: 130px;
  top: 50%;
  transform: translateY(-50%);
}

.music-container {
  /* width: 400px;
    height: 100px; */
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 20px 20px 0 rgba(252, 169, 169, 0.6);
  display: flex;
  padding: 20px 30px;
  position: relative;
  /* 不能用绝对定位，不然会飘起来 */
  /* top: 200px; */
  margin: 100px 0;
  z-index: 10;
}

.music-info {
  background-color: rgba(255, 255, 255, 0.5);
  /* background-color: pink; */
  border-radius: 15px 15px 0 0;
  position: absolute;
  top: 0;
  left: 20px;
  width: calc(100% - 40px);
  /* calc() 函数允许我们在属性值中执行数学计算操作。例如，我们可以使用 calc() 指定一个元素宽的固定像素值为多个数值的和。 */
  padding: 10px 10px 10px 150px;
  opacity: 0;
  transform: translateY(0%);
  transition: transform 0.3s ease-in, opacity 0.3s ease-in;
  z-index: 0;
}
.music-container.play .music-info {
  /* 用js添加了.play后不透明度变成1，有一个向上的动画 */
  opacity: 1;
  transform: translateY(-100%);
}

.music-info h4 {
  margin: 0;
}

.img-container {
  position: relative;
  width: 110px;
}

.img-container::after {
  content: "";
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  bottom: 100%;
  left: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, 50%);
}

.img-container img {
  border-radius: 50%;
  object-fit: cover;
  height: 110px;
  width: inherit;
  position: absolute;
  bottom: 0;
  left: 0;
  animation: rotate 10s linear infinite;

  animation-play-state: paused;
}

.music-container.play .img-container img {
  /* play后开始转 */
  animation-play-state: running;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.action-btn {
  background-color: #fff;
  border: 0;
  color: #dfdbdf;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
  margin: 0 20px;
}

.action-btn.action-btn-big {
  color: #cdc2d0;
  font-size: 30px;
}

.progress-container {
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
  height: 4px;
  width: 100%;
}

.progress {
  background-color: #fe8daa;
  border-radius: 5px;
  height: 100%;
  width: 0%;
  transition: width 0.1s linear;
}

.music-list {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 20px 20px 0 rgba(252, 169, 169, 0.6);
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  line-height: 35px;
  max-height: 500px;
  max-width: 400px;
  min-width: 300px;
  overflow: auto;
}

.music-list::-webkit-scrollbar {
  width: 4px;
}

.music-list::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

.music-list::-webkit-scrollbar-thumb {
  background-color: pink;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

.music-list li {
  /* display: block; */
  font-weight: 500;
  border-bottom: solid #cdc2d0 0.1px;
  cursor: pointer;
  /* background-color: pink; */
}

.music-list li.play {
  color: pink;
}
</style>