<template>
  <div id="page-container">
    <keep-alive>
      <transition :name="transitionName">
        <router-view class="child-view"/>
      </transition>
    </keep-alive>
    <router-view></router-view>
    <div class="tabbar">
      <div class="shelf" @click="select('shelf')">
        <div
          class="icon-container"
          v-if="selected === 1"
        >
          <img
            src="../../assets/images/icon/iconkuozhan_shuchengpre.png"
            alt=""
          >
        </div>
        <div
          class="icon-container"
          v-else
        >
          <img
            src="../../assets/images/icon/icon_shuchengnor.png"
            alt=""
          >
        </div>
        <p>书架</p>
      </div>
      <div class="store" @click="select('store')">
        <div
          class="icon-container"
          v-if="selected === 2"
        >
          <img
            src="../../assets/images/icon/iconkuozhan_shujiapre.png"
            alt=""
          >
        </div>
        <div
          class="icon-container"
          v-else
        >
          <img
            src="../../assets/images/icon/icon_shujianor.png"
            alt=""
          >
        </div>
        <p>书城</p>
      </div>
      <div class="mine" @click="select('mine')">
        <div
          class="icon-container"
          v-if="selected === 3"
        >
          <img
            src="../../assets/images/icon/iconkuozhan_wodepre-.png"
            alt=""
          >
        </div>
        <div
          class="icon-container"
          v-else
        >
          <img
            src="../../assets/images/icon/icon_wodenor.png"
            alt=""
          >
        </div>
        <p>我的</p>
      </div>
    </div>
  </div>
</template>

<script>
import { os } from '@/utils/utils'
export default {
  data() {
    return {
      transitionName: '',
      selected: 1
    }
  },
  methods: {
    select (menu) {
      switch (menu) {
        case 'shelf':
          this.selected = 1
          this.$router.push({ path: '/book-store/shelf' })
          break
        case 'store':
          this.selected = 2
          this.$router.push({ path: '/book-store/home' })
          break
        case 'mine':
          this.selected = 3
          this.$router.push({ path: '/mine' })
          break
      }
    }
  },
  computed: {
    os() {
      return os()
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.key) {
        vm.menuIndex = parseInt(to.query.key)
      }
    })
  },
  beforeRouteUpdate(to, from, next) {
    if (to.meta.key > from.meta.key) {
      this.transitionName = 'slide-left'
    } else {
      this.transitionName = 'slide-right'
    }
    next()
  }
}
window.onload = function() {
  document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  })
  document.addEventListener('gesturestart', function(event) {
    event.preventDefault()
  })
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
#page-container {
  position: relative;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: white;
  overflow: hidden;
  .child-view {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    min-width: 200px;
    max-width: 640px;
    transform: translate3d(0, 0, 0);
    opacity: 1;
    &.slide-left-enter, &.slide-right-leave-to {
      transform: translate3d(100%, 0, 0);
      opacity: 0;
    }
    &.slide-left-leave-to, &.slide-right-enter {
      transform: translate3d(-100%, 0, 0);
      opacity: 0;
    }
    &.slide-left-enter-active, &.slide-left-leave-active {
      transition: all .2s linear;
    }
  }
  .tabbar {
    width: 100%;
    height: px2rem(48);
    background-color: #fff;
    border-top: 1px solid #c3c3c3;
    position: fixed;
    z-index: 110;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    div {
      width: px2rem(50);
      height: px2rem(50);
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .icon-container {
        width: px2rem(30);
        height: px2rem(30);
        margin: 0 auto;
        img {
          width: 100%;
        }
      }
      p {
        font-size: px2rem(10);
        color: #666;
      }
    }
  }
}
</style>
