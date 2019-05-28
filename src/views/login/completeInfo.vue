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
        <div class="title-text">个人信息</div>
      </div>
    </div>
    <form class="info-form">
      <div class="form-item avatar">
        <label class="form-label">头像</label>
        <div class="logo">
          <img :src="avatarUrl" alt="">
          <p v-if="!avatarUrl">上传头像</p>
        </div>
        <div class="upload">
            <input class="form-input form-avatar" style="opacity: 0;" type="file" accept=".png,.jpg,.jpeg,.gif" @change="avatarUpload" ref="upload">
        </div>
      </div>
      <div class="form-item">
        <label class="form-label">昵称</label>
        <input
          class="form-input form-nickname"
          type="text"
          placeholder="请输入昵称"
          v-model="form.nickname"
        >
      </div>
      <div class="form-item">
        <label class="form-label">性别</label>
          <div class="form-input">
            <input type="radio" name="sex" value="男" v-model="form.sex">男
            <input type="radio" name="sex" value="女" v-model="form.sex">女
          </div>
      </div>
      <div class="form-item">
        <label class="form-label">出生日期</label>
        <input type="date" class="form-input form-birth" value="2019-01-01" v-model="form.birth">
      </div>
      <div class="form-item">
        <label class="form-label">个人简介</label>
        <textarea cols="25" rows="5" placeholder="个人简介" class="form-input form-intro" v-model="form.intro">
        </textarea>
      </div>
    </form>
    <button
        class="info-button"
        @click="saveInfo"
      >保存</button>
      <toast :text="toastText" ref="toast"></toast>
  </div>
</template>

<script>
import { completeInfo, upload, userInfo } from '@/api/book'
import toast from '@/components/shelf/toast'
import moment from 'moment'
export default {
  components: { toast },
  data () {
    return {
      form: {
        username: '',
        nickname: '',
        sex: '',
        birth: '',
        intro: '',
        avatar: ''
      },
      avatarUrl: '',
      toastText: ''
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    saveInfo () {
      this.form.username = this.$route.params.id
      console.log(this.form)
      completeInfo(this.form).then(res => {
        this.showToast(res.data.msg)
        if (res.data.error_code === 0) {
          if (sessionStorage.getItem('userInfo')) {
            this.$router.push({ path: '/mine' })
          } else {
            this.$router.push({ path: '/login' })
          }
        }
      })
    },
    avatarUpload (e) {
      let params = new FormData()
      params.append('file', this.$refs['upload'].files[0])
      upload(params).then(res => {
        const avatarUrl = res.data.msg.path.substr(6).replace(/\\/g, '/')
        this.avatarUrl = process.env.VUE_APP_BASE_URL + avatarUrl
        this.form.avatar = avatarUrl
      })
    },
    showToast(text) {
      this.toastText = text
      this.$refs.toast.show()
    },
    getUserInfo () {
      const id = JSON.parse(sessionStorage.getItem('userInfo')).id
      userInfo(id).then(res => {
        console.log(res)
        if (res.data.error_code === 0) {
          this.form = res.data.data
          if (res.data.data.avatar) {
            this.avatarUrl = process.env.VUE_APP_BASE_URL + this.form.avatar
          }
          if (res.data.data.birth) {
            if (moment(this.form.birth).format('YYYY-MM-DD') === 'Invalid date') {
              this.form.birth = ''
              return
            }
            this.form.birth = moment(this.form.birth).format('YYYY-MM-DD')
          }
        }
      })
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
#info-container {
  background-color: #fff;
  height: 100%;
  overflow: hidden;
  position: relative;
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
    width: 100%;
    font-size: px2rem(18);
    margin: px2rem(10);
    .form-item {
      width: 100%;
      height: px2rem(48);
      line-height: px2rem(48);
      position: relative;
      .form-input {
        position: absolute;
        left: px2rem(100);
        top: 50%;
        transform: translateY(-50%);
        background: none;
        outline: none;
        border: 0px;
        font-size: px2rem(18)
      }
      .form-intro {
        border: 1px solid #ccc;
        border-radius: px2rem(4);
        transform: translateY(-10%);
      }
      .form-birth {
        border: 1px solid #ccc;
        border-radius: px2rem(4);
      }
      .form-nickname {
        border-bottom: 1px solid #ccc;
        padding: px2rem(10) 0;
      }
    }
    .avatar {
      height: px2rem(96);
      line-height: px2rem(96);
      margin-top: px2rem(20);
      position: relative;
      .logo {
        background-color: #eee;
        width: px2rem(80);
        height: px2rem(80);
        position: absolute;
        top: 0;
        left: px2rem(100);
        img {
          width: 100%;
          height: 100%;
        }
        p {
          width: px2rem(80);
          height: px2rem(80);
          line-height: px2rem(80);
          position: absolute;
          top: 0;
          text-align: center;
          color: #666
        }
        .upload {
          width: 80px;
          height: 18px;
          line-height: 18px;
          background: #2fc7c9;
          text-align: center;
          color: #FFF;
          padding: 0px 5px;-webkit-border-radius: 2px;
          border-radius: 2px;
        }
      }
    }
  }
  .info-button {
    width: px2rem(200);
    height: px2rem(40);
    position: absolute;
    bottom: px2rem(48);
    left: 50%;
    transform: translateX(-50%);
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
</style>
