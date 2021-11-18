<template>
  <div
    @click="onClick"
    @keydown.enter="enter"
    class="n-button"
    :style="buttonStyle"
    ref="nbutton"
  >
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    type: {
      type: String,
      default: "common",
    },
    round: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      buttonStyle: "123",
    };
  },
  created() {
    this.getStyle();
  },
  name: "NButton",
  // updated() {
  //   console.log(this.$refs);
  // },
  methods: {
    onClick(e) {
      this.$emit("click", e);
    },
    enter(e) {
      this.$emit("enter", e);
    },
    getStyle() {
      if (this.round) {
        let style = "123";
        this.$nextTick(() => {
          console.log(this.$refs.nbutton.clientHeight);
          const height = this.$refs.nbutton.clientHeight;
          const width = this.$refs.nbutton.clientWidth;
          this.buttonStyle = `border-top-left-radius: ${height / 2}px;
           border-top-right-radius: ${height / 2}px;
           border-bottom-left-radius: ${height / 2}px;
           border-bottom-right-radius: ${height / 2}px;`;
          // console.log("style", style);
          style = 234;
          // console.log("style", this.buttonStyle);
        });
        // console.log("style", style);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.n-button {
  display: inline-block;
  padding: 5px 16px;
  border: 1px solid var(--button-border-color);
  border-radius: 2px;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: var(--button-hover-bgcolor);
  }
}
</style>
