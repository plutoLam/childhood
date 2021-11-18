<template>
  <div class="sidebar" @mouseover="hidenRight" @mouseleave="showRight">
    <div
      class="sidebar-item"
      v-for="(item, index) in tabs"
      :key="item"
      @click="jump(index)"
    >
      {{ item }}
    </div>
    <div class="right" :class="{ hiden: !isRightShow }">
      <Icon type="youjiantou" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      tabs: ["首页", "音乐", "零食", "童年的记忆"],
      isRightShow: true,
    };
  },
  methods: {
    showRight() {
      // setTimeout(() => {
      this.isRightShow = true;
      // }, 1000);
    },
    hidenRight() {
      // setTimeout(() => {
      this.isRightShow = false;
      // }, 500);
    },
    jump(index) {
      this.$emit("jump", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  left: 0%;
  top: 50vh;
  transform: translate(-100%, -50%);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background: linear-gradient(to bottom, #d46a4e, #fdd74a, #007082);
  background: #277081;
  transition: 1s;
  z-index: $sidebar-z-index;

  &:hover {
    transform: translate(0%, -50%);
  }

  .sidebar-item {
    padding: 10px 20px;
    // background: rgba($color: #000000, $alpha: 0.5);
    color: white;

    &:hover {
      background: rgba($color: #c2d9c0, $alpha: 0.8);
      cursor: pointer;
    }

    &:nth-child(1) {
      border-top-right-radius: 5px;
    }

    &:last-child {
      border-bottom-right-radius: 5px;
    }
  }

  .right {
    position: absolute;
    right: -25px;
    top: 50%;
    transform: translateY(-50%);
    width: 25px;
    height: 40px;
    background: #bacae3;
    @include flex-center;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    transition: 1s;

    &.hiden {
      opacity: 0;
    }
  }
}
</style>