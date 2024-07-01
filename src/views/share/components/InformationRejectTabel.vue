<template>
  <div>
    <Sharedetails ref="sharedetails" v-show="isshowHaredetails" @goBack="goBack" />
    <div id="InformationTabel" v-show="!isshowHaredetails">
      <el-table
        class="table-data"
        v-loading="tableLoading"
        :header-cell-style="{ background: '#E6F7FF', color: '#333333' }"
        :data="informationData"
        style="width: 100%"
      >
        <!-- :cell-style="cellStyle" -->
        <el-table-column prop="applyTitle" label="申请标题">
          <template slot-scope="{ row }">
            <el-tooltip class="item" effect="dark" :content="row.applyTitle" placement="top">
              <span>{{ row.applyTitleCopy || '-' }}</span>
            </el-tooltip>
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
        <el-table-column label="驳回时间">
          <template slot-scope="{ row }">
            <el-button type="text" @click="handleWorkBeing(row,'历史')">{{ row.rejectDate || '-' }}</el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" @click="changeEdit(row)" v-has="'rejected:edit'">编辑</el-button>
          </template>
        </el-table-column>
      </el-table> 
      <!-- 申请接口-库表 -->
      <CatalogueDrawer ref="drawer" @onInquire="onInquire"/>
    </div>
  </div>
</template>
<script>
import Sharedetails from '@/views/datefrom/components/Sharedetails'
import SharingApplication from '@views/MessageCenter/components/SharingApplication'
import CatalogueDrawer from '@views/catalogue/components/CatalogueDrawer'
export default {
  name: 'InformationTabel',
  props: ['informationData'],
  components: {
    CatalogueDrawer,
    SharingApplication,
    Sharedetails,
  },
  data() {
    return {
      tableLoading: false,
      deitData: {},
      applicationShow: false,
      isshowHaredetails: false,
    }
  },
  methods: {
    goBack(val) {
      this.isshowHaredetails = val
      this.$emit('handleShow', this.isshowHaredetails)
    },
    handleWorkBeing(row, type) {
      let sign = '3'
      this.$router.push({
        path: '/MessageCenter/WorkOrderProcessing',
        query: {
          catalogId: row.catalogId,
          applyTitle: row.applyTitle,
          processCode: row.processCode,
          type,
          sign
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
    changeEdit(row) {
      this.$refs.drawer.drawer = true
      this.$refs.drawer.submitData.applyId = row.applyId
      this.$refs.drawer.processCode = row.processCode
      this.$refs.drawer.catalogId = row.catalogId
      this.$refs.drawer.title = row.shareType
      this.$refs.drawer.catalogName = row.catalogName
      this.$refs.drawer.applyId = row.applyId
      this.$refs.drawer.queryType = '编辑'
      this.$refs.drawer.checked = true
      this.$refs.drawer.checke = true
      this.$refs.drawer.disabled = false
      this.$refs.drawer.fetchApplyInfo(row.applyId)
      this.$refs.drawer.fetchDataItemInfo()
    },
    onInquire() {
      this.$emit('onInquire');
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
.itemSlotheden2 {
  width: 165px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align:left;
  user-select: unset;//设置允许复制el-button的内容
}
</style>
