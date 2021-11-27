import Vue from 'vue'
import Vuex from 'vuex'
import tetris from './modules/tetris'
import { getNextType } from '@/components/tetris/tools/unit'
import Block from '@/components/tetris/tools/unit/block'
// require('./modules/tetris/state')
Vue.use(Vuex)

// import { getNextType } from '@/components/tetris/tools/unit'

import { isFocus } from '@/components/tetris/tools/unit/'
import { blankMatrix, lastRecord, maxPoint, blockType } from '@/components/tetris/tools/unit/const'
// import Block from '@/components/tetris/tools/unit/block'
import { hasWebAudioAPI } from '@/components/tetris/tools/unit/music'


let clearLinesInitState = lastRecord &&
  !isNaN(parseInt(lastRecord.clearLines, 10))
  ? parseInt(lastRecord.clearLines, 10)
  : 0
if (clearLinesInitState < 0) {
  clearLinesInitState = 0
}

const curInitState = (() => {
  if (!lastRecord || !lastRecord.cur) {
    // 无记录 或 有记录 但方块为空, 返回 null
    return null
  }
  const cur = lastRecord.cur
  const option = {
    type: cur.type,
    rotateIndex: cur.rotateIndex,
    shape: cur.shape,
    xy: cur.xy
  }
  return new Block(option)
})()

const dropInitState = lastRecord && lastRecord.drop !== undefined
  ? !!lastRecord.drop
  : false

const lockInitState = lastRecord && lastRecord.lock !== undefined
  ? !!lastRecord.lock
  : false

const matrixInitState = lastRecord && Array.isArray(lastRecord.matrix)
  ? lastRecord.matrix
  : blankMatrix

let maxInitState = lastRecord && !isNaN(parseInt(lastRecord.max, 10))
  ? parseInt(lastRecord.max, 10)
  : 0

if (maxInitState < 0) {
  maxInitState = 0
} else if (maxInitState > maxPoint) {
  maxInitState = maxPoint
}
let musicInitState = lastRecord && lastRecord.music !== undefined
  ? !!lastRecord.music
  : true
if (!hasWebAudioAPI.data) {
  musicInitState = false
}

const nextInitState = lastRecord && blockType.indexOf(lastRecord.next) !== -1
  ? lastRecord.next
  : getNextType()

const pauseInitState = lastRecord && lastRecord.pause !== undefined
  ? !!lastRecord.pause
  : false

let pointsInitState = lastRecord && !isNaN(parseInt(lastRecord.points, 10))
  ? parseInt(lastRecord.points, 10)
  : 0

if (pointsInitState < 0) {
  pointsInitState = 0
} else if (pointsInitState > maxPoint) {
  pointsInitState = maxPoint
}

let speedRunInitState = lastRecord && !isNaN(parseInt(lastRecord.speedRun, 10))
  ? parseInt(lastRecord.speedRun, 10)
  : 1
if (speedRunInitState < 1 || speedRunInitState > 6) {
  speedRunInitState = 1
}
let speedStartInitState = lastRecord &&
  !isNaN(parseInt(lastRecord.speedStart, 10))
  ? parseInt(lastRecord.speedStart, 10)
  : 1
if (speedStartInitState < 1 || speedStartInitState > 6) {
  speedStartInitState = 1
}

let startLinesInitState = lastRecord &&
  !isNaN(parseInt(lastRecord.startLines, 10))
  ? parseInt(lastRecord.startLines, 10)
  : 0
if (startLinesInitState < 0 || startLinesInitState > 10) {
  startLinesInitState = 0
}
const resetInitState = lastRecord && lastRecord.reset
  ? !!lastRecord.reset
  : false


export default new Vuex.Store({
  // modules: {
  //   tetris
  // },
  state: {
    name: '',
    token: '',
    avatar_index: 0,
    avatars: ["duola", "labi", "lufei", "pikaqiu", "xiyangyang"],

    // music
    songIndex: 0,
    formIndex: 2,
    isPlay: false,

    // tetris
    music: musicInitState,
    pause: pauseInitState,
    matrix: matrixInitState,
    next: nextInitState,  // 下一个方块的状态
    cur: curInitState,  // 方块的状态
    // dispatch: '',
    speedStart: speedStartInitState,
    speedRun: speedRunInitState,
    startLines: startLinesInitState,
    clearLines: clearLinesInitState,
    points: pointsInitState,
    max: maxInitState,
    reset: resetInitState,
    drop: dropInitState,
    keyboard: {
      drop: false,
      down: false,
      left: false,
      right: false,
      rotate: false,
      reset: false,
      music: false,
      pause: false
    },

    lock: lockInitState,
    focus: isFocus()
  },
  mutations: {
    test1() {
      console.log('test1');
    },
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

    // tetris
    test() {
      console.log('test');
    },
    nextBlock(state, data) {
      if (!data) {
        data = getNextType()
      }
      // state.next = 'O'
      state.next = data
    },
    moveBlock(state, data) {
      state.cur = data.reset === true ? null : new Block(data)
    },
    speedStart(state, data) {
      state.speedStart = data
    },
    speedRun(state, data) {
      state.speedRun = data
    },
    startLines(state, data) {
      state.startLines = data
    },
    matrix(state, data) {
      state.matrix = data
    },
    lock(state, data) {
      state.lock = data
    },
    clearLines(state, data) {
      state.clearLines = data
    },
    points(state, data) {
      state.points = data
    },
    max(state, data) {
      state.max = data
    },
    reset(state, data) {
      state.reset = data
    },
    drop(state, data) {
      state.drop = data
    },
    pause(state, data) {
      state.pause = data
    },
    music(state, data) {
      state.music = data
    },
    focus(state, data) {
      state.focus = data
    },
    key_drop(state, data) {
      state.keyboard['drop'] = data
    },
    key_down(state, data) {
      state.keyboard['down'] = data
    },
    key_left(state, data) {
      state.keyboard['left'] = data
    },
    key_right(state, data) {
      state.keyboard['right'] = data
    },
    key_rotate(state, data) {
      state.keyboard['rotate'] = data
    },
    key_reset(state, data) {
      state.keyboard['reset'] = data
    },
    key_music(state, data) {
      state.keyboard['music'] = data
    },
    key_pause(state, data) {
      state.keyboard['pause'] = data
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
