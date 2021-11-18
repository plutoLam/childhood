<template>
  <el-dialog
    :modal="false"
    :visible.sync="visible"
    :width="$utils.toRem(320)"
    class="confirm-dialog"
    :show-close="false"
  >
    <!-- <div slot="title">{{ title || "提示" }}</div> -->
    <div class="confirm-body">
      <span class="icon-wrap"> × </span>
      加载失败
    </div>
    <!-- <span class="dialog-footer" slot="footer">
      <el-button @click="confirmAndClose" class="confirm-btn" type="primary"
        >确认1</el-button
      >
    </span> -->
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import Vue from "vue";
const Confirm = {
  name: "Confirm",
  props: ["visible", "text", "title", "onConfirm"],
  methods: {
    confirmAndClose() {
      this.onConfirm && this.onConfirm();
      this.visible = false;
    },
  },
};

export default Confirm;

// 单例减少开销
let instanceCache;
// 命令式调用
export const confirm = function (text, title, onConfirm = () => {}) {
  if (typeof title === "function") {
    onConfirm = title;
    title = undefined;
  }

  const ConfirmCtor = Vue.extend(Confirm);
  const getInstance = () => {
    if (!instanceCache) {
      instanceCache = new ConfirmCtor({
        propsData: {
          text,
          title,
          onConfirm,
        },
      });
      // 生成dom
      instanceCache.$mount();
      document.body.appendChild(instanceCache.$el);
    } else {
      // 更新属性
      instanceCache.text = text;
      instanceCache.title = title;
      instanceCache.onConfirm = onConfirm;
    }
    return instanceCache;
  };
  const instance = getInstance();
  // 确保更新的prop渲染到dom
  // 确保动画效果
  Vue.nextTick(() => {
    instance.visible = true;
    setTimeout(() => {
      instance.visible = false;
    }, 1500);
  });
};
</script>

<style lang="scss" scoped>
.confirm-dialog {
  /deep/.el-dialog {
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 200px;
    width: 145px !important;
    margin-top: 40vh !important;
    z-index: 1009;
    .el-dialog__body {
      padding: 20px 25px;
    }
    .confirm-body {
      color: red;
      display: flex;
      justify-content: space-between;
      align-content: center;
      font-size: 17px;
      .icon-wrap {
        width: 20px;
        height: 20px;
        background: red;
        border-radius: 50%;
        color: rgba(0, 0, 0, 0.8);
        font-size: 26px;
        // font-weight: 100;
        @include flex-center;
      }
    }
    .confirm-btn {
      width: 100%;
    }
  }
}
</style>
