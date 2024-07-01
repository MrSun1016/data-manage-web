<template>
  <div id="ServiceInquire">
    <el-form class="inquire-box" :model="serviceList" label-position="left" inline @keyup.enter.native="serviceSearch">
      <div class="inquire-flex">
        <el-form-item label="实施清单编码：" label-width="130px">
          <el-input
            class="topfromitem"
            v-model="serviceList.implementationCode"
            size="small"
            clearable
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="实施清单名称：" label-width="130px">
          <el-input
            class="topfromitem"
            v-model="serviceList.implementationName"
            size="small"
            clearable
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="目录名称：" label-width="100px">
          <el-input
            class="topfromitem"
            v-model="serviceList.catalogName"
            size="small"
            clearable
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </div>
      <div class="inquire-flex">
        <el-form-item label="业务办理项名称：" label-width="130px">
          <el-input
            class="topfromitem"
            v-model="serviceList.businessName"
            size="small"
            clearable
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="业务办理项编码：" label-width="130px">
          <el-input
            class="topfromitem"
            v-model="serviceList.businessCode"
            size="small"
            clearable
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item class="form-items">
          <el-button size="small" type="primary" @click="serviceSearch">搜 索</el-button>
          <el-button size="small" @click="handleReset">重 置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ServiceInquire',
  data() {
    return {
      inquireFormData: {},
      serviceList: {
        implementationCode: '', //实施清单编码
        implementationName: '', //实施清单名称
        businessCode: '', //业务办理项编码
        businessName: '', //业务办理项名称
        catalogName: '' //目录名称
      }
    }
  },
  mounted() {},
  methods: {
    // 重置
    handleReset() {
      this.$bus.$emit('onReset')
      this.serviceList = {}
    },
    serviceSearch() {
      this.$emit('serviceValue', this.serviceList)
      this.$bus.$emit('serviceAmountList', this.serviceList)
    }
  }
}
</script>

<style lang="less" scoped>
#ServiceInquire {
  .inquire-box {
    padding: 32px;
  }
  /deep/.el-form-item {
    margin-right: 0px !important;
  }
}
.topfromitem {
  width: 200px;
}
.form-items {
  width: 300px;
  display: flex;
  flex-direction: row-reverse;
}
.inquire-flex {
  display: flex;
  justify-content: space-between;
}
</style>
