<template>
  <div id="dataexplain">
    <div style="display: flex">
      <span class="explain-title" v-if="processDefinitionKey == 'catalogSubmit'"> 数据编目审核</span>
      <span class="explain-title" v-else-if="processDefinitionKey == 'catalogUpShelf'">编目上架审核 </span>
      <span class="explain-title" v-if="processDefinitionKey == 'catalogOffShelf'">编目下架审核 </span>
      <div>
        <span class="title-info">审批部门：{{ datas.businessAeview.updateDeptName || '-' }}</span
        ><span class="title-info" v-show="datas.businessAeview.updateUser&& datas.businessAeview.updatePhone">审批人：{{ datas.businessAeview.updateUser || '-' }}</span
        ><span class="title-info" v-show="datas.businessAeview.updateUser&& datas.businessAeview.updatePhone">联系电话：{{ datas.businessAeview.updatePhone || '-' }}</span>
      </div>
    </div>
    <!-- v-show="
        (type == '历史' && datas.businessAeview.actStatus == '审批通过') || datas.businessAeview.actStatus == '驳回'
      " -->
    <div
      class="time"
    >
      {{ datas.businessAeview.updateTime || '-' }}
    </div>
    <el-form class="explain-box">
      <div
        v-if="
          (type == '历史' && datas.businessAeview.actStatus == '审批通过') || datas.businessAeview.actStatus == '驳回'
        "
      >
        <el-form-item label="说明：">
          <span style="color: #777777">{{ datas.businessAeview.message || '-' }}</span>
        </el-form-item>
        <el-form-item label="审批结果：">
          <span style="color: #777777">{{ datas.businessAeview.actStatus || '-' }}</span>
        </el-form-item>
      </div>
      <el-form-item
        v-else-if="type == '审批' && datas.businessAeview.actStatus == '审批中'"
        label="说明："
        class="explanin"
      >
        <el-input type="textarea" class="textarea" :rows="4" v-model="completeByDateId.comment"> </el-input>
      </el-form-item>
      <el-form-item
        v-else-if="type == '审批' && datas.businessAeview.actStatus == '启动'"
        label="说明："
        class="explanin"
      >
        <el-input type="textarea" class="textarea" :rows="4" v-model="completeByDateId.comment"> </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'dataexplain',
  props: {
    datas: {
      type: Object,
    },
    completeByDateId: {
      type: Object,
    },
    processDefinitionKey: {
      type: String,
    },
  },
  data() {
    return {
      type: '',
    }
  },
  activated() {
    // this.type = this.$route.query.type
  },
  mounted() {
    this.type = this.$route.query.type
  },
}
</script>

<style lang="less" scoped>
#dataexplain {
  // padding: 24px 0;
  margin-top: 24px;
  //  margin-top: 150px;
  .explain-title {
    color: #333333;
    font-size: 16px;
    margin-right: 24px;
    // padding: 0 0 14px;
    // margin: 20px 24px 20px 0;
  }
  .title-info {
    color: #777777;
    margin-right: 24px;
  }
  .explain-box {
    width: 90%;
    background: #f8fafb;
    // padding: 20px 20px;
    padding: 0 0 0 24px;
    margin-top: 20px;
    .textarea {
      width: 93%;
    }
  }
  .time {
    color: #333333;
    padding-top: 6px;
  }
  .explanin {
    display: flex;
    padding: 12px 0;
    /deep/.el-form-item__label {
      width: 60px;
    }
    /deep/.el-form-item__content {
      width: 100%;
    }
  }
}
</style>