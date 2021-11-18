import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    token: '',
    avatar_index: 0,
    avatars: ["duola", "labi", "lufei", "pikaqiu", "xiyangyang"],

    // music
    songIndex: 0,
    formIndex: 2,
    isPlay: false,
  },
  mutations: {
    setName(state, name) {
      state.name = name
    },
    setToken(state, token) {
      state.token = token
    },
    setAvatar(state, avatar_index) {
      state.avatar_index = avatar_index
    },
    setlogout(state) {
      state.name = ''
      state.token = ''
      state.avatar_index = 0
    },

    changeMode(state) {
      state.formIndex = (state.formIndex + 1) % 3;
    },
    async playSong(state, index) {
      console.log("index: ", index);
      state.isPlay = true;
      state.songIndex = index;
      if (state.songReady) {
        await state.audio.play();
        console.log("play");
      }
    },
    pauseSong(state) {
      state.isPlay = false;
      state.audio.pause();
    },
    prevSong(state) {
      if (state.formIndex == 2) {
        //顺序播放
        state.songIndex--;
      } else if (state.formIndex == 1) {
        //随机播放
        state.songIndex = Math.floor(Math.random() * 3);
      }

      if (state.songIndex < 0) {
        state.songIndex = state.songs.length - 1;
      }
      state.isPlay = true;
    },
    nextSong(state) {
      console.log("nextSong");
      if (state.formIndex == 2) {
        state.songIndex++;
      } else if (state.formIndex == 1) {
        state.songIndex = Math.floor(Math.random() * 3);
      }

      if (state.songIndex > state.songs.length - 1) {
        state.songIndex = 0;
      }
      console.log(state.songIndex);
    },
  },
  getters: {
    // 判断是否登录
    logined(state) {
      return (state.name && state.token) ? true : false
    }
  }
})
