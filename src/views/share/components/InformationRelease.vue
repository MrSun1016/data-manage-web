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
            {{ row.openDate || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="shareOffDate" sortable label="数据释放时间">
          <template slot-scope="{ row }">
            {{ row.shareOffDate || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="shareOffStatus" sortable label="释放原因">
          <template slot-scope="{ row }">
            {{
              row.shareOffStatus == 1
                ? '正常释放'
                : row.shareOffStatus == 2
                ? '手动释放'
                : row.shareOffStatus == 3
                ? '类目下架'
                : '类目删除' || '-'
            }}
          </template>
        </el-table-column>
        <el-table-column label="查看">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="scope.row.shareType != '接口'" @click="onRecord(scope.row)" v-has="'releasedlist:record'"
              >使用记录</el-button
            >
            <el-button type="text" size="small" v-else>-</el-button>

            <!-- <el-button
            type="text"
            size="small"
            :disabled="shareType == '库表' ? false : true"
            @click="onRecord(scope.row)"
            >{{ shareType == '库表' ? '使用记录' : '-' }}</el-button
          > -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 使用记录 -->
      <InformationRecord ref="record" />
    </div>
  </div>
</template>

<script>
import Sharedetails from '@/views/datefrom/components/Sharedetails'
import InformationRecord from '@views/share/components/InformationRecord'
import { getUsageRecord } from '@/api/api'
export default {
  name: 'InformationExamine',
  props: ['informationData'],
  components: {
    InformationRecord,
    Sharedetails,
  },
  data() {
    return {
      shareType: '',
      tableLoading: false,
      isshowHaredetails:false,
    }
  },
  watch: {
    informationData(newValue, oldValue) {
      newValue.forEach((i) => {
        this.shareType = i.shareType
      })
    },
  },
  methods: {
    goBack(val) {
      this.isshowHaredetails = val
      this.$emit('handleShow', this.isshowHaredetails)
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
    onRecord(rowData) {
      this.$refs.record.recordDrawer = true
      let applyId = rowData.applyId
      this.$refs.record.title = rowData.applyTitle
      getUsageRecord({ applyId }).then((res) => {
        if (res.success) {
          this.$refs.record.shareHistory = res.body.content
          this.$refs.record.shareHistory.forEach((times) => {
            times.createdTime = this.formatTime(times.createdTime)
          })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.el-table th.el-table__cell > .cell {
  display: flex;
  align-items: center;
}
.itemSlotheden2 {
  width: 90px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align:left;
  user-select: unset;//设置允许复制el-button的内容
}
</style>
