<template>
  <div id="homehotlist">
    <el-tabs class="tabs-content" type="card" :tab-position="tabPosition">
      <el-tab-pane>
        <span slot="label"><img class="img" src="@/assets/homeEye.png" alt="" />热门浏览</span>
        <div class="tabs-ttiel-df">
          <span class="br-bt">热门浏览</span>
          <span class="cor" @click="moreCatalogData('viewNum')">查看更多</span>
        </div>
        <div style="margin-top: 14px">
          <div class="tabs-info" v-for="items in HomeHotBrowseList" :key="items.catalogId">
            <div class="info-title">
              <img class="img" src="@/assets/homePic.png" />
              <div class="title" @click="handleCataDet(items)">{{ items.catalogName || '-' }}</div>
            </div>
            <div class="info-items">
              <el-tooltip :disabled="showTooltip" :content="items.sourceUnit" placement="top">
                <div ref="tooltipBox" class="items-det">
                  提供部门：
                  <span ref="tooltipItem" class="hidden-box"> {{ items.sourceUnit || '-' }}</span>
                </div>
              </el-tooltip>
              <div class="items-det">数据领域：{{ items.keyAreasType || '-' }}</div>
              <div class="items-det">浏览量：{{ items.browseQuantity || '-' }}次</div>
              <div class="items-det">数据量：{{ items.dataNum || '0' }}条</div>
              <div class="items-det">更新日期：{{ items.updateTime || '-' }}</div>
            </div>
          </div>
        </div>
        <div class="nodate1" v-show="HomeHotBrowseList.length <= 0">暂无数据</div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><img class="img" src="@/assets/newData.png" alt="" />最新数据</span>
        <div class="tabs-ttiel-df">
          <span class="br-bt">最新数据</span>
          <span class="cor" @click="moreCatalogData('updateTime', '1')">查看更多</span>
        </div>
        <div style="margin-top: 14px">
          <div class="tabs-info" v-for="items in HomeLatestData" :key="items.catalogId">
            <div class="info-title">
              <img class="img" src="@/assets/homePic.png" />
              <div class="title" @click="handleCataDet(items)">{{ items.catalogName || '-' }}</div>
            </div>
            <div class="info-items">
              <el-tooltip :disabled="showTooltip" :content="items.sourceUnit" placement="top">
                <div ref="tooltipBox" class="items-det">
                  提供部门：
                  <span ref="tooltipItem" class="hidden-box"> {{ items.sourceUnit || '-' }}</span>
                </div>
              </el-tooltip>
              <div class="items-det">数据领域：{{ items.keyAreasType || '-' }}</div>
              <div class="items-det">访问量：{{ items.browseQuantity || '-' }}次</div>
              <div class="items-det">数据量：{{ items.dataNum || '0' }}条</div>
              <div class="items-det">更新日期：{{ items.updateTime || '-' }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane>
        <span slot="label"><img class="img" src="@/assets/hotapply.png" alt="" />热门申请</span>
        <div class="tabs-ttiel-df">
          <span class="br-bt">热门申请</span>
          <span class="cor" @click="moreCatalogData('notionalPoolingNum')">查看更多</span>
        </div>
        <div style="margin-top: 14px">
          <div class="tabs-info" v-for="items in HomeHotApplyData" :key="items.catalogId">
            <div class="info-title">
              <img class="img" src="@/assets/homePic.png" />
              <div class="title" @click="handleCataDet(items)">{{ items.catalogName || '-' }}</div>
            </div>
            <div class="info-items">
              <el-tooltip :disabled="showTooltip" :content="items.sourceUnit" placement="top">
                <div ref="tooltipBox" class="items-det">
                  提供部门：
                  <span ref="tooltipItem" class="hidden-box"> {{ items.sourceUnit || '-' }}</span>
                </div>
              </el-tooltip>
              <div class="items-det">数据领域：{{ items.keyAreasType || '-' }}</div>
              <div class="items-det">申请量：{{ items.browseQuantity || '-' }}次</div>
              <div class="items-det">数据量：{{ items.dataNum || '0' }}条</div>
              <div class="items-det">更新日期：{{ items.updateTime || '-' }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getHomeHotBrowse, getHomeLatestData, getHomeHotApply,getDataUseInfo } from '@/api/api'
export default {
  name: 'homehotlist',
  data() {
    return {
      tabPosition: 'left',
      showTooltip: false,
      HomeHotBrowseList: [],
      HomeLatestData: [],
      HomeHotApplyData: [],
      catalogId:'',
    }
  },
  created() {
    this.fetchHomeHotBrowse()
    this.fetchHomeLatestData()
    this.fetchHomeHotApply()
  },
  watch: {
    HomeHotBrowseList: {
      handler() {
        this.$nextTick(() => this.checkWidth())
      },
      immediate: true,
    },
  },
  methods: {
    checkWidth() {
      let boxWidth = this.$refs.tooltipBox
      if (!boxWidth) return
      // } else {
      //   // boxWidth.forEach((v) => (boxWidth = v.offsetWidth))
      //   boxWidth.forEach((v) => console.log(v.offsetWidth, '----'))
      // }
      let itemWidth = this.$refs.tooltipItem
      if (!itemWidth) return
      // itemWidth.forEach((v) => ( v.offsetWidth))
      this.showTooltip = boxWidth > itemWidth
      console.log(this.showTooltip,'--------')
    },
    handleCataDet(row) {
      localStorage.setItem('catalogName', row.catalogName)
      this.catalogId = row.catalogId
      this.fetchDataUseInfo()
      this.$router.push({
        path: '/catalogue/datacatalogue/details',
        query: {
          id: row.catalogId,
          interfaceIsMount: row.interfaceIsMount,
          tableIsMount: row.tableIsMount,
          isHide: row.isHide,
          dataFormat: row.dataFormat,
        },
      })
    },
    fetchDataUseInfo(){
      getDataUseInfo(this.catalogId).then((res) => {
        if (res.success) {
          this.$bus.$emit('onExatableData', res.body)
        }
      })
    },
    // 热门申请
    fetchHomeHotApply() {
      getHomeHotApply().then((res) => {
        if (res.success) {
          this.HomeHotApplyData = res.body
          this.timeTransition(this.HomeHotApplyData)
        }
      })
    },
    // 最新数据
    fetchHomeLatestData() {
      getHomeLatestData().then((res) => {
        if (res.success) {
          this.HomeLatestData = res.body
          this.timeTransition(this.HomeLatestData)
        }
      })
    },
    fetchHomeHotBrowse() {
      getHomeHotBrowse().then((res) => {
        if (res.success) {
          this.HomeHotBrowseList = res.body
          this.timeTransition(this.HomeHotBrowseList)
        }
      })
    },
    moreCatalogData(type, num) {
      this.$router.push({
        path: '/catalogue/datacatalogue',
        query: {
          type,
          num,
        },
      })
      // window.location.href = '/catalogue/datacatalogue'
    },
    timeTransition(timeArr) {
      timeArr.forEach((v) => {
        v.updateTime = this.formatTime(v.updateTime, 'hms')
      })
    },
  },
}
</script>

<style lang="less" scoped>
#homehotlist {
  width: 1200px;
  margin: 54px auto 0 auto;
  .tabs-content {
    background: #fff;
    .img {
      // width: 20px;
      height: 14px;
      margin-right: 20px;
      vertical-align: middle;
    }
    .tabs-ttiel-df {
      display: flex;
      justify-content: space-between;
      color: black;
      border-bottom: 1px solid #d8d8d8;
    }
    .tabs-info {
      border-bottom: 1px solid #d8d8d8;
      margin-bottom: 14px;
      .info-title {
        display: flex;
        align-items: center;
        padding-left: 4px;
        .title {
          color: #1890ff;
          cursor: pointer;
        }
      }
      .info-items {
        display: flex;
        // justify-content: space-between;
        padding: 12px 34px 7px 34px;
        .items-det {
          display: flex;
          width: 200px;
          .hidden-box {
            display: inline-block;
            width: 100px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .br-bt {
      border-bottom: 2px solid #1890ff;
      background: #f5f4f4;
      padding-right: 30px;
    }
    .cor {
      color: #69abf8;
      font-size: 12px;
      cursor: pointer;
    }
  }
}
/**
element ui 左侧tabs样式
 */
/deep/.el-tabs__item.is-active {
  // color: orange;
  background: #e0eaff;
}
/deep/.el-tabs__nav {
  background: rgba(250, 248, 248, 0.5);
  border: none !important;
}
/deep/.el-tabs--left.el-tabs--card .el-tabs__item.is-left {
  border: none;
  border-bottom: 1px solid rgb(237, 241, 252);
}
/deep/.el-tabs__nav-scroll {
  border-radius: 10px;
}
/deep/.el-tabs--card > .el-tabs__header {
  border-bottom: none;
}
/deep/.el-tab-pane {
  margin-left: 12px;
}
</style>
