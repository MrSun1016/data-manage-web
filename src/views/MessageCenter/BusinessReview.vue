<template>
  <el-row id="businessReview" :gutter="20" v-loading="loading1">
    <el-col class="business-review-info" :span="16">
      <div class="title">
        <i class="el-icon-back goback" @click="goBack"> </i>
        <span v-if="processDefinitionKey == 'catalogSubmit'">编目业务审核</span>
        <span v-else-if="processDefinitionKey == 'catalogUpShelf'">数据目录上架</span>
        <span v-if="processDefinitionKey == 'catalogOffShelf'">编目下架申请</span>
      </div>
      <div class="steps-data">
        <el-steps direction="vertical" :active="2">
          <el-step icon="el-icon-circle-check">
            <template slot="description">
              <!-- 数据编目业务审核表单 -->
              <dataCatalogue
                v-if="processDefinitionKey == 'catalogSubmit'"
                :datas="datas"
                :processDefinitionKey="processDefinitionKey"
              />
              <!-- <el-empty v-else description="暂无数据"></el-empty> -->
              <!-- 编目上架申请 -->
              <dataCatalogue
                v-if="processDefinitionKey == 'catalogUpShelf'"
                :processDefinitionKey="processDefinitionKey"
                :datas="datas"
              />
              <!-- <el-empty v-else description="暂无数据"></el-empty> -->
              <!-- 编目下架申请 -->
              <soldOut
                v-if="processDefinitionKey == 'catalogOffShelf'"
                :processDefinitionKey="processDefinitionKey"
                :datas="datas"
              />
              <!-- <el-empty v-else description="暂无数据"></el-empty> -->
            </template>
          </el-step>
          <el-step>
            <template slot="description">
              <!-- 理由 -->
              <div>
                <dataExplain
                  :datas="datas"
                  :completeByDateId="completeByDateId"
                  :processDefinitionKey="processDefinitionKey"
                />
              </div>
              <div class="btns" v-if="type != '历史'">
                <el-button type="primary" @click="onTransit('提交')" size="small">审批通过</el-button>
                <el-button @click="onReject('驳回')" size="small">驳回</el-button>
                <el-button @click="goBack" size="small">取消</el-button>
              </div>
            </template>
          </el-step>
        </el-steps>
      </div>
    </el-col>
    <el-col :span="8">
      <!-- 任务流转记录 -->
      <operationLog ref="operationLog" />
    </el-col>
    <!-- 确认弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" :before-close="handleClose" :z-index="100" width="30%">
      <!-- <el-divider style="color:#1890FF !important"></el-divider> -->
      <p class="dialogcenter">
        <i
          class="el-icon-warning"
          style="color: #1890ff; font-size: 20px; vertical-align: middle; margin-right: 5px"
        ></i>
        {{ `是否确认${tipInfo}该目录审核` }}
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCancel">取 消</el-button>
        <el-button size="small" type="primary" :loading="loading" @click="onApproved">{{
          loading ? '提交中...' : '确认'
        }}</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import dataCatalogue from '@views/MessageCenter/components/DataCatalogue'
import operationLog from '@views/MessageCenter/components/OperationLog'
import dataExplain from '@views/MessageCenter/components/DataExplain'
import soldOut from '@views/MessageCenter/components/SoldOut'
import { geApprovalData, getCompleteByDateId, getTaskRejectByDataId, getShelfApplication } from '@/api/api'
import { Message, MessageBox } from 'element-ui'
import SideMenu from '@/utils/SideMenu.js'
export default {
  name: 'BusinessReview',
  components: {
    dataCatalogue,
    operationLog,
    dataExplain,
    soldOut
  },
  data() {
    return {
      loading1: false,
      datas: {
        // result: [],
        times: '',
        tableDataDataList: [],
        businessAeview: {},
        workType: '',
        //下架审核数据
        soldOutData: {},
        //审批状态
        // catalogStatus: '',
        //上下价状态
        cataStatus: ''
      },
      tipInfo: '',
      loading: false,
      dialogVisible: false,
      ids: [],
      // 审批参数
      completeByDateId: {
        assignee: '',
        candidateGroups: [],
        candidateUsers: [],
        comment: '',
        dataId: '',
        instanceId: '',
        processCode: '',
        targetKey: '',
        taskId: '',
        userId: '',
        values: {}
      },
      type: '',
      resultItem: '',
      processDefinitionKey: '',
      processCode: '',
      executionId: '',
      taskNameId: ''
    }
  },
  methods: {
    handleCancel() {
      this.dialogVisible = false
      this.loading = false
    },
    fetchApprovalData() {
      this.loading1 = true
      geApprovalData(
        this.ids,
        this.processDefinitionKey,
        this.processCode,
        this.taskNameId,
        this.endTime,
        this.startTime,
        this.executionId
      )
        .then(res => {
          if (res.success) {
            this.datas.businessAeview = res.body
            this.datas.tableDataDataList = res.body.dataList
            this.datas.businessAeview.createdTime = this.timeCycle(this.datas.businessAeview.createdTime)
            this.datas.businessAeview.applyTime = this.timeCycle(this.datas.businessAeview.applyTime)
            this.datas.businessAeview.updateTime = this.timeCycle(this.datas.businessAeview.updateTime)
          } else {
            this.loading1 = false
            Message.error(res.header.message)
          }
        })
        .catch(e => {
          this.loading1 = false
        })
    },
    fetchShelfApplication() {
      getShelfApplication({ workType: this.$route.query.workType, id: this.$route.query.processCode }).then(res => {
        if (res.success) {
          this.loading1 = false
          this.datas.soldOutData = res.body
        } else {
          this.loading1 = false
        }
      })
    },
    goBack() {
      this.$router.back()
    },
    onTransit(val) {
      this.dialogVisible = true
      this.tipInfo = val
    },
    onReject(val) {
      this.dialogVisible = true
      this.tipInfo = val
    },
    handleClose(done) {
      MessageBox.confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    //时间转换
    timeCycle(da) {
      if (da != null) {
        var date = new Date(da)
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '  '
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return Y + M + D + h + m + s
      }
    },
    //操作提示
    operateTip() {
      Message({
        message: `${this.tipInfo}成功`,
        type: 'success'
      })
      this.loading = false
      this.dialogVisible = false
    },
    // 审批通过
    onApproved() {
      if (this.tipInfo == '提交') {
        this.loading = true
        getCompleteByDateId(this.completeByDateId).then(res => {
          if (res.code == 200) {
            setTimeout(() => {
              Message({
                message: `操作${res.message}`,
                type: 'success'
              })
              this.$bus.$emit('handleOnApproved')
              this.loading = false
              this.dialogVisible = false
              // this.$refs.operationLog.fetchFlowRecord()
              this.$router.push({ path: '/MessageCenter/WorkOrderProcessing' })
              this.$bus.$emit('onWorwOrderQuer') //刷新审批页面
            }, 1500)
          } else {
            Message.error(res.message)
            this.loading = false
            this.dialogVisible = false
          }
        })
      } else {
        // 驳回
        this.loading = true
        getTaskRejectByDataId(this.completeByDateId)
          .then(res => {
            if (res.code == 200) {
              setTimeout(() => {
                this.operateTip()
                this.goBack()
                this.$bus.$emit('handleOnApproved')
                // this.$refs.operationLog.fetchFlowRecord()
                this.$bus.$emit('onWorwOrderQuer') //刷新审批页面
              }, 1500)
            } else if (!res.success) {
              Message.error(res.header.message)
              this.loading = false
              this.dialogVisible = false
            } else {
              Message.error(res.header.message)
              this.loading = false
              this.dialogVisible = false
            }
          })
          .catch(_ => {
            this.loading = false
            this.dialogVisible = false
            Message.error('网络异常，请稍后重试')
          })
      }
      SideMenu.$emit('reload', 'msg') //刷新左侧菜单栏
    }
  },
  activated() {
    // this.processCode = this.$route.query.processCode
    // this.$refs.operationLog.fetchFlowRecord2(this.processCode)
    // this.fetchApprovalData()
    // this.fetchShelfApplication()
    // this.$refs.operationLog.fetchFlowRecord()
  },
  mounted() {
    this.processCode = this.$route.query.processCode
    if (this.$route.query.executionId != null) {
      this.executionId = this.$route.query.executionId
    }
    this.taskNameId = this.$route.query.taskNameId
    // this.$refs.operationLog.fetchFlowRecord()
    this.processDefinitionKey = this.$route.query.processDefinitionKey
    this.endTime = this.$route.query.endTime
    this.startTime = this.$route.query.startTime
    // this.fetchShelfApplication()
    this.type = this.$route.query.type
    this.$refs.operationLog.fetchFlowRecord2(this.processCode)
    this.fetchApprovalData()
    this.fetchShelfApplication()
  },
  created() {
    // this.fetchApprovalData()
    // this.fetchShelfApplication()
    this.completeByDateId.processCode = this.$route.query.processCode
    //审批状态
    // this.datas.catalogStatus = this.$route.query.catalogStatus
    //上下架状态
    this.datas.cataStatus = this.$route.query.cataStatus
    this.datas.workType = this.$route.query.workType
    this.ids.push(this.$route.query.id)
  }
}
</script>

<style lang="less" scoped>
@color: #1890ff;
#businessReview {
  width: 100%;
  height: 100%;
  .business-review-info {
    height: 100%;
    min-height: 758px;
    background: #fff;
    .title {
      color: @color;
      font-weight: 500;
      line-height: 60px;
      padding-left: 20px;
      margin-bottom: 24px;
      border-bottom: 1px solid @color;
      .steps-data {
        height: 100%;
        padding-left: 24px;
        background: #fff;
      }
    }
    .goback {
      color: #333333;
      font-size: 24px;
      margin-right: 36px;
      vertical-align: middle;
      cursor: pointer;
    }
  }

  .btns {
    padding: 0 0 24px 0;
  }
  /deep/.el-step.is-vertical .el-step__head {
    margin: 12px 32px !important;
  }
  .dialogcenter {
    margin: 50px 0;
    text-align: center;
  }
  /deep/ .el-dialog__body {
    padding: 0 0 !important;
  }
  /deep/.el-dialog__header {
    border-bottom: 1px solid #1890ff !important;
  }
}
</style>
