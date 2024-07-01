<template>
  <div id="homelist">
    <ul class="list-box">
      <li class="list-title">
        <div class="img-title-box"><img class="icon-img" src="../../../assets/Frame.png" alt="" /> 政策法规</div>
        <div @click="gotoRule">更多<i class="el-icon-d-arrow-right"></i></div>
      </li>
      <li
        class="list-items"
        :class="{ active: index == isActive }"
        @mouseover="Mouseover(index, '1')"
        @mouseleave="Mouseleave('1')"
        v-for="(items, index) in todolist"
        :key="items.dataName"
        @click="downLoad(items.uploadFileName)"
      >
        <div style="display: flex; align-items: center">
          <div class="dot"></div>
          <span v-show="items.isTop === 1" style="color: red">【置顶】</span>
          <span>{{ items.uploadFileName || '-' }}</span>
        </div>
        <div>{{ items.releaseTime || '-' }}</div>
      </li>
      <div class="no-date" v-show="todolist.length <= 0">暂无数据</div>
    </ul>

    <ul class="list-box">
      <li class="list-title">
        <div class="img-title-box"><img class="icon-img" src="../../../assets/Frame-2.png" alt="" /> 数据规范</div>
        <div @click="gotostandard">更多<i class="el-icon-d-arrow-right"></i></div>
      </li>
      <li
        class="list-items"
        :class="{ active: index == isActive2 }"
        @mouseover="Mouseover(index, '2')"
        @mouseleave="Mouseleave('2')"
        v-for="(items, index) in todolist2"
        :key="items.dataName"
        @click="downLoad(items.uploadFileName)"
      >
        <div style="display: flex; align-items: center">
          <div class="dot"></div>
          <span v-show="items.isTop === 1" style="color: red">【置顶】</span>
          {{ items.uploadFileName || '-' }}
        </div>
        <div>{{ items.releaseTime || '-' }}</div>
      </li>
      <div class="no-date" v-show="todolist.length <= 0">暂无数据</div>
    </ul>
  </div>
</template>

<script>
import { studyWorldPage } from '@/api/api'
import { download } from '@/api/manage'
export default {
  name: 'homelist',
  data() {
    return {
      isActive: false,
      isActive2: false,
      avtivecolor: 'color:#AAAAAA',
      listData: [
        { info: '孝感市政务数据开放共享使用管理办法（试用）', time: '2022/08/07' },
        { info: '孝感市政务数据开放共享使用管理办法（试用）', time: '2022/08/08' },
        { info: '孝感市政务数据开放共享使用管理办法（试用）', time: '2022/08/09' },
        { info: '孝感市政务数据开放共享使用管理办法（试用）', time: '2022/09/01' },
        { info: '孝感市政务数据开放共享使用管理办法（试用）', time: '2022/08/02' },
      ],
      // 政策法规
      learning: {
        pageNum: 1,
        pageSize: 5,
        rowStart: 0,
        queryType: 2,
        dataManagementType: '2', //政策法规
      },
      // 数据规范
      learning2: {
        pageNum: 1,
        pageSize: 5,
        rowStart: 0,
        queryType: 2,
        dataManagementType: '3', //数据规范
      },
      todolist: [],
      todolist2: [],
      // impTemplate:'data_management_type',
    }
  },
  created() {
    // this.fetchDictItems()
    this.fetchWorldPage()
    this.fetchWorldPage2()
  },
  mounted() {
    this.isActive = null
    this.isActive2 = null
  },
  methods: {
    Mouseover(index, type) {
      if (type === '1') this.isActive = index
      else this.isActive2 = index
    },
    Mouseleave(type) {
      if (type === '1') this.isActive = null
      else this.isActive2 = null
    },
    // 从数据字典获取政策法规code
    //region
    //  fetchDictItems(){
    //   getDictItems(this.impTemplate).then((res) => {
    //     if(res.code==200){
    //       let result = res.result.find(v=>{
    //         return v.text=='政策法规'
    //       })
    //       this.learning.dataManagementType = result.vale
    //     }
    //   })
    // },
    // #endregion
    // 政策法规
    fetchWorldPage() {
      studyWorldPage(this.learning).then((res) => {
        if (res.success) {
          this.todolist = res.body.content
          this.todolist.forEach((item, index) => {
            item.releaseTime = this.formatTime(item.releaseTime, 'hms')
          })
        }
      })
    },
    //
    fetchWorldPage2() {
      studyWorldPage(this.learning2).then((res) => {
        if (res.success) {
          this.todolist2 = res.body.content
          this.todolist2.forEach((item, index) => {
            item.releaseTime = this.formatTime(item.releaseTime, 'hms')
          })
        }
      })
    },
    gotoRule() {
      // window.location.href = '/system/policyrule'
      this.$router.push({
        path: '/system/policyrule',
      })
    },
    gotostandard() {
      // window.location.href = '/system/datastandard'
      this.$router.push({
        path: '/system/datastandard',
      })
    },
    // 文件下载
    downLoad(fileName) {
      // let fileName = this.datas.businessAeview.applyFlieName
      download({ fileName })
        .then((res) => {
          const blob = new Blob([res], {
            type: 'application/json;charset=UTF-8',
          }) // res就是接口返回的文件流
          const link = document.createElement('a') // 创建a标签
          const objectUrl = window.URL.createObjectURL(blob)
          link.href = objectUrl
          link.download = fileName
          link.click()
          window.URL.revokeObjectURL(objectUrl) // 释放内存
        })
        .catch((error) => {
          this.$message.warning('模板导出失败')
        })
    },
  },
}
</script>

<style lang="scss" scoped>
#homelist {
  background: #f0f2f5;
  display: flex;
  justify-content: space-between;
  padding: 0px 40px;
  .list-box {
    width: 48%;
    position: relative;
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
    .no-date {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .active {
    color: #1890ff;
  }
}
</style>