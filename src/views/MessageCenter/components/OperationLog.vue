<template>
  <el-col class="operation-log">
    <div class="purple">
      <p class="jibentop order-log">工单操作日志</p>
      <el-timeline class="timeHistory">
        <el-timeline-item v-for="item in activities" :key="item.duration" :color="item.color">
          <span :style="item.comment == null ? 'color:#e5e7ec' : 'color:#333;'"> {{ item.taskName || '-' }}</span>
          <span
            style="margin-left: 16px;font-size=12px;"
            :style="item.comment == null ? 'color:#e5e7ec' : 'color:#333;'"
            >{{ item.createTime || '-' }}</span
          >
          <p style="margin-top: 10px;" :style="item.comment == null ? 'color:#e5e7ec' : 'color:#333;'">
            {{ item.assigneeName || '-' }}
          </p>
        </el-timeline-item>
        <!-- :timestamp="activity.timestamp"  -->
      </el-timeline>
    </div>
  </el-col>
</template>

<script>
import { flowRecord } from '@views/flowable/api/finished'
export default {
  name: 'OperationLog',
  data() {
    return {
      activities: [],
      processCode: ''
    }
  },
  activated() {
    this.$bus.$on('onflowRecord', processCode => {
      this.processCode = processCode
      this.fetchFlowRecord()
    })
    this.$bus.$on('onViewMessage', processCode => {
      this.processCode = processCode
      this.fetchFlowRecord()
    })
    this.$bus.$on('onViewMessagexiao', processCode => {
      this.processCode = processCode
      this.fetchFlowRecord()
    })
  },
  mounted() {},
  beforeDestroy() {
    this.$bus.$off('onflowRecord')
    this.$bus.$off('onViewMessage')
    this.$bus.$off('onViewMessagexiao')
    // this.$bus.$off('onflowRecord', 'onViewMessage', 'onViewMessagexiao')
  },
  created() {},
  methods: {
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
    fetchFlowRecord() {
      flowRecord({ processCode: this.processCode }).then(res => {
        this.activities = res.result.flowList
        this.activities.forEach(item => {
          if (item.comment == null) {
            item.color = '#e5e7ec'
          } else {
            item.color = '#1890FF'
          }
          item.createTime = this.timeCycle(item.createTime)
        })
      })
    },
    fetchFlowRecord2(processCode) {
      flowRecord({ processCode }).then(res => {
        this.activities = res.result.flowList
        this.activities.forEach(item => {
          if (item.comment == null) {
            item.color = '#e5e7ec'
          } else {
            item.color = '#1890FF'
          }
          item.createTime = this.timeCycle(item.createTime)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.operation-log {
  width: 100%;
  // height: 100vh;
  min-height: 758px;
  padding: 0 0 20px 0 !important;
  background-color: #fff !important;
  .purple {
    width: 100%;
    height: 100%;
    // background: #fff;
    color: rgb(46, 46, 46);
    // padding-left: 20px;
    .jibentop {
      margin: 10px 0 0 0;
      font-size: 14px;
      font-weight: 700;
      padding: 15px 0;
    }
    .order-log {
      border-bottom: 1px solid #1890ff;
      color: #1890ff;
      padding-left: 20px;
    }
    /deep/ .timeHistory {
      padding: 10px 0 0 0 !important;
      padding: 20px !important;
    }
  }
  /deep/ .el-step__description {
    padding-right: 0 !important;
  }
}
</style>
