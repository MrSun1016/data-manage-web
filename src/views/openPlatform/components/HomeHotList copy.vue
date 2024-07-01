<template>
  <div id="homehotlist">
    <ul class="list-box">
      <li class="list-title">
        <div class="img-title-box"><img class="icon-img" src="../../../assets/Frame-4.png" alt="" />最新数据</div>
        <div @click="gotocatalog('updateTime','1')">更多<i class="el-icon-d-arrow-right"></i></div>
      </li>
      <li
        class="list-items"
        :class="{ active: index == isActive }"
        @mouseover="Mouseover(index, '1')"
        @mouseleave="Mouseleave('1')"
        v-for="(todos, index) in newData"
        :key="todos.applyId"
      >
        <div style="display: flex; align-items: center" @click="handleCataDet(todos)">
          <div class="dot"></div>
          {{ todos.catalogName }}
        </div>
        <div>{{ todos.createdTime }}</div>
      </li>
      <div class="no-data" v-show="newData.length <= 0">暂无数据</div>
    </ul>
    <ul class="list-box">
      <li class="list-title">
        <div class="img-title-box"><img class="icon-img" src="../../../assets/Frame-3.png" alt="" />热门申请</div>
        <div @click="gotocatalog('notionalPoolingNum')">更多<i class="el-icon-d-arrow-right"></i></div>
      </li>
      <li
        class="list-items"
        :class="{ active: index == isActive2 }"
        @mouseover="Mouseover(index, '2')"
        @mouseleave="Mouseleave('2')"
        v-for="(todos, index) in hotApplyData"
        :key="todos.applyId"
      >
        <div style="display: flex; align-items: center" @click="handleCataDet(todos)">
          <div class="dot"></div>
          {{ todos.catalogName }}
        </div>
        <div>{{ todos.applyQuantity }}/次</div>
      </li>
      <div class="no-data" v-show="hotApplyData.length <= 0">暂无数据</div>
    </ul>
    <ul class="list-box">
      <li class="list-title">
        <div class="img-title-box"><img class="icon-img" src="../../../assets/Frame-5.png" alt="" />更多浏览</div>
        <div @click="gotocatalog('viewNum')">更多<i class="el-icon-d-arrow-right"></i></div>
      </li>
      <li
        class="list-items"
        :class="{ active: index == isActive3 }"
        @mouseover="Mouseover(index, '3')"
        @mouseleave="Mouseleave('3')"
        v-for="(todos, index) in moreBrowseData"
        :key="todos.applyId"
      >
        <div style="display: flex; align-items: center" @click="handleCataDet(todos)">
          <div class="dot"></div>
          {{ todos.catalogName }}
        </div>
        <div>{{ todos.browseQuantity }}/次</div>
      </li>

      <div class="no-data" v-show="moreBrowseData.length <= 0">暂无数据</div>
    </ul>
  </div>
</template>

<script>
import { getLatestData, getHotApply, getHotBrowse } from '@/api/api'
export default {
  name: 'homehotlist',
  data() {
    return {
      isActive: null,
      isActive2: null,
      isActive3: null,
      todolistData: [
        { id: '01', title: '税务变更登记信息', time: '2022/08/07' },
        { id: '02', title: '税务变更登记信息', time: '2022/08/07' },
        { id: '03', title: '税务变更登记信息', time: '2022/08/07' },
        { id: '04', title: '税务变更登记信息', time: '2022/08/07' },
        { id: '05', title: '税务变更登记信息', time: '2022/08/07' },
      ],
      // 最新数据
      newData: [],
      // 热门申请
      hotApplyData: [],
      moreBrowseData: [],
    }
  },
  created() {
    this.fetchLatestData()
    this.fetchHotApply()
    this.fetchHotBrowse()
  },
  mounted() {
    this.isActive = null
    this.isActive2 = null
    this.isActive3 = null
  },
  methods: {
    handleCataDet(row) {
      localStorage.setItem('catalogName', row.catalogName)
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
    Mouseover(index, type) {
      if (type === '1') this.isActive = index
      else if (type === '2') this.isActive2 = index
      else this.isActive3 = index
    },
    Mouseleave(type) {
      if (type === '1') this.isActive = null
      else if (type === '2') this.isActive2 = null
      else this.isActive3 = null
    },
    fetchLatestData() {
      getLatestData().then((res) => {
        if (res.success) {
          this.newData = res.body
          this.newData.forEach((v) => {
            v.createdTime = this.formatTime(v.createdTime, 'hms')
          })
        }
      })
    },
    fetchHotApply() {
      getHotApply().then((res) => {
        if (res.success) {
          this.hotApplyData = res.body
          this.hotApplyData.forEach((v) => {
            v.createdTime = this.formatTime(v.createdTime, 'hms')
            v.applyQuantity = this.formatNumber(v.applyQuantity)
          })
        }
      })
    },
    fetchHotBrowse() {
      getHotBrowse().then((res) => {
        if (res.success) {
          this.moreBrowseData = res.body
          this.moreBrowseData.forEach((v) => {
            v.createdTime = this.formatTime(v.createdTime, 'hms')
            v.browseQuantity = this.formatNumber(v.browseQuantity)
          })
        }
      })
    },
    gotocatalog(type,num) {
      this.$router.push({
        path: '/catalogue/datacatalogue',
        query: {
          type,
          num
        },
      })
      // window.location.href = '/catalogue/datacatalogue'
    },
  },
}
</script>

<style lang="less" scoped>
#homehotlist {
  background: #f0f2f5;
  display: flex;
  justify-content: space-between;
  padding: 40px 40px 40px 40px;
  .list-box {
    position: relative;
    width: 31%;
    min-height: 280px;
    padding-left: 0px !important;
    background: #fff;
    cursor: pointer;
    .list-title {
      display: flex;
      padding: 0 12px;
      justify-content: space-between;
      align-items: center;
      color: #1890ff;
      height: 52px;
      list-style: none;
      background: #e6f7ff;
      .img-title-box {
        display: flex;
        align-items: center;
      }
      .icon-img {
        height: 15px;
        margin-right: 5px;
      }
    }
    .list-items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      list-style: none;
      height: 57px;
      padding: 0 12px;
      border-bottom: 1px dashed #ccc;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: 1px solid #aaaaaa;
      background: #aaaaaa;
      margin-right: 8px;
    }
    .no-data {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .margin-box {
    margin: 0 40px;
  }
  .active {
    color: #1890ff;
  }
}
</style>