<template>
  <div id="homeHeader">
    <ul class="df">
      <li
        class="nav-item"
        :class="{ active: index == isActive }"
        v-for="(barItem, index) in navBar"
        :key="barItem.title"
        @click="handlePath(barItem, index)"
      >
        {{ barItem.title }}
        <!-- <div :class="{ frame1: index == isActive }"></div>
        <div :class="{ frame2: index == isActive }"></div> -->
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Base64 } from 'js-base64'
export default {
  name: 'homeHeader',
  data() {
    return {
      isActive: 0,
      navBar: [
        {
          title: '资源市场',
          path: '/openPlatform/home',
        },
        { title: '后台管理', path: '/Home' },
        { title: '可视化建模' },
      ],
    }
  },
  methods: {
    onUserName() {
      let userName = this.userInfo().username
      let resUserName = Base64.encode(userName)
      return resUserName
    },
    ...mapGetters(['userInfo']),
    handlePath(data, index) {
      this.isActive = index
      if (index === 2) {
        window.open(`http://59.208.164.227:60010/logging?userName=${this.onUserName()}&path=modelFactory`, '_blank')
      } else {
        window.location.href = data.path
      }
    },
  },
  created() {
    this.isActive = 1
  },
}
</script>

<style lang="less" scoped>
#homeHeader {
  .df {
    display: flex;
    padding: 0;
    margin: 0;
    cursor: pointer;
    .nav-item {
      position: relative;
      width: 104px;
      height: 44px;
      text-align: center;
      line-height: 44px;
      list-style: none;
      margin-right: 24px;
      color: rgba(24, 144, 255, 0.5);
      .frame1 {
        position: absolute;
        top: -8px;
        left: -8px;
        width: 40px;
        height: 32px;
        border-left: 2px solid #1890ff;
        border-top: 2px solid #1890ff;
      }
      .frame2 {
        position: absolute;
        bottom: -8px;
        right: -8px;
        width: 40px;
        height: 32px;
        border-right: 2px solid #1890ff;
        border-bottom: 2px solid #1890ff;
      }
    }
  }
  .active {
    background: #1890ff;
    color: #ffffff !important;
  }
}
</style>