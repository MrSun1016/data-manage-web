<template>
  <!-- 数据编目--共享详情 -->
  <div id="Sharedetails">
    <!-- 头部 -->
    <div class="sharedetails-header" v-loading="loading">
      <i class="el-icon-back" @click="goBack" style="font-size: 24px; margin: 0 24px; cursor: pointer"></i>
      <!-- <img
        src="../../../../public/return.png"
        @click="goBack"
        style="width: 24px; margin: 0 20px 0 24px; cursor: pointer"
        alt="logo"
      /> -->
      <div style="display: flex; align-items: center">
        <el-tooltip :disabled="showTooltip" :content="tableData.catalogName" placement="top">
          <div ref="tooltipBox" class="header-title">
            <span ref="tooltipItem" style="font-size: 16px">{{ tableData.catalogName || '-' }}</span>
          </div>
        </el-tooltip>
        <el-tag style="margin-right: 30px" size="mini" v-for="dataRanges in tableData.dataRangeList" :key="dataRanges">{{
          dataRanges || '-' }}</el-tag>
        <el-tooltip :disabled="showTooltip" :content="tableData.sourceUnit" placement="top">
          <span class="header-item">数源单位：{{ tableData.sourceUnit || '-' }}</span>
        </el-tooltip>
        <el-tooltip :disabled="showTooltip" :content="tableData.keyAreasType" placement="top">
          <span class="header-item">领域分类：{{ tableData.keyAreasType || '-' }}</span>
        </el-tooltip>
        <el-tooltip :disabled="showTooltip" :content="tableData.createdTime" placement="top">
          <span class="header-item">发布时间：{{ tableData.createdTime || '-' }}</span>
        </el-tooltip>
      </div>
    </div>
    <el-tabs v-model="activeName" type="card" style="background-color: #fff" v-loading="loading1"
      @tab-click="handleClick">
      <el-tab-pane label="编目详情" name="first">
        <!-- 基本信息 -->
        <p class="jibentop">基本信息</p>
        <el-divider class="pdivider"></el-divider>
        <div class="info">
          <div class="info-left">
            <p>
              <span class="itme-title">领域分类： </span><span>{{ tableData.keyAreasType || '-' }}</span>
            </p>
            <p>
              <span class="itme-title">领域分类备注： </span><span>{{ tableData.keyAreasRemark || '-' }}</span>
            </p>
            <p>
              <span class="itme-title">数源单位： </span><span>{{ tableData.sourceUnit || '-' }}</span>
            </p>
            <p>
              <span class="itme-title">共享类型：</span><span>{{ tableData.shareType || '-' }}</span>
            </p>
            <p>
              <span class="itme-title">开放类型：</span><span>{{ tableData.openType || '-' }}</span>
            </p>
            <p>
              <span class="itme-title">数据范围：</span>
              <span v-for="dataRanges in tableData.dataRangeList" :key="dataRanges">{{ dataRanges || '-' }}</span>
            </p>
            <p>
              <span class="itme-title">关联类目：</span><span>{{ tableData.categoryClassification || '-' }}</span>
            </p>
            <p>
              <span class="itme-title">业务责任人：</span><span>{{ tableData.businessPerson || '-' }}</span>
            </p>
          </div>
          <div class="info-right">
            <p>
              <span class="itme-title">信息资源代码：</span><span>{{ tableData.catalogCode || '-' }}</span>
            </p>
            <!-- <p>
              <span class="itme-title">应用系统：</span><span>{{ tableData.sourceSystem || '-' }}</span>
            </p> -->
            <p>
              <span class="itme-title" v-if="tableData.shareType != '不予共享'">共享条件：</span><span
                v-if="tableData.shareType != '不予共享'">{{ tableData.shareCondition || '-' }}</span>
              <span class="itme-title" v-if="tableData.shareType == '不予共享'">不予共享条件：</span><span
                v-if="tableData.shareType == '不予共享'">{{ tableData.dontShareCondition || '-' }}</span>
            </p>
            <p>
              <span class="itme-title">是否对社会开放：</span><span>{{ tableData.openSociety || '-' }}</span>
            </p>
            <p>
              <span class="itme-title">更新频率：</span><span>{{ tableData.updateFrequency || '-' }}</span>
              <span style="margin-left: 12px">{{ tableData.inputFrequency || '-' }}</span>
            </p>
            <!-- <p>
              <span class="itme-title">业务责任科室：</span><span> {{ tableData.businessDepartment || '-' }}</span>
            </p> -->
            <p>
              <span class="itme-title">联系方式：</span><span>{{ tableData.contactInformation || '-' }}</span>
            </p>
            <p>
              <span class="itme-title">是否生成数据集：</span><span>{{ tableData.generateDataset || '-' }}</span>
            </p>
            <p style="display: flex">
              <span class="itme-title">信息资源摘要：</span><span style="display: inline-block; width: 250px">{{
                tableData.informationSummary || '-' }}</span>
            </p>
          </div>
        </div>
        <!-- 服务事项 -->
        <div v-show="tableData.relatedGovernment == '是'">
          <p class="jibentop fuwumargin">服务事项</p>
          <el-divider class="pdivider"></el-divider>
          <div class="info">
            <div class="info-left">
              <p>
                <span class="itme-title">是否关联政务服务事项：</span>
                <span>{{ tableData.relatedGovernment || '-' }}</span>
              </p>
              <p>
                <span class="itme-title">业务办理项编码：</span><span>{{ tableData.businessCode || '-' }}</span>
              </p>
              <p>
                <span class="itme-title">事项类型：</span><span>{{ tableData.eventType || '-' }}</span>
              </p>
              <p>
                <span class="itme-title">事项基本目录编码：</span><span>{{ tableData.directoryCode || '-' }}</span>
              </p>
              <p>
                <span class="itme-title">实施清单编码：</span><span>{{ tableData.implementationName || '-' }}</span>
              </p>
              <p>
                <span class="itme-title">行驶层级：</span><span>{{ tableData.drivingLevel || '-' }}</span>
              </p>
              <p>
                <span class="itme-title">应用场景：</span><span>{{ tableData.applicationScenario || '-' }}</span>
              </p>
              <p>
                <span class="itme-title">提供渠道：</span><span>{{ tableData.provideChannels || '-' }}</span>
              </p>
            </div>
            <div class="info-right" style="margin-top: 40px">
              <p>
                <span class="itme-title">业务办理事项名称：</span><span>{{ tableData.businessName || '-' }}</span>
              </p>
              <p>
                <span class="itme-title">事项层级：</span><span>{{ tableData.eventLevel || '-' }}</span>
              </p>
              <p>
                <span class="itme-title">数据所属事项名称：</span><span>{{ tableData.itemData || '-' }}</span>
              </p>
              <p>
                <span class="itme-title">实施清单名称：</span><span>{{ tableData.implementationName || '-' }}</span>
              </p>
              <p>
                <span class="itme-title">结果类型：</span><span>{{ tableData.resultType || '-' }}</span>
              </p>
              <p>
                <span class="itme-title">应用场景描述：</span><span>{{ tableData.applicationScenarioDescribe || '-' }}</span>
              </p>
              <p>
                <span class="itme-title">是否电子证照：</span><span>{{ tableData.electronicLicense || '-' }}</span>
              </p>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
        <el-tabs v-model="activesoleli" class="tabsmarg">
          <el-tab-pane label="库表" name="first"
            :disabled="tableData.isMount == null || tableData.dataFormat == '' || tableData.dataFormat == 'null'">
            <div style="padding: 0 24px" v-show="tableData.isMount != null">
              <div style="display: flex">
                <div class="cusa-left" style="margin-right: 170px">
                  <p>
                    <span class="cusa-items">数据库名：</span> <span>{{ tableData.databaseName || '-' }}</span>
                  </p>
                  <p>
                    <span class="cusa-items">更新频率：</span><span>{{ tableData.updateFrequency || '-' }}</span><span
                      style="margin-left: 12px">{{ tableData.inputFrequency || '-' }}</span>
                  </p>
                </div>
                <div class="cusa-right" style="margin-right: 100px">
                  <p>
                    <span class="cusa-items">库类型：</span><span>{{ tableData.databaseType || '-' }}</span>
                  </p>
                  <p>
                    <span class="cusa-items">最近更新时间：</span><span>{{ tableData.updateTime || '-' }}</span>
                  </p>
                </div>
                <div class="cusa-right">
                  <p>
                    <span class="cusa-itemss">表名：</span><span>{{ tableData.bmCatalogDataSource.tableName || '-' }}</span>
                  </p>
                </div>
              </div>
              <el-table ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%"
                :header-cell-style="{ background: '#E6F7FF', color: '#333333' }" @selection-change="handleSelectionChange"
                class="tablemargin">
                <el-table-column label="序号" type="index"> </el-table-column>
                <el-table-column prop="name" label="中文名称" width="180">
                  <template slot-scope="{ row }">
                    {{ row.name || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="enName" label="英文名称" width="180">
                  <template slot-scope="{ row }">
                    {{ row.enName || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="dataType" label="数据类型" width="180">
                  <template slot-scope="{ row }">
                    {{ row.dataType || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="dataLength" label="数据长度" width="180">
                  <template slot-scope="{ row }">
                    {{ row.dataLength || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="dataDictionary" label="数据字典项" width="180">
                  <template slot-scope="{ row }">
                    {{ row.dataDictionary || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="dataLevel" label="数据级别" width="180">
                  <template slot-scope="{ row }">
                    {{ row.dataLevel || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="defaultValue" label="默认值" width="180">
                  <template slot-scope="{ row }">
                    {{ row.defaultValue || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="shareProperty" label="共享属性" width="180">
                  <template slot-scope="{ row }">
                    {{ row.shareProperty || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="sharingCondition" label="共享条件" width="180">
                  <template slot-scope="{ row }">
                    {{ row.sharingCondition || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="openAttribute" label="开放属性" width="180">
                  <template slot-scope="{ row }">
                    {{ row.openAttribute || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="nullValue" label="是否可为空" width="180">
                  <template slot-scope="{ row }">
                    {{ row.nullValue === '1' ? '是' : '否' || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="dataObject" label="数据对象" width="180" v-if="false">
                  <template slot-scope="{ row }">
                    {{ row.dataObject || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="dataLevel" label="数据级别" width="180" v-if="false">
                  <template slot-scope="{ row }">
                    {{ row.dataLevel || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="fieldDescription" label="字段描述" width="180">
                  <template slot-scope="{ row }">
                    {{ row.fieldDescription || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="接口" name="second" :disabled="tableData.isInterface == null ||
            tableData.dataFormat == '' ||
            tableData.dataFormat == null
            ? true
            : false
            ">
            <div style="padding: 24px" v-show="tableData.isInterface != null">
              <div>
                <span class="port-items">信息资源代码：</span><span class="marg-r">{{ tableData.catalogCode || '-'
                }}</span><span><span class="port-items">数源应用系统：</span><span class="marg-r">{{ tableData.sourceSystem ||
  '-' }}</span></span>
                <div v-if="tableData.apiList == null" style="padding: 16px 0; margin: 8px 0">
                  <span class="port-items">接口地址：</span><span>{{ '-' }}</span>
                </div>
                <div v-else style="margin: 8px 0">
                  <span class="port-items">接口地址：</span><span>{{ shareApiInfo.apiAddress || '-' }}</span>
                </div>
                <p>
                  <span v-if="tableData.apiList == null"><span class="port-items">请求方法：</span><span class="marg-r">{{ '-'
                  }}</span></span>
                  <span v-else><span class="port-items">请求方法：</span><span class="marg-r">{{
                    shareApiInfo.requestMode || '-' }}</span></span>
                  <span v-if="tableData.apiList == null"><span class="port-items">请求数据类型：</span><span class="marg-r">{{
                    '-' }}</span></span>
                  <span v-else><span class="port-items">请求数据类型：</span><span class="marg-r">{{
                    shareApiInfo.requestType || '-' }}</span></span>
                </p>
              </div>
              <p class="jibenxinxi">请求参数</p>
              <!-- <el-table v-if="tableData.apiList == null" :data="parameterList"> </el-table> -->
              <el-table ref="multipleTable" :data="shareApiInfo.parameterList" tooltip-effect="dark"
                style="width: 100%" :header-cell-style="{ background: '#E6F7FF', color: '#333333' }"
                @selection-change="handleSelectionChange" class="tablemargin">
                <el-table-column prop="parameterName" label="参数名称">
                  <template slot-scope="{ row }">
                    {{ row.parameterName || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="required" label="是否必填">
                  <template slot-scope="{ row }">
                    {{ row.required == '1' ? '否' : '是' || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="parameterType" label="类型">
                  <template slot-scope="{ row }">
                    {{ row.parameterType || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="defaultValue" label="默认值">
                  <template slot-scope="{ row }">
                    {{ row.defaultValue || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="describetion" label="描述">
                  <template slot-scope="{ row }">
                    {{ row.describetion || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="parameterLocation" label="参数位置">
                  <template slot-scope="{ row }">
                    {{ row.parameterLocation || '-' }}
                  </template>
                </el-table-column>
              </el-table>
              <!-- 返回参数 -->
              <p class="jibenxinxi">返回参数</p>
              <!-- <el-table v-if="tableData.apiList == null" :data="parameteReturnList"> </el-table> -->
              <el-table ref="multipleTable" :data="shareApiInfo.parameteReturnList" tooltip-effect="dark"
                style="width: 100%" :header-cell-style="{ background: '#E6F7FF', color: '#333333' }"
                @selection-change="handleSelectionChange" class="tablemargin">
                <el-table-column prop="parameterName" label="参数名称">
                  <template slot-scope="{ row }">
                    {{ row.parameterName || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="required" label="是否必填">
                  <template slot-scope="{ row }">
                    {{ row.required == '1' ? '否' : '是' || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="parameterType" label="类型">
                  <template slot-scope="{ row }">
                    {{ row.parameterType || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="defaultValue" label="默认值">
                  <template slot-scope="{ row }">
                    {{ row.defaultValue || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="describetion" label="描述">
                  <template slot-scope="{ row }">
                    {{ row.describetion || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="parameterLocation" label="参数位置">
                  <template slot-scope="{ row }">
                    {{ row.parameterLocation || '-' }}
                  </template>
                </el-table-column>
              </el-table>
              <p class="jibenxinxi">请求示例</p>
              <el-input type="textarea" v-if="shareApiInfo.requestExample == null" :rows="3" :disabled="true"
                v-model="requestExample">
              </el-input>
              <el-input type="textarea" v-else :rows="3" :disabled="true" v-model="shareApiInfo.requestExample">
              </el-input>
              <p class="jibenxinxi">返回示例</p>
              <el-input type="textarea" v-if="shareApiInfo.returnExample" :rows="3" :disabled="true"
                v-model="returnExample">
              </el-input>
              <el-input type="textarea" v-else :rows="3" :disabled="true" v-model="shareApiInfo.returnExample">
              </el-input>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <!-- 数据共享 -->
      <el-tab-pane label="数据共享" name="second">
        <div>
          <el-form :inline="true" ref="inquireDataRef" :model="inquireData" class="farderfromflex" size="small"
            label-position="left" label-width="120px">
            <div style="display: flex; justify-content: space-between">
              <el-form-item label="使用部门">
                <el-select v-model="inquireData.applyDept" clearable placeholder="请选择">
                  <el-option v-for="institutionItem in institution" :key="institutionItem.id"
                    :label="institutionItem.nodeName" :value="institutionItem.nodeName">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="使用应用系统">
                <el-select v-model="inquireData.useAppSystem" clearable placeholder="请选择">
                  <el-option :label="source.appName" :value="source.appName" v-for="(source, index) in sourceList"
                    :key="source.id"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="提交申请时间：">
                <el-date-picker clearable value-format="yyyy-MM-dd" type="date" placeholder="请选择"
                  v-model="inquireData.launchDate" style="width: 100%"></el-date-picker>
              </el-form-item>
            </div>

            <div style="display: flex; justify-content: space-between">
              <el-form-item label="审批通过时间：">
                <el-date-picker clearable value-format="yyyy-MM-dd" type="date" placeholder="请选择"
                  v-model="inquireData.openDate" style="width: 200px"></el-date-picker>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" size="small" @click="onInquire">查询</el-button>
                <el-button size="small" @click="resetForm('inquireDataRef')">重置</el-button>
              </el-form-item>
            </div>
          </el-form>
          <!-- 表格 -->
          <el-table v-loading="tableLoading" ref="multipleTable" :data="shareTable" tooltip-effect="dark"
            style="width: 100%" :header-cell-style="{ background: '#E6F7FF', color: '#333333' }"
            @selection-change="handleSelectionChange" class="tablemargin">
            <el-table-column prop="applyDept" label="使用部门">
              <template slot-scope="{ row }">
                {{ row.applyDept || '-' }}
              </template>
            </el-table-column>
            <el-table-column prop="useAppSystem" label="使用应用系统">
              <template slot-scope="{ row }">
                {{ row.useAppSystem || '-' }}
              </template>
            </el-table-column>
            <el-table-column prop="totalNumber" label="调用量">
              <template slot-scope="{ row }">
                {{ row.totalNumber || '-' }}
              </template>
            </el-table-column>
            <el-table-column prop="launchDate" label="提交申请时间">
              <template slot-scope="{ row }">
                {{ row.launchDate || '-' }}
              </template>
            </el-table-column>
            <el-table-column prop="openDate" label="审批通过时间">
              <template slot-scope="{ row }">
                {{ row.openDate || '-' }}
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作">
              <template slot-scope="{ row, $index }">
                <el-button type="text" @click="toWorkOrder(row)">查看数据共享工单</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页器 -->
          <!-- @size-change="handleSizeChange"-->
          <el-pagination class="paginationtop" background @size-change="handleSizeChange" @current-change="getRoles"
            :current-page="inquireData.pageNum" :page-sizes="[10, 20, 50, 100]" :page-size="inquireData.pageSize"
            :total="total" layout="->,total, prev, pager, next, sizes, jumper">
            <!-- total -->
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { Message, MessageBox } from 'element-ui'
import { getaddNewNodeList, getshareDataPage, queryAppName, mechanismTree, getDataUseApiInterfaceInfo } from '@/api/api'
export default {
  name: 'Sharedetails',
  data() {
    return {
      showTooltip: false,
      loading1: false,
      loading: false,
      tableLoading: false,
      dateFromList: {
        //使用应用系统
        useAppSystem: 'source_system'
      },
      inquireData: {
        applyDept: '',
        applyId: '',
        applyTitle: '',
        catalogId: '',
        catalogName: '',
        dateField: '',
        launchDate: '',
        myDataStatus: '',
        openDate: '',
        orderByField: '',
        orgCode: '',
        pageNum: 1, //查询第一页
        pageSize: 10,
        queryType: 6, //查询类型 1:我的数据 2:审批中 3:正在使用 4:已释放列表 5:共享驳回记录
        rejectDate: '',
        rowStart: 0,
        shareOffDate: '',
        shareOffStatus: '',
        shareType: '',
        sort: 0,
        useAppSystem: '',
        username: ''
      },
      parameterList: [],
      parameteReturnList: [],
      requestExample: '',
      returnExample: '',
      dataRange: [],
      //库表数据
      bmCatalogDataSource: {},
      dataList: [],
      tableData: {},
      // 数据共享表格数据
      shareTable: [],
      apiList: [],
      textarea: '',
      activeName: 'first',
      activesoleli: 'first',
      sizeForm: {
        region: '',
        delivery: '',
        resource: '',
        desc: '',
        date1: '',
        date2: ''
      },
      // 分页器
      total: 0, //总共数据条数
      applyDepts: [],
      sourceList: [],
      institution: [],
      itemId: '',
      formInline: {},
      pageList: {},
      toName: '',
      toNameitem: '',
      shareApiInfo: {}
    }
  },
  mounted() {
    // this.getDetailsLsit()
    // this.fetchShareDataPage()
    this.activeName == 'first'
    // this.getDetailsLsit()
    this.fetchShareDataPage()
    // this.activeName= 'first'
    // this.fetchShareDataPage()
    // this.getDetailsLsit()
    this.sourceSystemList()
    this.fetchMechanismTreet()
  },
  mounted() { },
  activated() {
    // this.activeName == 'first'
    // // this.getDetailsLsit()
    // this.fetchShareDataPage()
    // // this.activeName= 'first'
    // // this.fetchShareDataPage()
    // // this.getDetailsLsit()
    // this.sourceSystemList()
    // this.fetchMechanismTreet()
  },
  watch: {
    'tableData.catalogName': {
      handler() {
        this.$nextTick(() => this.checkWidth())
      },
      immediate: true
    }
  },
  methods: {
    checkWidth() {
      const boxWidth = this.$refs['tooltipBox'].offsetWidth
      const itemWidth = this.$refs['tooltipItem'].offsetWidth
      this.showTooltip = boxWidth > itemWidth
    },
    toWorkOrder(row) {
      let sign = '5'
      this.$router.push({
        name: 'MessageCenter-WorkOrderProcessing',
        query: {
          type: '历史',
          fromItem: '编目',
          catalogId: row.catalogId,
          applyTitle: row.applyTitle,
          processCode: row.processCode,
          sign,
          itemId: this.itemId,
          formInline: this.formInline
        }
      })
    },
    fetchMechanismTreet() {
      mechanismTree().then(res => {
        if (res.success) {
          function treeToArr(data, res = []) {
            data.forEach(item => {
              res.push({
                // pid: pid,
                id: item.id,
                nodeCode: item.nodeCode,
                nodeName: item.nodeName,
                parentId: item.parentId
              })
              if (item.children && item.children.length !== 0) {
                treeToArr(item.children, res)
              }
            })
            return res
          }
          this.institution = treeToArr(res.body.children)
        }
      })
    },
    // 应用系统
    sourceSystemList() {
      queryAppName().then(res => {
        this.sourceList = res.body
      })
    },
    handleClick() {
      if (this.activeName == 'second') this.fetchShareDataPage()
    },
    // 查询
    onInquire() {
      this.inquireData.pageNum = 1
      this.fetchShareDataPage()
    },
    dateFrom() {
      const { useAppSystem } = this.dateFromList
      //使用应用系统
      this.$store.dispatch('getUseAppSystem', useAppSystem)
    },
    handleSizeChange(pageSize) {
      this.inquireData.pageSize = pageSize
      this.fetchShareDataPage()
    },
    getRoles(currentPage) {
      this.tableLoading = true
      this.inquireData.pageNum = currentPage
      this.fetchShareDataPage()
    },
    // 数据共享
    fetchShareDataPage() {
      getshareDataPage(this.inquireData)
        .then(res => {
          if (res.success) {
            this.tableLoading = false
            this.loading = false
            this.shareTable = res.body.content
            this.shareTable.forEach(item => {
              item.launchDate = this.formatTime(item.launchDate)
              item.openDate = this.formatTime(item.openDate)
            })
            this.total = res.body.total
          }
        })
        .catch(e => {
          this.loading = false
          this.tableLoading = falsechangeResource
        })
    },
    goBack() {
      let backList = this.pageList
      // console.log('backList', backList)
      if (this.$route.params.toName == '数据上报') {
        this.toNameitem = '编目详情'
        this.$router.push({
          name: 'datacollection-Exceldatareporting',
          params: {
            pagequeryList: this.pageList,
            toNameitem: this.toNameitem
          }
        })
        this.resetForm()
        this.$route.params.toName == ''
      } else if (this.$route.params.toName == '接口发布') {
        this.toNameitem = '编目详情'
        this.$router.push({
          name: 'datacollection-InterfaceRelease',
          params: {
            pagequeryList: this.pageList,
            toNameitem: this.toNameitem
          }
        })
        // console.log('this.toNameitem', this.toNameitem)
        this.resetForm()
        this.$route.params.toName == ''
      } else if (this.$route.params.toName == '库表更新') {
        this.toNameitem = '编目详情'
        this.$router.push({
          name: 'datacollection-LibraryTableUpdate',
          params: {
            pagequeryList: this.pageList,
            toNameitem: this.toNameitem
          }
        })
        // console.log('this.toNameitem', this.toNameitem)
        this.resetForm()
        this.$route.params.toName == ''
      } else if (this.$route.params.toName == '库表更新管理') {
        this.toNameitem = '编目详情'
        this.$router.push({
          name: 'datacollection-LibraryTableAdministrator',
          params: {
            pagequeryList: this.pageList,
            toNameitem: this.toNameitem
          }
        })
        // console.log('this.toNameitem', this.toNameitem)
        this.resetForm()
        this.$route.params.toName == ''
      } else if (this.$route.params.toName == '我的数据') {
        this.toNameitem = '编目详情'
        // console.log('pagequeryList', this.pageList)
        this.$router.push({
          name: 'datasharing-releaseing',
          params: {
            pagequeryList: this.pageList,
            toNameitem: this.toNameitem
          }
        })
        // console.log('this.toNameitem', this.toNameitem)
        this.resetForm()
        this.$route.params.toName == ''
      } else {
        this.resetForm()
        this.$emit('goBack', false)
      }
    },
    getDetailsLsit(id, formInline, pagequery) {
      this.formInline = formInline
      this.pageList = pagequery
      // console.log('02', pagequery)
      this.itemId = id
      let ids = []
      ids.push(id)
      getaddNewNodeList(ids)
        .then(res => {
          if (res.success) {
            this.loading1 = false
            this.tableData = res.body
            if (this.tableData.dataFormat === '数据库' || this.tableData.dataFormat === 'excel')
              this.activesoleli = 'first'
            else if (this.tableData.dataFormat === '接口') this.activesoleli = 'second'
            else this.activesoleli = ''
            this.dataList = res.body.dataList
            this.tableData.createdTime = this.formatTime(this.tableData.createdTime)
            this.tableData.updateTime = this.formatTime(this.tableData.updateTime)
            this.dataRange = JSON.parse(res.body.dataRange).flat(Infinity)

            // console.log(this.dataList, '-----------------------')
          } else {
            Message.error(res.header.message)
          }
        })
        .catch(e => {
          this.loading1 = false
          // Message.error('详情请求失败')
        })

      getDataUseApiInterfaceInfo(id).then((res) => {
        if (res.success) {
          this.shareApiInfo = res.body
        }
      })

    },
    handleSelectionChange() { },
    resetForm(inquireDataRef) {
      this.inquireData.applyDept = ''
      this.inquireData.useAppSystem = ''
      this.inquireData.launchDate = ''
      this.inquireData.openDate = ''
      this.pageList = ''
    }
  },
  computed: {
    ...mapState({
      datefromList: state => state.indatafrom.datefromList
    })
  }
}
</script>

<style lang="less" scoped>
#Sharedetails {
  .sharedetails-header {
    height: 70px;
    margin-bottom: 24px;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;

    .header-title {
      display: inline-block;
      max-width: 320px;//内容过长影响布局做限制
      margin-right: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .header-item {
      display: inline-block;
      max-width: 250px;//内容过长影响布局做限制
      margin-right: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .cusa-items {
    display: inline-block;
    width: 110px;
  }

  .cusa-itemss {
    display: inline-block;
    width: 70px;
  }

  .port-items {
    display: inline-block;
    width: 150px;
  }

  .marg-r {
    display: inline-block;
    width: 350px;
  }

  .info {
    padding: 32px;
    display: flex;

    // justify-content: space-between;
    .info-left {
      // margin-right: 300px;
      width: 550px;
    }

    .itme-title {
      width: 160px;
      display: inline-block;
    }
  }
}

.cardflex {
  display: flex;
  flex-direction: row;
}

.fromfontsmle {
  margin-right: 48px;
}

.toptitlflex {
  display: flex;
}

.ptoptitle {
  font-size: 14px;
  margin: 0 40px 0 0;
  //   font-weight: 700;
}

.tagmarg {
  margin-right: 16px;
  font-size: 12px;
}

.elfromweit {
  width: 800px;
}

.fromfont {
  margin: 0 160px 16px 0;
  width: 425px;
  height: 30px;
}

.elfromweit {
  width: 100%;
}

.divbluemarg {
  margin-top: 10px;
}

.spanbluemarg {
  margin-right: 10px;
}

.paginationtop {
  padding: 24px;
}

// 编目详情
.jibentop {
  padding: 0 24px;
  font-size: 16px;
  font-weight: 600;
  color: #1890ff;
}

.pdivider {
  margin: 15px 0;
}

::v-deep .el-divider {
  background-color: #1890ff;
}

.frompfont {
  font-size: 14px;
  color: #777777;
}

.fuwumargin {
  margin-top: 40px;
}

.tabsmarg {
  margin-top: 40px;
}

.jibenxinxi {
  margin-top: 24px;
  font-weight: 600;
  color: #000000;
}

/deep/.el-tabs__item {
  padding-left: 24px !important;
}

/deep/ #pane-second {
  padding: 0 24px;
}
</style>
