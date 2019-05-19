<template>
  <div id="register-container">
    <div class="navbar">
      <div class="register-title-wrapper">
        <div class="title-left-wrapper" @click="back">
          <span class="icon-back"></span>
        </div>
        <div class="title-text">注册</div>
      </div>
    </div>
    <form class="register-form">
      <input
        class="register-form-item"
        type="text"
        placeholder="手机号"
        v-model="username"
      >
      <input
        class="register-form-item"
        type="password"
        placeholder="密码"
        v-model="password"
      >
      <input
        class="register-form-item"
        type="password"
        placeholder="确认密码"
        v-model="confirmPassword"
      >
    </form>
    <button
        class="register-button"
        @click="register"
      >注册</button>
    <p>已有账号？<span @click="goLogin">去登录</span></p>
    <toast :text="toastText" ref="toast"></toast>
  </div>
</template>

<script>
import { register } from '@/api/book'
import toast from '@/components/shelf/toast'
export default {
  components: { toast },
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      toastText: '',
      insertId: ''
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    register () {
      var telReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (this.username && this.password && this.confirmPassword) {
        if (telReg.test(this.username)) {
          if (this.password === this.confirmPassword) {
            const params = {
              account: this.username,
              password: this.password
            }
            register(params).then(res => {
              if (res.data.error_code === 1) {
                this.showToast(res.data.msg)
              }
              if (res.data.error_code === 0) {
                this.showToast(res.data.msg)
                this.$router.push({ path: `/completeInfo/${this.username}` })
              }
            })
          } else {
            this.showToast('两次输入的密码不一致')
          }
        } else {
          this.showToast('请输入正确的手机号')
        }
      } else {
        this.showToast('请填写完整')
      }
    },
    goLogin () {
      this.$router.push({ path: '/login' })
    },
    showToast(text) {
      this.toastText = text
      this.$refs.toast.show()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
#register-container {
  background-color: #fff;
  height: 100%;
  overflow: hidden;
  .navbar {
    width: 100%;
    font-size: px2rem(16);
    .register-title-wrapper {
      position: relative;
      display: flex;
      width: 100%;
      height: px2rem(42);
      font-size: px2rem(20);
      color: #666;
      &.hide-shadow {
        box-shadow: none;
      }
      .title-left-wrapper {
        position: relative;
        z-index: 200;
        flex: 1;
        margin-left: px2rem(15);
        @include left;
      }
      .title-right-wrapper {
        position: relative;
        z-index: 200;
        flex: 1;
        margin-right: px2rem(15);
        font-size: px2rem(16);
        @include right;
      }
    }
    .title-text {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: px2rem(42);
      font-size: px2rem(16);
      font-weight: bold;
      color: #333;
      @include center;
    }
  }
  .register-form {
    width: px2rem(200);
    margin: px2rem(150) auto 0;
    .register-form-item {
      display: block;
      outline: none;
      border: px2rem(1) solid #346cb9;
      border-radius: px2rem(20);
      width: px2rem(200);
      height: px2rem(40);
      margin-bottom: px2rem(10);
      text-indent: px2rem(10);
      color: #7d8188;
    }
  }
  .register-button {
    display: block;
    width: px2rem(200);
    height: px2rem(40);
    background-color: #346cb9;
    color: #fff;
    text-align: center;
    border: none;
    border-radius: px2rem(20);
    text-decoration: none;
    display: block;
    font-size: px2rem(14);
    margin: px2rem(20) auto px2rem(10);
    cursor: pointer;
  }
  p {
    width: 380px;
    text-align: center;
    font-size: px2rem(14);
    color: #666;
    margin: auto;
    span {
      color: #346cb9;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
