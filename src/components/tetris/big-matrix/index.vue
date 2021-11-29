<script>
import { isClear } from "@/components/tetris/tools/unit/"; // 是否达到消除状态
import { fillLine, blankLine } from "@/components/tetris/tools/unit/const"; //fillLine = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
import states from "@/components/tetris/tools/control/states";
import { mapState } from "vuex";
const t = setTimeout;

export default {
  props: ["cur", "reset", "propMatrix"],
  watch: {
    $props: {
      // 监听props有无变化
      handler(val = {}, oldVal) {
        this.propsChange(val);
      },
      deep: true,
    },
    // drop(newVal) {
    //   if (newVal) {
    //     console.log("drop");
    //     this.matrix.classList.push("shake");
    //   }
    // },
  },
  computed: {
    ...mapState(["drop"]),
  },
  mounted() {
    this.matrix = this.$refs.matrix;
    this.block = this.$refs.block;
    this.tetris = document.getElementById("tetris"); // 获取游戏机
    console.log("tetris: ", this);
    // this.tetris.style.opacity = `0.3`;
  },
  render() {
    let matrix;
    if (this.isOver) {
      matrix = this.overState;
    } else {
      matrix = this.getResult();
    }

    const clientHeight =
      document.body.clientWidth || document.documentElement.clientWidth;
    const lineHeight = Math.floor(clientHeight / 10) + "px";
    const lineStyle = {
      height: lineHeight,
    };
    const blockStyle = {
      width: lineHeight,
      height: lineHeight,
    };
    // console.log("blockStyle: ", blockStyle);
    // const classList = {
    //   matrix,
    //   (this.drop ? "shake" : ""),
    // }
    return (
      <div class={"matrix" + (this.drop ? " shake" : "")} ref="matrix">
        {matrix.map((p, k1) => (
          <div class="line" style={lineStyle}>
            {p.map(
              (e, k2) => (
                <div
                  ref="block"
                  class={
                    (e === 1 ? "c " : "") +
                    (e === 2 ? "d " : "") +
                    (typeof e == "string" ? e : "") +
                    " block"
                  }
                  style={blockStyle}
                ></div>
              )
              // 0就是没有样式
            )}
          </div>
        ))}
      </div>
    );
  },
  data() {
    return {
      clearLines: false, // 返回数组
      animateColor: 2, // 初始为没有方块，1为有方块，2为变红（方块接触和消行的时候都要闪一下）
      isOver: false,
      overState: null,
      tetris: null,
    };
  },
  methods: {
    propsChange(nextProps) {
      // props变化则执行
      const clears = isClear(nextProps.propMatrix); // 判断哪一行被消除，返回被消除的行数的数组集合
      const overs = nextProps.reset; // 游戏是否结束
      setTimeout(() => {
        // 下一轮更新再执行
        this.clearLines = clears;
        this.isOver = overs;
      }, 0);
      if (clears && !this.clearLines) {
        // console.log("clears: ", clears);
        this.clearAnimate(clears); // 执行消除行的动画
      }
      if (!clears && overs && !this.isOver) {
        this.over(nextProps); // 清空屏幕
      }
    },

    // propMatrix是屏幕上每个块的二位坐标，空位0，非空为1
    getResult(props) {
      if (!props) {
        props = this.$props;
      }
      const cur = props.cur;
      const shape = cur && cur.shape;
      const xy = cur && cur.xy;
      const type = cur && cur.type;
      let matrix = JSON.parse(JSON.stringify(props.propMatrix));
      const clearLines = this.clearLines;
      // const colorIndex = Math.floor(Math.random() * colorMap.length);
      if (clearLines) {
        // 如果有消除行
        // console.log('clearLines: ', clearLines);
        const animateColor = this.animateColor;
        // console.log('animateColor: ', animateColor); // 2
        clearLines.forEach((index) => {
          // 遍历被消除的行
          matrix[index] = [
            animateColor,
            animateColor,
            animateColor,
            animateColor,
            animateColor,
            animateColor,
            animateColor,
            animateColor,
            animateColor,
            animateColor,
          ];
        });
      } else if (shape) {
        // console.log('shape: ', shape);
        shape.forEach(
          (
            m,
            k1 // m为行数组，k1为行坐标
          ) =>
            m.forEach((n, k2) => {
              // n为第m行第n列的值，0 or 1，k2位列坐标
              // console.log('n && xy[0] + k1: ', n && xy[0] + k1);
              if (n && xy[0] + k1 >= 0) {
                // xy为shape二维矩阵左上角在matrix中的坐标，最小为0
                // 竖坐标可以为负，但是负值不会被渲染
                let line = matrix[xy[0] + k1]; // 方块在matrix对应的行
                let color;
                if (line[xy[1] + k2] === 1 && !clearLines) {
                  // console.log('line[xy[1] + k2]: ', line[xy[1] + k2]);
                  // 方块在matrix对应的列
                  // 矩阵与方块重合会闪一下
                  color = 2;
                  // color = type;
                } else {
                  // color = 1;

                  // console.log("colorIndex: ", colorIndex);
                  color = type;
                }
                line[xy[1] + k2] = color;
                matrix[xy[0] + k1] = line;
              }
            })
        );
      }
      // console.log("matrix: ", matrix);
      return matrix;
    },
    clearAnimate(clears) {
      // 这里放大到全屏
      const clearLine = clears[0];
      // console.log("this.clearLines: ", this.clearLines);
      const firstLine = 20 - clearLine - 1;
      const translateY = 80 - 5 * firstLine;
      console.log("translateY: ", translateY);
      this.matrix.style.transform = `scale(1) translate(0, -${translateY}%)`;

      console.log("tetris: ", this);
      this.tetris.style.opacity = `0.1`;
      // this.block.style.border = "none";

      const anima = (callback) => {
        t(() => {
          this.animateColor = 0; // 无方块状态
          t(() => {
            this.animateColor = 2; // 方块变红状态
            if (typeof callback === "function") {
              callback();
            }
          }, 100);
        }, 100);
      };
      anima(() => {
        anima(() => {
          anima(() => {
            t(() => {
              states.clearLines(this.propMatrix, clears);
              console.log("消除结束", clears);
              console.log(this.matrix.style);
              this.matrix.style.transform = `scale(0.27) translate(-84%, -134%)`;
              this.tetris.style.opacity = `1`;
              // this.block.style.border = `1px solid rgba(#eee, 0.4)`;
            }, 100);
          });
        });
      });
    },
    over(nextProps) {
      let overState = this.getResult(nextProps);

      this.overState = [...overState];
      const exLine = (index) => {
        if (index <= 19) {
          overState[19 - index] = fillLine;
        } else if (index >= 20 && index <= 39) {
          overState[index - 20] = blankLine;
        } else {
          states.overEnd();
          return;
        }
        this.overState = [...overState];
        // console.log(JSON.stringify(overState))
      };

      for (let i = 0; i <= 40; i++) {
        t(exLine.bind(null, i), 40 * (i + 1));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.matrix {
  transition-duration: 0.7s;
  // transition-property: transform, position;
  // transition-delay: 0, 1s;

  // position: absolute;
  // left: -22%;
  // top: -133%;
  transform: scale(0.27) translate(-84%, -135%);
  // transform: scale(0.27);
  &.shake {
    animation-name: shake-center;
    animation-duration: 0.3s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: none;
  }

  @keyframes shake-center {
    0% {
      -webkit-transform: rotate(0deg) scale(0.27) translate(-84%, -134%);
      transform: rotate(0deg) scale(0.27) translate(-84%, -134%);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
    }
    10% {
      -webkit-transform: rotate(1deg) scale(0.27) translate(-84%, -134%);
      transform: rotate(1deg) scale(0.27) translate(-84%, -134%);
    }
    20% {
      -webkit-transform: rotate(-1deg) scale(0.27) translate(-84%, -134%);
      transform: rotate(-1deg) scale(0.27) translate(-84%, -134%);
    }
    30% {
      -webkit-transform: rotate(1deg) scale(0.27) translate(-84%, -134%);
      transform: rotate(1deg) scale(0.27) translate(-84%, -134%);
    }
    40% {
      -webkit-transform: rotate(-1deg) scale(0.27) translate(-84%, -134%);
      transform: rotate(-1deg) scale(0.27) translate(-84%, -134%);
    }
    50% {
      -webkit-transform: rotate(1deg) scale(0.27) translate(-84%, -134%);
      transform: rotate(1deg) scale(0.27) translate(-84%, -134%);
    }
    60% {
      -webkit-transform: rotate(-1deg) scale(0.27) translate(-84%, -134%);
      transform: rotate(-1deg) scale(0.27) translate(-84%, -134%);
    }
    70% {
      -webkit-transform: rotate(1deg) scale(0.27) translate(-84%, -134%);
      transform: rotate(1deg) scale(0.27) translate(-84%, -134%);
    }
    80% {
      -webkit-transform: rotate(-1deg) scale(0.27) translate(-84%, -134%);
      transform: rotate(-1deg) scale(0.27) translate(-84%, -134%);
    }
    90% {
      -webkit-transform: rotate(1deg) scale(0.27) translate(-84%, -134%);
      transform: rotate(1deg) scale(0.27) translate(-84%, -134%);
    }
    100% {
      -webkit-transform: rotate(0deg) scale(0.27) translate(-84%, -134%);
      transform: rotate(0deg) scale(0.27) translate(-84%, -134%);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
    }
  }

  &.big {
    transform: scale(1) translate(0, -80%);
    // position: static;
  }

  .line {
    // width: 220px;
    // height: 5%; // 20行  一行5%
    display: flex;
    .block {
      // width: 20%;
      // height: 100%;
      border: 2px solid rgba($color: #eee, $alpha: 0.4);
      box-shadow: 0 0 4px #000 inset;
    }

    @keyframes randomcolor {
      0%,
      100% {
        background-color: #69d5d8;
      }
      18% {
        background-color: #1890ff;
      }

      36% {
        background-color: #ff85c0;
      }
      52% {
        background-color: #f65c3a;
      }

      70% {
        background-color: #f5d802;
      }
      88% {
        background: #f65c3a;
      }
    }

    .c {
      // 正在下落的样式
      border: 2px solid black;
      // background: #aee6cd;
      animation: 5s randomcolor infinite;
    }

    .d {
      // 触碰的样式
      border: 2px solid black;
      background: red;
    }

    .O {
      background-color: #69d5d8;
      border: 1px solid black;
    }

    .I {
      background-color: #eee7d5;
      border: 1px solid black;
    }
    .L {
      background-color: #1890ff;
      border: 1px solid black;
    }
    .J {
      background-color: #f65c3a;
      border: 1px solid black;
    }
    .Z {
      background-color: #b4e8d1;
      border: 1px solid black;
    }
    .S {
      background-color: #f5d802;
      border: 1px solid black;
    }
    .T {
      background-color: #ff85c0;
      border: 1px solid black;
    }
  }
}
</style>