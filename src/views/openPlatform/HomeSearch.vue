<template>
  <div id="homeSearch">
    <div class="search-content">
      <div class="search-box">
        <i class="el-icon-back" @click="$router.back()"></i>
        <el-input placeholder="请输入内容" clearable @change="handleSearch" v-model="reqCondition.catalogName">
          <template slot="append">
            <el-button @click="handleSearch">搜索</el-button>
          </template>
        </el-input>
      </div>
      <div class="tabs-content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="all">
            <CatalogueTable ref="tableComponent" :catalogueTableData="catalogueTableData" />
          </el-tab-pane>
          <el-tab-pane label="数据目录" name="catalog">
            <CatalogueTable ref="tableComponent1" :catalogueTableData="catalogueTableData" />
          </el-tab-pane>
          <el-tab-pane label="事项主线目录" name="matters">
            <CatalogueTable ref="tableComponent2" :catalogueTableData="catalogueTableData" />
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="pagination-box">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="reqCondition.pageNum"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="reqCondition.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          background
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import CatalogueTable from '@views/catalogue/components/CatalogueTable'
import { getIndexSelPage } from '@/api/api'
export default {
  name: 'homeSearch',
  components: {
    CatalogueTable,
  },
  data() {
    return {
      total: 0,
      activeName: 'all',
      catalogueTableData: [],
      reqCondition: {
        applicationDepartment: '',
        catalogName: '',
        dataType: '',
        openingTime: '',
        orderByField: '',
        pageNum: 1,
        pageSize: 10,
        relatedGovernment: '',
        rowStart: '',
        sourceSystem: '',
        stutas: '',
      },
    }
  },
  activated() {
    this.reqCondition.catalogName = this.$route.query.search
    this.fetchIndexSelPage()
  },
  methods: {
    handleClick() {
      if (this.activeName === 'all') {
        this.reqCondition.pageNum = 1
        this.reqCondition.pageSize = 10
        this.reqCondition.relatedGovernment = ''
        this.fetchIndexSelPage()
      } else if (this.activeName === 'catalog') {
        this.reqCondition.relatedGovernment = '否'
        this.reqCondition.pageNum = 1
        this.reqCondition.pageSize = 10
        this.fetchIndexSelPage()
      } else if (this.activeName === 'matters') {
        this.reqCondition.relatedGovernment = '是'
        this.reqCondition.pageNum = 1
        this.reqCondition.pageSize = 10
        this.fetchIndexSelPage()
      }
    },
    fetchIndexSelPage() {
      this.$refs.tableComponent.tableLoading = true
      this.$refs.tableComponent1.tableLoading = true
      this.$refs.tableComponent2.tableLoading = true
      getIndexSelPage(this.reqCondition)
        .then((res) => {
          if (res.success) {
            this.catalogueTableData = res.body.content
            this.total = res.body.total
            this.$refs.tableComponent.tableLoading = false
            this.$refs.tableComponent1.tableLoading = false
            this.$refs.tableComponent2.tableLoading = false
            this.catalogueTableData.forEach((v) => {
              if (v.notionalPoolingNum == null) v.notionalPoolingNum = 0
              else v.notionalPoolingNum
              v.releaseTime = this.formatTime(v.releaseTime, 'hms')
              v.dataRange = JSON.parse(v.dataRange)
              v.dataRange = v.dataRange.flat(Infinity)
              v.dataRange = Array.from(new Set(v.dataRange))
            })
          } else {
            this.$refs.tableComponent.tableLoading = false
            this.$refs.tableComponent1.tableLoading = false
            this.$refs.tableComponent2.tableLoading = false
          }
        })
        .catch((_) => {
          this.$refs.tableComponent.tableLoading = false
          this.$refs.tableComponent1.tableLoading = false
          this.$refs.tableComponent2.tableLoading = false
        })
    },
    handleSearch() {
      this.fetchIndexSelPage()
    },
    // 每页数量发生改变的监听
    handleSizeChange(pageSize) {
      this.reqCondition.pageSize = pageSize
      this.fetchIndexSelPage()
    },
    handleCurrentChange(pageNum) {
      this.reqCondition.pageNum = pageNum
      this.fetchIndexSelPage()
    },
  },
}
</script>

<style lang="less" scoped>
#homeSearch {
  background: #f2f2f3;
  padding: 24px;
  .search-content {
    background: #fff;
    .search-box {
      display: flex;
      align-items: center;
      font-size: 30px;
      padding: 12px;
      /deep/.el-input__inner {
        margin: 1px 0;
      }
      /deep/.el-input-group__append {
        background: #1890ff !important;
        color: #fff;
      }
      .el-icon-back {
        margin-right: 12px;
        cursor: pointer;
      }
    }
    .tabs-content {
      padding: 12px;
    }
  }
  .pagination-box {
    text-align: end;
    padding: 32px;
    // background-color: #fff;
  }
}
</style>