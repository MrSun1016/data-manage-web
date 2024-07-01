<template>
  <div id="dataCatalogue">
    <div style="display: flex">
      <!-- <span class="catalogue-title">{{
      datas.cataStatus == 1 ? '数据编目审核' : datas.cataStatus == 2 ? '编目申请上架' : '编目申请下架'
    }}</span> -->
      <span v-if="datas.cataStatus == 1" class="catalogue-title">数据编目审核</span>
      <span v-else-if="datas.cataStatus == 2 || datas.cataStatus == 3 || datas.cataStatus == 4" class="catalogue-title"
        >编目申请上架</span
      >
      <span v-if="datas.cataStatus == 5 || datas.cataStatus == 6 || datas.cataStatus == 7 || datas.cataStatus == 8"
        >编目申请下架</span
      >
      <div v-show="type == '历史'">
        <span class="title-info">申请部门：{{ datas.result.startDeptName || '-' }}</span
        ><span class="title-info">申请人：{{ datas.result.startUserName || '-' }}</span
        ><span class="title-info">联系电话：{{ datas.result.phone || '-' }}</span>
      </div>
    </div>
    <div class="time">{{ datas.times || '-' }}</div>
    <div class="dataCatalogue-box">
      <el-form :inline="true" :model="datas.businessAeview" ref="dataCatalogue" class="demo-ruleForm">
        <p class="title">基本信息</p>
        <el-row :gutter="20">
          <div class="item-df">
            <el-form-item label="信息资源名称：">
              <span class="items">{{ datas.businessAeview.catalogName || '-' }}</span>
            </el-form-item>
            <el-form-item label="信息资源英文名称：">
              <span class="items">{{ datas.businessAeview.catalogEn || '-' }}</span>
            </el-form-item>
          </div>
          <div class="item-df">
            <el-form-item label="数源单位：">
              <span class="items">{{ datas.businessAeview.sourceUnit || '-' }}</span>
            </el-form-item>
            <el-form-item label="数源应用系统：">
              <span class="items">{{ datas.businessAeview.sourceSystem || '-' }}</span>
            </el-form-item>
          </div>
          <div class="item-df">
            <el-form-item class="data-items" label="更新频率：">
              <p class="items">
                {{ datas.businessAeview.updateFrequency || '-'
                }}<span style="margin-left: 12px">{{ datas.businessAeview.inputFrequency || '-' }}</span>
              </p>
            </el-form-item>
            <el-form-item class="data-items" label="数据格式：">
              <p class="items">{{ datas.businessAeview.dataFormat || '-' }}</p>
            </el-form-item>
          </div>
          <div class="item-df">
            <el-form-item class="data-items" label="共享类型：">
              <p class="items">{{ datas.businessAeview.shareType || '-' }}</p>
            </el-form-item>
            <el-form-item class="data-items" label="共享条件：">
              <p class="items">{{ datas.businessAeview.shareCondition || '-' }}</p>
            </el-form-item>
          </div>
          <div class="item-df">
            <el-form-item class="data-items" label="开放类型：">
              <p class="items">{{ datas.businessAeview.openType || '-' }}</p>
            </el-form-item>
            <el-form-item class="data-items" label="是否对社会开放：">
              <p class="items">{{ datas.businessAeview.openSociety || '-' }}</p>
            </el-form-item>
          </div>
          <div class="item-df">
            <el-form-item class="data-items" label="重点领域分类：">
              <p class="items">{{ datas.businessAeview.keyAreasType || '-' }}</p>
            </el-form-item>
            <el-form-item class="data-items" label="重点领域分类备注：">
              <p class="items">{{ datas.businessAeview.keyAreasRemark || '-' }}</p>
            </el-form-item>
          </div>
          <el-col :span="24" class="form-item">
            <el-form-item class="data-items" label="信息资源摘要：">
              <el-tooltip :disabled="showTooltip" :content="datas.businessAeview.informationSummary" placement="top">
                <p ref="tooltipBox" class="items conceal">
                  <span ref="tooltipItem"> {{ datas.businessAeview.informationSummary || '-' }}</span>
                </p>
              </el-tooltip>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div style="display: flex; justify-content: space-between; padding: 0 12px">
              <el-form-item class="data-items" label="业务责任科室：">
                <p class="items">{{ datas.businessAeview.businessDepartment || '-' }}</p>
              </el-form-item>
              <el-form-item class="data-items" label="业务责任人：">
                <p class="items">{{ datas.businessAeview.businessPerson || '-' }}</p>
              </el-form-item>
              <el-form-item class="data-items" label="联系方式：">
                <p class="items">{{ datas.businessAeview.contactInformation || '-' }}</p>
              </el-form-item>
            </div>
          </el-col>
          <p class="title title1">服务事项</p>
          <el-col :span="24" class="form-item">
            <el-form-item class="data-items" label="是否关联政务服务事项：">
              <p class="items">{{ datas.businessAeview.relatedGovernment || '-' }}</p>
            </el-form-item>
          </el-col>
          <p class="title title1">基础库/专题库</p>
          <el-col :span="24" class="form-item">
            <el-form-item class="data-items" label="是否关联基础库/专题库：">
              <p class="items">{{ datas.businessAeview.baseLibrary || '-' }}</p>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <!-- 数据项表格 -->
            <!-- <div style="width:100%;"> -->
            <dataIteminfo :datas="datas" />
            <!-- </div> -->
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import dataIteminfo from '@views/MessageCenter/components/DataItemInfo'
export default {
  name: 'dataCatalogue',
  props: {
    datas: {
      type: Object,
    },
  },
  components: {
    dataIteminfo,
  },
  data() {
    return {
      type: '',
      showTooltip: false,
    }
  },
  created() {},
  mounted() {
    this.type = this.$route.query.type
  },
  activated() {},
  watch: {
    'datas.businessAeview.informationSummary': {
      handler() {
        this.$nextTick(() => this.checkWidth())
      },
      immediate: true,
    },
  },
  methods: {
    // 信息资源摘要溢出隐藏 else 显示
    checkWidth() {
      const boxWidth = this.$refs['tooltipBox'].offsetWidth
      const itemWidth = this.$refs['tooltipItem'].offsetWidth
      this.showTooltip = boxWidth > itemWidth
    },
  },
}
</script>

<style lang="less" scoped>
#dataCatalogue {
  width: 100%;
  // height: 100vh;
  .catalogue-title {
    color: #333333;
    font-size: 16px;
    // margin-right: 24px;
    flex: 1;
  }
  .title-info {
    color: #777777;
    margin-right: 24px;
  }
  .time {
    color: #333333;
    padding: 6px 0 16px 0;
  }
  .dataCatalogue-box {
    width: 100%;
    background: #f8fafb;
    // .demo-ruleForm {
    //   padding: 24px;
    // }
    .item-df{
      display: flex;
      justify-content: space-between;
      padding: 0 24px;
    }
    .form-item {
      padding: 0 24px !important;
    }
    .title {
      color: #333333;
      font-size: 14px;
      font-weight: 500;
      padding: 14px;
      // padding: 20px 0 0 40px;
    }
    .title1 {
      margin-left: 10px;
    }
    // .data-items {
    //   width: ;
    //   // display: flex;
    // }
    .items {
      color: #777777;
    }
    .conceal {
      width: 400px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  /deep/.el-col {
    padding: 0 12px !important;
    // padding-left: 10px !important;
  }
  /deep/.el-form-item {
    margin-bottom: 0px !important;
  }
}
</style>