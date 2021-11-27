<script>
import { isClear } from "@/components/tetris/tools/unit/"; // 是否达到消除状态
import { fillLine, blankLine } from "@/components/tetris/tools/unit/const"; //fillLine = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
import states from "@/components/tetris/tools/control/states";
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
  },
  render() {
    let matrix;
    if (this.isOver) {
      matrix = this.overState;
    } else {
      matrix = this.getResult();
    }

    return (
      <div class="matrix">
        {matrix.map((p, k1) => (
          <p>
            {p.map(
              (e, k2) => (
                <b class={(e === 1 ? "c" : "") + (e === 2 ? "d" : "")} />
              )
              // 0就是没有样式
            )}
          </p>
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
      let matrix = JSON.parse(JSON.stringify(props.propMatrix));
      const clearLines = this.clearLines;
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
                } else {
                  color = 1;
                }
                line[xy[1] + k2] = color;
                matrix[xy[0] + k1] = line;
              }
            })
        );
      }
      // console.log('matrix: ', matrix);
      return matrix;
    },
    clearAnimate() {
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
              states.clearLines(this.propMatrix, this.clearLines);
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
  border: 2px solid #000;
  padding: 3px 1px 1px 3px; // 上 右 下 左
  width: 228px;
  p {
    width: 220px;
    height: 22px;
  }
}
</style>