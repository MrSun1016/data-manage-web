<template>
  <div>
    <Sharedetails ref="sharedetails" v-show="isshowHaredetails" @goBack="goBack" />
    <div id="InformationUseing" v-show="!isshowHaredetails">
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
        <el-table-column prop="shareType" label="数据类型">
          <template slot-scope="{ row }">
            {{ row.shareType || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="totalNumber" sortable label="数据共享量/被调用次数">
          <template slot-scope="{ row }">
            {{ row.totalNumber || '0' }}
          </template>
          <template slot="header">
            <div>
              <div>数据共享量/</div>
              <div>被调用次数</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="openDate" sortable label="数据开通时间">
          <template slot-scope="{ row }">
            <el-button type="text" @click="handleWorkBeing(row, '历史')"> {{ row.openDate || '-' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190px">
          <template slot-scope="scope">
            <el-button v-login type="text" size="small" @click="onReleaseData(scope.row)" v-has="'examine:releaseData'"
              >释放数据</el-button
            >
            <el-button v-login type="text" size="small" @click="onServiceData(scope.row)" v-has="'examine:usageData'"
              >使用数据</el-button
            >
            <el-button
              v-login
              type="text"
              size="small"
              v-if="scope.row.shareType != '接口'"
              @click="onRecord(scope.row)"
              v-has="'examine:record'"
              >使用记录</el-button
            >
            <el-button type="text" size="small" v-else>-</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 释放数据弹窗 -->
      <el-dialog class="small-mask" :visible.sync="releaseDialog" width="30%">
        <div class="title">提示</div>
        <div class="small-mask-info">
          <i class="el-icon-warning" style="color: #155bd4; font-size: 32px; margin-right: 10px"></i
          ><span style="color: #000000">是否确认提前释放数据？</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="releaseDialog = false">取消</el-button>
          <el-button size="mini" @click="verifyRelease" :loading="loading" type="primary">确认释放</el-button>
        </span>
      </el-dialog>
      <!-- 使用记录 -->
      <InformationRecord ref="record" />
    </div>
  </div>
</template>
<script>
import Sharedetails from '@/views/datefrom/components/Sharedetails'
import InformationRecord from '@views/share/components/InformationRecord'
import { getreleaseData, getUsageRecord } from '@/api/api'
import { Message } from 'element-ui'
export default {
  name: 'InformationUseing',
  components: { InformationRecord, Sharedetails },
  props: ['informationData'],
  data() {
    return {
      applicationShow: false,
      applyId: '',
      releaseDialog: false,
      loading: false,
      tableLoading: false,
      isshowHaredetails: false,
    }
  },
  methods: {
    goBack(val) {
      this.isshowHaredetails = val
      this.$emit('handleShow', this.isshowHaredetails)
    },
    handleWorkBeing(row, type) {
      let sign = '2'
      this.$router.push({
        path: '/MessageCenter/WorkOrderProcessing',
        query: {
          catalogId: row.catalogId,
          applyTitle: row.applyTitle,
          processCode: row.processCode,
          type,
          sign,
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
    onReleaseData(row) {
      this.applyId = row.applyId
      this.releaseDialog = true
    },
    // 使用数据跳转
    onServiceData(rowData) {
      this.$router.push({
        path: '/datasharing/useing/useData',
        query: { catalogId: rowData.catalogId, shareType: rowData.shareType, applyId: rowData.applyId },
      })
    },
    //释放数据
    verifyRelease() {
      getreleaseData(this.applyId).then((res) => {
        this.loading = true
        if (res.success) {
          this.loading = false
          this.releaseDialog = false
          Message({
            message: `操作${res.header.message}`,
            type: 'success',
          })
          this.$parent.initShareDataPage()
          // this.$emit('initShareDataPage')
        } else {
          Message({
            message: res.header.message,
            type: 'error',
          })
          this.loading = false
        }
      })
    },
    //时间转换
    timeCycle(da) {
      if (da != null) {
        var date = new Date(da)
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return Y + M + D + h + m + s
      }
    },
    onRecord(rowData) {
      this.$refs.record.recordDrawer = true
      this.$refs.record.title = rowData.applyTitle
      let applyId = rowData.applyId
      getUsageRecord({ applyId }).then((res) => {
        if (res.success) {
          this.$refs.record.shareHistory = res.body.content
          this.$refs.record.shareHistory.forEach((times) => {
            times.createdTime = this.timeCycle(times.createdTime)
          })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
#InformationUseing {
  /deep/.el-table th.el-table__cell > .cell {
    display: flex;
    align-items: center;
  }
  .title {
    height: 60px;
    color: #1890ff;
    line-height: 60px;
    padding-left: 32px;
    font-weight: 500;
    border-bottom: 1px solid #1890ff;
  }
  .small-mask-info {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /deep/ .el-dialog__body {
    padding: 0 0;
  }
  /deep/ .el-dialog__header {
    padding: 0 0;
  }
}
.itemSlotheden2 {
  width: 110px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align:left;
  user-select: unset;//设置允许复制el-button的内容
}
</style>
