<template>
  <el-row class="soldout-from-box">
    <el-form ref="dataCatalogue" :model="businessAeview" class="demo-ruleForm">
      <el-col :span="24">
        <el-form-item class="data-items" label="下架理由：">
          <span class="items">{{ businessAeview.offShelfMessage || '-' }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="data-items" label="下架申请单：">
          <p class="items download">{{ businessAeview.applyFlieName }}</p>
        </el-form-item>
      </el-col>
      <p class="title">基本信息</p>
      <el-col :span="12">
        <el-form-item class="data-items" label="数据目录名称：">
          <p class="items">{{ businessAeview.catalogName || '-' }}</p>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="data-items" label="数源单位：">
          <p class="items">{{ businessAeview.sourceUnit || '-' }}</p>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="data-items" label="数据格式：">
          <p class="items">{{ businessAeview.dataFormat || '-' }}</p>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="data-items" label="数源应用系统：">
          <p class="items">{{ businessAeview.sourceSystem || '-' }}</p>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="data-items" label="更新频率：">
          <p class="items">
            {{ businessAeview.updateFrequency || '-' }}
            <span style="margin-left: 12px;">{{ businessAeview.inputFrequency || '-' }}</span>
          </p>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="data-items" label="重点领域分类：">
          <p class="items">{{ businessAeview.keyAreasType || '-' }}</p>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="data-items" label="数据目录摘要：">
          <p class="items">{{ businessAeview.informationSummary || '-' }}</p>
        </el-form-item>
      </el-col>
    </el-form>
  </el-row>
</template>
<script>
export default {
  name: 'OffShelfApplication',
  props: ['businessAeview'],
  data() {
    return {
      // datas: { businessAeview: [] }
    }
  }
}
</script>

<style lang="less" scoped>
.soldout-from-box {
  background: #f8fafb;
  .download {
    color: #1890ff !important;
    cursor: pointer;
  }
  .title {
    color: #333333;
    font-size: 14px;
    font-weight: 500;
    padding-left: 10px;
  }
  .data-items {
    padding: 0 0 0 10px;
    .items {
      color: #777777;
    }
  }
}
.soldout-from-box .data-items .items {
  margin: 0;
}
</style>
