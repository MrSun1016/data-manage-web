<template>
  <div>
    <div>
      <div style="color: #333; background: #f8fafb; padding-left: 24px">
        申请数据项：（提示：<span style="color: red">红色文字</span>为不予共享；<span style="color: #1890ff"
          >蓝色文字</span
        >为有为有条件共享；黑色文字为无条件共享）
      </div>
      <!-- 复选框 -->
      <div v-if="dataItemAllList.length > 0">
        <div class="checked-box">
          <div class="checked">
            <el-checkbox-group v-model="checkList2">
              <el-checkbox
                class="checked-item"
                v-for="item in dataItemAllList"
                :key="item.id"
                :label="item.name"
                :disabled="disabled"
              >
                <span
                  :style="item.shareProperty == 30 ? 'color:red' : item.shareProperty == 20 ? 'color:#1890FF' : 'color:black;'"
                  >{{ item.name }}</span
                >
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div
        v-else
        style=" background: #f8fafb;
          color: #333;
          text-align: center;
          padding: 12px 0 12px 0;
          font-size: 14px;"
      >
        暂无数据
      </div>
    </div >
    <div class="preview">
      <!-- 预览SQL -->
      <div class="preview-box">
        <div class="preview-left">
          where条件
        </div>
        <div class="opinion-right">
          <p>{{ sourceProcess.variableArea || '-' }}</p>
        </div>
      </div>
      <!-- 审批意见 -->
      <div class="approval-opinion">
        <div class="opinion-left">审批意见</div>
        <div class="opinion-right">
          <p>{{ sourceProcess.approvalRemark || '-' }}</p>
        </div>
      </div>
      <div style="color: #333; padding: 0 0 12px 24px">
        <span>审核结果</span>
        <span style="margin-left: 45px">{{ sourceProcess.approvalResult || '-' }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DirectorySharingAudit',
  props: ['sourceProcess','dataItemAllList'],
  data() {
    return {
      checkList2: [],
      // sourceProcess: {}
      disabled: true
    }
  },
  mounted(){
  this.newCheckList()
  },
  methods: {
    newCheckList() {
      for (let listItem of this.dataItemAllList) {
        const itemJson = this.sourceProcess.gxApplyFiledItemBoList.find(item => item.name === listItem.name)
        if (itemJson != undefined) this.checkList2.push(itemJson.name)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.checked-box {
  padding: 0 24px;
  background: #f4f5f6;
  /deep/.el-checkbox {
    // margin: 12px 0;
    margin: 16px;
    // width: 120px !important;
  }
}

.preview-box {
  display: flex;
  margin-top:20px;
  padding: 0 24px;
  color: #333;
  .preview-left {
    // margin-right: 24px;
    width: 120px;
  }
  .preview-right {
    width: 100%;
  }
}
.approval-opinion {
  display: flex;
  // padding: 24px;
  padding: 12px 24px;
  color: #333;
  .opinion-left {
    width: 120px;
  }
  .opinion-right {
    width: 100%;
  }
}
.explain-box {
  display: flex;
  padding: 24px 24px;
  background: #f8fafb;
  font-size: 14px;
  .explain-left {
    width: 120px;
    color: #333;
  }
  .explain-right {
    width: 100%;
  }
}
.btns {
  padding: 24px 0;
}
/deep/.el-step__main {
  padding-left: 24px !important;
}
</style>
