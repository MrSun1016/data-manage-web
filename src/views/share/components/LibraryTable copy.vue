<template>
  <div>
    <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="数据预览" name="second">
        <p style="color: red; font-size: 12px; padding-left: 32px">*号表示该数据已脱敏无法展示</p>
        <el-table
          :data="serviceData.tableList"
          class="tablewei"
          :header-cell-style="{
            background: '#E6F7FF',
            fontWeight: '600',
            color: '#333333',
            fontSize: '14px',
          }"
          style="width: 100%"
          :row-style="{ backgroundColor: '#F8FAFB' }"
        >
          <el-table-column
            width="180"
            v-for="(item, index) in serviceData.titleList"
            :label="item.title"
            :key="item.code"
          >
            <!-- :width="cloumnWidth(index)" -->
            <template slot-scope="scope">
              {{ scope.row[item.code] || '-' }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="交换资源" name="prot">
        <el-form
          :inline="true"
          label-position="left"
          :rules="resourceDataRules"
          :model="resourceData"
          ref="resourceData"
          size="small"
          class="demo-form-inline formwei"
        >
          <el-form-item class="formitem">
            <!-- <el-form-item label="是否创建目的库：" prop="autoCreateDbFlag">
              <el-radio-group v-model="resourceData.autoCreateDbFlag">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item label="创建目的库：" prop="targetDb">
              <el-select
                clearable
                v-model="resourceData.targetDb"
                @change="handleGoalSelect"
                placeholder="请选择目的库"
              >
                <el-option
                  @click.native="onSelectGoal(goals)"
                  :label="goals.code + '(' + goals.planName + ')'"
                  :value="goals.name"
                  v-for="goals in goalLibrary"
                  :key="goals.storageId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
          <el-form-item class="formitem">
            <el-form-item label="自动创建目标表：" prop="autoCreateTableFlag">
              <el-radio-group v-model="resourceData.autoCreateTableFlag" @change="handleGroupCheck">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="目的表：" v-show="resourceData.autoCreateTableFlag == '1'">
              <el-input
                v-model="resourceData.targetTabl"
                @input="changeValue"
                placeholder="请输入目的表"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="目的表：" v-show="resourceData.autoCreateTableFlag == '2'">
              <el-select clearable filterable v-model="resourceData.targetTable" placeholder="请选择目的表">
                <!-- @change="handleChange" -->
                <el-option
                  @click.native="handleTable(tableTypeItem)"
                  :label="tableTypeItem.tableName"
                  :value="tableTypeItem.tableName"
                  v-for="tableTypeItem in tableType"
                  :key="tableTypeItem.tableName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
        </el-form>
        <div v-show="resourceData.autoCreateTableFlag" style="padding: 0 24px">
          <div style="display: flex; flex-direction: column">
            <div style="cursor: pointer">
              <span style="color: #1890ff" @click="handleOrderMap">按顺序映射</span><span style="margin: 0 8px">|</span
              ><span style="color: #1890ff" @click="handleEnNameMap">按名称映射</span>
            </div>
            <div
              style="
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-between;
                flex-direction: row;
                margin: 12px 0;
              "
            >
              <!-- 映射结果 -->
              <div class="source">
                <div class="title">
                  <div>
                    <span class="mag-r">映射结果</span>
                    <!-- <span>0</span> -->
                  </div>
                  <span class="isShow" @click="hanleClearAll">全部清空</span>
                </div>
                <div class="input">
                  <el-input
                    clearable
                    @input="handleResult"
                    v-model="seachRes"
                    size="mini"
                    placeholder="请输入名称搜索"
                  ></el-input>
                </div>
                <el-table
                  :data="resTables"
                  style="width: 100%"
                  height="350"
                  :header-cell-style="{ background: '#f7f7f7', color: '#606266', fontSize: '12px' }"
                >
                  <el-table-column type="index" label="序号"> </el-table-column>
                  <el-table-column prop="enName" label="源头表字段"></el-table-column>
                  <el-table-column prop="sourceType" label="类型"> </el-table-column>
                  <el-table-column prop="goalName" label="目的表字段"> </el-table-column>
                  <el-table-column prop="goalType" label="类型"> </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="{ row, $index }">
                      <i class="el-icon-delete" style="cursor: pointer" @click="handleDelete(row)"></i>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!-- 源头表 -->
              <div class="source" id="container" style="margin: 0 24px">
                <div class="title">
                  <div>
                    <span class="mag-r">源头表</span>
                    <!-- <span>0/{{ sourceTableData.length }}</span> -->
                  </div>
                  <!-- <span class="isShow" @click="isShow = !isShow">{{ isShow ? '显示全部' : '隐藏已映射' }}</span> -->
                </div>
                <div class="input">
                  <el-input
                    @input="handleInput"
                    clearable
                    v-model="search"
                    size="mini"
                    placeholder="请输入名称搜索"
                  ></el-input>
                </div>
                <el-table
                  :data="sourceTables"
                  v-loading="sourceLoading"
                  style="width: 100%; cursor: pointer"
                  ref="sourceRef"
                  height="350"
                  @row-click="rowClick"
                  :row-class-name="tableRowClassName"
                  :header-cell-style="{ background: '#f7f7f7', color: '#606266', fontSize: '12px' }"
                >
                  <el-table-column width="55">
                    <template slot-scope="{ row, $index }">
                      <i v-if="row.state === 0" @click="handleState0" class="iconfont icon-jinyong"></i>
                      <i
                        v-if="row.state === 1"
                        @click="handleState1(row, $index)"
                        class="iconfont icon-danxuanweixuanzhong"
                      ></i>
                      <i v-if="row.state === 2" @click="handleState2" class="iconfont icon-danxuanxuanzhong"></i>
                      <el-tooltip v-if="row.state === 3" placement="top">
                        <div slot="content">
                          <span style="margin: 0 8px">目的表字段：{{ handleMapfield(row.enName).goalName }}</span>
                          <span @click="handleBreakMap(row)" class="break-map">断开映射</span>
                        </div>
                        <i @click="handleState3" class="iconfont icon-lianjie"></i>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column prop="enName" label="源头表字段">
                    <template slot-scope="scope">
                      <i class="iconfont icon-yuechi" v-show="scope.row.primaryKey"></i>
                      <span style="margin-left: 8px;">{{ scope.row.enName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="dataType" label="类型"> </el-table-column>
                </el-table>
              </div>
              <!-- 目的表 -->
              <div class="source">
                <div class="title">
                  <div>
                    <span class="mag-r">目的表</span>
                    <!-- <span>0/{{ sourceTableData.length }}</span> -->
                  </div>
                  <!-- <span class="isShow" @click="isShow1 = !isShow1">{{ isShow1 ? '显示全部' : '隐藏已映射' }}</span> -->
                </div>
                <div class="input">
                  <el-input
                    v-model="seaSurFace"
                    clearable
                    @input="handleSursear"
                    size="mini"
                    placeholder="请输入名称搜索"
                  ></el-input>
                </div>
                <el-table
                  :data="goalTables"
                  v-loading="goalLoading"
                  style="width: 100%; cursor: pointer"
                  height="350"
                  @row-click="goalRowClick"
                  :row-class-name="goalTableRowClassName"
                  :header-cell-style="{ background: '#f7f7f7', color: '#606266', fontSize: '12px' }"
                >
                  <label>
                    <el-table-column width="55">
                      <template slot-scope="{ row, $index }">
                        <i v-if="row.state === 0" class="iconfont icon-jinyong"></i>
                        <i
                          v-if="row.state === 1"
                          @click="hanleGoalState1(row, $index)"
                          class="iconfont icon-danxuanweixuanzhong"
                        ></i>
                        <i v-if="row.state === 2" class="iconfont icon-danxuanxuanzhong"></i>

                        <el-tooltip v-if="row.state === 3" placement="top">
                          <div slot="content">
                            <span style="margin: 0 8px">源头表字段：{{ handleMapSourcefield(row.enName).enName }}</span>
                            <span slot="content" @click="handleBreakGoalMap(row)" class="break-map">断开映射</span>
                          </div>
                          <i class="iconfont icon-lianjie"></i>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                  </label>
                  <el-table-column prop="enName" label="目的表字段">
                    <template slot-scope="scope">
                      <i class="iconfont icon-yuechi" v-show="scope.row.primaryKey"></i>
                      <span style="margin-left: 8px">{{ scope.row.enName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="dataType" label="类型"> </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
        <el-form
          :model="resourceData2"
          :rules="resourceDataRules2"
          label-position="left"
          label-width="120px"
          size="small"
          class="formmar"
          ref="resourceData2"
        >
          <el-form-item label="传输模式：" prop="conveyType">
            <el-radio-group v-model="resourceData2.conveyType">
              <el-radio label="一次性"></el-radio>
              <el-radio label="重复性"></el-radio>
            </el-radio-group>
            <el-select
              clearable
              v-if="resourceData2.conveyType == '重复性'"
              style="margin-left: 50px"
              v-model="resourceData2.updateFrequency"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                :label="frequencyItem.text"
                :value="frequencyItem.value"
                v-for="frequencyItem in datefromList.transportMode"
                :key="frequencyItem.title"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="导入规则：" prop="importRuleType">
            <el-select clearable v-model="resourceData2.importRuleType" size="small" placeholder="请选择">
              <el-option
                :label="rulesItem.text"
                :value="rulesItem.value"
                v-for="rulesItem in importRule"
                :key="rulesItem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" size="small" @click="onSubmit" :loading="subLoading">{{
            subLoading ? '提交中...' : '提交'
          }}</el-button>
          <el-button size="small" @click="onCancel">取 消</el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { Message } from 'element-ui'
import {
  postlistDatabase,
  postRelationType,
  getAddTableConfig,
  getAddTable,
  getSourceTableFields,
  getDictItems,
  getExchangetaskAdd,
  getDestTableFields,
} from '@/api/api'
export default {
  name: 'LibraryTable',
  props: ['serviceData'],
  data() {
    return {
      sourceLoading: false,
      goalLoading: false,
      subLoading: false,
      seachRes: '',
      // 搜索目的表
      seaSurFace: '',
      search: '',
      isShow1: false,
      isShow: false,
      showTable: [],
      mapResultData: [],
      goalTableData: [],
      sourceTableData: [],
      SQLstatement: '',
      // 更新频率数据
      upFrequency: '',
      // 更新频率-数据字典
      transportMode: 'transport_mode',
      // 目的库
      goalLibrary: [],
      // 目的库
      goals: '',
      // 目的表
      tableType: [],
      activeName: 'second',
      // 验证规则
      resourceDataRules: {
        targetDb: [{ required: true, message: '请选择目的库', trigger: 'change' }],
        autoCreateTableFlag: [{ required: true, message: '是否创建目的表', trigger: 'change' }],
      },
      resourceDataRules2: {
        conveyType: [{ required: true, message: '请选择传输模式', trigger: 'change' }],
        importRuleType: [{ required: true, message: '请选择导入规则', trigger: 'change' }],
      },
      // 导入规则
      importRule: [],
      resourceData: {
        catalogId: '',
        applyId: '',
        // 目的库
        autoCreateDbFlag: '',
        // 目的表
        autoCreateTableFlag: '',
        // 选择的目的库
        targetDb: '',
        // 选择的目的表
        targetTable: '',
      },
      resourceData2: {
        // 传输模式
        conveyType: '',
        // 重复性输入框
        updateFrequency: '',
        // 导入规则
        importRuleType: '',
        whereSql: '',
      },
      // resourceDataReq: {
      // },
      searchContent: '',
      searchContent1: '',
      searchContent2: '',
      instance: null,
      newObj: {},
      primaryKey: 'primary_key_conflict_policy',
      index: '',
      // 自动创建交换任务请求参数
      exchangeTaskBo: {
        applyId: '',
        conveyType: '',
        destLibraryName: '',
        destStorageId: '',
        destStorageList: [],
        destTableName: '',
        fieldMappings: [],
        importRuleType: '',
        isAutoCreateDest: '',
        repeatType: '',
        srcLibraryName: '',
        srcStorageId: '',
        srcStorageList: [],
        srcTableName: '',
      },
      selectVal: '',
      rowIndex: 0,
    }
  },
  activated() {},
  created() {
    //数据字典-更新频率
    this.frequencyList()
    // 目的库
    this.fetchPostlistDatabase()
    this.handleSourceTableFields()
    this.dictionaryList()
  },
  methods: {
    handleReset() {
      this.mapResultData = []
      this.exchangeTaskBo.srcStorageList = []
      this.exchangeTaskBo.fieldMappings = []
      this.exchangeTaskBo.destStorageList = []
      this.sourceTableData.forEach((v) => {
        v.state = 1
      })
      this.goalTableData.forEach((v) => {
        v.state = 0
      })
    },
    handleDelete(row) {
      let resIndex = this.mapResultData.findIndex((v) => v.enName === row.enName)
      if (this.index === '')
        (this.goalTableData[this.mapResultData[resIndex].rIndex].state = 0),
          (this.sourceTableData[this.mapResultData[resIndex].lIndex].state = 1)
      this.mapResultData.splice(resIndex, 1)
      this.exchangeTaskBo.destStorageList.splice(resIndex, 1)
      this.exchangeTaskBo.srcStorageList.splice(resIndex, 1)
      this.exchangeTaskBo.fieldMappings.splice(resIndex, 1)
    },
    changeValue(e) {
      this.$forceUpdate()
    },
    handleGoalSelect() {
      this.resourceData.targetTable = ''
      this.handleReset()
    },
    //按顺序映射
    handleOrderMap() {
      this.handleReset()
      this.sourceTableData.forEach((v, i) => {
        if (this.goalTableData[i]) this.handleDataConvert(i, i)
        else return
      })
    },
    // 按名称映射
    handleEnNameMap() {
      let flag = true
      this.handleReset()
      // this.goalTableData = JSON.parse(JSON.stringify(this.sourceTableData))
      let goalTableDataCopy =  JSON.parse(JSON.stringify(this.goalTableData))
      goalTableDataCopy.forEach(v=>{
        v.enName = v.enName.toUpperCase()
      })
      let sourceTableData =  JSON.parse(JSON.stringify(this.sourceTableData))
      sourceTableData.forEach(v=>{
        v.enName = v.enName.toUpperCase()
      })
      goalTableDataCopy.forEach((item, index) => {
        let resIndex = goalTableDataCopy.findIndex((v) => v.enName === item.enName)
        if (resIndex != -1) {
          this.handleDataConvert(resIndex, index)
          flag = false
        }
      })
      return flag
    },
    // 选择目的表
    handleTable(data) {
      this.goalLoading = true
      this.sourceLoading = true
      this.goalTableData.forEach((v) => {
        v.state = 0
      })
      this.sourceTableData.forEach((v) => {
        v.state = 1
      })
      let tableitem
      this.goalLibrary.filter((value, index) => {
        if (value.name == this.resourceData.targetDb) {
          tableitem = value.storageId
        }
      })
      this.exchangeTaskBo.destStorageId = tableitem
      this.exchangeTaskBo.destTableName = data.tableName
      let obj = {
        storageId: tableitem,
        tableName: data.tableName,
        toClassId: '47',
      }
      getDestTableFields(obj)
        .then((res) => {
          if (res.success) {
            this.goalLoading = false
            this.sourceLoading = false
            res.body.forEach((v) => {
              v.state = 0
              v.primaryKey === '是' ? (v.primaryKey = true) : (v.primaryKey = false)
            })
            this.goalTableData = res.body
            this.mapResultData = []
            this.exchangeTaskBo.srcStorageList = []
            this.exchangeTaskBo.fieldMappings = []
            this.exchangeTaskBo.destStorageList = []
            // 字段一样默认映射
            if (this.handleEnNameMap()) {
              this.handleOrderMap()
            }
          } else {
            this.goalLoading = false
            this.sourceLoading = false
          }
        })
        .catch((_) => {
          this.goalLoading = false
          this.sourceLoading = false
        })
    },
    handleGroupCheck(val) {
      if (val === '1') {
        this.exchangeTaskBo.destTableName = this.resourceData.targetTabl
        this.resourceData.targetTable = ''
        this.handleReset()
        this.goalTableData = JSON.parse(JSON.stringify(this.sourceTableData))
      //   // 数据库类型为Oracle目的表字段转为大写
      //   this.goalTableData.forEach(v=>{
      //   v.enName = v.enName.toUpperCase()
      //  })
        // 字段一样默认映射
        this.sourceTableData.forEach((item, index) => {
          let resIndex = this.goalTableData.findIndex((v) => v.enName === item.enName)
          if (resIndex != -1) {
            this.handleDataConvert(resIndex, index)
          }
        })
      } else {
        this.goalTableData = []
        this.handleReset()
      }
    },
    handleDataConvert(resIndex, index) {
      this.sourceTableData[index].state = 3
      this.goalTableData[resIndex].state = 3
      this.goalTableData[resIndex].nullValue === '是'
        ? (this.goalTableData[resIndex].nullValue = true)
        : (this.goalTableData[resIndex].nullValue = false)
      this.sourceTableData[resIndex].nullValue === '1'
        ? (this.sourceTableData[index].nullValue = true)
        : (this.sourceTableData[index].nullValue = false)
      this.mapResultData.push({
        enName: this.sourceTableData[index].enName,
        sourceType: this.sourceTableData[index].dataType,
        goalName: this.goalTableData[resIndex].enName,
        goalType: this.goalTableData[resIndex].dataType,
        lIndex: index,
        rIndex: resIndex,
      })
      // 目的表请求数据
      this.exchangeTaskBo.destStorageList.push({
        autoIncrement: false,
        comment: this.goalTableData[resIndex].name,
        field: this.goalTableData[resIndex].enName,
        fieldLength: this.goalTableData[resIndex].dataLength,
        index: this.goalTableData[resIndex].index,
        nullable: this.goalTableData[resIndex].nullValue,
        partition: false,
        precision: 200,
        primaryKey: this.goalTableData[resIndex].primaryKey,
        scale: {},
        type: this.goalTableData[resIndex].dataType,
      })
      // 源头表请求数据
      this.exchangeTaskBo.srcStorageList.push({
        autoIncrement: false,
        comment: this.sourceTableData[index].name,
        field: this.sourceTableData[index].enName,
        fieldLength: this.sourceTableData[index].dataLength,
        index: this.sourceTableData[index].index,
        nullable: this.sourceTableData[index].nullValue,
        partition: false,
        precision: 200,
        primaryKey: this.sourceTableData[index].primaryKey,
        scale: {},
        type: this.sourceTableData[index].dataType,
      })
      // 字段映射数据
      this.exchangeTaskBo.fieldMappings.push({
        destField: this.goalTableData[resIndex].enName,
        destIndex: this.goalTableData[resIndex].index,
        destPrimaryKey: this.goalTableData[resIndex].primaryKey,
        destSpliter: '',
        destType: this.goalTableData[resIndex].dataType,
        mapping: false,
        separateWord: 0,
        srcField: this.sourceTableData[index].enName,
        srcIndex: this.sourceTableData[index].index,
        srcPrimaryKey: this.sourceTableData[index].primaryKey,
        srcSpliter: '',
        srcType: this.sourceTableData[index].dataType,
        srcTypeFormat: '',
      })
    },
    onSubmit() {
      // this.subLoading = true
      this.exchangeTaskBo.applyId = this.$route.query.applyId
      this.resourceData2.conveyType === '一次性'
        ? (this.resourceData2.conveyType = 1)
        : (this.resourceData2.conveyType = 2)
      this.exchangeTaskBo.conveyType = this.resourceData2.conveyType
      this.resourceData.targetTable = this.resourceData.targetTabl
      this.exchangeTaskBo.destLibraryName = this.resourceData.targetDb
      this.exchangeTaskBo.importRuleType = this.resourceData2.importRuleType
      this.exchangeTaskBo.isAutoCreateDest = this.resourceData.autoCreateTableFlag
      this.exchangeTaskBo.repeatType = this.resourceData2.updateFrequency
      console.log(this.exchangeTaskBo.fieldMappings, 'fieldMappings----结果')
      console.log(this.exchangeTaskBo.srcStorageList, 'srcStorageList----源头表')
      console.log(this.exchangeTaskBo.destStorageList, 'destStorageList---目的表')
      // const p1 = new Promise((resolve, reject) => {
      //   this.$refs['resourceData'].validate((valid) => {
      //     if (valid) resolve()
      //     else this.subLoading = false
      //   })
      // })

      // const p2 = new Promise((resolve, reject) => {
      //   this.$refs['resourceData2'].validate((valid) => {
      //     if (valid) resolve()
      //     else this.subLoading = false
      //   })
      // })

      // Promise.all([p1, p2]).then(() => {
      //   if (
      //     this.exchangeTaskBo.fieldMappings.length <= 0 ||
      //     this.exchangeTaskBo.srcStorageList.length <= 0 ||
      //     this.exchangeTaskBo.destStorageList.length <= 0
      //   ) {
      //     Message({
      //       showClose: true,
      //       message: '您还没选择字段映射关系',
      //       type: 'error',
      //     })
      //     this.subLoading = false
      //   } else {
      //     this.fetchExchangetaskAdd()
      //   }
      // })
    },
    // 自动创建交换任务
    fetchExchangetaskAdd() {
      getExchangetaskAdd(this.exchangeTaskBo)
        .then((res) => {
          if (res.success) {
            this.subLoading = false
            Message({
              showClose: true,
              message: `提交${res.header.message}`,
              type: 'success',
            })
            this.fetchAddTable()
            this.handleReset()
            this.$refs.resourceData.resetFields()
            this.$refs.resourceData2.resetFields()
            this.goalTableData = []
            this.subLoading = false
          } else {
            this.subLoading = false
            Message({
              showClose: true,
              message: res.header.message,
              type: 'error',
            })
          }
        })
        .catch((_) => {
          this.subLoading = false
        })
    },
    fetchAddTable() {
      this.onAssignment()
      getAddTable(this.resourceDataReq).then((res) => {})
    },
    handleMapSourcefield(enName) {
      return this.mapResultData.find((v) => {
        return v.goalName === enName
      })
    },
    handleMapfield(enName) {
      return this.mapResultData.find((v) => {
        return v.enName === enName
      })
    },
    // 断开源头表映射
    handleBreakMap(row) {
      row.state = 1
      let resIndex = this.mapResultData.findIndex((v) => v.enName === row.enName)
      if (this.index === '') this.goalTableData[this.mapResultData[resIndex].rIndex].state = 0
      else this.goalTableData[this.mapResultData[resIndex].rIndex].state = 1
      this.mapResultData.splice(resIndex, 1)
      this.exchangeTaskBo.srcStorageList.splice(resIndex, 1)
      this.exchangeTaskBo.fieldMappings.splice(resIndex, 1)
    },
    // 断开目的表映射
    handleBreakGoalMap(row) {
      row.state = 0
      let resIndex = this.mapResultData.findIndex((v) => v.goalName === row.enName)
      if (this.index === '') {
        this.sourceTableData[this.mapResultData[resIndex].lIndex].state = 1
      } else {
        this.sourceTableData[this.mapResultData[resIndex].lIndex].state = 0
      }
      this.mapResultData.splice(resIndex, 1)
      this.exchangeTaskBo.destStorageList.splice(resIndex, 1)
      this.exchangeTaskBo.fieldMappings.splice(resIndex, 1)
    },
    // 目的表状态
    hanleGoalState1(row, index) {
      row.state = 3
      this.sourceTableData[this.index].state = 3
      this.mapResultData.push({
        enName: this.sourceTableData[this.index].enName,
        goalName: row.enName,
        sourceType: this.sourceTableData[this.index].dataType,
        goalType: row.dataType,
        lIndex: this.index,
        rIndex: index,
      })
      row.nullValue === '是' ? (row.nullValue = true) : (row.nullValue = false)
      this.sourceTableData[this.index].nullValue === '1'
        ? (this.sourceTableData[this.index].nullValue = true)
        : (this.sourceTableData[this.index].nullValue = false)
      // 目的表请求数据
      this.exchangeTaskBo.destStorageList.push({
        autoIncrement: false,
        comment: row.name,
        field: row.enName,
        fieldLength: row.dataLength,
        index: index,
        nullable: row.nullValue,
        partition: false,
        precision: 200,
        primaryKey: row.primaryKey,
        scale: {},
        type: row.dataType,
      })
      // 源头表请求数据
      this.exchangeTaskBo.srcStorageList.push({
        autoIncrement: false,
        comment: this.sourceTableData[this.index].name,
        field: this.sourceTableData[this.index].enName,
        fieldLength: this.sourceTableData[this.index].dataLength,
        index: this.sourceTableData[this.index].index,
        nullable: this.sourceTableData[this.index].nullValue,
        partition: false,
        precision: 200,
        primaryKey: this.sourceTableData[this.index].primaryKey,
        scale: {},
        type: this.sourceTableData[this.index].dataType,
      })
      // 字段映射数据
      this.exchangeTaskBo.fieldMappings.push({
        destField: row.enName,
        destIndex: row.index,
        destPrimaryKey: row.primaryKey,
        destSpliter: '',
        destType: row.dataType,
        mapping: false,
        separateWord: 0,
        srcField: this.sourceTableData[this.index].enName,
        srcIndex: this.sourceTableData[this.index].index,
        srcPrimaryKey: this.sourceTableData[this.index].primaryKey,
        srcSpliter: '',
        srcType: this.sourceTableData[this.index].dataType,
        srcTypeFormat: '',
      })
      this.index = ''
      this.goalTableData.forEach((v) => {
        if (v.state !== 3) {
          v.state = 0
        }
      })
    },
    // 源头表状态
    handleState0() {},
    // 把目的表每一行的索引放进row
    goalTableRowClassName({ row, rowIndex }) {
      row.index = rowIndex
      // if(row.isShow ==='N'){ 
      //   return 'hidden_box'
      // }
    },
    goalRowClick(row) {
      if (row.state === 1) this.hanleGoalState1(row, row.index)
      else return
    },
    // 把源头表每一行的索引放进row
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex
      // if(row.isShow==='N'){
      //   return 'hidden_box'
      // }
    },
    rowClick(row) {
      if (row.state === 1) this.handleState1(row, row.index)
      else return
    },
    handleState1(row, index) {
      this.goalTableData.forEach((v) => {
        if (v.state !== 3) {
          v.state = 1
        }
      })
      if (this.index !== '') {
        this.sourceTableData[this.index].state = 1
      }
      this.index = index
      row.state = 2
    },
    handleState2() {},
    handleState3() {},
    // 全部清空
    hanleClearAll() {
      this.mapResultData = []
      this.exchangeTaskBo.srcStorageList = []
      this.exchangeTaskBo.fieldMappings = []
      this.exchangeTaskBo.destStorageList = []
      this.sourceTableData.forEach((v) => {
        v.state = 1
      })
      this.goalTableData.forEach((v) => {
        v.state = 0
      })
    },
    // 目的表搜索
    handleSursear(val) {
      this.searchContent = val
    },
    handleInput(val) {
      this.searchContent1 = val
    },
    handleResult(val) {
      this.searchContent2 = val
    },
    dictionaryList() {
      getDictItems(this.primaryKey).then((res) => {
        if (res.code === 200) {
          this.importRule = res.result
        }
      })
    },
    handleSourceTableFields() {
      this.resourceData.applyId = this.$route.query.applyId
      this.sourceLoading = true
      getSourceTableFields(this.resourceData.applyId)
        .then((res) => {
          if (res.success) {
            this.sourceLoading = false
            res.body.forEach((v) => {
              v.state = 1
              v.primaryKey === '1' ? (v.primaryKey = true) : (v.primaryKey = false)
            })
            this.sourceTableData = res.body
            this.exchangeTaskBo.srcLibraryName = res.body[0].srcDatabaseName
            this.exchangeTaskBo.srcStorageId = res.body[0].sqDataSourceId
            this.exchangeTaskBo.srcTableName = res.body[0].srcTableName
            this.resourceData.targetTabl = res.body[0].srcTableName
          } else {
            this.sourceLoading = false
          }
        })
        .catch((_) => {
          this.sourceLoading = false
        })
    },
    onAssignment() {
      this.resourceData.applyId = this.$route.query.applyId
      this.resourceData.catalogId = this.$route.query.catalogId
      this.resourceDataReq = { ...this.resourceData, ...this.resourceData2 }
    },
    onCancel() {
      ;(this.SQLstatement = ''),
        (this.resourceData2.whereSql = ''),
        (this.resourceData.targetDb = ''),
        (this.resourceData.targetTable = ''),
        this.$refs.resourceData.resetFields()
      this.$refs.resourceData2.resetFields()
      this.$router.push({
        path: '/datasharing/useing',
      })
    },
    // 预览SQL
    // onPreviewSQL() {
    //   this.onAssignment()
    //   getAddTableConfig(this.resourceDataReq).then((res) => {
    //     if (res.success) {
    //       this.SQLstatement = res.body
    //       Message({
    //         showClose: true,
    //         message: res.header.message,
    //         type: 'success',
    //       })
    //     } else {
    //       Message({
    //         showClose: true,
    //         message: res.header.message,
    //         type: 'error',
    //       })
    //     }
    //   })
    // },
    onSelectGoal(data) {
      this.exchangeTaskBo.destStorageId = data.storageId
      let obj = {
        storageId: data.storageId,
        tableName: data.name,
        toClassId: '46',
      }
      postRelationType(obj).then((res) => {
        if (res.success) {
          this.tableType = res.body
        }
      })
    },
    // 库名
    fetchPostlistDatabase() {
      let goalLibrary = {}
      postlistDatabase(goalLibrary).then((res) => {
        if (res.success) {
          this.goalLibrary = res.body
        }
      })
    },
    frequencyList() {
      // 更新频率
      this.$store.dispatch('getTransportMode', this.transportMode)
    },
    // cloumnWidth(index) {
    //   if (index == 0) return 100
    // },
    handleClick(tab, event) {},
  },
  computed: {
    ...mapState({
      datefromList: (state) => state.indatafrom.datefromList,
    }),
    goalTables() {
      const search = this.searchContent
      //当将input框清空时，使列表自动展示搜索前的完整数据
      if (this.inputContent == '') {
        this.searchContent = ''
        return this.goalTableData
      }
      if (search !== '') {
        return this.goalTableData.filter((dataNews) => {
          return Object.keys(dataNews).some((key) => {
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
          })
        })
      } else return this.goalTableData
    },
    sourceTables() {
      const search = this.searchContent1
      //当将input框清空时，使列表自动展示搜索前的完整数据
      if (this.inputContent == '') {
        this.searchContent1 = ''
        return this.sourceTableData
      }
      if (search !== '') {
        return this.sourceTableData.filter((dataNews) => {
          return Object.keys(dataNews).some((key) => {
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
          })
        })
      } else return this.sourceTableData
    },
    resTables() {
      const search = this.searchContent2
      //当将input框清空时，使列表自动展示搜索前的完整数据
      if (this.inputContent == '') {
        this.searchContent2 = ''
        return this.mapResultData
      }
      if (search !== '') {
        return this.mapResultData.filter((dataNews) => {
          return Object.keys(dataNews).some((key) => {
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
          })
        })
      } else return this.mapResultData
    },
  },
}
</script>
<style>
 .el-table .hidden_box {
    display: none;
  }
</style>
<style lang="less" scoped>
.pastabsolute {
  position: absolute;
  top: 40px;
  left: -123px;
}
/deep/.el-tabs__nav-scroll {
  padding: 0 32px;
}
/deep/.el-tabs__nav-wrap::after {
  border-bottom: 1px solid #1890ff;
}
.tablewei {
  // margin: 24px 32px 180px 32px;
  padding: 0 24px;
}
/deep/.el-table {
  // width: 100%;
  width: calc(100% - 64px);
}
.el-form-item {
  margin-right: 95px;
}
/deep/.el-form-item__label {
  color: #333;
}
/deep/.el-tabs__item {
  height: 60px;
  font-weight: 600;
}
.formwei {
  margin: 24px 32px 0 32px;
  display: flex;
  flex-direction: column;
  .formitem {
    margin: 0;
  }
}
.formmar {
  margin: 0 32px 100px 32px;
  .frombigweiht {
    width: 576px;
  }
}
.source {
  width: 33%;
  // height: 300px;
  border: 1px solid #f8f8f8;
  // padding: 8px 8px;
  .title {
    background-color: #f7f7f7;
    display: flex;
    height: 34px;
    padding: 0 8px;
    justify-content: space-between;
    align-items: center;
    .isShow {
      color: #1890ff;
      font-size: 12px;
      cursor: pointer;
    }
    .mag-r {
      margin-right: 8px;
    }
  }
  .input {
    padding: 8px 8px;
  }
  .source-info {
    width: 100%;
    padding: 0 8px;
    display: flex;
    height: 34px;
    // justify-content: space-between;
    background: #f7f7f7;
    align-items: center;
    .source-field {
      width: 50%;
      margin-right: 9px;
      border-right: 1px solid #e8e8e8;
    }
  }
}
// .map-result {
//   width: 100%;
// }
.iconfont {
  font-size: 20px;
  cursor: pointer;
}
.icon-jinyong {
  color: red;
}
.icon-lianjie {
  color: #1890ff;
}
.break-map {
  color: #1890ff;
  cursor: pointer;
}
.icon-yuechi {
  color: orange;
}
</style>
