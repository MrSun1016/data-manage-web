<template>
  <div id="policyrule">
    <div style="background: #f2f2f3">
      <div style="padding: 0 20px">
        <div class="title-info" style="background: #fff">
          <div class="title">标题名称：</div>
          <div class="info">
            <el-input
              v-model="learning.uploadFileName"
              @keyup.enter.native="handleSearch"
              clearable
              placeholder="请输入内容"
            >
              <template slot="append"><span @click="handleSearch" style="cursor: pointer">搜索</span></template>
            </el-input>
          </div>
        </div>
        <div class="content" v-loading="loading">
          <el-table
            :data="todoList"
            :header-cell-style="{ background: '#E6F7FF', color: '#333333' }"
            style="width: 100%; padding: 12px 12px 0 12px"
          >
            <el-table-column type="index" width="40"> </el-table-column>
            <el-table-column prop="uploadFileName" label="标题" :show-overflow-tooltip="true">
              <template slot-scope="{ row }">
                <span style="color: red; cursor: pointer" v-show="row.isTop != 0">【置顶】</span>
                <el-button type="text" @click="downLoad(row.uploadFileName)">{{ row.uploadFileName || '-' }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="releasePerson" label="发布人">
              <template slot-scope="{ row }">
                {{ row.releasePerson || '-' }}
              </template>
            </el-table-column>
            <el-table-column prop="releaseTime" label="发布时间">
              <template slot-scope="{ row }">
                {{ row.releaseTime || '-' }}
              </template>
            </el-table-column>
          </el-table>
          <!-- <div class="df" v-for="todos in todoList" :key="todos.title">
            <div class="title" @click="downLoad(todos.uploadFileName)">{{ todos.uploadFileName || '-' }}</div>
            <div class="times">{{ todos.releaseTime || '-' }}</div>
          </div>
          <div class="no-data" v-show="todoList.length <= 0">暂无数据</div> -->
        </div>
        <div class="pagination-box">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="learning.pageNum"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="learning.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            background
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { studyWorldPage } from '@/api/api'
import { download } from '@/api/manage'
export default {
  name: 'policyrule',
  components: {},
  data() {
    return {
      loading: false,
      total: 0,
      todoList: [],
      learning: {
        dataName: '',
        id: 0,
        orderByField: '',
        pageNum: 1,
        pageSize: 10,
        rowStart: 0,
        releaseScope: [],
        startDate: '',
        endDate: '',
        uploadFileName: '',
        queryType: 2,
        dataManagementType: '1', //帮助文档
      },
      input: '',
      todoList: [],
    }
  },
  created() {
    this.fetchWorldPage()
  },
  methods: {
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
    handleSizeChange(pageSize) {
      this.learning.pageSize = pageSize
      this.fetchWorldPage()
    },
    handleCurrentChange(pageNum) {
      this.learning.pageNum = pageNum
      this.fetchWorldPage()
    },
    handleSearch() {
      this.fetchWorldPage()
    },
    fetchWorldPage() {
      this.loading = true
      studyWorldPage(this.learning)
        .then((res) => {
          if (res.success) {
            this.todoList = res.body.content
            this.total = res.body.total
            this.loading = false
            this.todoList.forEach((item, index) => {
              item.releaseTime = this.formatTime(item.releaseTime)
            })
          } else {
            this.loading = false
          }
        })
        .catch((_) => {
          this.loading = false
        })
    },
  },
}
</script>
  
  <style lang="less" scoped>
#policyrule {
  background: #fff;
  .title-info {
    display: flex;
    align-items: center;
    padding: 24px;
    .title {
      color: #000000;
      margin-right: 20px;
    }
    .info {
      flex: 1;
    }
  }
  .content {
    margin-top: 24px;
    .df {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        color: #1890ff;
        cursor: pointer;
      }
      .times {
        color: #333333;
      }
    }
  }
  /deep/.el-input-group__append {
    background: #1890ff;
    color: #fff;
  }
  /deep/.el-input__inner {
    margin: 1px 0;
  }
  .pagination-box {
    text-align: end;
    padding: 24px;
    background: #fff;
  }
}
</style>