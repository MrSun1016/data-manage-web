<template>
  <div id="DataCatalogue">
    <div>
      <div>
        <div class="search">
          <!-- 基础筛选 -->
          <BasedScreening
            ref="baseREF"
            @changeResource="changeResource"
            @changeShare="changeShare"
            @changeOpen="changeOpen"
          />
          <!-- 高级筛选 -->
          <AdvancedFilter
            ref="advanRef"
            @changeKeyareas="changeKeyareas"
            @changeFrequency="changeFrequency"
            v-show="isIconClass"
          />
        </div>
        <div class="option-btn">
          <label @click="handleIconClass" style="cursor: pointer">
            <i :class="isIconClass ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>&nbsp;
            {{ isIconClass ? '基础筛选' : '高级筛选' }}</label
          >
        </div>
        <el-form class="el-form" inline @submit.native.prevent>
          <el-form-item label="目录名称">
            <el-input
              v-model="resource.catalogName"
              size="small"
              placeholder="请输入编目名称"
              @change="search"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="search">搜索</el-button>
            <el-button size="small" @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <!-- 表格 -->
        <CatalogueTable ref="catalogTbaleRef" :catalogueTableData="catalogueTableData" @handleSort="handleSort" />
      </div>
    </div>
    <div class="pagination-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="resource.pageNum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="resource.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { ResourceMarketpage } from '@/api/api'
import { Message } from 'element-ui'
import CatalogueTable from '@views/catalogue/components/CatalogueTable'
import AdvancedFilter from '@views/catalogue/components/AdvancedFilter'
import BasedScreening from '@views/catalogue/components/BasedScreening'
export default {
  name: 'DataCatalogue',
  components: {
    BasedScreening,
    AdvancedFilter,
    CatalogueTable
  },
  data() {
    return {
      currtpageNum: 1,
      path: '',
      isIconClass: false,
      resource: {
        orderBy: 'updateTime',
        orderSc: 'desc',
        catalogName: '', //编目名称
        categoryCode: '', //树结构code
        dataFormat: [], //数据类型
        keyAreasType: [], //重点领域
        openType: [], //开放类型
        orderByField: '',
        pageNum: 1,
        pageSize: 10,
        rowStart: 0,
        shareType: [], //共享类型
        updateFrequency: [], //更新频率
        treeItemId: ''
      },
      total: 0,
      catalogueTableData: []
    }
  },
  //通过监视
  watch: {
    'resource.categoryCode': {
      handler(newVal, oldVal) {
        // this.isShowList = !newVal
        this.handleCurrentChange()
      }
    },
    $route: {
      handler(val, oldVal) {
        if (
          oldVal.path == '/service/serviceitem' ||
          oldVal.path == '/share/informationsharing' ||
          oldVal.path == '/openPlatform/home' ||
          oldVal.path == '/systemmaintenance'
        ) {
          this.resource.categoryCode = ''
          this.resource.pageNum = 1
          this.handleReset()
          this.handleCurrentChange()
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  activated() {
    // this.resource.categoryCode = ''
    // this.resource.pageNum = 1
    // this.handleCurrentChange()
  },
  mounted() {
    this.handleCurrentChange()
    this.$bus.$emit('handleNodeCode', this.handleCurrentChange)
    this.$bus.$on('code', keyNameList => {
      this.resource.categoryCode = keyNameList.keyName
      this.resource.treeItemId = keyNameList.treeItemId
      // this.handleCurrentChange()
    })
  },
  //解绑事件
  beforeDestroy() {
    this.$bus.$off('code')
  },
  methods: {
    handleSort(type, val) {
      this.resource.orderBy = type
      this.resource.orderSc = val
      this.handleCurrentChange()
    },
    // 重置
    handleReset() {
      // this.resource.categoryCode = ''
      this.resource.catalogName = ''
      // this.$bus.$emit('onReset',true)
      this.$refs.baseREF.resetBased()
      this.$refs.advanRef.resetAdvanced()
      this.resource.dataFormat = []
      this.resource.shareType = []
      this.resource.openType = []
      this.resource.keyAreasType = []
      this.resource.updateFrequency = []
      this.$bus.$emit('closename')
    },
    handleIconClass() {
      this.isIconClass = !this.isIconClass
    },
    // 每页数量发生改变的监听
    handleSizeChange(pageSize) {
      this.resource.pageSize = pageSize
      this.handleCurrentChange()
    },
    // 根据选择加当前页发请求
    handleCurrentChange(page = 1) {
      this.$refs.catalogTbaleRef.tableLoading = true
      this.currtpageNum = page
      this.resource.pageNum = page
      ResourceMarketpage(this.resource)
        .then(res => {
          if (res.success) {
            this.$refs.catalogTbaleRef.tableLoading = false
            this.catalogueTableData = res.body.content
            this.total = res.body.total
            this.catalogueTableData.forEach(v => {
              if (v.notionalPoolingNum == null) v.notionalPoolingNum = 0
              else v.notionalPoolingNum
              v.releaseTime = this.formatTime(v.releaseTime, 'hms')
              let resDataRange = v.dataRange.indexOf('[')
              if (resDataRange != -1) {
                v.dataRange = JSON.parse(v.dataRange)
                v.dataRange = v.dataRange.flat(Infinity)
                v.dataRange = Array.from(new Set(v.dataRange))
              }
            })
          } else {
            this.$refs.catalogTbaleRef.tableLoading = false
            Message.error(res.header.message)
          }
        })
        .catch(_ => {
          Message.error(res.header.message)
          this.$refs.catalogTbaleRef.tableLoading = false
        })
    },
    // 搜索
    search() {
      // if (this.$refs.baseREF !== undefined) {
        this.$refs.baseREF.fetchCatalogAmount(this.resource.catalogName)
      // }
      // if (this.$refs.advanRef !== undefined) {
        this.$refs.advanRef.fetchCatalogAmount(this.resource.catalogName)
      // }
      this.handleCurrentChange()
    },
    // 数据格式选择数据
    changeResource(resourceType) {
      this.resource.dataFormat = resourceType
      this.handleCurrentChange()
    },
    // 共享类型选择数据
    changeShare(shareType) {
      this.resource.shareType = shareType
      this.handleCurrentChange()
    },
    // 开放类型选择数据
    changeOpen(openType) {
      this.resource.openType = openType
      this.handleCurrentChange()
    },
    // 重点领域选择数据
    changeKeyareas(focusAreas) {
      this.resource.keyAreasType = focusAreas
      this.handleCurrentChange()
    },
    // 更新频率选择数据
    changeFrequency(updateFrequency) {
      this.resource.updateFrequency = updateFrequency
      this.handleCurrentChange()
    }
  }
}
</script>

<style lang="less" scoped>
#DataCatalogue {
  width: 100%;
  // height: calc(100% - 64px);
  background: #fff;
  .option-btn {
    text-align: end;
    margin: 8px 32px 0 0;
    color: #1890ff;
  }
  .el-form {
    padding: 0 32px;
  }
}
.pagination-box {
  text-align: end;
  padding: 32px;
  // background-color: #fff;
}
</style>
