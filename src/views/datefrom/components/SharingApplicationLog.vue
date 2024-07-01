<template>
  <div>
    <div class="info-box df-box">
      <div class="left-box">
        <p>
          <span class="item-title">信息资源名称：</span
          ><span class="item-info">{{ gxCategoryApplyBo.resourcesName || '-' }}</span>
        </p>
        <p>
          <span class="item-title">数源单位：</span
          ><span class="item-info">{{ gxCategoryApplyBo.applyDept || '-' }}</span>
        </p>
        <p>
          <span class="item-title">申请开始时间段：</span
          ><span class="item-info">{{ gxCategoryApplyBo.startTime || '-' }}</span>
        </p>
        <!-- <p>
          <span class="item-title">自动创建交换任务：</span
          ><span class="item-info">{{ flowList[0].autoCreateTask || '-' }}</span>
        </p> -->
        <p>
          <span class="item-title">申请部门：</span
          ><span class="item-info">{{ gxCategoryApplyBo.deptName || '-' }}</span>
        </p>
        <p>
          <el-tooltip :disabled="showTooltip" :content="gxCategoryApplyBo.applyRemark" placement="top">
            <p ref="tooltipBox" class="tem-title item-info conceal1">
              <span class="item-title item-title1" style="font-size: 14px; width: 158px">申请说明：</span>
              <span ref="tooltipItem" class="item-info"> {{ gxCategoryApplyBo.applyRemark || '-' }}</span>
            </p>
          </el-tooltip>
        </p>
      </div>
      <div class="right-box">
        <p>
          <span class="item-title">主题分类：</span
          ><span class="item-info">{{ gxCategoryApplyBo.keyAreasType || '-' }}</span>
        </p>
        <p>
          <span class="item-title">数源应用系统：</span
          ><span class="item-info">{{ gxCategoryApplyBo.appSystem || '-' }}</span>
        </p>
        <p>
          <span class="item-title">申请结束时间段：</span
          ><span class="item-info">{{ gxCategoryApplyBo.endTime || '-' }}</span>
        </p>
        <p>
          <el-tooltip :disabled="showTooltip" :content="gxCategoryApplyBo.applyFileName" placement="top">
            <p ref="tooltipBox" class="tem-title conceal1">
              <span class="item-title" style="font-size: 14px">资源服务申请表：</span>
              <span ref="tooltipItem" style="font-size: 14px; cursor: pointer;color: #777777">
                {{ gxCategoryApplyBo.applyFileName || '-' }}</span
              >
            </p>
          </el-tooltip>
        </p>
        <p>
          <span class="item-title">申请人信息：</span
          ><span class="item-info">{{ gxCategoryApplyBo.applicantInfo || '-' }}</span>
        </p>
      </div>
    </div>

    <div>
      <div
        style="
          color: #333;
          background: #f8fafb;
          padding-left: 24px;
          padding-bottom: 10px;
          padding-top: 10px;
          font-size: 14px;"
      >
        申请数据项：
      </div>
      <!-- 复选框 -->
      <div class="checked-box" v-if="dataItemAllList.length > 0">
        <div class="checked">
          <el-checkbox-group v-model="checkList">
            <el-checkbox
              class="checked-item"
              v-for="item in dataItemAllList"
              :key="item.id"
              :label="item.name"
              disabled
            >
              <span
                :style="
                  item.shareProperty == 30 ? 'color:red' : item.shareProperty == 20 ? 'color:#1890FF' : 'color:black;'
                "
                >{{ item.name }}</span
              >
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div v-else style="background: #f8fafb; color: #333; text-align: center; padding: 0 0 12px 0">
        暂无数据
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SharingApplicationLog',
  props: ['gxCategoryApplyBo', 'dataItemAllList'],
  data() {
    return {
      showTooltip: false,
      checkList: []
    }
  },
  mounted() {
    this.newCheckList()
    this.$nextTick(() => this.checkWidth())
  },
  methods: {
    checkWidth() {
      const boxWidth = this.$refs['tooltipBox'].offsetWidth
      const itemWidth = this.$refs['tooltipItem'].offsetWidth
      this.showTooltip = boxWidth > itemWidth
    },
    newCheckList() {
      for (let listItem of this.dataItemAllList) {
        const itemJson = this.gxCategoryApplyBo.gxApplyFiledItemBoList.find(item => item.name === listItem.name)
        if (itemJson != undefined) this.checkList.push(itemJson.name)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.info-box {
  background: #f8fafb;
  padding: 24px 24px 0 24px;
  font-size: 14px;
  .item-title {
    display: inline-block;
    width: 160px;
    color: #333333;
  }
  .item-title1 {
    display: inline-block;
    width: 130px;
    color: #333333;
  }
  .item-info {
    color: #777777;
  }
}
.left-box {
  p {
    margin: 0 0 20px 0;
  }
}
.right-box {
  p {
    margin: 0 0 20px 0;
  }
}
.df-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.checked-box {
  padding: 0 24px;
  background: #f4f5f6;
  /deep/.el-checkbox {
    // margin: 12px 0;
    margin: 16px;
    // width: 120px !important;
  }
}
.conceal1 {
  width: 280px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
