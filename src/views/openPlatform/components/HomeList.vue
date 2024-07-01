<template>
  <div id="homelist">
    <div style="display: flex; justify-content: space-between">
      <div class="content">
        <div class="title">
          <img src="@/assets/footerBanner1.png" alt="" />
        </div>
        <div class="info" >
          <div class="info-items" v-for="(todos, index) in todolist" :key="todos.dataName">
            <span
              class="circle-df"
              :class="{ active: index == isActive }"
              @mouseover="Mouseover(index, '1')"
              @mouseleave="Mouseleave('1')"
              ><span class="circle"></span
              >
              <el-tooltip  class="over-item" :content=todos.uploadFileName placement="top">
                <span @click="downLoad(todos.uploadFileName)">{{ todos.uploadFileName || '-'   }}</span>
              </el-tooltip>
              </span
            ><span class="times">{{ todos.releaseTime }}</span>
          </div>
          <div class="more" @click="gotoRule" v-show="todolist.length!=0">查看更多</div>
          <div class="nodate1" v-show="todolist.length<=0">暂无数据</div>
        </div>
       
      </div>
      <div class="content">
        <div class="title">
          <img src="@/assets/footerBanner2.png" alt="" />
        </div>
        <div class="info">
          <div class="info-items" v-for="(todos, index) in todolist2" :key="todos.dataName">
            <span
              class="circle-df"
              :class="{ active: index == isActive2 }"
              @mouseover="Mouseover(index, '2')"
              @mouseleave="Mouseleave('2')"
              ><span class="circle"></span
              >
                 <el-tooltip   class="over-item" :content=todos.uploadFileName placement="top">
                <span @click="downLoad(todos.uploadFileName)">{{ todos.uploadFileName || '-'   }}</span>
              </el-tooltip>

              </span
            ><span class="times">{{ todos.releaseTime }}</span>
          </div>
          <div class="more" @click="gotostandard" v-show="todolist2.length!=0">查看更多</div>
          <div class="nodate1" v-show="todolist2.length<=0">暂无数据</div>
        </div>
      </div>
      <div class="content">
        <div class="title">
          <img src="@/assets/footerBanner3.png" alt="" />
        </div>
        <div class="info">
          <div class="info-items" v-for="(todos, index) in todolist3" :key="todos.dataName">
            <span
              class="circle-df"
              :class="{ active: index == isActive3 }"
              @mouseover="Mouseover(index, '3')"
              @mouseleave="Mouseleave('3')"
              ><span class="circle"></span
              >
              <el-tooltip  class="over-item" :content=todos.uploadFileName placement="top">
                <span @click="downLoad(todos.uploadFileName)">{{ todos.uploadFileName || '-'   }}</span>
              </el-tooltip>
              </span
            ><span class="times">{{ todos.releaseTime }}</span>
          </div>
          <div class="more" @click="handleMoreHelpDoc" v-show="todolist3.length!=0">查看更多</div>
          <div class="nodate1" v-show="todolist3.length<=0">暂无数据</div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { studyWorldPage } from '@/api/api'
import { download } from '@/api/manage'
export default {
  name: 'homelist',
  data() {
    return {
      // 政策法规
      learning: {
        pageNum: 1,
        pageSize: 6,
        rowStart: 0,
        queryType: 2,
        dataManagementType: '2', //政策法规
      },
      // 数据规范
      learning2: {
        pageNum: 1,
        pageSize: 6,
        rowStart: 0,
        queryType: 2,
        dataManagementType: '3', //数据规范
      },
      // 帮助文档
      // 数据规范
      learning3: {
        pageNum: 1,
        pageSize: 6,
        rowStart: 0,
        queryType: 2,
        dataManagementType: '1', //数据规范
      },
      todolist: [],
      todolist2: [],
      todolist3: [],
      isActive: false,
      isActive2: false,
      isActive3: false,
    }
  },
  created() {
    this.fetchWorldPage()
    this.fetchWorldPage2()
    this.fetchWorldPage3()
  },
  methods: {
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
    fetchWorldPage3() {
      studyWorldPage(this.learning3).then((res) => {
        if (res.success) {
          this.todolist3 = res.body.content
          this.todolist3.forEach((item, index) => {
            item.releaseTime = this.formatTime(item.releaseTime, 'hms')
          })
        }
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
    handleMoreHelpDoc(){
      this.$router.push({
        path: '/system/helpdocument',
      })
    },
  },
  mounted() {
    this.isActive = null
    this.isActive2 = null
    this.isActive3 = null
  },
}
</script>

<style lang="less" scoped>
#homelist {
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 15px;
  .content {
    width: 390px;
    // width: 35%;
    .title {
      img {
        width: 100%;
        // height: 50px;
      }
    }
    .info {
      position: relative;
      background: #f4f4f4;
      padding: 8px 8px;
      min-height: 243px;
      .info-items {
        display: flex;
        color: #313131;
        justify-content: space-between;
        padding: 4px 0;
        .circle-df {
          display: flex;
          align-items: center;
          .over-item {
            cursor: pointer;
            width: 270px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .times {
          color: #7a7a7a;
        }
      }
    }
  }
  .circle {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #cccc;
    margin-right: 8px;
  }
  .more {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    text-align: center;
    background: #fff;
    color: #69abf8;
    width: 150px;
    border-radius: 10px;
    padding: 4px 0;
  }
  .active {
    color: #1890ff;
  }
}
.nodate1{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>