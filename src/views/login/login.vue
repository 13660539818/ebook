<template>
  <div id="login-container">
    <div class="navbar">
      <!-- <span class="icon icon-back" @click="back"></span> -->
      <span class="title-text">登录</span>
    </div>
    <form class="login-form">
      <input
        class="login-form-item"
        type="text"
        placeholder="账号"
        v-model="username"
      >
      <input
        class="login-form-item"
        type="passenger"
        placeholder="密码"
        v-model="password"
      >
      <button class="login-button" @click="login">登录</button>
    </form>
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
    back() {
      this.$router.go(-1)
    },
    login () {
      if (this.username && this.password) {
        sessionStorage.setItem('username', this.username)
        this.$router.push({ path: '/book-store/shelf' })
      }
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
    margin: px2rem(200) auto;
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
}
</style>
