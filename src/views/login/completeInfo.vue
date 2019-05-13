<template>
  <div id="info-container">
    <div class="navbar">
      <div class="info-title-wrapper">
        <div
          class="title-left-wrapper"
          @click="back"
        >
          <span class="icon-back"></span>
        </div>
        <div class="title-text">注册</div>
      </div>
    </div>
    <form class="info-form">
      <div class="form-item">
        <label class="form-label">账号</label>
        <input
          class="form-input"
          type="text"
          placeholder="手机号"
          v-model="username"
        >
      </div>
      <input
        class="form-input"
        type="passenger"
        placeholder="密码"
        v-model="password"
      >
      <input
        class="form-input"
        type="passenger"
        placeholder="确认密码"
        v-model="confirmPassword"
      >
      <button
        class="info-button"
        @click="info"
      >注册</button>
    </form>
    <p>已有账号？<span @click="goinfo">去登录</span></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    info () {
      if (this.username && this.password && this.confirmPassword) {
        if (this.password === this.confirmPassword) {
          // TODO: 注册
        }
        this.$router.push({ path: '/completeInfo' })
      } else {
        console.log('请输入手机号和密码')
      }
    },
    goinfo () {
      this.$router.push({ path: '/info' })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
#info-container {
  background-color: #fff;
  height: 100%;
  overflow: hidden;
  .navbar {
    width: 100%;
    font-size: px2rem(16);
    .info-title-wrapper {
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
  .info-form {
    width: px2rem(200);
    margin: px2rem(150) auto 0;
    .form-input {
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
    .info-button {
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
      margin-top: px2rem(20);
      cursor: pointer;
    }
  }
  p {
    width: 380px;
    text-align: center;
    font-size: px2rem(14);
    color: #666;
    margin: px2rem(10) auto;
    span {
      color: #346cb9;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
