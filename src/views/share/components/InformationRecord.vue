<template>
  <div id="InformationRecord">
    <el-drawer direction="rtl" ref="ationdrawer" size="50%" :visible.sync="recordDrawer" :withHeader="false">
      <div class="title">
        {{ `${title}使用记录` || '-' }}
      </div>
      <el-divider></el-divider>

      <el-timeline class="timelinemargin" v-if="shareHistory.length">
        <el-timeline-item
          v-for="historyItem in shareHistory"
          :key="historyItem.createdTime"
          type="primary"
          color="#409EFF"
          :address="historyItem.createdTime"
          placement="top"
        >
          <div class="timelineItem">
            <div class="year">{{ historyItem.createdTime || '-' }}</div>
            <div class="item">
              <div style="margin-bottom: 5px" class="timelineFlex">
                <div class="timelineDivwei">库名：</div>
                <span>{{ historyItem.targetDb || '-' }}</span>
              </div>
              <div style="margin-bottom: 5px" class="timelineFlex">
                <div class="timelineDivwei">表名：</div>
                <span>{{ historyItem.targetTable || '-' }}</span>
              </div>
              <!-- <div style="margin-bottom: 5px;" class="timelineFlex">
                <div class="timelineDivwei">是否写入时间戳：</div>
                <span>{{ historyItem.createdTime ||'-' }}</span>
              </div> -->
              <!-- <div style="margin-bottom: 5px" class="timelineFlex">
                <div class="timelineDivwei">where条件：</div>
                <span>{{ historyItem.whereSql || '-' }}</span>
              </div> -->
              <div style="margin-bottom: 5px" class="timelineFlex">
                <div class="timelineDivwei">传输模式：</div>
                <span>{{ historyItem.conveyType || '-' }}</span>
              </div>
              <div style="margin-bottom: 5px" class="timelineFlex">
                <div class="timelineDivwei">主键冲突策略：</div>
                <span>{{ historyItem.importRuleType || '-' }}</span>
              </div>

              <div class="itemdivflex">
                <div style="margin-bottom: 5px" class="timelinedivitem">
                  <div class="timelinewei">操作人：</div>
                  <span>{{ historyItem.createdBy || '-' }}</span>
                </div>
                <div style="margin-bottom: 5px" class="timelinedivitem">
                  <div class="timelineweibig">操作部门：</div>
                  <span>{{ historyItem.departName || '-' }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
      <div class="nodata" v-else>暂无数据</div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'InformationRecord',
  data() {
    return {
      recordDrawer: false,
      shareHistory: [],
      title: ''
    }
  },
  mounted() {
    // this.timeConversion()
  },
  methods: {
    // timeConversion() {
    //   this.shareHistory.forEach(times => {
    //     times.createdTime = this.timeCycle(times.createdTime)
    //   })
    //   console.log(this.shareHistory)
    // },
    // timeCycle(da) {
    //   if (da != null) {
    //     var date = new Date(da)
    //     var Y = date.getFullYear() + '-'
    //     var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    //     var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    //     var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    //     var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    //     var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    //     return Y + M + D + h + m + s
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
#InformationRecord {
  .title {
    padding: 0 32px;
    height: 60px;
    color: #1890ff;
    line-height: 60px;
    border-bottom: 1px solid #1890ff;
  }
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
/deep/.el-timeline-item__node--normal {
  width: 15px;
  height: 15px;
}
.timelinemargin {
  padding-left: 140px;
}
.nodata {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #909399;
}
.timelineItem {
  width: 537px;
  background-color: #f8fafb;
  padding: 20px 0;
  .timelineFlex {
    display: flex;
    .timelineDivwei {
      width: 120px;
      color: #333333;
      font-size: 14px;
      margin-bottom: 8px;
    }
    span {
      font-size: 14px;
      color: #777777;
    }
  }
}
.year {
  width: 100px;
  text-align: center;
  color: #333333;
  font-size: 16px;
  position: absolute;
  left: -120px;
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
  margin-left: 25px;
  font-size: 14px;
  .itemdivflex {
    display: flex;
    .timelinedivitem {
      display: flex;
      width: 100%;
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
</style>
