<template>
  <div id="homeBanner">
    <div class="banner-content">
      <!-- 轮播图 -->
      <!-- <el-carousel indicator-position="outside" style="height: 458px">
        <el-carousel-item v-for="imgs in slideshowList" :key="imgs.id" style="height: 458px">
          <img :src="imgs.img" alt="" />
        </el-carousel-item>
      </el-carousel> -->
      <el-carousel v-if="slideshowList.length !== 0" style="height: 458px">
        <el-carousel-item v-for="imgs in slideshowList" :key="imgs.id" style="height: 458px">
          <img :src="serverAddres + imgs.url" alt="" />
        </el-carousel-item>
      </el-carousel>
      <el-carousel v-else style="height: 458px">
        <el-carousel-item style="height: 458px">
          <img :src="bannerImgs" alt="" />
        </el-carousel-item>
      </el-carousel>
      <!-- <img src="@/assets/open_banner.jpg" alt="" /> -->
      <!-- <div class="nav-content">
        <div
          style="padding: 12px"
          @click="handlePath('1')"
          :class="{ active:  isActive== '1' }"
        >
         资源市场
        </div>
        <div
        v-login
          style="padding: 12px"
          @click="handlePath('2')"
          :class="{ active:  isActive== '2' }"
        >
         后台管理
        </div>
        <div
        v-login
          style="padding: 12px"
          @click="handlePath('3')"
          :class="{ active:  isActive== '3' }"
        >
         可视化建模
        </div>
      </div> -->
      <div class="search">
        <el-input
          v-model="search"
          class="sear-width"
          clearable
          placeholder="请输入搜索内容"
          @keyup.enter.native="goToSearch"
        >
          <el-button slot="append" icon="el-icon-search" type="primary" @click="goToSearch">全站搜索</el-button>
        </el-input>
      </div>
      <div class="matter-details">
        <div class="matter-content">
          <div style="padding-bottom: 4px">资源目录</div>
          <div>{{ recueillirData.bmCataLogNum || '0' }}个</div>
        </div>
        <div class="matter-content">
          <div style="padding-bottom: 4px">事项主线目录</div>
          <div>{{ recueillirData.serviceNum || '0' }}个</div>
        </div>
        <div class="matter-content">
          <div style="padding-bottom: 4px">接口服务</div>
          <div>{{ recueillirData.apiNum || '0' }}个</div>
        </div>
        <div class="matter-content">
          <div style="padding-bottom: 4px">库表服务</div>
          <div>{{ recueillirData.tableNum || '0' }}个</div>
        </div>
        <div class="matter-content">
          <div style="padding-bottom: 4px">数据总量</div>
          <div>{{ recueillirData.dataAllNum || '0' }}条</div>
        </div>
        <div class="matter-content">
          <div style="padding-bottom: 4px">数据交换总量</div>
          <div>{{ recueillirData.dataExchangeAllNum || '0' }}条</div>
        </div>
        <div class="matter-content">
          <div style="padding-bottom: 4px">服务调用</div>
          <div>{{ recueillirData.serviceCallNum || '0' }}次</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Base64 } from 'js-base64'
import { getindexNum, getPictures } from '@/api/api'
import bannerImg from '@/assets/open_banner.jpg'
export default {
  name: 'homeBanner',
  data() {
    return {
      bannerImgs: bannerImg,
      serverAddres: 'http://59.208.164.242:60033/dtwave-om',
      recueillirData: {},
      slideshowList: [],
      isActive: 0,
      navList: [
        { id: 0, title: '资源市场', path: '/openPlatform/home' },
        { id: 1, title: '后台管理', path: '/Home' },
        { id: 2, title: '可视化建模' },
      ],
      search: '',
    }
  },
  activated() {
    this.isActive = 1
    this.fetchIndexNum()
    this.fetchPictures()
     },
  methods: {
    tranNumber(num, point) {
      // 将数字转换为字符串,然后通过split方法用.分隔,取到第0个
      let numStr = num.toString().split(',')[0]
      if (numStr.length < 5) {
        // 判断数字有多长,如果小于5,,表示1万以内的数字,让其直接显示
        return numStr
      } else if (numStr.length >= 5 && numStr.length <= 8) {
        // 如果数字大于5位,小于8位,让其数字后面加单位万
        let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
        // 由千位,百位组成的一个数字
        return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
      } else if (numStr.length > 8) {
        // 如果数字大于8位,让其数字后面加单位亿
        let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
      }
    },
    fetchPictures() {
      getPictures().then((res) => {
        if (res.success) {
          this.slideshowList = res.result
        }
      })
    },
    fetchIndexNum() {
      getindexNum().then((res) => {
        if (res.success) {
          this.recueillirData = res.body
          this.recueillirData.bmCataLogNum = this.tranNumber(this.recueillirData.bmCataLogNum, 2)
          this.recueillirData.serviceNum = this.tranNumber(this.recueillirData.serviceNum, 2)
          this.recueillirData.apiNum = this.tranNumber(this.recueillirData.apiNum, 2)
          this.recueillirData.tableNum = this.tranNumber(this.recueillirData.tableNum, 2)
          this.recueillirData.dataAllNum = this.tranNumber(this.recueillirData.dataAllNum, 2)
          this.recueillirData.dataExchangeAllNum = this.tranNumber(this.recueillirData.dataExchangeAllNum, 2)
          this.recueillirData.serviceCallNum = this.tranNumber(this.recueillirData.serviceCallNum, 2)
        }
      })
    },
    goToSearch() {
      this.$router.push({
        path: '/openPlatform/search',
        query: { search: this.search },
      })
    },
    ...mapGetters(['nickname', 'avatar', 'userInfo']),
    onUserName() {
      let userName = this.userInfo().username
      let resUserName = Base64.encode(userName)
      return resUserName
    },
    handlePath(type){
      this.isActive = type
      switch(type){
        case '1':
        window.location.href = '/openPlatform/home'
        break;
        case '2':
        window.location.href = '/Home'
        break;
        case '3':
        window.open(`http://59.208.164.227:60010/logging?userName=${this.onUserName()}&path=modelFactory`, '_blank')
        break;
      }
    }
    // handlePath(data, index) {
    //   this.isActive = index
    //   if (index === 2) {
    //     window.open(`http://59.208.164.227:60010/logging?userName=${this.onUserName()}&path=modelFactory`, '_blank')
    //   } else {
    //     window.location.href = data.path
    //   }
    // },
  },
}
</script>

<style lang="less" scoped>
#homeBanner {
  .banner-content {
    position: relative;
    .nav-content {
      z-index: 999;
      position: absolute;
      top: 24px;
      left: 24px;
      display: flex;
      color: #fff;
      border-bottom: 2px solid #1890ff;
      // padding: 12px;
      cursor: pointer;
      div:nth-child(2) {
        padding: 0 24px;
      }
    }
    .search {
      position: absolute;
      left: 50%;
      top: 84%;
      transform: translate(-50%, -50%);
      z-index: 999;
      .sear-width {
        width: 664px;
      }
      /deep/.el-input__inner {
        // background: rgba(255, 255, 255, 0.3);
        border: none;
      }
      /deep/.el-input-group__append {
        border: 1px solid #1890ff;
        color: #ffff;
        background: #1890ff;
      }
    }
    .matter-details {
      z-index: 999;
      position: absolute;
      bottom: -32px;
      left: 50%;
      transform: translateX(-50%);
      // height: 77px;
      text-align: center;
      padding: 4px 46px;
      color: #ffff;
      display: flex;
      width: 1200px;
      background: #1890ff;
      border-radius: 10px;
      justify-content: space-between;
      .matter-content {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
.active {
  background: rgba(24, 144, 255, 0.7);
  // background-image: linear-gradient(120deg, #89f7fe 0%, #1890FF 50%);
}
img {
  width: 100%;
  height: 458px;
}
/deep/ .el-carousel__indicators {
  // 指示灯位置
  z-index: 99999;
  // left: unset;
  // transform: unset;
  // // right: 47%;
  bottom: 20px;
}
/deep/ .el-carousel__button {
  // 默认按钮的颜色大小等
  width: 36px;
  height: 8px;
  border-radius: 20px;
}
/deep/ .is-active .el-carousel__button {
  // 选中图片的颜色
  background: #418ff7;
  opacity: 1;
}
</style>