<template>
  <div class="mine">
    <div class="mine-title-wrapper">
    <div class="title-right-wrapper">退出</div>
    <div class="title-text">我的</div>
    </div>
    <div class="mine-content">
      <div class="avatar">
        <img src="" alt="">
      </div>
      <div class="base-info">账号：<span>{{username}}</span></div>
      <div class="base-info">昵称：<span>{{nickname}}</span></div>
      <div class="base-info">性别：<span>{{sex}}</span></div>
      <!-- <div class="base-info">个人简介:{{personalProfile}}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      avatar: '',
      username: 'ebook001',
      nickname: '叉烧',
      sex: '女'
    }
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
    .avatar {
      background-color: #ff0;
      width: px2rem(80);
      height: px2rem(80);
      margin: px2rem(10) auto px2rem(30);
      border-radius: 50%;
      .img {
        width: 100%;
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
  }
}
</style>
