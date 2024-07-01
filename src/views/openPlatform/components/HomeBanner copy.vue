<template>
  <div id="homebanner">
    <div class="banner-box">
      <img src="@/assets/open_banner.jpg" alt="" />
      <ul class="df">
        <li
          class="nav-item"
          :class="{ active: index == isActive }"
          v-for="(barItem, index) in navBar"
          :key="barItem.title"
          @click="handlePath(barItem, index)"
        >
          {{ barItem.title }}
          <div :class="{ frame1: index == isActive }"></div>
          <div :class="{ frame2: index == isActive }"></div>
        </li>
      </ul>
      <div class="search-content">
        <el-input
          v-model="input"
          class="sear-width"
          clearable
          placeholder="请输入搜索内容"
          @keyup.enter.native="goToSearch"
        >
          <el-button slot="append" icon="el-icon-search" type="primary" @click="goToSearch">搜索</el-button>
        </el-input>
      </div>
      <div class="bottom-recueillir">
        <div class="items-info">
          <div class="recueillir-item">
            <p>资源目录</p>
            <p style="color: #60e1e8; font-weight: 500; font-size: 28px; margin-bottom: 0px !important">
              {{ recueillirData.bmCataLogNum || '0' }}个
            </p>
          </div>
          <div class="recueillir-item">
            <p>事项主线目录</p>
            <p style="color: #60e1e8; font-weight: 500; font-size: 28px; margin-bottom: 0px !important">
              {{ recueillirData.serviceNum || '0' }}个
            </p>
          </div>
          <div class="recueillir-item">
            <p>接口</p>
            <p style="color: #60e1e8; font-weight: 500; font-size: 28px; margin-bottom: 0px !important">
              {{ recueillirData.apiNum || '0' }}个
            </p>
          </div>
          <div class="recueillir-item">
            <p>库表</p>
            <p style="color: #60e1e8; font-weight: 500; font-size: 28px; margin-bottom: 0px !important">
              {{ recueillirData.tableNum || '0' }}个
            </p>
          </div>
          <div class="recueillir-item">
            <p>数据共享</p>
            <p style="color: #60e1e8; font-weight: 500; font-size: 28px; margin-bottom: 0px !important">
              {{ recueillirData.shareNum || '0' }}个
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Base64 } from 'js-base64'
import { getindexNum } from '@/api/api'
export default {
  name: 'homeBanner',
  data() {
    return {
      isActive: 0,
      input: '',
      navBar: [
        {
          title: '资源市场',
          path: '/openPlatform/home',
        },
        { title: '后台管理', path: '/Home' },
        { title: '可视化建模' },
      ],
      recueillirData: {},
      username: '',
      resUserName: '',
    }
  },
  activated() {
    this.isActive = 0
    this.fetchIndexNum()
  },
  methods: {
    goToSearch() {
      this.$router.push({
        path: '/openPlatform/search',
        query: { search: this.input },
      })
    },
    onUserName() {
      let userName = this.userInfo().username
      let resUserName = Base64.encode(userName)
      return resUserName
    },
    ...mapGetters(['nickname', 'avatar', 'userInfo']),
    handlePath(data, index) {
      this.isActive = index
      if (index === 2) {
        window.open(`http://59.208.164.227:60010/logging?userName=${this.onUserName()}&path=modelFactory`, '_blank')
      } else {
        window.location.href = data.path
      }
    },
    fetchIndexNum() {
      getindexNum().then((res) => {
        if (res.success) {
          this.recueillirData = res.body
          this.recueillirData.bmCataLogNum = this.formatNumber(this.recueillirData.bmCataLogNum)
          this.recueillirData.serviceNum = this.formatNumber(this.recueillirData.serviceNum)
          this.recueillirData.apiNum = this.formatNumber(this.recueillirData.apiNum)
          this.recueillirData.tableNum = this.formatNumber(this.recueillirData.tableNum)
          this.recueillirData.shareNum = this.formatNumber(this.recueillirData.shareNum)
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
#homebanner {
  .banner-box {
    position: relative;
    height: 460px;
    img {
      width: 100%;
      height: 460px;
    }
    .df {
      display: flex;
      padding: 0;
      margin: 0;
      position: absolute;
      top: 40px;
      left: 40px;
      cursor: pointer;
      .nav-item {
        position: relative;
        width: 104px;
        height: 44px;
        text-align: center;
        line-height: 44px;
        list-style: none;
        margin-right: 24px;
        color: rgba(255, 255, 255, 0.5);
        .frame1 {
          position: absolute;
          top: -8px;
          left: -15px;
          width: 40px;
          height: 32px;
          border-left: 2px solid #60e1e8;
          border-top: 2px solid #60e1e8;
        }
        .frame2 {
          position: absolute;
          bottom: -8px;
          right: -15px;
          width: 40px;
          height: 32px;
          border-right: 2px solid #60e1e8;
          border-bottom: 2px solid #60e1e8;
        }
      }
    }
    .search-content {
      //   display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .sear-width {
        width: 664px;
      }
      /deep/.el-input__inner {
        background: rgba(255, 255, 255, 0.3);
        border: none;
        color: #fff;
      }
      /deep/.el-input-group__append {
        border: none;
        color: #ffff;
        background: #1890ff;
      }
    }
    .bottom-recueillir {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 112px;
      background: rgba(255, 255, 255, 0.3);
      .items-info {
        width: 800px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
      }
      .recueillir-item {
        // width: 200px;
        color: #fff;
        text-align: center;
      }
    }
  }
  .active {
    color: #60e1e8 !important;
    background: rgba(255, 255, 255, 0.4);
  }
}
</style>