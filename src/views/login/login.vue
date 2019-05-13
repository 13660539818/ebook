<template>
  <div id="login-container">
    <div class="navbar">
      <span class="title-text">登录</span>
    </div>
    <form class="login-form">
      <input
        class="login-form-item"
        type="text"
        placeholder="手机号"
        v-model="username"
      >
      <input
        class="login-form-item"
        type="passenger"
        placeholder="密码"
        v-model="password"
      >
      <button
        class="login-button"
        @click="login"
      >登录</button>
    </form>
    <p>还没有账号？<span @click="goRegister">去注册</span></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.username && this.password) {
        sessionStorage.setItem('username', this.username)
        this.$router.push({ path: '/book-store/shelf' })
      } else {
        console.log('请输入手机号和密码')
      }
    },
    goRegister () {
      this.$router.push({ path: '/register' })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
#login-container {
  background-color: #fff;
  height: 100%;
  overflow: hidden;
  .navbar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 110;
    width: 100%;
    height: px2rem(42);
    @include columnCenter;
    .icon {
      position: absolute;
      left: px2rem(10);
    }
    .icon-back::before {
      font-size: px2rem(30);
    }
    .title-text {
      font-size: px2rem(16);
      line-height: px2rem(20);
      font-weight: bold;
      color: #333;
    }
  }
  .login-form {
    width: px2rem(200);
    margin: px2rem(200) auto 0;
    .login-form-item {
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
    .login-button {
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
