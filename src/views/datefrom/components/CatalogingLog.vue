<template>
  <div id="InformationRecord">
    <!-- :before-close="handleClose" -->
    <el-drawer direction="rtl" ref="ationdrawer" size="60%" :visible.sync="catalogingItem" :withHeader="false">
      <div class="title">
        <div class="nameItem">{{ headerList.catalogName || '-' }}</div>
        <div class="lilist">
          <div class="headerItem">
            重点领域分类：<span>{{ headerList.keyAreasType }}</span>
          </div>
          <div class="headerItem">
            数源部门：<span>{{ headerList.sourceUnit || '-' }}</span>
          </div>
          <div class="headerItem">
            状态：<span>{{ headerList.catalogStatuStr || '-' }}</span>
            <!-- 状态：<span>{{ `${catalogStatuStr}${cataStatuStr}` || '-' }}</span> -->
          </div>
          <div class="headerItem">
            数据量：<span>{{ headerList.tableNum || '0' }}条</span>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- v-if="shareHistory.length" -->
      <el-timeline class="timelinemargin" v-loading="drawerLoading">
        <el-timeline-item
          v-for="historyItem in shareHistory"
          :key="historyItem.createdTime"
          :address="historyItem.createdTime"
          type="primary"
          color="#409EFF"
          placement="top"
        >
          <div class="headerDiv">
            <p class="headerp1">{{ historyItem.operationName || '-' }}</p>
            <p class="headerp2">操作部门：{{ historyItem.operationDepart || '-' }}</p>
            <p class="headerp2">操作人：{{ historyItem.userName || '-' }}</p>
          </div>
          <div class="timelineItem">
            <div class="year">{{ historyItem.operationTime || '-' }}</div>
            <div
              class="item"
              v-if="
                historyItem.operationName != '编目上架' &&
                  historyItem.operationName != '目录删除' &&
                  historyItem.operationName != '目录恢复' &&
                  historyItem.operationName != '释放数据' &&
                  historyItem.operationName != '库表取消挂载' &&
                  historyItem.operationName != '库表重新挂载' &&
                  historyItem.operationName != '接口重新挂载' &&
                  historyItem.operationName != '接口取消挂载'
              "
            >
              <!-- 简介 -->
              <ApprovalResults
                ref="results"
                v-if="
                  historyItem.operationName == '目录新增审核' ||
                    historyItem.operationName == '目录上架审核' ||
                    historyItem.operationName == '目录下架审核' ||
                    historyItem.operationName == '目录共享审核（市级政数局）'
                "
                :shareHistory="
                  historyItem.operationName == '目录上架审核'
                    ? historyItem.upShelfProcess
                    : historyItem.operationName == '目录下架审核'
                    ? historyItem.offShelfProcess
                    : historyItem.operationName == '目录新增审核'
                    ? historyItem.catalogProcess
                    : historyItem.catalogUpdate
                "
              ></ApprovalResults>
              <!-- 事权部门 -->
              <ApprovalAuthorities
                :upShelfProcess="historyItem.bureauProcess"
                v-if="historyItem.operationName == '目录共享审核（区县政数局）'"
              ></ApprovalAuthorities>
              <!-- <div>
                <div style="margin-bottom: 5px" class="timelineFlex">
                  <div class="timelineDivwei">{{ `${title}  ${historyItem.operationName}详情` }}</div>
                </div> -->
              <!-- 新增 -->

              <NewDirectory
                v-if="
                  historyItem.operationName == '数据编目' ||
                    historyItem.operationName == '新增目录' ||
                    historyItem.operationName == '目录修改'
                "
                :datas="
                  historyItem.operationName == '数据编目'
                    ? historyItem.catalogCatalog
                    : historyItem.operationName == '新增目录'
                    ? historyItem.catalogSave
                    : historyItem.catalogUpdate[0]
                "
              ></NewDirectory>
              <!-- 下架申请 -->
              <offShelfApplication
                :businessAeview="historyItem.catalogApplyOffShelf"
                v-if="historyItem.operationName == '申请下架'"
              ></offShelfApplication>
              <!-- 共享申请 -->
              <SharingApplicationLog
                :gxCategoryApplyBo="historyItem.powerProcess"
                :dataItemAllList="historyItem.dataItemAllList"
                v-if="historyItem.operationName == '共享申请'"
              ></SharingApplicationLog>
              <!-- 目录共享审核 -->
              <DirectorySharingAudit
                :sourceProcess="historyItem.sourceProcess"
                :dataItemAllList="historyItem.dataItemAllList"
                v-if="historyItem.operationName == '目录共享审核（数源部门）'"
              ></DirectorySharingAudit>

              <!-- </div> -->
              <div
                style="margin-bottom: 5px"
                class="timelineFlex"
                v-if="historyItem.operationName == 'Excel表格数据上传'"
              >
                <div class="timelineDivwei">新增数据量:</div>
                <span>{{ historyItem.upShelfProcess.notionalPoolingNum }}条</span>
              </div>

              <!-- <div class="itemdivflex">
                <div style="margin-bottom: 5px" class="timelinedivitem">
                  <div class="timelinewei">操作人：</div>
                  <span>25252525</span>
                </div>
                <div style="margin-bottom: 5px" class="timelinedivitem">
                  <div class="timelineweibig">操作部门：</div>
                  <span>66666</span>
                </div>
              </div> -->
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
      <div class="butflex">
        <el-button class="butleft" @click="cancelForm">返 回</el-button>
      </div>
      <!-- v-else -->
      <!-- <div class="nodata">暂无数据</div> -->
    </el-drawer>
  </div>
</template>

<script>
import NewDirectory from '@/views/datefrom/components/NewDirectory'
import ApprovalResults from '@/views/datefrom/components/ApprovalResults'
import ApprovalAuthorities from '@/views/datefrom/components/ApprovalAuthorities'
import offShelfApplication from '@/views/datefrom/components/offShelfApplication'
import SharingApplicationLog from '@/views/datefrom/components/SharingApplicationLog'
import DirectorySharingAudit from '@/views/datefrom/components/DirectorySharingAudit'
import { Message, MessageBox } from 'element-ui'
import { logList } from '@/api/department'
import { geApprovalData, getLogById } from '@/api/api'
import qs from 'qs'
export default {
  name: 'CatalogingLog',
  components: {
    NewDirectory,
    ApprovalResults,
    ApprovalAuthorities,
    offShelfApplication,
    SharingApplicationLog,
    DirectorySharingAudit
  },
  data() {
    return {
      shareHistory: [],
      title: '名字',
      sourceUnit: '',
      catalogStatuStr: '',
      cataStatuStr: '',
      catalogingItem: false,
      drawerLoading: false,
      // 表头
      headerList: {},
      // 编目的详情/新增/数据编目
      datas: {},
      // 新增
      newDataList: {}
    }
  },
  mounted() {},
  methods: {
    getLogList(row) {
      this.shareHistory = []
      this.drawerLoading = true
      // this.title = row.catalogName
      // this.sourceUnit = row.sourceUnit
      // this.catalogStatuStr = row.catalogStatuStr
      // this.cataStatuStr = row.cataStatuStr
      console.log(row)
      let condition = { id: row.id }
      logList(condition).then(res => {
        if (res.success) {
          this.shareHistory = res.body
          this.shareHistory.map((item, index) => {
            item.operationTime = this.formatTime(item.operationTime)
          })
          // this.datas = res.body.catalogSave
          // console.log('res', res.body.catalogSave)
          // console.log('this.dates', this.dates)

          this.drawerLoading = false
        } else {
          Message.error(res.header.message)
        }
      })
      // 表头
      let mountList = qs.stringify({ id: row.id })
      getLogById(mountList).then(res => {
        if (res.success) {
          this.headerList = res.body
          // this.shareHistory.map((item, index) => {
          //   item.operationTime = this.formatTime(item.operationTime)
          // })
          // this.drawerLoading = false
        }
      })
      // 新增详情
      // let processDefinitionKey = ''
      // let processCode = ''
      // let taskNameId = ''
      // geApprovalData(row.id, processDefinitionKey, processCode, taskNameId).then(res => {
      //   if (res.success) {
      //     this.datas = res.body
      //     console.log('datas', this.datas)
      //   }
      // })
      // 审核
      // if (
      //   this.shareHistory.operationName == '目录新增审核' ||
      //   this.shareHistory.operationName == '目录上架审核' ||
      //   this.shareHistory.operationName == '目录下架审核'
      // ) {
      //   this.$refs.results.getApproval(row, shareHistory)
      // }
    },

    cancelForm() {
      this.catalogingItem = false
    },
    handleFormShow() {
      this.showForm = !this.showForm
    }
  }
}
</script>

<style lang="less" scoped>
#InformationRecord {
  width: 100%;
  height: 100%;

  .title {
    width: 100%;
    display: flex;
    // justify-content: space-between;
    padding: 0 25px;
    height: 60px;
    border-bottom: 1px solid #1890ff;
    .nameItem {
      width: 20%;
      color: #1890ff;
      line-height: 60px;
      font-size: 16px;
      font-weight: 500;
      overflow: hidden; //超出的文本隐藏
      white-space: nowrap;
    }
    .lilist {
      width: 80%;
      display: flex;
      justify-content: space-between;
      .headerItem {
        line-height: 60px;
      }
    }
  }
}
/deep/.el-card__header {
  padding: 0;
}
// 抽屉
::v-deep .el-divider {
  background-color: #1890ff;
}
::v-deep .el-drawer__header {
  margin-bottom: 20px;
}
::v-deep .el-drawer__header > span {
  font-size: 16px;
  color: #1890ff;
}
/deep/.el-divider--horizontal {
  background-color: #1890ff;
  margin-top: 0;
}

/deep/.el-timeline-item__tail {
  border-left: 2px solid #1890ff;
}
/deep/.el-timeline-item__wrapper {
  padding-left: 30px;
}
/deep/.el-timeline-item__node--normal {
  width: 15px;
  height: 15px;
  left: -2px;
}
.timelinemargin {
  padding-left: 150px;
}
.nodata {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #909399;
}
.headerDiv {
  display: flex;
  .headerp1 {
    margin-right: 50px;
    font-weight: 500;
    font-size: 16px;
  }
  .headerp2 {
    margin-right: 25px;
  }
  p {
    margin-bottom: 5px;
  }
}
/deep/.el-timeline-item__timestamp.is-top {
  padding-top: 0px;
}
.timelineItem {
  width: 95%;
  // background-color: #f8fafb;
  // background-color: #ffffff;
  padding: 20px 20px 20px 0;
  .timelineFlex {
    display: flex;

    span {
      font-size: 14px;
      color: #777777;
    }
  }
}
.timelineDivwei {
  width: 120px;
  //   color: #333333;
  font-size: 14px;
  margin: 0 15px 10px 0;
}
.year {
  width: 100px;
  text-align: center;
  color: #333333;
  font-weight: 500;
  font-size: 16px;
  position: absolute;
  left: -130px;
  top: 1px;
}
.year2 {
  color: #333333;
  font-size: 16px;
  position: absolute;
  left: -100px;
  top: 20px;
}
.item {
  width: 100%;
  background-color: #f8fafb;
  // margin-left: 25px;
  padding: 20px;
  font-size: 14px;
  .itemdivflex {
    display: flex;
    .timelinedivitem {
      display: flex;
      width: 20%;
      margin: 0 40px 12px 0;
      .timelinewei {
        // width: 60px;
      }
      .timelineweibig {
        width: 75px;
      }
      span {
        // width: 60px;
        font-size: 14px;
        color: #777777;
      }
    }
  }
}
.timelineForm {
  /deep/.el-form-item {
    height: 36px;
    margin: 0;
  }
}
.butflex {
  display: flex;
  flex-direction: row-reverse;
  .butleft {
    margin: 0 50px 20px 0;
  }
}
</style>
