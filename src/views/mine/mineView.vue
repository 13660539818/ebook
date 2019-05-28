<template>
  <div class="mine">
    <div class="mine-title-wrapper">
    <div class="title-right-wrapper" @click="logout">退出</div>
    <div class="title-text">我的</div>
    </div>
    <div class="mine-content">
      <div class="avatar" :style="`background: url(${userInfo.avatar}) no-repeat center; background-size: cover;`" v-if="userInfo.avatar">
      </div>
      <div class="avatar" style="background-color: #ccc" v-else>
      </div>
      <button class="edit-button" @click="editInfo">修改个人资料</button>
      <div class="base-info">账号：<span>{{userInfo.username}}</span></div>
      <div class="base-info">昵称：<span>{{userInfo.nickname}}</span></div>
      <div class="base-info">性别：<span>{{userInfo.sex}}</span></div>
      <div class="base-info">出生日期：<span>{{userInfo.birth}}</span></div>
      <div class="base-info intro">
        <div class="">个人简介:
        </div>
        <div class="content">{{userInfo.intro}}</div>
      </div>
    </div>
    <toast :text="toastText" ref="toast"></toast>
  </div>
</template>

<script>
import { userInfo, saveBookShelf } from '@/api/book'
import toast from '@/components/shelf/toast'
import moment from 'moment'
import { getLocalStorage, removeLocalStorage } from '@/utils/localStorage'
export default {
  components: { toast },
  data () {
    return {
      userInfo: {
        avatar: '',
        username: '',
        nickname: '',
        sex: '',
        birth: '',
        intro: ''
      },
      toastText: ''
    }
  },
  methods: {
    getUserInfo () {
      const id = JSON.parse(sessionStorage.getItem('userInfo')).id
      userInfo(id).then(res => {
        console.log(res)
        if (res.data.error_code === 0) {
          this.userInfo = res.data.data
          if (res.data.data.avatar) {
            this.userInfo.avatar = process.env.VUE_APP_BASE_URL + this.userInfo.avatar
          }
          if (res.data.data.birth) {
            if (moment(this.userInfo.birth).format('YYYY-MM-DD') === 'Invalid date') {
              this.userInfo.birth = ''
              return
            }
            this.userInfo.birth = moment(this.userInfo.birth).format('YYYY-MM-DD')
          }
        }
      })
    },
    editInfo () {
      const username = JSON.parse(sessionStorage.getItem('userInfo')).account
      this.$router.push({ path: `/completeInfo/${username}` })
    },
    logout () {
      const userid = JSON.parse(sessionStorage.getItem('userInfo')).id
      let bookshelf = []
      getLocalStorage('bookShelf').forEach((item, index) => {
        if (item.bookId) {
          bookshelf.push(item)
        }
      })
      const bookShelf = JSON.stringify(bookshelf)
      const params = {
        userid,
        bookShelf,
        readingBook: ''
      }
      saveBookShelf(params).then(res => {
        console.log(res)
      })
      this.$router.push({ path: '/login' })
      sessionStorage.removeItem('userInfo')
      removeLocalStorage('bookShelf')
      this.showToast('退出成功')
    },
    showToast(text) {
      this.toastText = text
      this.$refs.toast.show()
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.mine {
  width: 100%;
  font-size: px2rem(16);
  .mine-title-wrapper {
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
  .mine-content {
    // width: 100%;
    margin: 0 px2rem(20);
    .edit-button {
      width: px2rem(100);
      height: px2rem(30);
      background-color: #ccc;
      color: #fff;
      text-align: center;
      border: none;
      border-radius: px2rem(20);
      text-decoration: none;
      display: block;
      font-size: px2rem(14);
      margin: auto;
      cursor: pointer;
    }
    .avatar {
      width: px2rem(80);
      height: px2rem(80);
      margin: px2rem(10) auto;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .base-info {
      // background-color: #0ff;
      width: 100%;
      height: px2rem(48);
      border-bottom: 1px solid #c3c3c3;
      line-height: px2rem(48);
      span {
        float: right;
      }
    }
    .intro {
      height: px2rem(96);
      position: relative;
      .content {
        position: absolute;
        top: px2rem(12);
        left: px2rem(80);
        line-height: px2rem(26);
      }
    }
  }
}
</style>
