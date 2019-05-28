<template>
  <div id="login-container">
    <div class="navbar">
      <span class="title-text">登录</span>
    </div>
    <form class="login-form">
      <input
        autocomplete="off"
        class="login-form-item"
        type="text"
        placeholder="手机号"
        v-model="username"
      >
      <input
        autocomplete="off"
        class="login-form-item"
        type="password"
        placeholder="密码"
        v-model="password"
      >
    </form>
     <button
        class="login-button"
        @click="login"
      >登录</button>
    <p>还没有账号？<span @click="goRegister">去注册</span></p>
    <toast :text="toastText" ref="toast"></toast>
  </div>
</template>

<script>
import { login } from '@/api/book'
import { mapActions } from 'vuex'
import toast from '@/components/shelf/toast'
export default {
  components: { toast },
  data () {
    return {
      username: '',
      password: '',
      toastText: ''
    }
  },
  methods: {
    ...mapActions([
      'setTabbarSelected'
    ]),
    login () {
      if (this.username && this.password) {
        const params = {
          account: this.username,
          password: this.password
        }
        login(params).then(res => {
          if (res.data.error_code === 0) {
            sessionStorage.setItem('userInfo', JSON.stringify(res.data.data))
            this.showToast(res.data.msg)
            this.setTabbarSelected(1)
            this.$router.push({ path: '/book-store/shelf' })
          } else {
            this.showToast(res.data.msg)
          }
        })
      } else {
        this.showToast('请输入账号和密码')
      }
    },
    goRegister () {
      this.$router.push({ path: '/register' })
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
