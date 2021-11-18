<template>
  <div class="message-board">
    <div class="back" @click="back">
      <Icon type="back_android_light" color="white" :size="30" />
    </div>
    <Barrage :waitBullets="barrage" />
    <div class="comment">
      <!-- 评论输入区 -->
      <div class="enter-comment" ref="enter">
        <textarea v-model="content"></textarea>
        <div class="container">
          <div class="container-left">
            <Icon type="aite" :size="20" color="white" />
            <Icon
              type="jinghaojian"
              :size="16"
              class="second-icon"
              color="white"
            />
          </div>
          <!-- <NButton class="commit-comment" @click="commitComment">评论</NButton> -->
          <div class="commit-comment" @click="commitComment">评论</div>
        </div>
      </div>
      <div v-if="offset == 1">
        <h1 class="title">精彩留言</h1>
        <CommentItem
          class="comment-item"
          v-for="item in hotData"
          :key="item.id"
          :data="item"
        />
      </div>

      <h1 class="title">最新留言</h1>
      <CommentItem
        class="comment-item"
        v-for="item in listData"
        :key="item.id"
        :data="item"
      />

      <el-pagination
        v-if="total"
        class="pagination"
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="total"
        :current-page.sync="offset"
      >
      </el-pagination>
    </div>

    <div class="text">
      <img src="@/assets/img/board_text.png" alt="" />
    </div>
  </div>
</template>

<script>
const getUUID = () => Math.random() + Math.random();
import CommentItem from "@/components/content/comment-item";
import Barrage from "@/components/messageBoard/barrage";
import { getMessageBoard, postContent } from "@/api";
import { mapState, mapGetters } from "vuex";
export default {
  name: "MessageBoard",
  components: {
    CommentItem,
    Barrage,
  },
  data() {
    return {
      hotData: [],
      listData: [],
      offset: 1,
      content: "",
      barrageList: [],
      total: "",
    };
  },
  mounted() {
    this.getBarrage();
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    commitComment() {
      postContent(this.content, this.token).then((res) => {
        console.log(res);
        if (res.code === 2000) {
          this.$message({
            message: "留言成功！",
            type: "success",
          });
          if (this.offset === 1) {
            this.getChangeOffset(1);
          } else {
            this.offset = 1;
          }

          this.content = "";
        } else if (res.code === 2005) {
          this.$message.error("请登录后操作");
        } else {
          this.$message.error("留言失败");
        }
      });
    },
    getMessageBoardData(size) {
      getMessageBoard(this.offset, size, this.token).then((res) => {
        console.log(res);
        // res.data.messageBoardList.forEach((i) => {
        //   console.log(i.content);
        // });
        if (res.code === 2000) {
          this.listData = res.data.messageBoardList;
          this.total = res.data.messageCount;
          if (this.offset != 1) {
            this.barrageList.push(...this.listData);
          }
        }
      });
    },
    getHotComment(size) {
      getMessageBoard(1, size, this.token, "like").then((res) => {
        console.log(res);
        // res.data.messageBoardList.forEach((i) => {
        //   console.log(i.content);
        // });
        if (res.code === 2000) {
          this.hotData = res.data.messageBoardList;
          // this.total = res.data.messageCount;
          this.barrageList.push(...this.hotData);
        }
      });
    },
    getBarrage() {
      getMessageBoard(this.offset, 50, this.token).then((res) => {
        console.log(res);
        if (res.code === 2000) {
          this.barrageList = res.data.messageBoardList;
        }
      });
    },
    getChangeOffset(newOff) {
      if (newOff === 1) {
        this.getMessageBoardData(10);
        this.getHotComment(3);
      } else {
        this.getMessageBoardData(10);
      }
    },
  },
  computed: {
    barrage() {
      return this.barrageList.map((item) => {
        return {
          id: getUUID(),
          name: item.content,
        };
      });
    },
    ...mapState(["token"]),
    ...mapGetters(["logined"]),
  },
  watch: {
    offset: {
      handler(newOff) {
        console.log("offset", newOff);
        this.getChangeOffset(newOff);
        if (this.$refs.enter) {
          this.$refs.enter.scrollIntoView();
        }
      },
      immediate: true,
    },
    logined() {
      console.log("user");
      if (this.offset === 1) {
        this.getChangeOffset(1);
      } else {
        this.offset = 1;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.message-board {
  width: 100%;
  position: relative;
  height: 200vh;
  // overflow: hidden;

  .back {
    position: fixed;
    left: 30px;
    top: 30px;
    @include round(40px);
    background-color: #035e8a;
    @include flex-center;
    cursor: pointer;
    font-weight: 900;
  }

  .comment {
    width: 60%;
    // height: 100vh;
    position: absolute;
    right: 100px;
    // transform: translateY(-50%);
    top: 40vh;
    // background-color: rgba(#fff, 0.7);

    .enter-comment {
      textarea {
        width: 100%;
        height: 50px;
        font-size: $font-size-medium-sm;
        border-color: #e5e5e5;
        border-radius: 5px;
        outline: none;
        resize: none;
        background: transparent;
        color: white;
      }

      .container {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        margin-bottom: 20px;

        .container-left {
          display: flex;
          i {
            cursor: pointer;
          }

          .second-icon {
            margin-top: 2px;
            margin-left: 10px;
          }
        }

        .commit-comment {
          // width: 100px;
          padding: 7px 15px;
          color: white;
          background: #792aff;
          @include flex-center;
          border-radius: 999px;
          // margin-top: 40px;
          box-shadow: 1px 1px 1px 1px rgba($color: #000000, $alpha: 0.3);

          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .title {
      margin-bottom: 15px;
      color: #ffa940;
    }
    .comment-item {
      margin-bottom: 20px;
    }

    .pagination {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    /deep/.el-pagination,
    .el-pagination button,
    .el-pager li {
      background: inherit !important;
      color: var(--font-color) !important;

      .active {
        color: $white !important;
        background: #792aff !important;
      }
    }
    /deep/.el-pagination button,
    .el-pager li {
      border-radius: 6px !important;
      border: $border;
    }
  }

  .text {
    position: absolute;
    top: 100px;
    left: 50px;
    img {
      width: 900px;
    }
  }
}
</style>