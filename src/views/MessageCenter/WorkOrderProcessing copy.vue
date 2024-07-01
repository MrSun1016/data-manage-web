<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待处理工单" name="first">
        <el-card>
          <el-form :inline="true" ref="sizeForm" :model="queryWorkOrder" class="farderfromflex">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="工单类型" prop="region">
                  <el-input v-model="queryWorkOrder.workType" placeholder="请输入" class="aitemml"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="数据目录名称" prop="delivery">
                  <el-input v-model="queryWorkOrder.catalogName" placeholder="请输入" class="aitemml"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发起部门" prop="desc">
                  <el-input v-model="queryWorkOrder.launchDepartment" placeholder="请输入" class="aitemml"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="保存日期">
                  <el-date-picker
                    v-model="times"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="流程编码" prop="processCode">
                  <el-input v-model="queryWorkOrder.processCode" placeholder="请输入" class="aitemml"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item size="large">
                  <el-button type="primary" size="small" @click="onWorwOrderQuer()">查询</el-button>
                  <el-button size="small" @click="resetQueryWorkOrder">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <!-- 表格 -->
          <el-table
            :header-cell-style="{
              background: '#EAF1FE',
              fontWeight: '500',
              color: '#656565',
              fontSize: '14px',
            }"
            :data="workdata"
            style="width: 100%"
          >
            <el-table-column prop="workType" label="工单类型"></el-table-column>
            <el-table-column prop="catalogName" label="数据目录名称"></el-table-column>
            <el-table-column prop="launchDepartment" label="发起部门"></el-table-column>
            <el-table-column prop="starTime" label="提交时间"></el-table-column>
            <el-table-column prop="processCode" label="流程编码"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="onApproval(scope.row)">审批</el-button>
                <span slot="action">
                  <act-historic-detail-btn :data-id="scope.row.processCode"></act-historic-detail-btn>
                </span>
              </template>
            </el-table-column>
          </el-table>
          <div class="papgin">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryWorkOrder.pageNum"
              :page-sizes="pageSizes"
              :page-size="100"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount"
            >
            </el-pagination>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="已处理工单" name="second">
        <el-card>
          <el-form :inline="true" ref="sizeForm" :model="queryWorkOrder" class="farderfromflex">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="工单类型" prop="region">
                  <el-input v-model="queryWorkOrder.workType" placeholder="请输入" class="aitemml"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="流程编码" prop="delivery">
                  <el-input v-model="queryWorkOrder.processCode" placeholder="请输入" class="aitemml"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="编目名称" prop="desc">
                  <el-input v-model="queryWorkOrder.catalogName" placeholder="请输入" class="aitemml"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="申请部门" prop="resource">
                  <el-input v-model="queryWorkOrder.launchDepartment" placeholder="请输入" class="aitemml"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="提交时间">
                  <el-date-picker
                    v-model="times"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    class="pickerwei"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form-item label="审批时间">
                  <el-date-picker
                    v-model="sumbTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    class="pickerwei"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item size="large">
                  <el-button type="primary" size="small" @click="onWorwOrderQuer()">查询</el-button>
                  <el-button size="small" @click="resetQueryWorkOrder">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card>
          <!-- 表格 -->
          <el-table
            :header-cell-style="{
              background: '#EAF1FE',
              fontWeight: '500',
              color: '#656565',
              fontSize: '14px',
            }"
            :data="completedWorkOrder"
            style="width: 100%"
          >
            <el-table-column prop="workType" label="工单类型"></el-table-column>
            <el-table-column prop="processCode" label="流程编码"></el-table-column>
            <el-table-column prop="catalogName" label="数据名称"></el-table-column>
            <el-table-column prop="launchDepartment" label="申请部门"></el-table-column>
            <el-table-column prop="starTime" label="新建时间"></el-table-column>
            <el-table-column prop="approvalEndTime" label="审批时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!-- <el-button type="text" @click="onApproval(scope.row)">审批</el-button> -->
                <span slot="action">
                  <act-historic-detail-btn :data-id="scope.row.processCode"></act-historic-detail-btn>
                </span>
              </template>
            </el-table-column>
          </el-table>
          <div class="papgin">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryWorkOrder.pageNum"
              :page-sizes="pageSizes"
              :page-size="100"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount"
            >
            </el-pagination>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <!-- 数据编目业务审核-抽屉 -->
    <el-drawer :visible.sync="drawer" direction="rtl" size="1200px" :withHeader="false">
      <el-row class="data-form-left" :gutter="20">
        <el-col>
          <div class="data-form-title">数据编目业务审核</div>
          <div class="data-form-box">
            <el-steps direction="vertical" :active="2">
              <el-step title="数据编目" icon="el-icon-circle-check">
                <template slot="description">
                  <div class="times">{{ timeCycles }}</div>
                  <div class="purple description-info" style="padding-left: 20px">
                    <p class="jibentop">基本信息</p>
                    <el-form
                      :inline="true"
                      ref="form"
                      :model="businessAeview"
                      label-width="110px"
                      label-position="left"
                      class="elfromweit"
                    >
                      <el-form-item class="fromfont fromfontmarg" label="领域分类：">
                        <p class="frompfont">{{ businessAeview.keyAreasType || '暂无数据' }}</p>
                      </el-form-item>
                      <el-form-item class="fromfont" label="信息资源代码：">
                        <p class="frompfont">{{ businessAeview.id || '暂无数据' }}</p>
                      </el-form-item>
                      <el-form-item class="fromfont fromfontmarg" label="数源单位：">
                        <p class="frompfont">{{ businessAeview.sourceUnit || '暂无数据' }}</p>
                      </el-form-item>
                      <el-form-item class="fromfont" label="应用系统：">
                        <p class="frompfont">{{ businessAeview.sourceSystem || '暂无数据' }}</p>
                      </el-form-item>
                      <el-form-item class="fromfont fromfontmarg" label="共享类型：">
                        <p class="frompfont">{{ businessAeview.shareType || '暂无数据' }}</p>
                      </el-form-item>
                      <el-form-item class="fromfont" label="共享条件：">
                        <p class="frompfont">{{ businessAeview.shareCondition || '暂无数据' }}</p>
                      </el-form-item>
                      <el-form-item class="fromfont fromfontmarg" label="开放类型：">
                        <p class="frompfont">{{ businessAeview.openType || '暂无数据' }}</p>
                      </el-form-item>
                      <el-form-item class="fromfont" label="是否对社会开放">
                        <p class="frompfont">{{ businessAeview.openSociety || '暂无数据' }}</p>
                      </el-form-item>
                      <el-form-item class="fromfont fromfontmarg" label="数据范围：">
                        <p class="frompfont">{{ businessAeview.dataRange || '暂无数据' }}</p>
                      </el-form-item>
                      <el-form-item class="fromfont" label="更新频率：">
                        <p class="frompfont">{{ businessAeview.updateFrequency || '暂无数据' }}</p>
                      </el-form-item>
                      <el-form-item class="fromfont fromfontmarg" label="关联类目：">
                        <p class="frompfont">{{ businessAeview.baseLibrary || '暂无数据' }}</p>
                      </el-form-item>
                      <el-form-item class="fromfont" label="业务责任科室：">
                        <p class="frompfont">{{ businessAeview.businessDepartment || '暂无数据' }}</p>
                      </el-form-item>
                      <el-form-item class="fromfont fromfontmarg" label="业务责任人：">
                        <p class="frompfont">{{ businessAeview.businessPerson || '暂无数据' }}</p>
                      </el-form-item>
                      <el-form-item class="fromfont" label="联系方式：">
                        <p class="frompfont">{{ businessAeview.contactInformation || '暂无数据' }}</p>
                      </el-form-item>
                      <el-form-item class="fromfont fromfontmarg" label="信息资源摘要：">
                        <p class="frompfont">{{ businessAeview.informationSummary || '暂无数据' }}</p>
                      </el-form-item>
                    </el-form>
                    <h3>服务事项</h3>
                    <el-form ref="form" :model="businessAeview" label-width="168px">
                      <el-form-item label="是否关联政务服务事项：">
                        <el-radio-group v-model="businessAeview.relatedGovernment">
                          <el-radio label="是">是</el-radio>
                          <el-radio label="否">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-form>
                    <h3>基础库/专题库</h3>
                    <el-form ref="form" :model="businessAeview" label-width="168px">
                      <el-form-item label="是否关联基础库/专题库">
                        <el-radio-group v-model="businessAeview.baseLibrary">
                          <el-radio label="是">是</el-radio>
                          <el-radio label="否">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-form>
                    <p class="jibentop">数据项信息</p>
                    <el-table :data="tableDataDataList" class="tablecenter">
                      <el-table-column prop="name" label="中文名称"></el-table-column>
                      <el-table-column prop="enName" label="英文名称"></el-table-column>
                      <el-table-column prop="dataType" label="数据类型"></el-table-column>
                      <el-table-column prop="dataLength" label="数据长度"></el-table-column>
                      <el-table-column prop="shareProperty" label="共享属性"></el-table-column>
                      <el-table-column prop="openAttribute" label="开放属性"></el-table-column>
                      <el-table-column prop="primaryKey" label="是否主键"></el-table-column>
                      <el-table-column prop="nullValue" label="是否可为空" width="130px"></el-table-column>
                    </el-table>
                  </div>
                </template>
              </el-step>
              <el-step title="数据编目审核" icon="el-icon-edit">
                <template slot="description">
                  <div class="times">{{ timeCycles }}</div>
                  <div class="purple description-info">
                    <el-form el-form ref="sizeForm" :model="businessAeview" class="farderfromflex" label-width="110px">
                      <el-form-item label="信息资源摘要" class="fromtopmag">
                        <el-input
                          type="textarea"
                          :rows="3"
                          v-model="businessAeview.informationSummary"
                          placeholder="请输入（20字以上）"
                          class="frombigweiht"
                        ></el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </template>
              </el-step>
            </el-steps>
          </div>
          <!-- 操作按钮 -->
          <div class="handleBtn">
            <el-button type="primary" @click="onVerified">{{ loading ? '审核中...' : '审批通过' }}</el-button>
            <el-button @click="onTicketsreject">{{ reject ? '驳回中...' : '驳回' }}</el-button>
            <el-button @click="handeleCancle">取消</el-button>
          </div>
        </el-col>
        <!--工单操作日志-->
        <operation-log />
      </el-row>
      <el-col> </el-col>
    </el-drawer>
  </div>
</template>
<script>
import operationLog from '@views/MessageCenter/components/OperationLog'
import ActHistoricDetailBtn from '@views/flowable/components/ActHistoricDetailBtn'
import { getWorkcaTalog, getCompleteByDateId, getTaskRejectByDataId } from '@/api/api'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { mixinDevice } from '@/utils/mixin'
import { FlowableMixin } from '@views/flowable/mixin/FlowableMixin'
import { Message } from 'element-ui'
export default {
  name: 'WorkOrderProcessing',
  mixins: [JeecgListMixin, mixinDevice, FlowableMixin],
  components: {
    ActHistoricDetailBtn,
    operationLog,
  },
  data() {
    return {
      reject: false,
      loading: false,
      url: {
        list: '/api/flowcatalog/list',
        // list: "/test_demo/testDemo/list",
        delete: '/test_demo/testDemo/delete',
        deleteBatch: '/test_demo/testDemo/deleteBatch',
        exportXlsUrl: '/test_demo/testDemo/exportXls',
        importExcelUrl: 'test_demo/testDemo/importExcel',
      },
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
        values: {},
      },
      activeName: 'first',
      totalCount: 0,
      pageSizes: [10, 20, 30],
      times: [], //审批处理时间
      sumbTime: [], //提交时间
      queryWorkOrder: {
        orderByField: '',
        processCode: '',
        queryContent: 1, //查询内容 1为待处理工单 2已处理工单
        rowStart: '',
        workType: '', //工单类型
        starTime: '', //提交时间开始
        endTime: '', //提交结束时间
        processCode: '', //流程编码
        launchDepartment: '', //发起/申请部门
        id: 0,
        catalogName: '', //数据目录名称
        pageNum: 1,
        pageSize: 10,
        approvalStarTime: '', //审批开始时间
        approvalEndTime: '', //审批结束时间
      },
      //已处理工单数据
      completedWorkOrder: [],
      sizeForm: {
        region: '',
        delivery: '',
        resource: '',
        desc: '',
        date1: '',
        date2: '',
        value1: '',
        value2: '',
        name: '',
      },
      workdata: [],
      //  数据编目业务审核-抽屉开关
      drawer: false,
      formLabelAlign: {
        resource: '',
      },
      //弹窗表格数据
      tableDataDataList: [],
      //数据编目业务审核弹窗数据
      businessAeview: {},
      activities: [],
      timeCycles: '',
      timeRus: '',
    }
  },
  created() {
    //待处理/已处理工单
    this.handleClick()
  },
  methods: {
    //时间转换
    timeCycle(da) {
      if (da != null) {
        var date = new Date(da)
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() + ':'
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return Y + M + D + h + m + s
      }
    },
    //取消按钮
    handeleCancle() {
      this.drawer = false
    },
    //审批按钮
    onApproval(rowData) {
      this.$router.push({
        path: '/MessageCenter/BusinessReview',
        query: {
          params: rowData.id,
          workType:rowData.workType,
        },
      })
    },
    //驳回
    onTicketsreject() {
      this.reject = true
      getTaskRejectByDataId(this.completeByDateId).then((res) => {
        if (res.success) {
          Message({
            message: '驳回成功',
            type: 'success',
          })
          this.reject = false
          this.drawer = false
          this.handleClick()
        } else {
          Message.error('驳回失败')
          this.reject = false
        }
      })
    },
    //审核通过
    onVerified() {
      this.loading = true
      getCompleteByDateId(this.completeByDateId).then((res) => {
        if (res.success) {
          Message({
            message: '审核成功',
            type: 'success',
          })
          this.handleClick()
          this.drawer = false
          this.loading = false
        } else {
          Message.error('审核失败')
          this.loading = false
        }
      })
    },
    handleClick() {
      if (this.activeName == 'first') {
        getWorkcaTalog(this.queryWorkOrder).then((res) => {
          this.queryWorkOrder.starTime = this.times[0] //待处理工单提交时间
          this.queryWorkOrder.endTime = this.times[0]
          this.queryWorkOrder.queryContent = 1
          this.totalCount = res.body.total
          this.workdata = res.body.content
          //时间格式处理
          this.workdata.map((item, index) => {
            item.starTime = this.timeCycle(item.starTime)
          })
          if (res.success) {
            this.clearformdata()
          }
        })
      } else {
        this.queryWorkOrder.pageNum = 1
        this.queryWorkOrder.queryContent = 2
        getWorkcaTalog(this.queryWorkOrder).then((res) => {
          this.queryWorkOrder.starTime = this.times[0] //待处理工单提交时间
          this.queryWorkOrder.endTime = this.times[0]
          this.queryWorkOrder.approvalStarTime = this.sumbTime[0] //审批时间开始
          this.queryWorkOrder.approvalEndTime = this.sumbTime[1] //审批时间结束
          this.totalCount = res.body.total
          this.completedWorkOrder = res.body.content
          // 时间格式处理
          this.completedWorkOrder.map((item, i) => {
            item.approvalEndTime = this.timeCycle(item.approvalEndTime)
            item.starTime = this.timeCycle(item.starTime)
          })
          if (res.success) {
            this.clearformdata()
          }
        })
      }
    },
    //每页显示几条
    handleSizeChange(pageSizes) {
      this.queryWorkOrder.pageSize = pageSizes
      this.handeleQuerstWork()
    },
    //分页查询
    handleCurrentChange(page) {
      this.queryWorkOrder.pageNum = page
      this.handeleQuerstWork()
    },
    //判断请求
    handeleQuerstWork() {
      if (this.activeName == 'first') {
        this.queryWorkOrder.queryContent = 1
        getWorkcaTalog(this.queryWorkOrder).then((res) => {
          this.queryWorkOrder.starTime = this.times[0] //待处理工单提交时间
          this.queryWorkOrder.endTime = this.times[0]
          this.totalCount = res.body.total
          this.workdata = res.body.content
          //时间格式处理
          this.workdata.map((item, index) => {
            item.starTime = this.timeCycle(item.starTime)
          })
          if (res.success) {
            this.clearformdata()
          }
        })
      } else {
        this.queryWorkOrder.queryContent = 2
        getWorkcaTalog(this.queryWorkOrder).then((res) => {
          this.queryWorkOrder.starTime = this.times[0] //待处理工单提交时间
          this.queryWorkOrder.endTime = this.times[0]
          this.queryWorkOrder.approvalStarTime = this.sumbTime[0] //审批时间开始
          this.queryWorkOrder.approvalEndTime = this.sumbTime[1] //审批时间结束
          this.totalCount = res.body.total
          this.completedWorkOrder = res.body.content
          // 时间格式处理
          this.completedWorkOrder.map((item, i) => {
            item.approvalEndTime = this.timeCycle(item.approvalEndTime)
            item.starTime = this.timeCycle(item.starTime)
          })
          if (res.success) {
            this.clearformdata()
          }
        })
      }
    },
    //清空查询表单
    clearformdata() {
      ;(this.queryWorkOrder = {
        orderByField: '',
        processCode: '',
        queryContent: 1, //查询内容 1为待处理工单 2已处理工单
        rowStart: '',
        workType: '', //工单类型
        starTime: '', //提交时间开始
        endTime: '', //提交结束时间
        processCode: '', //流程编码
        launchDepartment: '', //发起/申请部门
        id: 0,
        catalogName: '', //数据目录名称
        pageNum: 1,
        pageSize: 10,
        approvalStarTime: '', //审批开始时间
        approvalEndTime: '', //审批结束时间
      }),
        (this.times = [])
      this.sumbTime = []
    },
    //查询工单列表
    onWorwOrderQuer() {
      console.log(this.activeName, '查询工单列表')
      this.handeleQuerstWork()
      this.clearformdata()
    },
    resetForm(sizeForm) {
      this.$refs[sizeForm].resetFields()
    },
    resetQueryWorkOrder() {
      this.clearformdata()
    },
  },
}
</script>

<style lang="less" scoped>
@color: #1890ff;
/deep/.el-drawer__body {
  background: #f1f3f4;
}

.data-form-left {
  display: flex;
  height: 100%;
  .data-form-title {
    // height: 40px !important;
    color: @color;
    font-weight: 500;
    padding: 20px 20px;
    background: #fff;
    border-bottom: 1px solid @color;
  }
}
.data-form-box {
  // height: 0 !important;
  padding: 20px;
  background: #fff;
  .times {
    color: #333333;
    margin: 10px 0;
  }
  /deep/ .el-step__title.is-finish {
    color: #333333 !important;
  }
}
// .operation-log {
//   width: 500px;
//   height: 100vh;
//   margin: 0 20px;
//   background-color: #fff !important;
// }
.handleBtn {
  background: #fff;
  padding: 20px 55px;
}
.el-tabs__header {
  margin: 0;
}
.pickerwei {
  width: 600px;
}
::v-deep .el-drawer__header {
  margin: 0;
}

.purple {
  width: 100%;
  height: 100%;
  // background: #fff;
  color: rgb(46, 46, 46);
  // padding-left: 20px;
}
.description-info {
  background: #f8fafb;
}
.jibentop {
  margin: 10px 0 0 0;
  font-size: 14px;
  font-weight: 700;
  padding: 15px 0;
}
.order-log {
  border-bottom: 1px solid #1890ff;
  color: @color;
  padding-left: 20px;
}
::v-deep .el-form-item__label {
  font-size: 13px;
}
.elfromweit {
  margin-left: 20px;
}
::v-deep .el-form-item {
  margin-bottom: 15px;
}
.fromfont {
  margin-top: 0;
  width: 310px;
  height: 40px;
}
.fromfontmarg {
  margin-right: 50px;
}
.frompfont {
  font-size: 13px;
  color: #313131;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.frombigweiht {
  width: 100%-20px;
}
.papgin {
  text-align: right;
  margin-top: 25px;
  background: #fff;
}
/deep/ .el-step__description {
  padding-right: 0 !important;
}
// /deep/ .timeHistory {
//   padding: 10px 0 0 0 !important;
//   padding: 20px !important;
// }
</style>
