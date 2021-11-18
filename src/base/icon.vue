<script>
import { toRem } from "@/utils"; //默认去找idnex.js
export default {
  name: "Icon",
  props: {
    size: {
      type: Number,
      default: 16,
    },
    type: {
      type: String,
      require: true, //必传
    },
    color: {
      type: String,
      default: "",
    },
  },
  methods: {
    getIconCls() {
      let cls = `icon-${this.type}`;
      return cls;
    },
    onclick(e) {
      this.$emit("click", e);
    },
    getIconStyle() {
      const chromeMinSize = 12;

      const retStyle = { fontSize: toRem(this.size) }; //样式名用驼峰写法
      if (this.size < chromeMinSize) {
        //如果size比Chrome限制的大小还要小，就要用缩放转换scale
        const ratio = this.size / chromeMinSize; //x和y缩放的倍数
        retStyle.transform = `scale(${ratio})`;
      }
      if (this.color) {
        retStyle.color = this.color;
      }
      return retStyle;
    },
  },
  render() {
    const Icon = (
      <i
        onclick={this.onclick}
        class={`iconfont icon-component ${this.getIconCls()}`}
        style={this.getIconStyle()}
      />
    );
    return Icon;
  },
};
</script>

<style lang="scss" scoped>
.icon-component {
}
</style>