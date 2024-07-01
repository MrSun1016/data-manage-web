<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="statistics" size="small" ref="statistics">
        <div class="divffromflex">
          <el-form-item label="表名称" prop="tableName">
            <el-input size="small" v-model="statistics.tableName" placeholder="请输入" class="aitemml"></el-input>
          </el-form-item>
        <el-form-item label="更新时间是否为空" prop="timeIsNull" class="fromweizhi">
          <el-select v-model="statistics.timeIsNull" size="small" clearable placeholder="请选择" class="aitemml">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="2"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="是否超时" prop="overTime">
            <el-select v-model="statistics.overTime" size="small" clearable placeholder="请选择" class="aitemml">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="fromflexrig">
          <el-form-item>
            <el-button type="primary" size="small" @click="submitStatistics" class="butfromccwei">查 询</el-button>
            <el-button size="small" @click="resetexcel('statistics')" class="butfromccwei">重 置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <el-card class="cardpadmargtop">
      <el-table
        :header-cell-style="{
          background: '#FAFAFA',
          fontWeight: '400',
          color: '#333333',
          fontSize: '14px'
        }"
        border
        stripe
        v-loading="loading"
        :data="tabData"
        style="width: 100%"
      >
        <el-table-column prop="dataName" label="所属数据库"> </el-table-column>
        <el-table-column prop="databaseName" label="数据库名称"> </el-table-column>
        <el-table-column prop="tableName" label="表名称"> </el-table-column>
        <el-table-column prop="updateFrequency" label="更新周期 " width="150px"> </el-table-column>
        <el-table-column prop="isUpdate" label="是否更新" width="150px"> </el-table-column>
        <el-table-column prop="lastUpdateTime" label="最后更新时间 "> </el-table-column>
        <el-table-column prop="oldTime" label="预计更新时间 "> </el-table-column>
        <el-table-column prop="overTime" label="更新类型 "> </el-table-column>
      </el-table>
      <el-pagination
        class="paginationtop"
        background
        @size-change="handleSizeChange"
        @current-change="getRolesDraft"
        :current-page="statistics.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="statistics.pageSize"
        :total="total"
        :pager-count="5"
        layout="->,total, prev, pager, next, sizes, jumper"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import { tableAlertList } from '@/api/api'
export default {
  name: 'UpdateTimeStatistics',
  data() {
    return {
      tabData: [],
      statistics: {
        pageNum: 1,
        pageSize: 10,
        timeIsNull: '',
        tableName: '',
        overTime: ''
      },
      total: 0,
      loading: false
    }
  },
  mounted() {
    this.getRolesDraft()
  },
  methods: {
    getRolesDraft(page = 1) {
      this.loading = true
      this.statistics.pageNum = page
      tableAlertList(this.statistics).then(res => {
        if (res.success) {
          this.tabData = res.body.content
          this.total = res.body.total
          this.tabData.map((item, index) => {
            item.lastUpdateTime = this.formatTime(item.lastUpdateTime)
            item.oldTime = this.formatTime(item.oldTime)
          })
          this.loading = false
        }
      })
    },
    handleSizeChange(pageSize) {
      this.statistics.pageSize = pageSize
      this.getRolesDraft()
    },
    submitStatistics() {
      this.getRolesDraft()
    },
    resetexcel(statistics) {
      this.$refs[statistics].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.cardpadmargtop {
  margin-top: 24px;
  padding-left: 20px;
  width: 100%;
}
.divffromflex {
  display: flex;
  justify-content: space-between;
}
.fromflexrig {
  display: flex;
  justify-content: flex-end;
  .el-form-item {
    margin-bottom: 5px;
  }
}
</style>
