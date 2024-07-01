<template>
  <div id="dataCatalogue">
    <div style="display: flex">
      <span v-if="processDefinitionKey == 'catalogSubmit'" class="catalogue-title">数据编目</span>
      <span v-else-if="processDefinitionKey == 'catalogUpShelf'" class="catalogue-title">编目申请上架</span>
      <span v-if="processDefinitionKey == 'catalogOffShelf'">编目申请下架</span>
      <div>
        <span class="title-info">申请部门：{{ datas.businessAeview.proDeptName || '-' }}</span
        ><span class="title-info">申请人：{{ datas.businessAeview.proposer || '-' }}</span
        ><span class="title-info">联系电话：{{ datas.businessAeview.phone || '-' }}</span>
      </div>
    </div>
    <div class="time">{{ datas.businessAeview.applyTime || '-' }}</div>
    <div class="dataCatalogue-box">
      <el-form :inline="true" :model="datas.businessAeview" ref="dataCatalogue" class="demo-ruleForm">
        <p class="title">基本信息</p>
        <el-row :gutter="20">
          <el-col :span="12" class="form-item">
            <el-form-item label="信息资源名称：">
              <el-tooltip :disabled="showTooltip" :content="datas.businessAeview.catalogName" placement="top">
                <div ref="tooltipBox" class="items conceal1">
                  <span ref="tooltipItem"> {{ datas.businessAeview.catalogName || '-' }}</span>
                </div>
              </el-tooltip>
              <!-- <span class="items">{{ datas.businessAeview.catalogName || '-' }}</span> -->
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item">
            <el-form-item label="信息资源英文名称：">
              <span class="items">{{ datas.businessAeview.catalogEn || '-' }}</span>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12" class="form-item">
          
          </el-col> -->
          <el-col :span="12" class="form-item">
            <el-form-item label="数源应用系统：">
              <span class="items">{{ datas.businessAeview.sourceSystem || '-' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item">
            <el-form-item class="data-items" label="更新频率：">
              <p class="items">
                {{ datas.businessAeview.updateFrequency || '-'
                }}<span style="margin-left: 12px">{{ datas.businessAeview.inputFrequency || '-' }}</span>
              </p>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item">
            <el-form-item class="data-items" label="数据格式：">
              <p class="items">{{ datas.businessAeview.dataFormat || '-' }}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item">
            <el-form-item class="data-items" label="共享类型：">
              <p class="items">{{ datas.businessAeview.shareType || '-' }}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item">
            <el-form-item class="data-items" label="共享条件：" v-if="datas.businessAeview.shareType != '不予共享' ">
              <p class="items">{{ datas.businessAeview.shareCondition || '-' }}</p>
            </el-form-item>
            <el-form-item class="data-items" label="不予共享条件：" v-if="datas.businessAeview.shareType == '不予共享' ">
              <p class="items">{{ datas.businessAeview.dontShareCondition || '-' }}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item">
            <el-form-item class="data-items" label="开放类型：">
              <p class="items">{{ datas.businessAeview.openType || '-' }}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item">
            <el-form-item class="data-items" label="是否对社会开放：">
              <p class="items">{{ datas.businessAeview.openSociety || '-' }}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="form-item">
            <el-form-item class="data-items" label="重点领域分类：">
              <p class="items">{{ datas.businessAeview.keyAreasType || '-' }}</p>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="form-item">
            <el-form-item class="data-items" label="重点领域分类备注：">
              <p class="items">{{ datas.businessAeview.keyAreasRemark || '-' }}</p>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="form-item">
            <el-form-item class="data-items" label="信息资源摘要：">
              <el-tooltip :disabled="showTooltip" :content="datas.businessAeview.informationSummary" placement="top">
                <p ref="tooltipBox" class="items conceal1">
                  <span ref="tooltipItem"> {{ datas.businessAeview.informationSummary || '-' }}</span>
                </p>
              </el-tooltip>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div style="display: flex; justify-content: space-between; padding: 0 12px">
              <el-form-item label="数源单位：">
                <span class="items">{{ datas.businessAeview.sourceUnit || '-' }}</span>
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
          <div v-show="datas.businessAeview.relatedGovernment == '是'">
            <el-col :span="12" class="form-item">
              <el-form-item class="data-items" label="业务办理项编码：">
                <p class="items">{{ datas.businessAeview.businessCode || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="form-item">
              <el-form-item class="data-items" label="业务办理事项名称：">
                <p class="items">{{ datas.businessAeview.businessName || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="form-item">
              <el-form-item class="data-items" label="事项类型：">
                <p class="items">{{ datas.businessAeview.eventType || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="form-item">
              <el-form-item class="data-items" label="事项层级：">
                <p class="items">{{ datas.businessAeview.eventLevel || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="form-item">
              <el-form-item class="data-items" label="事项基本目录编码：">
                <p class="items">{{ datas.businessAeview.directoryCode || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="form-item">
              <el-form-item class="data-items" label="数据所属事项名称：">
                <p class="items">{{ datas.businessAeview.itemData || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="form-item">
              <el-form-item class="data-items" label="实施清单编码：">
                <p class="items">{{ datas.businessAeview.implementationCode || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="form-item">
              <el-form-item class="data-items" label="实施清单名称：">
                <p class="items">{{ datas.businessAeview.implementationName || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="form-item">
              <el-form-item class="data-items" label="行驶层级：">
                <p class="items">{{ datas.businessAeview.drivingLevel || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="form-item">
              <el-form-item class="data-items" label="结果类型：">
                <p class="items">{{ datas.businessAeview.resultType || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="form-item">
              <el-form-item class="data-items" label="应用场景：">
                <p class="items">{{ datas.businessAeview.applicationScenario || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="form-item">
              <el-form-item class="data-items" label="应用场景描述：">
                <p class="items">{{ datas.businessAeview.applicationScenarioDescribe || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="form-item">
              <el-form-item class="data-items" label="提供渠道：">
                <p class="items">{{ datas.businessAeview.provideChannels || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="form-item">
              <el-form-item class="data-items" label="是否电子证照：">
                <p class="items">{{ datas.businessAeview.electronicLicense || '-' }}</p>
              </el-form-item>
            </el-col>
          </div>
          <p class="title title1">基础库/专题库</p>
          <el-col :span="24" class="form-item">
            <el-form-item class="data-items" label="是否关联基础库/专题库：">
              <p class="items">{{ datas.businessAeview.baseLibrary || '-' }}</p>
            </el-form-item>
          </el-col>
          <div v-show="datas.businessAeview.baseLibrary != '否'">
            <el-col :span="24" class="form-item" v-show="datas.businessAeview.baseLibrary == '基础库'">
              <el-form-item class="data-items" label="基础库分类：">
                <p class="items">{{ datas.businessAeview.categoryClassification || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="24" class="form-item" v-show="datas.businessAeview.baseLibrary == '专题库'">
              <el-form-item class="data-items" label="专题库分类：">
                <p class="items">{{ datas.businessAeview.categoryClassification || '-' }}</p>
              </el-form-item>
            </el-col>
          </div>
          <el-col :span="24">
            <!-- 数据项表格 -->
            <!-- <div style="width:100%;"> -->
            <dataIteminfo
              :datas="datas"
              v-show="datas.businessAeview.dataFormat == '数据库' || datas.businessAeview.dataFormat == 'excel'"
            />
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
    processDefinitionKey: {
      type: String,
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
    margin-right: 24px;
    // flex: 1;
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
      width: 456px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .conceal1 {
    width: 140px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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