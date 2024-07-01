<template>
  <div id="agency">
    <el-card class="agency-info" style="background-color: #fff">
      <!-- 代办事项 -->
      <div class="matter-await" style="margin-right: 24px">
        <div class="content-title">
          <div class="circle"></div>
          <div class="await-title">代办事项</div>
        </div>
        <div class="matter-info">
          <div @click="handleAwaitWork('待处理')">
            <div>{{ workOrderData.workTotal || '0' }}</div>
            <div>待处理工单</div>
          </div>
          <div @click="handleMessage('未读')" style="margin-left: 40px">
            <div>{{ workOrderData.totalMessages || '0' }}</div>
            <div>未读消息</div>
          </div>
        </div>
      </div>
      <!-- 已办事项 -->
      <div class="matter-await">
        <div class="content-title">
          <div class="circle"></div>
          <div class="await-title">已办事项</div>
        </div>
        <div class="matter-info">
          <div @click="handleAwaitWork('待处理')">
            <div class="count">{{ workTodoData.allWorkTotal || '0' }}</div>
            <div>已发起工单</div>
          </div>
          <div @click="handleAwaitWork('待处理')" style="margin: 0 40px">
            <div class="count">{{ workTodoData.handleTotal || '0' }}</div>
            <div>已处理工单</div>
          </div>
          <div @click="handleMessage('已读')">
            <div class="count">{{ workTodoData.readTotal || '0' }}</div>
            <div>已读消息</div>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 归集情况-->
    <el-card class="my-agency">
      <div class="title">
        <img style="margin-right: 8px" class="imgs" src="../../../assets/jiantou.png" alt="" />
        <div>Excel归集情况</div>
      </div>
      <div class="my-info">
        <div class="items" @click="hanleRoute('待更新', '每日')">
          <div class="items-title">当日待更新</div>
          <div class="count">{{ excelCatalogData.dayWaitNum || '0' }}个</div>
        </div>
        <div class="items" @click="hanleRoute('待更新', '每周')">
          <div class="items-title">本周待更新</div>
          <div class="count">{{ excelCatalogData.weekWaitNum || '0' }}个</div>
        </div>
        <div class="items" @click="hanleRoute('待更新', '')">
          <div class="items-title">历史逾期</div>
          <div class="count">{{ excelCatalogData.historyWaitNum || '0' }}个</div>
        </div>
      </div>
    </el-card>
    <!--库表归集情况 -->
    <el-card class="my-agency">
      <div class="title">
        <img style="margin-right: 8px" class="imgs" src="../../../assets/jiantou.png" alt="" />
        <div>库表归集情况</div>
      </div>
      <div class="my-info">
        <div class="items" @click="hanleCusaRoute('待更新', '每日')">
          <div class="items-title">当日待更新</div>
          <div class="count">{{ excelCatalogData.tableDayWaitNum || '0' }}个</div>
        </div>
        <div class="items" @click="hanleCusaRoute('待更新', '每周')">
          <div class="items-title">本周待更新</div>
          <div class="count">{{ excelCatalogData.tableWeekWaitNum || '0' }}个</div>
        </div>
        <div class="items" @click="hanleCusaRoute('待更新', '')">
          <div class="items-title">历史逾期</div>
          <div class="count">{{ excelCatalogData.tableHistoryWaitNum || '0' }}个</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getWorkOrder, getToDo, getCollectNum, getMyApply } from '@/api/api'
export default {
  name: 'homeagency',
  data() {
    return {
      // 代办事项请求参数
      workOrderCountBo: {
        queryContent: 1,
      },
      // 已办事项请求参数
      workOrderTodo: {
        queryContent: 2,
      },
      workOrderData: {},
      workTodoData: {},
      excelCatalogData: {},
      // myApplyData: {},
    }
  },
  created() {
    this.fetchWorkOrder()
    this.fetchTodo()
    this.fetchCollectNum()
    // this.getMyApply()
  },
  methods: {
    handleMessage(mesageType) {
      this.$router.push({
        path: '/MessageCenter/MessageNotification',
        query: {
          mesageType,
        },
      })
      // this.$bus.$emit('handleMessType',mesageType)
    },
    handleAwaitWork(workType) {
      this.$router.push({
        path: '/MessageCenter/WorkOrderProcessing',
        query: {
          workType,
        },
      })
    },
    handleShareRoute(type) {
      this.$router.push({
        path: '/share/informationsharing',
        query: {
          type,
        },
      })
    },
    hanleRoute(type, date) {
      this.$router.push({
        path: '/datacollection/Exceldatareporting',
        query: {
          type,
          date,
        },
      })
    },
    hanleCusaRoute(type, date) {
      this.$router.push({
        path: '/datacollection/LibraryTableUpdate',
        query: {
          type,
          date,
        },
      })
    },
    // getMyApply() {
    //   getMyApply().then((res) => {
    //     if (res.success) {
    //       this.myApplyData = res.body
    //       this.myApplyData.sharingApproval = this.formatNumber(this.myApplyData.sharingApproval)
    //       this.myApplyData.using = this.formatNumber(this.myApplyData.using)
    //       this.myApplyData.historySharing = this.formatNumber(this.myApplyData.historySharing)
    //     }
    //   })
    // },

    fetchWorkOrder() {
      getWorkOrder(this.workOrderCountBo).then((res) => {
        if (res.success) {
          this.workOrderData = res.body
          this.workOrderData.workTotal = this.formatNumber(this.workOrderData.workTotal)
          this.workOrderData.totalMessages = this.formatNumber(this.workOrderData.totalMessages)
        }
      })
    },
    fetchTodo() {
      getToDo(this.workOrderTodo).then((res) => {
        if (res.success) {
          this.workTodoData = res.body
          this.workTodoData.allWorkTotal = this.formatNumber(this.workTodoData.allWorkTotal)
          this.workTodoData.handleTotal = this.formatNumber(this.workTodoData.handleTotal)
          this.workTodoData.readTotal = this.formatNumber(this.workTodoData.readTotal)
        }
      })
    },
    fetchCollectNum() {
      getCollectNum().then((res) => {
        if (res.success) {
          this.excelCatalogData = res.body
          this.excelCatalogData.dayWaitNum = this.formatNumber(this.excelCatalogData.dayWaitNum)
          this.excelCatalogData.weekWaitNum = this.formatNumber(this.excelCatalogData.weekWaitNum)
          this.excelCatalogData.historyWaitNum = this.formatNumber(this.excelCatalogData.historyWaitNum)
          this.excelCatalogData.tableDayWaitNum = this.formatNumber(this.excelCatalogData.tableDayWaitNum)
          this.excelCatalogData.tableWeekWaitNum = this.formatNumber(this.excelCatalogData.tableWeekWaitNum)
          this.excelCatalogData.tableHistoryWaitNum = this.formatNumber(this.excelCatalogData.tableHistoryWaitNum)
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
#agency {
  display: flex;
  // height: 330px;
  margin-top: 42px;
  justify-content: space-between;
  .agency-info {
    width: 48%;
    display: flex;
    // .matter-await{
    //   display: flex;
    // }
    .content-title {
      display: flex;
      align-items: center;
      margin: 24px 0 24px 12px;
    }
    .matter-info {
      display: flex;
      text-align: center;
      color: #1890ff;
      cursor: pointer;
      margin: 24px 0 0 30px;
    }
    .title {
      display: flex;
      align-items: center;
      height: 60px;
      color: #1890ff;
      background: #e6f7ff;
      .circle {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #ff7d00;
        margin: 0 12px;
      }
    }
    .info {
      background: #fff;
      padding: 18px 0;
      .count-items {
        display: flex;
        text-align: center;
        .item {
          width: 50%;
          color: #1890ff;
          .counts {
            font-size: 28px;
          }
          .count-title {
            font-size: 14px;
          }
        }
      }
    }
    .title2 {
      display: flex;
      align-items: center;
      height: 60px;
      color: #1890ff;
      margin-top: 48px;
      .circle {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #00b42a;
        margin: 0 12px;
      }
    }
    .infom {
      display: flex;
      text-align: center;
      justify-content: space-between;
      color: #1890ff;
      padding: 0 18px;
      .count {
        font-size: 28px;
      }
    }
  }
  .my-agency {
    width: 24%;
    background: #fff;
    .title {
      display: flex;
      align-items: center;
      height: 60px;
      color: #1890ff;
      padding: 0 12px;
      background: #e6f7ff;
    }
    .my-info {
      background: #fff;
      padding: 12px 0;
      // margin-top: 15px;
      .items {
        // height: 70px;
        // line-height: 70px;
        display: flex;
        justify-content: space-between;
        padding: 4px 16px;
        cursor: pointer;
        .items-title {
          color: #1890ff;
        }
        .count {
          // color: #1890ff;
        }
      }
    }
  }
  .imgs {
    width: 24px;
  }
}
.circle {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #1890ff;
  margin-right: 8px;
}
/deep/.el-card__body {
  padding: 0 0 !important;
}
/deep/.agency-info .el-card__body {
  display: flex;
}
</style>