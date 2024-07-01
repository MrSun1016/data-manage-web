<template>
  <!-- 内容区 -->
  <!-- 基本信息 -->
  <div class="content-box">
    <div class="flex-box">
      <div class="basic-title">基本信息</div>
      <div class="conunt-box">
        <span class="count-items">归集量：{{ catalogDataDetails.notionalPoolingNum || '0' }}</span>
        <span class="count-items">浏览量：{{ catalogDataDetails.viewNum || '0' }}</span
        ><span class="count-items">申请量：{{ catalogDataDetails.applicationsNum || '0' }}</span>
      </div>
    </div>
    <div class="basic-info-content">
      <div class="content-left">
        <div class="left-title" style="color: #333333">
          <p>
            <span class="itme-title">领域分类： </span><span>{{ catalogDataDetails.keyAreasType || '-' }}</span>
          </p>
          <p>
            <span class="itme-title">领域分类备注： </span><span>{{ catalogDataDetails.keyAreasRemark || '-' }}</span>
          </p>

          <p>
            <span class="itme-title">数源单位： </span><span>{{ catalogDataDetails.sourceUnit || '-' }}</span>
          </p>

          <p>
            <span class="itme-title">共享类型：</span><span>{{ catalogDataDetails.shareType || '-' }}</span>
          </p>

          <p>
            <span class="itme-title">开放类型：</span><span>{{ catalogDataDetails.openType || '-' }}</span>
          </p>

          <p>
            <span class="itme-title">数据范围：</span>
            <span v-for="dataRangeitem in catalogDataDetails.dataRange" :key="dataRangeitem">{{
              dataRangeitem || '-'
            }}</span>
          </p>

          <p>
            <span class="itme-title">关联类目：</span
            ><span>{{ catalogDataDetails.categoryClassification || '-' }}</span>
          </p>

          <p>
            <span class="itme-title">应用系统： </span><span>{{ catalogDataDetails.sourceSystem || '-' }}</span>
          </p>

        </div>
      </div>
      <div class="content-mid">
        <div class="mid-fix">
          <div class="left-title" style="color: #333333">
            <p>
              <span class="itme-title">信息资源代码：</span><span>{{ catalogDataDetails.catalogCode || '-' }}</span>
            </p>
            <!-- <p>
              <span class="itme-title">应用系统：</span><span>{{ catalogDataDetails.sourceSystem || '-' }}</span>
            </p> -->
            <p>
              <span class="itme-title"  v-if="catalogDataDetails.shareType != '不予共享'">共享条件：</span><span v-if="catalogDataDetails.shareType != '不予共享'">{{ catalogDataDetails.shareCondition || '-' }}</span>
              <span class="itme-title"  v-if="catalogDataDetails.shareType == '不予共享'">不予共享条件：</span><span v-if="catalogDataDetails.shareType == '不予共享'">{{ catalogDataDetails.dontShareCondition || '-' }}</span>
            </p>
            <p>
              <span class="itme-title">是否对社会开放：</span><span>{{ catalogDataDetails.openSociety || '-' }}</span>
            </p>
            <p>
              <span class="itme-title">更新频率：</span><span>{{ catalogDataDetails.updateFrequency || '-' }}</span>
              <span style="margin-left: 24px">{{ catalogDataDetails.inputFrequency || '-' }}</span>
            </p>
            <!-- <p>
              <span class="itme-title">业务责任科室：</span
              ><span> {{ catalogDataDetails.businessDepartment || '-' }}</span>
            </p> -->
            <p>
              <span class="itme-title">联系方式：</span><span>{{ catalogDataDetails.contactInformation || '-' }}</span>
            </p>
            <p>
              <span class="itme-title">是否生成数据集：</span><span>{{ catalogDataDetails.generateDataset || '-' }}</span>
            </p>
            <p class="item-df">
              <span class="itme-title">信息资源摘要：</span
              ><span style="display: inline-block; width: 250px">{{
                catalogDataDetails.informationSummary || '-'
              }}</span>
            </p>
            <p>
              <span class="itme-title">业务责任人：</span><span>{{ catalogDataDetails.businessPerson || '-' }}</span>
            </p>
          </div>
        </div>
      </div>
      
      <el-dialog title="纠错内容" :visible.sync="dialogVisible" width="30%">
        <el-input type="textarea" :rows="5" placeholder="请输入纠错内容" v-model="text"> </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dataErrorCorrection">提 交</el-button>
        </span>
      </el-dialog>

      <div class="content-right-btns" style="display: flex; flex-direction: column;">

        <el-button
          v-login
          size="mini"
          type="primary"
          style="margin:0 0 20px 0;height: 32px;"
          @click="dialogVisible=true"
          ><img style="margin-right: 8px;width: 20px;height: 20px;" src="~@assets//correction.png" alt="" />数据纠错</el-button
        >

        <el-button
          v-login
          v-if="interfaceIsMount == '1' && (isHistory != '1' || relatedGovernment != '是')"
          size="mini"
          type="primary"
          style="margin:0 0 20px 0"
          @click="handeleDrawer(catalogDataDetails,'接口')"
          ><img style="margin-right: 8px" src="~@assets//port.png" alt="" />申请接口</el-button
        >

        <el-button
          v-login
          v-if="interfaceIsMount != '1' && tableIsMount != '1' && (isHistory != '1' || relatedGovernment != '是')"
          @click="handleCollection"
          :disabled="isHide"
          style="width: 88px"
          type="text"
          class="piliangbut"
        >
          申请归集
        </el-button>
        <el-button
          v-login
          v-if="tableIsMount == '1' && (isHistory != '1' || relatedGovernment != '是')"
          size="mini"
          :disabled="dataFormat == '接口'"
          type="primary"
          class="cusa-btn"
          @click="handeleDrawer(catalogDataDetails,'库表')"
          ><img style="margin-right: 8px" src="~@assets/cusa.png" alt="" />申请库表</el-button
        >
      </div>
    </div>
    <!-- 服务事项 -->
    <div class="flex-box" v-show="catalogDataDetails.relatedGovernment == '是'">
      <div class="basic-title">服务事项</div>
    </div>

    <div class="server-info-content" v-show="catalogDataDetails.relatedGovernment == '是'">
      <div class="content-left">
        <div class="left-title" style="color: #333333">
          <p>
            <span class="server-itme-title">是否关联政务服务事项：</span>
            <span>{{ catalogDataDetails.relatedGovernment || '-' }}</span>
          </p>
          <p>
            <span class="server-itme-title">业务办理项编码：</span
            ><span>{{ catalogDataDetails.businessCode || '-' }}</span>
          </p>
          <p>
            <span class="server-itme-title">事项类型：</span><span>{{ catalogDataDetails.eventType || '-' }}</span>
          </p>
          <p>
            <span class="server-itme-title">事项基本目录编码：</span
            ><span>{{ catalogDataDetails.directoryCode || '-' }}</span>
          </p>
          <p>
            <span class="server-itme-title">实施清单编码：</span
            ><span>{{ catalogDataDetails.implementationName || '-' }}</span>
          </p>
          <p>
            <span class="server-itme-title">行驶层级：</span><span>{{ catalogDataDetails.drivingLevel || '-' }}</span>
          </p>
          <p>
            <span class="server-itme-title">应用场景：</span
            ><span>{{ catalogDataDetails.applicationScenario || '-' }}</span>
          </p>
          <p>
            <span class="server-itme-title">提供渠道：</span
            ><span>{{ catalogDataDetails.provideChannels || '-' }}</span>
          </p>
        </div>
      </div>
      <div class="content-mid">
        <div class="mid-fix" style="display: flex; margin: 40px 0 0 0">
          <div class="left-title" style="color: #333333; flex-direction: column">
            <!-- catalogDataDetails.businessNam || '-'  -->
            <p>
              <span class="itme-title">业务办理事项名称：</span><span>{{ catalogDataDetails.businessName || '-' }}</span>
            </p>
            <p>
              <span class="itme-title">事项层级：</span><span>{{ catalogDataDetails.eventLevel || '-' }}</span>
            </p>
            <p>
              <span class="itme-title">数据所属事项名称：</span><span>{{ catalogDataDetails.itemData || '-' }}</span>
            </p>
            <p>
              <span class="itme-title">实施清单名称：</span
              ><span>{{ catalogDataDetails.implementationName || '-' }}</span>
            </p>
            <p>
              <span class="itme-title">结果类型：</span><span>{{ catalogDataDetails.resultType || '-' }}</span>
            </p>
            <p>
              <span class="itme-title">应用场景描述：</span
              ><span>{{ catalogDataDetails.applicationScenarioDescribe || '-' }}</span>
            </p>
            <p>
              <span class="itme-title">是否电子证照：</span
              ><span>{{ catalogDataDetails.electronicLicense || '-' }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="lucency-box">1</div>
    </div>
    <CatalogueTabs :catalogDataDetails="catalogDataDetails" :shareApiInfo="shareApiInfo" :dataFormat="dataFormat" />
    <CatalogueDrawer ref="drawer" />
    <!-- 申请归集弹窗 -->
    <ApplyForCollectionDialog ref="dialog" />
  </div>
</template>

<script>
import CatalogueTabs from '@views/catalogue/components/CatalogueTabs'
import CatalogueDrawer from '@views/catalogue/components/CatalogueDrawer'
import ApplyForCollectionDialog from '@views/catalogue/components/ApplyForCollectionDialog'
import { getResourceMarket, getMatters , getDataUseApiInterfaceInfo,setDataErrorCorrection} from '@/api/api'
export default {
  components: {
    CatalogueTabs,
    CatalogueDrawer,
    ApplyForCollectionDialog,
  },
  name: 'CatalogueDataDetails',
  data() {
    return {
      catalogDataDetails: {},
      dataFormat: '',
      isHide: false,
      interfaceIsMount: '',
      tableIsMount: '',
      id: '',
      shareApiInfo:{},
      dialogVisible:false,
      text:''
    }
  },
  activated() {
  },
  mounted() {
    this.isHide = this.$route.query.isHide
    ;(this.interfaceIsMount = this.$route.query.interfaceIsMount), (this.tableIsMount = this.$route.query.tableIsMount)
    , (this.isHistory = this.$route.query.isHistory), (this.relatedGovernment = this.$route.query.relatedGovernment)
    this.id = this.$route.query.id
    // this.isHide = this.$route.query.isHide
    this.dataFormat = this.$route.query.dataFormat
    this.fetchgetResourceMarket()
    this.fetchDataUseApiInterfaceInfo()
  },
  methods: {
    dataErrorCorrection(){
      let {text,id}=this
      if(text == '' || text.trim() == ''){
        this.dialogVisible = false
        this.$message.warning('纠错内容不能为空');
        return false
      }
      setDataErrorCorrection({text,catalogId:id}).then((res) => {
        if (res.success) {
          this.dialogVisible = false
          this.text = ''
          this.$message.success('提交成功!');
        }else{
          this.dialogVisible = false
          this.$message.error('提交失败!');
        }
     })
    },
    fetchDataUseApiInterfaceInfo(){
      getDataUseApiInterfaceInfo(this.id).then((res) => {
      if (res.success) {
        this.shareApiInfo = res.body
      }
     })
    },
    // 申请归集
    handleCollection() {
      this.$refs.dialog.collectionDialog = true
      this.$refs.dialog.catalogId = this.$route.query.id
    },
    handeleDrawer(row,title) {
      this.id = this.$route.query.id
      this.$refs.drawer.catalogName = row.catalogName
      this.$refs.drawer.title = title
      this.$refs.drawer.drawer = true
      this.$refs.drawer.cataId = this.id
      this.$refs.drawer.catalogId = this.$route.query.id
      this.$refs.drawer.fetchQueryAppName()
      this.$refs.drawer.interfaceInit()
      if (title == '库表') this.$refs.drawer.fetchDataItemInfo()
      else return
    },
    fetchgetResourceMarket() {
      getResourceMarket(this.id).then(async (res) => {
        if (res.success) {
          this.catalogDataDetails = await res.body
          this.catalogDataDetails.dataRange = res.body.dataRangeList
        }
      })
    },
    fetchMatters() {
      let id = this.$route.query.id
      getMatters(id).then(async (res) => {
        if (res.success) {
          this.catalogDataDetails = await res.body
          this.catalogDataDetails.dataRange = JSON.parse(this.catalogDataDetails.dataRange)
          this.catalogDataDetails.dataRange = this.catalogDataDetails.dataRange.flat(Infinity)
        }
      })
    },
    fetchResourceMarket() {
      let serviceName = this.$route.query.serviceName
      if (serviceName == '事项') {
        // 服务事项
        this.fetchMatters()
      } else {
        // 数据目录
        this.fetchgetResourceMarket()
      }
    },
  },
  activated() {
    this.fetchResourceMarket()
  },
  // created() {
  //   this.fetchResourceMarket()
  // },
}
</script>

<style lang="less" scoped>
@theme-color: #1890ff;
.content-box {
  // margin-top: 24px;
  background: #fff;
  .flex-box {
    display: flex;
    height: 60px;
    padding: 0 32px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid @theme-color;
    .basic-title {
      color: @theme-color;
    }
    .conunt-box {
      // width: 200px;
      .count-items {
        margin-right: 16px;
      }
    }
  }
  .basic-info-content {
    display: flex;
    padding: 32px;
    justify-content: space-between;
  }
}
.basic-info-content {
  display: flex;
  padding: 32px;
  .content-left {
    display: flex;
  }
}
.server-info-content {
  display: flex;
  justify-content: space-between;
  padding: 32px;
  .lucency-box {
    width: 104px;
    background-color: #fff;
    color: #fff;
  }
  .server-itme-title {
    width: 160px;
    display: inline-block;
  }
}
.piliangbut {
  // height: 36px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #1890ff;
  color: #1890ff;
  font-size: 14px;
}
/deep/ .cusa-btn {
  margin-left: 0px !important;
}
.itme-title {
  width: 160px;
  display: inline-block;
}
.item-df {
  display: flex;
}
</style>