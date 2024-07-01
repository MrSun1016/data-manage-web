<template>
  <div id="serviceItem">
    <BasedMatter
      @servicesCycle="servicesCycle"
      @servicesLicense="servicesLicense"
      @servicesResources="servicesResources"
    />
    <ServiceInquire @serviceValue="serviceValue" />
    <CatalogueTable
      ref="catalogTbaleRef"
      :total="total"
      :catalogueTableData="catalogueTableData"
      :serviceName="serviceName"
      @handleMatterSort="handleMatterSort"
    />
    <div class="divdata" v-show="catalogueTableData == []"><p>暂无数据</p></div>
    <div class="pagination-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchParams.pageNum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="searchParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { ServiceMatterspage } from '@/api/api'
import ServiceInquire from '@views/service/components/ServiceInquire'
import BasedMatter from '@views/catalogue/components/BasedMatter'
import CatalogueTable from '@views/catalogue/components/CatalogueTable'
import { Message } from 'element-ui'
export default {
  name: 'ServiceItem',
  components: {
    BasedMatter,
    ServiceInquire,
    CatalogueTable,
  },
  data() {
    return {
      searchParams: {
        orderBy: 'updateTime',
        orderSc: 'desc',
        businessCode: '', //业务办理项编码
        businessName: '', //业务办理项名称
        catalogName: '',
        dataFormat: [], //资源类型
        electronicLicense: [], //是否电子证照
        functionalType: '',
        implementationCode: '', //实施清单编码
        implementationName: '', //实施清单名称
        orderByField: '',
        pageNum: 1,
        pageSize: 10,
        rowStart: 0,
        selections: '',
        // 默认查孝感市
        sourceUnitCode: '', //树节点编码
        updateFrequency: [], //更新周期/频率
        userId: '',
      },
      catalogueTableData: [],
      total: 0,
      serviceName: '事项',
    }
  },
  activated() {
    this.searchParams.sourceUnitCode = ''
    this.$bus.$on('fatherReset', (_) => {
      this.searchParams.dataFormat = []
      this.searchParams.electronicLicense = []
      this.searchParams.updateFrequency = []
    })
    this.$bus.$on('changeHandleNode', (nodeCode) => {
      this.searchParams.sourceUnitCode = nodeCode
      this.handleCurrentChange()
    })
    // 默认查孝感市
    // this.searchParams.sourceUnitCode = '孝感市'
    // this.handleCurrentChange()
  },
  beforeDestroy() {
    this.$bus.$off('fatherReset')
    this.$bus.$off('changeHandleNode')
  },
  created() {},
  mounted() {
    this.handleCurrentChange()
  },
  methods: {
    handleMatterSort(type, val) {
      this.searchParams.orderBy = type
      this.searchParams.orderSc = val
      this.handleCurrentChange()
    },
    // 每页数量发生改变的监听
    handleSizeChange(pageSize) {
      this.searchParams.pageNum = pageSize
      this.handleCurrentChange()
    },
    // 根据选择加当前页发请求
    handleCurrentChange(page = 1) {
      // 默认查孝感市
      // this.searchParams.sourceUnitCode = '孝感市'
      this.$refs.catalogTbaleRef.tableLoading = true
      this.searchParams.pageNum = page
      ServiceMatterspage(this.searchParams)
        .then((res) => {
          if (res.success) {
            this.$refs.catalogTbaleRef.tableLoading = false
            this.catalogueTableData = res.body.content
            this.total = res.body.total
            this.catalogueTableData.forEach((v) => {
              if (v.notionalPoolingNum == null) v.notionalPoolingNum = 0
              else v.notionalPoolingNum
              v.releaseTime = this.formatTime(v.releaseTime, 'hms')
              let resDataRange = v.dataRange.indexOf('[')
              if (resDataRange != -1) {
                v.dataRange = JSON.parse(v.dataRange)
                v.dataRange = v.dataRange.flat(Infinity)
                v.dataRange = Array.from(new Set(v.dataRange))
              } else {
                this.$refs.catalogTbaleRef.tableLoading = false
                // Message.error(res.header.message)
              }
            })
          }
        })
        .catch((_) => {
          Message.error(res.header.message)
          this.$refs.catalogTbaleRef.tableLoading = false
        })
    },
    serviceValue(serviceList) {
      console.log(serviceList.catalogName)
      this.searchParams.catalogName = serviceList.catalogName
      this.searchParams.implementationCode = serviceList.implementationCode
      this.searchParams.implementationName = serviceList.implementationName
      this.searchParams.businessCode = serviceList.businessCode
      this.searchParams.businessName = serviceList.businessName
      this.handleCurrentChange()
    },
    servicesCycle(frequencyType) {
      this.searchParams.updateFrequency = frequencyType
      this.handleCurrentChange()
    },
    servicesLicense(electronicType) {
      this.searchParams.electronicLicense = electronicType
      this.handleCurrentChange()
    },
    servicesResources(resourceType) {
      this.searchParams.dataFormat = resourceType
      this.handleCurrentChange()
    },
  },
}
</script>

<style lang="less" scoped>
#serviceItem {
  // height: 100%;
  background: #fff;
  padding-bottom: 24px;
  .divdata {
    width: 100%;
    height: 150px;
    p {
      font-size: 16px;
      color: darkgrey;
      text-align: center;
    }
  }
  .pagination-box {
    text-align: end;
  }
}
</style>
