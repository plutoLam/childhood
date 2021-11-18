<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { hasParent } from "@/utils";
export default {
  name: "Toggle",

  data() {
    return {};
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    includedDom: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {},

  methods: {
    clickEvent(e) {
      const triggerElement = e.target;
      // console.dir(triggerElement);
      // console.log(this.$slots);
      const childElm = this.$slots.default.map((item) => item.elm);
      // console.log(childElm);
      // console.log(
      //   !hasParent(triggerElement, childElm.concat(this.includedDom))
      // );
      const defaultReserveDoms = Array.from(
        document.querySelectorAll(".el-loading-mask, .el-loading-spinner")
      );
      // console.log("includedDom", this.includedDom);
      const reserves = childElm
        .concat(this.includedDom)
        .concat(defaultReserveDoms);

      if (!hasParent(triggerElement, reserves)) {
        // console.log("hiden");
        this.$emit("update:show", false);
      }
    },
    bindClick() {
      document.addEventListener("click", this.clickEvent);
    },
    removeClick() {
      document.removeEventListener("click", this.clickEvent);
    },
  },
  watch: {
    show(newValue) {
      // console.log("toggle", newsValue);
      setTimeout(() => {
        if (newValue) {
          this.bindClick();
        } else {
          this.removeClick();
        }
      }, 0);
    },
  },
  beforeDestroy() {
    document.removeEventListener("click", this.clickEvent);
  },
};
</script>

<style lang="scss" scoped>
</style>