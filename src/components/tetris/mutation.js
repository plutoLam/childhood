import { mapState, mapMutations } from "vuex";
const {
  speedRun,
  matrix,
  moveBlock,
  lock,
  nextBlock,
  focus,
  pause,
  clearLines,
  key_down,
  key_left,
  speedStart,
  key_pause,
  key_reset,
  key_rotate,
  key_music,
  music,
  drop,
  key_drop,
  max,
  test
} = mapMutations(['speedRun', 'matrix', 'moveBlock', 'lock', 'nextBlock', 'focus', 'pause', 'clearLines', 'max', 'key_down',
  'key_left',
  'speedStart',
  'key_pause',
  'key_reset',
  'key_rotate',
  'key_music',
  'music',
  'drop',
  'key_drop',
  'test'
])