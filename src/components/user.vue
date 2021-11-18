<template>
  <div class="user">
    <div class="user-info" @click="openLoginDialog">
      <div class="img-wrap">
        <img
          v-if="logined"
          :src="require('@/assets/avatars/' + avatars[avatar_index] + '.png')"
          alt=""
        />
        <img src="@/assets/avatars/avatar.png" alt="" v-else />
      </div>
      <span v-if="!logined">未登录</span>
      <span v-else>{{ name }}</span>
    </div>
    <Toggle v-show="isDetailShow" :show.sync="isDetailShow">
      <el-form :model="form" :rules="rules" ref="form" class="form">
        <div class="left">
          <div class="wrap">
            <h4 class="title">
              <span v-if="isInLogin">
                <span v-if="!logined">Have an Account?</span>
                <span v-else
                  >{{ name }},您已登录
                  <span class="logout" @click="logout">点击注销</span>
                </span>
              </span>
              <span v-else>注册</span>
            </h4>

            <!-- 已经登录后不显示登录框 -->
            <!-- 输入框是未登录且处于登录状态或者处于注册状态显示 -->
            <div
              class="input-area"
              v-show="(!logined && isInLogin) || !isInLogin"
            >
              <el-form-item prop="username">
                <el-input
                  v-model="form.username"
                  placeholder="请输入学号"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="form.password"
                  placeholder="请输入密码"
                  type="password"
                ></el-input>
              </el-form-item>
            </div>
            <div
              class="login"
              v-show="isInLogin"
              @click="login"
              v-if="!logined"
            >
              登录
            </div>

            <div class="auto-login" v-show="!logined && isInLogin">
              <input
                type="checkbox"
                v-model="isAutoLogin"
                class="checkbox"
              />自动登录
            </div>

            <!-- ---- -->
            <div class="text" v-show="isInLogin">
              没有账号？
              <span class="to-register" @click="toRegister">点击注册</span>
            </div>
            <span class="to-login" v-show="!isInLogin" @click="toLogin"
              >点击返回</span
            >
          </div>
        </div>
        <div class="right">
          <div class="wrap">
            <div class="text">Pick一个你喜欢的头像吧！</div>
            <div class="avatar avatar-wrap">
              <img
                :src="
                  require('@/assets/avatars/' + avatars[avatarIndex] + '.png')
                "
                alt=""
              />
            </div>
            <div class="avatars">
              <div
                class="avatar-item avatar-wrap"
                ref="img"
                v-for="(item, index) in avatars"
                :key="index"
                @click="avatarIndex = index"
              >
                <img
                  :src="require('@/assets/avatars/' + item + '.png')"
                  alt=""
                />
                <!-- <img :src="require('@/assets/avatars/' + item)" alt="" /> -->
                <!-- <img :src="require('@/assets' + url)" alt="" /> -->
              </div>
            </div>

            <div class="name" v-show="!isInLogin">
              <div class="name-text">Your Name:</div>
              <el-form-item prop="name">
                <el-input
                  v-model="form.name"
                  placeholder="请输入名字"
                  class="name-input"
                ></el-input>
              </el-form-item>
            </div>

            <div class="register" @click="register" v-if="!isInLogin">注册</div>
            <div class="register" @click="changeAvatar" v-else>更换头像</div>
          </div>
        </div>
        <div class="close" @click="closeLoginDialog">
          <Icon type="guanbi" color="#792aff" />
        </div>
      </el-form>
    </Toggle>
  </div>
</template>

<script>
import { login, register, changeAvatar } from "@/api";
import {
  IS_AUTO_LOGIN,
  NAME,
  USER_NAME,
  PASSWORD,
  TOKEN,
  AVATAR_INDEX,
} from "@/utils";
import storage from "good-storage";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "User",
  data() {
    let validateUserName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入学号"));
      } else {
        callback();
      }
    };
    let validatePassWord = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    let validateName = (rule, value, callback) => {
      if (!this.isInLogin) {
        if (value == "") {
          callback(new Error("请输入名字"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      isDetailShow: false, // 登录界面是否显示
      isInLogin: true,
      isAutoLogin: false,
      // avatars: ["duola", "labi", "lufei", "pikaqiu", "xiyangyang"],
      url: "/avatars/duola.png",
      avatarIndex: 0,
      form: {
        username: "",
        password: "",
        name: "",
      },
      rules: {
        username: [{ validator: validateUserName, trigger: "blur" }],
        password: [{ validator: validatePassWord, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur" }],
      },
    };
  },
  mounted() {
    // Array.from(this.$refs.img).forEach((item) => {
    //   console.log("item: ", item.style);
    //   item.style.height = item.style.width;
    //   console.log("item.style.height: ", item.style.height);
    //   console.log("item.style.width: ", item.style.width);
    // });
    this.autoLogin();
  },
  methods: {
    ...mapMutations(["setName", "setToken", "setAvatar", "setlogout"]),
    openLoginDialog() {
      this.isDetailShow = true;
    },
    closeLoginDialog() {
      this.isDetailShow = false;
    },
    changeAvatar() {
      if (this.logined) {
        changeAvatar(this.avatarIndex, this.token).then((res) => {
          console.log("avatarIndex", res);
          if (res.code === 200) {
            this.setAvatar(this.avatarIndex);
            this.$message({
              message: "更换头像成功！",
              type: "success",
            });
          }
        });
      } else {
        this.$message.error("请登录");
      }
    },
    autoLogin() {
      const isAutoLogin = storage.get(IS_AUTO_LOGIN);
      // console.log("isAutoLogin: ", isAutoLogin);
      if (isAutoLogin) {
        console.log("自动登录");
        this.setName(storage.get(NAME));
        this.setToken(storage.get(TOKEN));
        this.setAvatar(storage.get(AVATAR_INDEX));
        this.form.name = storage.get(NAME);
        this.form.username = storage.get(USER_NAME);
        this.form.password = storage.get(PASSWORD);
        this.avatarIndex = storage.get(AVATAR_INDEX);

        this.$message({
          message: `欢迎回来，${storage.get(NAME)}`,
          type: "success",
        });
      }
    },
    logout() {
      this.setlogout();
      this.resetForm();
      this.avatarIndex = 0;
    },
    toRegister() {
      this.isInLogin = false;
      this.resetForm();
    },
    toLogin() {
      this.isInLogin = true;
      // this.resetForm();
    },
    register() {
      const { form } = this.$refs;
      const { username, password, name } = this.form;
      console.log("form: ", form.validate);
      form.validate((valid) => {
        if (valid) {
          register(username, password, name, this.avatarIndex).then((res) => {
            console.log("register", res);
            const { code } = res;
            if (code === 2000) {
              this.$message({
                message: "注册成功！",
                type: "success",
              });
              this.toLogin();
            } else if (code === 2002) {
              this.$message.error({
                message: "用户名已存在",
              });
            } else {
              this.$message.error({
                message: "未知错误",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    login() {
      const { form } = this.$refs;
      const { username, password } = this.form;
      console.log("form: ", form.validate);
      form.validate((valid) => {
        console.log("valid: ", valid);
        if (valid) {
          login(username, password)
            .then((res) => {
              const { code } = res;

              // 判断后端返回的状态码
              if (code === 2000) {
                const { name, token, avatarIndex } = res.data;

                // 自动登录
                storage.set(IS_AUTO_LOGIN, this.isAutoLogin); // 设置下次是否自动登录
                if (this.isAutoLogin) {
                  storage.set(NAME, name);
                  storage.set(USER_NAME, username);
                  storage.set(PASSWORD, password);
                  storage.set(TOKEN, token);
                  storage.set(AVATAR_INDEX, avatarIndex);
                } else {
                  storage.clear();
                }

                // 设置用户信息
                this.setName(name);
                this.setToken(token);
                this.setAvatar(avatarIndex);
                this.avatarIndex = avatarIndex;

                this.closeLoginDialog();

                this.$message({
                  message: `登录成功！,欢迎"${name}"`,
                  type: "success",
                });
              } else if (code === 2003) {
                this.$message.error({
                  message: "用户名或密码错误",
                });
              } else {
                this.$message.error({
                  message: "未知错误",
                });
              }
            })
            .catch((res) => {
              this.$message.error("错误");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
  computed: {
    ...mapState(["name", "token", "avatar_index", "avatars"]),
    ...mapGetters(["logined"]),
  },
};
</script>

<style lang="scss" scoped>
.user {
  position: relative;
  z-index: $user-z-index;
  .user-info {
    padding: 15px 20px;
    background: rgba($color: #ced4da, $alpha: 0.5);
    position: fixed;
    right: 35px;
    top: 35px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;

    & > * {
      margin-left: 5px;
    }
    .img-wrap {
      @include img-wrap(30px);
      border-radius: 50%;
      overflow: hidden;
      background-color: #e0e0e0;
      border: #d2d2d2 solid 1px;
    }
  }

  .form {
    width: 70%;
    height: 80vh;
    @include abs-center;
    position: fixed;

    display: flex;
    justify-content: space-between;
    box-shadow: $box-shadow;
    @include no-select;

    .left {
      width: 50%;
      height: 100%;
      background: white;
      position: relative;

      .wrap {
        width: 60%;
        height: 100%;
        // background: pink;
        @include horizontal-center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .title {
          font-size: 25px;
          align-self: flex-start;
          margin-bottom: 20px;

          .logout {
            color: #792aff;
            font-size: 14px;
            margin-left: 20px;

            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }

        .input-area {
          margin-top: 20px;
          width: 100% !important;
        }

        .login {
          width: 100px;
          padding: 10px 20px;
          color: white;
          background: #792aff;
          @include flex-center;
          border-radius: 999px;
          margin-top: 40px;
          box-shadow: 1px 1px 1px 1px rgba($color: #000000, $alpha: 0.3);

          &:hover {
            cursor: pointer;
          }
        }

        .auto-login {
          display: flex;
          align-items: center;
          margin-top: 20px;

          .checkbox {
            background-color: #fff !important;
          }
        }
        .text {
          margin-top: 20px;

          .to-register {
            color: #792aff;

            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }

        .to-login {
          margin-top: 20px;
          color: #792aff;

          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
    }

    .right {
      width: 50%;
      height: 100%;
      background: #792aff;
      position: relative;
      .wrap {
        width: 80%;
        height: 100%;
        // background: pink;
        @include horizontal-center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .avatar-wrap {
          @include img-wrap(40px);

          border-radius: 50%;
          overflow: hidden;
        }

        .text {
          color: white;
          font-size: 25px;
        }
        .avatar {
          margin: 40px 0;
          @include img-wrap(100px);
        }

        .avatars {
          display: flex;

          .avatar-item {
            margin: 0 10px;

            &:hover {
              cursor: pointer;
            }
          }
        }

        .name {
          margin-top: 30px;
          align-self: flex-start;

          .name-text {
            color: white;
            font-size: 25px;
            margin-bottom: 10px;
          }
          .name-input {
            // color: red !important;
            /deep/.el-input__inner {
              color: white !important;
            }
          }
        }

        .register {
          width: 100px;
          padding: 10px 20px;
          color: #792aff;
          background: #fff;
          @include flex-center;
          border-radius: 999px;
          margin-top: 40px;
          box-shadow: 1px 1px 1px 1px rgba($color: #000000, $alpha: 0.3);

          &:hover {
            cursor: pointer;
          }
        }
      }
    }

    .close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 25px;
      height: 25px;
      background: #fff;
      // padding: 5px;
      border-radius: 50%;
      @include flex-center;
      transition: 0.9s;

      &:hover {
        cursor: pointer;
        transform: rotate(360deg);
      }
    }
    /deep/.el-input {
      padding: 0px 0 !important;
      width: 100% !important;
      .el-input__inner {
        padding: 8px 0 !important;
        padding-bottom: 15px !important;
        border-radius: 0 !important;
        border: none !important;
        border-bottom: solid #ced4da 1px !important;
        background-color: transparent !important;
      }
    }
  }
}
</style>