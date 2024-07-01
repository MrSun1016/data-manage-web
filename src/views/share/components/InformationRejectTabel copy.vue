<template>
  <div id="InformationTabel">
    <el-table
      class="table-data"
      v-loading="tableLoading"
      :header-cell-style="{ background: '#E6F7FF', color: '#333333' }"
      :data="informationData"
      style="width: 100%"
    >
      <!-- :cell-style="cellStyle" -->
      <el-table-column prop="applyTitle" label="申请标题">
        <template slot-scope="{ row, $index }">
          {{ row.applyTitle || '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="catalogName" label="编目名称">
        <template slot-scope="{ row }">
          {{ row.catalogName || '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="message" label="驳回理由">
        <template slot-scope="{ row }">
          {{ row.message || '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="applyDept" label="数源部门">
        <template slot-scope="{ row }">
          {{ row.applyDept || '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="shareType" label="数据类型">
        <template slot-scope="{ row }">
          {{ row.shareType || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="最近更新时间">
        <template slot-scope="{ row, $index }">
          <el-button type="text">{{ row.rejectDate || '-' }}</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="{ row, $index }">
          <el-button type="text" @click="changeEdit(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {
  getApplyInfo,
} from '@/api/api'
export default {
  name: 'InformationTabel',
  props: ['informationData'],
  data() {
    return {
      tableLoading: false,
      deitData:{
      }
    }
  },
  methods: {
    changeEdit(row) {
      this.deitData = row
      this.deitData.type = '1'
      this.deitData.isOpen = true
      localStorage.setItem('DATA_ITEM', JSON.stringify(row.applyId))
      if (row.relatedGovernment == '否') {
        this.$bus.$emit('handleisOpen', this.deitData)
        this.$router.push({
          path: '/catalogue/datacatalogue',
        })
      } else {
        this.$bus.$emit('handleisOpen', this.deitData)
        this.$router.push({
          path: '/service/serviceitem',
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
#InformationTabel {
  width: 100%;
  //   height: 100%;
  // padding-top: 24px;
  .table-data {
    height: 100%;
    padding: 0 20px 0 20px;
    /deep/.el-table__row {
      height: 60px !important;
    }
  }

  .pagination-box {
    text-align: end;
    padding: 32px;
    background: #fff;
  }
  /deep/.el-table th.el-table__cell > .cell {
    display: flex;
    align-items: center;
  }
}
</style>
