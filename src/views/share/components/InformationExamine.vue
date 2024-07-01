<template>
  <div>
    <Sharedetails ref="sharedetails" v-show="isshowHaredetails" @goBack="goBack" />
    <div id="InformationExamine" v-show="!isshowHaredetails">
      <el-table
        class="table-data"
        v-loading="tableLoading"
        :header-cell-style="{ background: '#E6F7FF', color: '#333333' }"
        :data="informationData"
        style="width: 100%"
      >
        <el-table-column prop="applyTitle" label="申请标题">
          <template slot-scope="{ row }">
            <el-tooltip class="item" effect="dark" :content="row.applyTitle" placement="top">
              <span>{{ row.applyTitleCopy || '-' }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="useAppSystem" label="使用应用系统">
          <template slot-scope="{ row }">
            {{ row.useAppSystem || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="catalogName" label="数据目录" :show-overflow-tooltip="true">
          <template slot-scope="{ row }">
            <!-- <a type="primary" @click="handleCataNameDet(row)"
              style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
              {{ row.catalogName || '-' }}
            </a> -->
            <el-button type="text" class="itemSlotheden2" @click="handleCataNameDet(row)">{{ row.catalogName || '-' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="applyDept" label="数源部门">
          <template slot-scope="{ row }">
            {{ row.applyDept || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="sourceUnit" label="申请部门">
          <template slot-scope="{ row }">
            {{ row.sourceUnit || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="shareType" label="数据类型">
          <template slot-scope="{ row }">
            {{ row.shareType || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="launchDate" sortable label="发起时间">
          <template slot-scope="{ row }">
            <el-button type="text" @click="handleWorkBeing(row, '历史')"> {{ row.launchDate || '-' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Sharedetails from '@/views/datefrom/components/Sharedetails'
import SharingApplication from '@views/MessageCenter/components/SharingApplication'
export default {
  name: 'InformationExamine',
  props: ['informationData'],
  components: {
    SharingApplication,
    Sharedetails,
  },
  data() {
    return {
      isshowHaredetails: false,
      tableLoading: false,
      applicationShow: false,
      formInline: {
        catalogName: '',
        sourceSystem: '',
        sourceUnit: '',
        status: '',
        cataStatus: '',
        imputationStatus: '',
        pageNum: 1,
        pageSize: 10,
        rowStart: 0,
      },
    }
  },
  created(){
    this.isshowHaredetails = false
  },
  methods: {
    goBack(val) {
      this.isshowHaredetails = val
      this.$emit('handleShow', this.isshowHaredetails)
    },
    handleWorkBeing(row, type) {
      let sign = '1'
      this.$router.push({
        path: '/MessageCenter/WorkOrderProcessing',
        query: {
          catalogId: row.catalogId,
          applyTitle: row.applyTitle,
          processCode: row.processCode,
          type: type,
          sign:sign
        },
      })
    },
    handleCataNameDet(row) {
      this.isshowHaredetails = true
      this.$emit('handleShow', this.isshowHaredetails)
      this.$refs.sharedetails.loading = true
      this.$refs.sharedetails.loading1 = true
      this.$refs.sharedetails.activeName = 'first'
      this.$refs.sharedetails.inquireData.catalogId = row.catalogId
      this.$refs.sharedetails.fetchShareDataPage()
      this.$refs.sharedetails.dateFrom()
      this.$refs.sharedetails.getDetailsLsit(row.catalogId, this.formInline)
    },
  },
}
</script>

<style lang="less" scoped>
// #InformationExamine{
//   margin-top: 24px;
// }
.itemSlotheden2 {
  width: 165px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align:left;
  user-select: unset;//设置允许复制el-button的内容
}
</style>