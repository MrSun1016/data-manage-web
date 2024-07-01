<template>
  <div class="data-origin">
    <!-- 表单项 -->
    <el-form
      :inline="true"
      :model="databaseFormData"
      label-position="left"
      ref="databaseFormData"
      class="demo-form-inline database-box"
    >
      <div class="df">
        <el-form-item label="名称：" class="form-item database-item" prop="dataName" label-width="70px">
          <el-input
            clearable
            size="small"
            v-model="databaseFormData.dataName"
            placeholder="请输入"
            class="database"
          ></el-input>
        </el-form-item>
        <el-form-item label="数据库类型：" class="database-item" prop="databaseType">
          <el-select
            size="small"
            v-model="databaseFormData.databaseType"
            clearable
            placeholder="请选择"
            class="database"
          >
            <el-option
              :label="database.label"
              :value="database.value"
              v-for="database in databaseType2"
              :key="database.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据库地址：" class="database-item" prop="databaseAddress">
          <el-input
            size="small"
            clearable
            v-model="databaseFormData.databaseAddress"
            placeholder="请输入"
            class="database"
          ></el-input>
        </el-form-item>
      </div>
      <div class="df">
        <el-form-item label="端口号：" class="database-item" prop="port">
          <el-input
            clearable
            size="small"
            v-model="databaseFormData.port"
            placeholder="请输入"
            class="database"
          ></el-input>
        </el-form-item>
        <el-form-item label="数据库名称：" class="database-item" prop="databaseName">
          <el-input
            size="small"
            clearable
            v-model="databaseFormData.databaseName"
            placeholder="请输入"
            class="database"
          ></el-input>
        </el-form-item>
        <el-form-item style="width: 282px; text-align: right">
          <el-button type="primary" size="mini" @click="onDatabaseOigin">查询</el-button>
          <el-button size="mini" @click="onReset('databaseFormData')">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- table表格 -->
    <div class="table-box">
      <el-button
        icon="el-icon-plus"
        class="add-btn"
        size="mini"
        @click="onAddDatabaseData('新增')"
        type="primary"
        v-has="'dataOigin:newlyAdded'"
        >新增</el-button
      >
      <el-table
        v-loading="tableLoading"
        @select="handleSelect"
        @select-all="handleAll"
        :row-class-name="tableRowClassName"
        :header-cell-style="{ background: '#E6F7FF', color: '#333333' }"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%; margin-top: 24px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="dataName" label="名称"></el-table-column>
        <el-table-column prop="databaseType" label="类型"></el-table-column>
        <el-table-column prop="databaseAddress" label="服务器地址"></el-table-column>
        <el-table-column prop="port" label="端口号"></el-table-column>
        <el-table-column prop="databaseName" label="数据库名称"></el-table-column>
        <el-table-column prop="userName" label="创建人名称"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="onAddDatabaseData('编辑', scope.row)"
              v-has="'dataOigin:edit'"
              >编辑</el-link
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <el-link
              type="primary"
              :underline="false"
              @click="onDeleteServiceMatters(scope.row)"
              v-has="'dataOigin:delete'"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="paging"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="pageSizes"
        :page-size="100"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
      ></el-pagination>
    </div>
    <!-- 新增弹窗 -->
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      :before-close="handleClose"
      class="add-mask"
    >
      <div class="add-data-origin">{{ title }}数据源</div>
      <el-form
        label-position="left"
        :model="addDataSource"
        :rules="rules"
        ref="addDataSource"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="数据源名称" prop="dataName">
          <el-input
            v-model="addDataSource.dataName"
            size="small"
            clearable
            class="addData"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="数据源传送网关" prop="transportGateway">
          <el-input
            v-model="addDataSource.transportGateway"
            size="small"
            clearable
            class="addData"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="数据源类型" prop="databaseType">
          <el-select v-model="addDataSource.databaseType" size="small" clearable placeholder="请选择" class="addData">
            <el-option v-for="item in databaseType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据库地址" prop="databaseAddress">
          <el-input
            v-model="addDataSource.databaseAddress"
            size="small"
            clearable
            class="addData"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="端口" prop="port">
          <el-input v-model="addDataSource.port" size="small" placeholder="请输入" clearable class="addData"></el-input>
        </el-form-item>
        <el-form-item label="数据库名称" prop="databaseName">
          <el-input
            v-model="addDataSource.databaseName"
            size="small"
            placeholder="请输入"
            clearable
            class="addData"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="addDataSource.userName"
            size="small"
            placeholder="请输入"
            clearable
            class="addData"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="addDataSource.password"
            size="small"
            placeholder="请输入"
            clearable
            class="addData"
          ></el-input>
        </el-form-item>
        <el-form-item label="数据源描述" prop="dataDescribe">
          <el-input
            size="small"
            class="addData"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="addDataSource.dataDescribe"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="btns">
        <el-button
          type="primary"
          :disabled="addSubmitBtn"
          size="small"
          :loading="loading"
          @click="onAddSubmit('addDataSource')"
          >确定</el-button
        >
        <el-button @click="onTextConnect('addDataSource')" size="small" :loading="testLoading">测试</el-button>
        <el-button @click="cancel" size="small">取消</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
let Base64 = require('js-base64').Base64
import { Message, MessageBox } from 'element-ui'
import {
  getListByUnitOne,
  getDataSource,
  getDatapage,
  deleteServiceMatters,
  getEditOrigin,
  getTestConnect,
} from '@/api/api'
export default {
  name: 'dataOrigin',
  data() {
    return {
      testLoading: false,
      tableLoading: false,
      currentPage: 1,
      title: '',
      loading: false,
      pageSizes: [10, 20, 30],
      pageTotal: 0,
      pageRequestData: {
        pageNum: 1,
        pageSize: 10,
      },
      // 测试新增数据源数据
      textConnect: {
        storageName: '',
        storageType: 0,
        descr: '',
        id: null,
        groupIdList: [1],
        storageId: '',
        parameter: {
          version: '',
          connectUrl: '', //数据库地址
          dbName: '',
          encoding: 'UTF-8',
          userName: '',
          password: '',
        },
      },
      // 数据库类型
      databaseType: [
        { lable: 'Mysql', value: 'Mysql' },
        { lable: 'Oracle', value: 'Oracle' },
        { lable: 'SQL Server', value: 'SQL Server' },
        { lable: 'PostgreSQL', value: 'PostgreSQL' },
        { lable: 'DB2', value: 'DB2' },
        { lable: 'kingbase', value: 'kingbase' },
        { lable: 'dameng', value: 'dameng' },
      ],
      databaseType2: [
        { lable: 'Mysql', value: 'Mysql' },
        { lable: 'Oracle', value: 'Oracle' },
        { lable: 'SQL Server', value: 'SQL Server' },
        { lable: 'PostgreSQL', value: 'PostgreSQL' },
        { lable: 'DB2', value: 'DB2' },
        { lable: 'kingbase', value: 'kingbase' },
        { lable: 'dameng', value: 'dameng' },
      ],
      drawer: false,
      //   数据库form表单
      databaseFormData: {
        pageNum: 1,
        pageSize: 10,
        dataName: '',
        databaseType: '',
        databaseAddress: '',
        port: '',
        databaseName: '',
      },
      // 新增弹窗数据
      addDataSource: {
        dataDescribe: '',
        id: null,
        dataName: '',
        databaseAddress: '',
        databaseType: '',
        databaseName: '',
        password: '',
        port: '',
        transportGateway: '',
        userName: '',
        storageId: '',
        storageType: null,
        groupIdList: [1],
      },
      //   验证规则
      rules: {
        dataName: [{ required: true, message: '请输入', trigger: 'blur' }],
        databaseType: [{ required: true, message: '请输入', trigger: 'change' }],
        databaseAddress: [
          { required: true, message: '请输入', trigger: 'blur' },
          { max: 30, message: '长度最大支持30个字符', trigger: 'blur' },
        ],
        port: [
          { required: true, message: '请输入', trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              if (/^[0-9]*$/.test(value) == false) {
                callback(new Error('请输入数字'))
              } else {
                //校验通过
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        databaseName: [{ required: true, message: '请输入', trigger: 'blur' }],
        userName: [{ required: true, message: '请输入', trigger: 'blur' }],
        password: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
      // 数据源表格数据
      tableData: [],
      multipleSelection: [],
      selectID: [],
      addSubmitBtn: false,
    }
  },
  created() {
    this.handleCurrentChange()
  },
  methods: {
    handleClose(addDataSource) {
      MessageBox.confirm('确认关闭？')
        .then((_) => {
          this.cancel()
        })
        .catch((_) => {})
    },
    // 选中当前行的数据
    handleSelect(row) {
      this.selectID = []
      if (row.length > 0) {
        row.forEach((value, index) => {
          this.selectID.push(value.id)
        })
      }
    },
    // 全选
    handleAll(val) {
      this.handleSelect(val)
    },
    // 选中背景色
    tableRowClassName({ row, rowIndex }) {
      let color = ''
      for (let item of this.selectID.values()) {
        if (item === row.id) {
          color = 'table-SelectedRow-bgcolor'
        }
      }
      return color
    },
    // 删除数据源
    onDeleteServiceMatters(row) {
      let id = row.id
      MessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteServiceMatters({ id }).then((res) => {
            if (res.success) {
              Message({
                type: 'success',
                message: '删除成功!',
              })
              this.handleCurrentChange()
            }
          })
        })
        .catch(() => {
          Message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 分页
    handleCurrentChange(val) {
      this.databaseFormData.pageNum = val || 1
      this.tableLoading = true
      getDatapage(this.databaseFormData)
        .then((res) => {
          if (res.success) {
            this.tableLoading = false
            this.tableData = res.body.content
            this.pageTotal = res.body.total
          } else {
            this.tableLoading = false
          }
        })
        .catch((_) => {
          this.tableLoading = false
          Message.error('网络出错，请稍后重试')
        })
    },
    handleSizeChange(page) {
      this.pageRequestData.pageSize = page
      this.handleCurrentChange()
    },
    // 新增确定
    onAddSubmit(addDataSource) {
      if (this.title == '新增') {
        this.tableData.find((item) => {
          if (item.dataName == this.addDataSource.dataName) {
            Message({
              type: 'warning',
              message: '名称已存在',
            })
            this.loading = false
            return
          }
        })
        this.$refs[addDataSource].validate((valid) => {
          if (valid) {
            this.loading = true
            this.addDataSource.password = Base64.encode(this.addDataSource.password)
            getDataSource(this.addDataSource)
              .then((res) => {
                if (res.success) {
                  Message({
                    type: 'success',
                    message: '保存成功',
                  })
                  this.loading = false
                  this.drawer = false
                  this.onResetaddDataSource()
                  this.handleCurrentChange()
                } else {
                  this.addDataSource.password = Base64.decode(this.addDataSource.password)
                  Message({
                    type: 'error',
                    message: res.header.message,
                  })
                  this.loading = false
                }
              })
              .catch((_) => {
                this.addDataSource.password = Base64.decode(this.addDataSource.password)
                this.loading = false
              })
          }
        })
      } else {
        this.$refs[addDataSource].validate((valid) => {
          if (valid) {
            this.loading = true
            getEditOrigin(this.addDataSource)
              .then((res) => {
                if (res.success) {
                  Message({
                    type: 'success',
                    message: '修改成功',
                  })
                  this.onResetaddDataSource()
                  this.handleCurrentChange()
                  this.loading = false
                  this.drawer = false
                } else {
                  Message({
                    type: 'error',
                    message: res.header.message,
                  })
                  this.loading = false
                }
              })
              .catch(() => {
                Message({
                  type: 'error',
                  message: res.header.message,
                })
                this.loading = false
              })
          }
        })
      }
    },
    // 测试按钮
    onTextConnect(addDataSource) {
      this.testLoading = true
      this.handleTextConnect()
      // this.addDataSource.groupIdList = []
      if (this.addDataSource.databaseType == 'Mysql' || this.addDataSource.databaseType == 'MySQL') {
        this.textConnect.storageType = 1
        this.addDataSource.storageType = 1
        // this.addDataSource.groupIdList.push(1)
        this.textConnect.parameter.version = '5.6'
      }
      if (this.addDataSource.databaseType == 'Oracle') {
        this.textConnect.storageType = 2
        this.addDataSource.storageType = 2
        // this.addDataSource.groupIdList.push(2)
        this.textConnect.parameter.version = '11g'
      }
      if (this.addDataSource.databaseType == 'SQL Server') {
        this.textConnect.storageType = 3
        this.addDataSource.storageType = 3
        // this.addDataSource.groupIdList.push(3)
        this.textConnect.parameter.version = 'SqlServer2012'
      }
      if (this.addDataSource.databaseType == 'PostgreSQL') {
        this.textConnect.storageType = 11
        this.addDataSource.storageType = 11
        // this.addDataSource.groupIdList.push(11)
        this.textConnect.parameter.version = '8.2+'
      }
      if (this.addDataSource.databaseType == 'kingbase') {
        this.textConnect.storageType = 56
        this.addDataSource.storageType = 56
        // this.addDataSource.groupIdList.push(56)
        this.textConnect.parameter.version = 'V8R3'
      }
      if (this.addDataSource.databaseType == 'DB2') {
        this.textConnect.storageType = 20
        this.addDataSource.storageType = 20
        // this.addDataSource.groupIdList.push(20)
        this.textConnect.parameter.version = '10.2'
      }
      if (this.addDataSource.databaseType == 'dameng') {
        this.textConnect.storageType = 57
        this.addDataSource.storageType = 57
        // this.addDataSource.groupIdList.push(57)
        this.textConnect.parameter.version = '8'
      }
      this.$refs[addDataSource].validate((valid) => {
        if (valid) {
          getTestConnect(this.textConnect)
            .then((res) => {
              if (res.success) {
                this.testLoading = false
                Message({
                  type: 'success',
                  message: '测试成功',
                })
                this.addSubmitBtn = false
              } else {
                this.testLoading = false
                Message({
                  type: 'error',
                  message: res.header.message,
                })
              }
            })
            .catch((_) => {
              this.testLoading = false
            })
        } else {
          this.testLoading = false
        }
      })
    },
    // 数据转换
    handleTextConnect() {
      this.textConnect.descr = this.addDataSource.dataDescribe
      this.textConnect.storageName = this.addDataSource.dataName
      let connectUrl1 = this.addDataSource.databaseAddress
      let connectUrl2 = this.addDataSource.port
      this.textConnect.parameter.connectUrl = `${connectUrl1}:${connectUrl2}`
      this.textConnect.parameter.dbName = this.addDataSource.databaseName
      this.textConnect.parameter.password = Base64.encode(this.addDataSource.password)
      this.textConnect.parameter.userName = this.addDataSource.userName
    },
    // 取消弹窗
    cancel() {
      this.addSubmitBtn = false
      this.drawer = false
      // ;(this.addDataSource = {}),
      this.$refs.addDataSource.resetFields()
    },
    // 表单重置
    onReset(databaseFormData) {
      this.$refs[databaseFormData].resetFields()
    },
    // 查询
    onDatabaseOigin() {
      this.tableLoading = true
      this.currentPage = 1
      this.databaseFormData.pageNum = 1
      getListByUnitOne(this.databaseFormData)
        .then((res) => {
          if (res.success) {
            this.tableData = res.body.content
            this.pageTotal = res.body.total
            this.tableLoading = false
          } else {
            this.tableLoading = false
          }
        })
        .catch((_) => {
          this.tableLoading = false
        })
      this.onResetaddDataSource()
    },
    // 新增数据源弹窗
    onAddDatabaseData(title, rowData) {
      if (title == '编辑') {
        // 深拷贝
        this.addSubmitBtn = true
        this.textConnect.id = rowData.id
        this.addDataSource.id = rowData.id
        this.textConnect.storageId = rowData.storageId
        this.addDataSource.storageId = rowData.storageId
        this.addDataSource.dataName = rowData.dataName
        this.addDataSource.dataDescribe = rowData.dataDescribe
        this.addDataSource.databaseAddress = rowData.databaseAddress
        this.addDataSource.databaseType = rowData.databaseType
        this.addDataSource.databaseName = rowData.databaseName
        this.addDataSource.port = rowData.port
        this.addDataSource.transportGateway = rowData.transportGateway
        this.addDataSource.userName = rowData.userName
        this.addDataSource.password = rowData.password
        this.handleTextConnect()
      } else {
        this.addSubmitBtn = true
        this.onResetaddDataSource()
      }
      this.title = title
      this.drawer = true
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 重置弹窗数据
    onResetaddDataSource() {
      this.addDataSource = {
        dataDescribe: '',
        dataName: '',
        databaseAddress: '',
        databaseType: '',
        databaseName: '',
        password: '',
        port: '',
        transportGateway: '',
        userName: '',
      }
    },
  },
}
</script>

<style lang="less" scoped>
.data-origin {
  .database-box {
    background: #fff;
    padding: 24px;
    .df {
      display: flex;
      justify-content: space-between;
    }
    // .database {
    //   width: 240px;
    // }
    // .database-item {
    //   margin-right: 40px;
    // }
  }
  .table-box {
    width: 100%;
    height: 100%;
    padding: 0 32px;
    margin: 24px 0;
    background-color: #fff;
    .add-btn {
      margin: 24px 0 0 0;
    }
    .paging {
      padding: 32px 0;
      text-align: right;
    }
    /deep/.table-SelectedRow-bgcolor {
      td {
        background: rgba(24, 144, 255, 0.12) !important;
      }
    }
  }
  .add-mask {
    .add-data-origin {
      height: 61px;
      color: #1890ff;
      border-bottom: 1px solid #1890ff;
      line-height: 61px;
      padding-left: 32px;
      font-size: 16px;
      margin-bottom: 24px;
    }
    .demo-ruleForm {
      padding-left: 40px;
    }
    .addData {
      width: 260px;
    }
    .btns {
      position: absolute;
      bottom: 35px;
      right: 30px;
    }
  }
}
</style>
