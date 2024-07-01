<template>
  <div id="soldout">
    <div style="display: flex">
      <span class="soldout-title" style="margin-right: 24px">编目下架</span>
      <div style="color: #777777">
        <span class="title-info">申请部门：{{ datas.businessAeview.proDeptName || '-' }}</span
        ><span class="title-info" style="margin: 0 24px">申请人：{{ datas.businessAeview.proposer || '-' }}</span
        ><span class="title-info">联系电话：{{ datas.businessAeview.phone || '-' }}</span>
      </div>
    </div>

    <div class="time">{{ datas.businessAeview.applyTime || '-' }}</div>
    <el-row class="soldout-from-box">
      <el-form ref="dataCatalogue" :model="datas.businessAeview" class="demo-ruleForm">
        <el-col :span="24">
          <el-form-item class="data-items" label="下架理由：">
            <span class="items">{{ datas.businessAeview.offShelfMessage || '-' }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item class="data-items" label="下架申请单：">
            <p class="items download" @click="downLoad">{{ datas.businessAeview.applyFlieName }}</p>
          </el-form-item>
        </el-col>
        <p class="title">基本信息</p>
        <el-col :span="12">
          <el-form-item class="data-items" label="数据目录名称：">
            <el-tooltip :disabled="showTooltip" :content="datas.businessAeview.catalogName" placement="top">
              <div ref="tooltipBox" class="items conceal">
                <span ref="tooltipItem"> {{ datas.businessAeview.catalogName || '-' }}</span>
              </div>
            </el-tooltip>
            <!-- <p class="items">{{ datas.businessAeview.catalogName || '-' }}</p> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="data-items" label="数源单位：">
            <p class="items">{{ datas.businessAeview.sourceUnit || '-' }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="data-items" label="数据格式：">
            <p class="items">{{ datas.businessAeview.dataFormat || '-' }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="data-items" label="数源应用系统：">
            <p class="items">{{ datas.businessAeview.sourceSystem || '-' }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="data-items" label="更新频率：">
            <p class="items">
              {{ datas.businessAeview.updateFrequency || '-' }}
              <span style="margin-left: 12px">{{ datas.businessAeview.inputFrequency || '-' }}</span>
            </p>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="data-items" label="重点领域分类：">
            <p class="items">{{ datas.businessAeview.keyAreasType || '-' }}</p>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item class="data-items" label="数据目录摘要：">
            <p class="items">{{ datas.businessAeview.informationSummary || '-' }}</p>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
import { download } from '@/api/manage'
export default {
  name: 'soldout',
  props: {
    datas: {
      type: Object,
    },
  },
  data() {
    return {
      showTooltip: false,
    }
  },
  watch: {
    'datas.businessAeview.informationSummary': {
      handler() {
        this.$nextTick(() => this.checkWidth())
      },
      immediate: true,
    },
  },
  methods: {
    checkWidth() {
      const boxWidth = this.$refs['tooltipBox'].offsetWidth
      const itemWidth = this.$refs['tooltipItem'].offsetWidth
      this.showTooltip = boxWidth > itemWidth
    },
    // 文件下载
    downLoad() {
      let fileName = this.datas.businessAeview.applyFlieName
      download({ fileName })
        .then((res) => {
          const blob = new Blob([res], {
            type: 'application/json;charset=UTF-8',
          }) // res就是接口返回的文件流
          const link = document.createElement('a') // 创建a标签
          const objectUrl = window.URL.createObjectURL(blob)
          link.href = objectUrl
          link.download = fileName
          link.click()
          window.URL.revokeObjectURL(objectUrl) // 释放内存
        })
        .catch((error) => {
          this.$message.warning('模板导出失败')
        })
    },
  },
}
</script>

<style lang="less" scoped>
#soldout {
  height: 100%;
  .soldout-title {
    color: #333333;
    font-size: 16px;
  }
  .time {
    color: #333333;
    padding: 6px 0 16px 0;
  }
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
      padding-left: 30px;
    }
    .data-items {
      padding: 0 12px 0 30px;
      .items {
        color: #777777;
      }
    }
  }
  .conceal {
    width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>