<template>
  <div class="playlist-comment">
    <!-- <h1 class="title">
      {{ title }}
    </h1> -->
    <div class="comment-item">
      <div class="img-wrap">
        <img
          :src="
            require('@/assets/avatars/' + avatars[data.avatarIndex] + '.png')
          "
          alt=""
        />
      </div>
      <div class="detail">
        <div class="detail-up">
          <span class="user-name">{{ data.leaveUserNetName }}: </span>
          <span class="content">{{ data.content }}</span>
        </div>

        <!-- 被回复的信息 -->
        <!-- <div class="beReplied" v-if="data.beReplied.length">
          <span class="user-name"
            >@{{ data.beReplied[0].user.nickname }}:
          </span>
          <span class="beReplied-content">{{ data.beReplied[0].content }}</span>
        </div> -->

        <!-- 时间和点赞 -->
        <div class="detail-down">
          <div class="time">
            {{ time }}
          </div>
          <div class="control">
            <Icon
              type="dianzan"
              :size="14"
              v-if="!data.liked"
              @click="likeComment()"
              color="white"
            />
            <Icon
              type="dianzan_kuai"
              :size="14"
              color="red"
              v-else
              @click="likeComment()"
            />
            {{ data.likeCount }}
            <el-divider direction="vertical"></el-divider>
            <Icon type="fenxiang1" :size="14" color="white" />
            <el-divider direction="vertical"></el-divider>
            <Icon type="pinglun" :size="14" color="white" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { likeControl } from "@/api";
import { mapState } from "vuex";
export default {
  name: "CommentItem",
  props: {
    title: {
      type: String,
      default: "评论",
    },
    data: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {
    likeComment() {
      likeControl(this.data.id, this.token).then((res) => {
        console.log("like", res);
        if (res.code === 2000) {
          if (this.data.liked) {
            this.data.likeCount--;
          } else {
            this.data.likeCount++;
          }
          this.data.liked = !this.data.liked;
        } else if (res.code === 2005) {
          this.$message.error("请登录后操作");
        }
      });
    },
  },
  computed: {
    ...mapState(["token", "avatars"]),
    id() {
      return Number(this.$route.params.id);
    },
    user() {
      return this.data.user;
    },
    time() {
      let nowData = new Date();
      let time = new Date(this.data.createdTime);
      if (nowData.getFullYear() == time.getFullYear()) {
        return this.$utils.formatDate(this.data.createdTime, "M月dd日 hh:mm");
      } else {
        return this.$utils.formatDate(
          this.data.createdTime,
          "yyyy年M月dd日 hh:mm"
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.playlist-comment {
  width: 100%;

  .comment-item {
    display: flex;
    width: 100%;

    .img-wrap {
      @include img-wrap(40px);
      border-radius: 50%;
      overflow: hidden;
      margin-right: 15px;
    }

    .detail {
      width: 100%;

      .detail-up {
        font-size: $font-size-medium-sm;

        .content {
          color: #fffae8;
        }
      }
      .beReplied {
        width: 100%;
        background-color: #f4f4f4;
        border-radius: 5px;
        padding: 5px;
        margin-top: 7px;
      }

      .detail-down {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // height: 30px;
        margin-top: 7px;
        .time {
          font-size: $font-size-sm;
          // color: gray;
          color: #d3cbaf;
        }

        .control {
          // margin-right: -20px;
          font-size: $font-size-sm;
          color: white;
          i {
            // margin-right: 20px;
            cursor: pointer;
            &:nth-child(2) {
              margin: 0 20px;
            }
          }
        }
      }
    }
  }
}
.user-name {
  @include label;
  color: #f3d9fa;
}
</style>