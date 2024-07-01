<template>
  <div>
    <el-card>
      <el-form
        :inline="true"
        :model="excelData"
        size="small"
        ref="excelData"
        class="demo-form-inline faderfrom"
        @keyup.enter.native="submitInterface"
      >
        <div class="divffromflex">
          <el-form-item label="数据目录：" prop="catalogName" class="topfromitem">
            <el-input
              size="small"
              v-model="excelData.catalogName"
              placeholder="请输入"
              class="aitemml"
              @blur="submitInterface"
            ></el-input>
          </el-form-item>
          <el-form-item label="数源部门：" prop="sourceUnit">
            <el-select
              v-model="excelData.sourceUnit"
              size="small"
              clearable
              filterable
              placeholder="请选择"
              class="aitemml"
            >
              <el-option
                :label="source.nodeName"
                :value="source.nodeName"
                v-for="source in citys"
                :key="source.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="接口名称：" class="apiName" prop="sourceSystem">
            <el-input size="small" v-model="excelData.apiName" placeholder="请输入" class="aitemml"></el-input>
          </el-form-item>
        </div>
        <div class="divffromflex">
          <el-form-item label="请求方式：" prop="requestMode">
            <el-select v-model="excelData.requestMode" size="small" clearable placeholder="请选择" class="aitemml">
              <el-option
                :label="scenarioitem.text"
                :value="scenarioitem.text"
                v-for="(scenarioitem, index) in datefromList.requestMode"
                :key="scenarioitem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="返回类型：" prop="responseType" class="catalog1">
            <el-input size="small" v-model="excelData.responseType" placeholder="请输入" class="aitemml"></el-input>
          </el-form-item>
          <el-form-item label="接口类型：" class="topfromitem" prop="apiTypeName">
            <el-select v-model="excelData.apiTypeName" size="small" clearable placeholder="请选择" class="aitemml">
              <el-option
                :label="type.text"
                :value="type.text"
                v-for="(type, index) in datefromList.apiType"
                :key="type.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div class="fromflexrig">
          <el-form-item label="接口状态：" prop="state">
            <el-select v-model="excelData.state" size="small" clearable placeholder="请选择" class="aitemml">
              <el-option
                :label="item.text"
                :value="item.text"
                v-for="(item, index) in datefromList.state"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="fromweizhi">
            <el-button type="primary" size="small" @click="submitInterface" class="butfromccwei">查询</el-button>
            <el-button size="small" @click="resetexcel('excelData')" class="butfromccwei">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="cardpadmargtop">
      <el-button
        class="butPrimary"
        type="primary"
        size="small"
        :disabled="loadApi"
        :loading="loadApi"
        @click="synchronization"
        >同步API</el-button
      >
      <el-table
        v-loading="tableLoading"
        ref="tableInterface"
        :data="tableInterface"
        style="width: 100%"
        :header-cell-style="{ background: '#E6F7FF', color: '#333333' }"
      >
        <el-table-column prop="catalogName" label="数据目录">
          <template slot-scope="{ row, $index }">
            <el-tooltip class="over-item" :content="row.catalogName" placement="top">
              <el-button type="text" class="itemSlotheden2" @click="toShare(row)">{{
                row.catalogName || '-'
              }}</el-button>
            </el-tooltip>
            <!-- <el-button type="text" class="tabnamewei" @click="toShare(row)">{{ row.catalogName || '-' }}</el-button> -->
          </template>
        </el-table-column>
        <el-table-column prop="sourceUnit" label="数源部门" :show-overflow-tooltip="true">
          <!-- <template slot-scope="{ row, $index }">
            <span>{{ row.sourceUnit || '-' }}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="apiName" label="接口名称" :show-overflow-tooltip="true">
          <!-- <template slot-scope="{ row, $index }">
            <span>{{ row.apiName || '-' }}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="requestMode" label="请求方式">
          <template slot-scope="{ row, $index }">
            <span>{{ row.requestMode || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="responseType" label="返回类型">
          <template slot-scope="{ row, $index }">
            <span>{{ row.responseType || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="apiTypeName" label="接口类型">
          <template slot-scope="{ row, $index }">
            <span>{{ row.apiTypeName || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="接口状态">
          <template slot-scope="{ row, $index }">
            <span class="rowState" :class="{ active: row.state == '未生成' }">
              {{ row.state || '-' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="挂载操作">
          <template slot-scope="{ row, $index }">
            <el-button type="text" v-if="row.isMount == '1'" @click="isShowUnmount(row)" v-has="'lnterface:unmount'"
              >取消挂载</el-button
            >
            <el-button
              type="text"
              v-if="row.isMount == '2' || row.isMount == null"
              @click="isShowRemount(row)"
              v-has="'lnterface:unmount'"
              >重新挂载</el-button
            >
            <el-button
              type="text"
              v-if="row.isMount == '1'"
              @click="isShowisInterface(row)"
              v-has="'administrator:interfaceRemount'"
              >取消接口挂载</el-button
            >
            <el-button
              type="text"
              v-if="row.isMount == '2' || row.isMount == null"
              @click="isShowTransfer(row)"
              v-has="'administrator:interfaceRemount'"
              >转接口挂载</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        class="paginationtop"
        background
        :current-page="excelData.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="excelData.pageSize"
        :total="total"
        :pager-count="5"
        layout="->,total, prev, pager, next, sizes, jumper"
        @size-change="handleSizeChange"
        @current-change="handlepage"
      >
      </el-pagination>

      <!-- 取消挂载 -->
      <el-dialog title="提示" :visible.sync="isUnmount" width="30%">
        <el-divider class="dividerhrcol"></el-divider>
        <p class="dialogcenter" v-if="mount.mountType == '1'">
          <i class="el-icon-info iconcolor"></i> 是否确认取消挂载？
        </p>
        <p class="dialogcenter" v-if="mount.mountType == '2'">
          <i class="el-icon-info iconcolor"></i> 是否确认重新挂载？
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="isUnmount = false">取 消</el-button>
          <el-button size="small" type="primary" @click="changeisUnmount">确 认</el-button>
        </span>
      </el-dialog>

      <!-- 取消接口挂载 -->
      <el-dialog title="提示" :visible.sync="isInterfaceMount" width="30%">
        <el-divider class="dividerhrcol"></el-divider>
        <p class="dialogcenter"><i class="el-icon-info iconcolor"></i> 确认取消接口挂载？</p>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="isInterfaceMount = false">取 消</el-button>
          <el-button size="small" type="primary" @click="changeisInterface">确 认</el-button>
        </span>
      </el-dialog>

      <el-dialog title="请选择API" :visible.sync="dialogTransfer" width="45%">
        <el-divider class="dividerhrcol"></el-divider>
        <div class="dialogForm">
          <el-form :model="form" class="formFlex">
            <el-form-item label="API： ">
              <el-input
                v-model="form.name"
                placeholder="请输入API名称或API路径"
                size="small"
                class="inputForm"
              ></el-input>
              <el-button size="small" type="primary" @click="changeApiName">搜 索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-card class="box-card">
          <el-table
            :data="gridData"
            :header-cell-style="{ color: '#333333' }"
            highlight-current-row
            @current-change="handleCurrentChange"
          >
            <el-table-column label="API名称" min-width="25%">
              <template slot-scope="{ row, $index }">
                <el-tooltip class="item" effect="dark" :content="row.taskName" placement="top-start">
                  <span class="itemSlotheden">{{ row.taskName || '-' }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="API路径" min-width="25%">
              <template slot-scope="{ row, $index }">
                <el-tooltip class="item" effect="dark" :content="row.apiPath" placement="top-start">
                  <span class="itemSlotheden">{{ row.apiPath || '-' }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="更新时间" min-width="25%">
              <template slot-scope="{ row, $index }">
                <el-tooltip class="item" effect="dark" :content="row.mtime" placement="top-start">
                  <span class="itemSlotheden">{{ row.mtime || '-' }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="创建人" min-width="25%">
              <template slot-scope="{ row, $index }">
                <span class="itemSlotheden">{{ row.dutyUserName || '-' }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="cancelTransfer">取 消</el-button>
          <el-button
            size="small"
            type="primary"
            @click="determineTransfer"
            :disabled="loadSubmit"
            :loading="loadSubmit"
            >{{ loadSubmit ? '提交中...' : '确认' }}</el-button
          >
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { pageInterface, interfaceMount, syncApi, interfaceMountList, cancelInterfaceMount } from '@/api/api'
import { interfaceMountSave } from '@/api/department'
import { mapState } from 'vuex'
import { Message } from 'element-ui'
import qs from 'qs'
export default {
  name: 'InterfaceRelease',
  data() {
    return {
      tableLoading: false,
      excelData: {
        apiName: '',
        sourceUnit: '',
        catalogName: '',
        dataFormat: '',
        databaseName: '',
        orderByField: '',
        pageNum: 1,
        pageSize: 10,
        requestMode: '',
        responseType: '',
        rowStart: 0,
        sourceSystem: '',
        tableName: '',
        apiTypeName: '',
        state: '',
        updateFrequency: ''
      },
      tableInterface: [],
      // 分页器
      // page: 1, //当前页数
      // pagesize: 10, //当前页显示条数
      total: 0, //总共数据条数
      dataDictionary: {
        // 请求方式
        requestMode: 'request_mode',
        // 接口类型
        apiType: 'apiType',
        // 状态
        state: 'state'
      },
      isUnmount: false,
      isRemount: false,
      mount: {
        catalogId: '',
        mountType: ''
      },
      // 同步Api
      loadApi: false,
      // 转接口挂载
      isInterfaceMount: false,
      loadSubmit: false,
      dialogTransfer: false,
      form: { name: '' },
      gridData: [],
      currentRow: {
        apiName: '',
        catalogId: '',
        isMount: 1,
        taskId: ''
      }
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        //  pagequeryList: this.pagequeryList,
        //     toNameitem: this.toNameitem
        if (this.$route.params.toNameitem == '编目详情') {
          this.excelData = this.$route.params.pagequeryList
          this.$nextTick(() => {
            this.handlepage(this.excelData.pageNum)
          })
          this.$route.params.toNameitem = ''
          this.$route.params.pagequeryList = ''
        }
      }
    }
  },
  mounted() {
    this.handlepage()
    this.dictionaryList()
    this.$store.dispatch('chanismTree')
  },
  methods: {
    dictionaryList() {
      let { requestMode, apiType, state } = this.dataDictionary
      // 请求方式
      // requestMode,
      this.$store.dispatch('getRequestMode', requestMode)
      // 接口类型
      // apiType: 'apiType',
      this.$store.dispatch('getApiType', apiType)
      // 状态
      // state: 'state',
      this.$store.dispatch('getState', state)
    },
    resetexcel(excelData) {
      this.$refs[excelData].resetFields()
    },
    // 同步api
    synchronization() {
      this.loadApi = true
      syncApi()
        .then(res => {
          if (res.success) {
            Message({
              message: '操作成功!',
              type: 'success'
            })
            this.handlepage()
            this.loadApi = false
          } else {
            Message.error(res.message)
          }
        })
        .catch(_ => {
          this.loadApi = false
        })
    },
    toShare(row) {
      console.log(row)
      this.$router.push({
        // path: '/datefrom/cataloglist'
        name: 'datefrom-cataloglist',
        params: {
          itemId: row.id,
          pagequery: this.excelData,
          toName: '接口发布'
        }
      })
    },
    handlepage(page = 1) {
      this.tableLoading = true
      this.excelData.pageNum = page
      pageInterface(this.excelData).then(res => {
        if (res.success) {
          this.tableLoading = false
          this.tableInterface = res.body.content
          this.total = res.body.total
        } else {
          this.tableLoading = false
        }
      })
    },
    handleSizeChange(pageSize) {
      this.excelData.pageSize = pageSize
      this.handlepage()
    },
    submitInterface() {
      this.handlepage()
    },
    // 取消挂载
    isShowUnmount(row) {
      this.isUnmount = true
      this.mount = {
        catalogId: row.id,
        mountType: '1'
      }
    },
    changeisUnmount() {
      // this.mount = {
      //   catalogId: this.unmountId,
      //   mountType: '1'
      // }
      let mountList = qs.stringify(this.mount)
      console.log(2, mountList)
      interfaceMount(mountList)
        .then(res => {
          if (res.success) {
            Message({
              message: '操作成功!',
              type: 'success'
            })
            this.handlepage()
            this.isUnmount = false
          } else {
            Message.error(res.message)
          }
        })
        .catch(() => {
          Message.error('发送错误')
        })
    },
    // 重新挂载
    isShowRemount(row) {
      this.isUnmount = true
      this.mount = {
        catalogId: row.id,
        mountType: '2'
      }
      console.log(this.mount)
    },
    // 取消接口挂载
    isShowisInterface(row) {
      this.isInterfaceMount = true
      this.isInterId = row.id
    },
    changeisInterface() {
      let catalog = qs.stringify({ catalogId: this.isInterId })
      cancelInterfaceMount(catalog)
        .then(res => {
          if (res.success) {
            Message({
              message: '取消接口挂载成功!',
              type: 'success'
            })
            this.isInterfaceMount = false
            this.handlepage()
            this.isInterId = ''
          } else {
            this.isInterfaceMount = false
            Message.error(res.header.message)
          }
        })
        .catch(() => {
          Message.error('发送取消接口挂载请求失败')
        })
    },
    // 转接口挂载
    isShowTransfer(row) {
      this.mountList()
      this.dialogTransfer = true
      this.currentRow.catalogId = row.id
    },
    // 单选点击表格行
    handleCurrentChange(val) {
      this.currentRow.taskId = val.taskId
      this.currentRow.apiName = val.taskName
    },
    // 点击操作的弹框表格数据
    mountList() {
      let mountId = qs.stringify({ apiName: '' })
      interfaceMountList(mountId)
        .then(res => {
          if (res.success) {
            this.gridData = res.body
            // this.formatTime
            this.gridData.map((item, index) => {
              item.mtime = this.formatTime(item.mtime)
            })
          } else {
            Message.error(res.message)
          }
        })
        .catch(() => {
          Message.error(res.message)
        })
    },
    // 弹窗里的搜索  失去焦点或者回车触发
    changeApiName(val) {
      // event.target.blur()
      let mountId = qs.stringify({ apiName: this.form.name })
      interfaceMountList(mountId)
        .then(res => {
          if (res.success) {
            this.gridData = res.body
            // this.formatTime
            this.gridData.map((item, index) => {
              item.mtime = this.formatTime(item.mtime)
            })
          } else {
            Message.error(res.message)
          }
        })
        .catch(() => {
          Message.error(res.message)
        })
    },
    // 转接口挂载
    determineTransfer() {
      this.loadSubmit = true
      interfaceMountSave(this.currentRow)
        .then(res => {
          if (res.success) {
            Message({
              message: '转接口挂载成功!',
              type: 'success'
            })
            this.dialogTransfer = false
            this.loadSubmit = false
            this.handlepage()
            this.form.name = ''
            this.currentRow = {
              apiName: '',
              catalogId: '',
              isMount: 1,
              taskId: ''
            }
          } else {
            this.dialogTransfer = false
            Message.error(res.message)
            this.loadSubmit = false
            this.form.name = ''
            this.currentRow = {
              apiName: '',
              catalogId: '',
              isMount: 1,
              taskId: ''
            }
          }
        })
        .catch(() => {
          Message.error('请求转接口挂载失败')
        })
    },
    // 取消
    cancelTransfer() {
      this.dialogTransfer = false
      this.loadSubmit = false
      this.form.name = ''
      this.currentRow = {
        apiName: '',
        catalogId: '',
        isMount: 1,
        taskId: ''
      }
    }
  },
  computed: {
    ...mapState({
      datefromList: state => state.indatafrom.datefromList,
      citys: state => state.enhance.citys
    })
  }
}
</script>

<style lang="less" scoped>
.el-select {
  /deep/.el-input {
    display: flex;
  }
}
/deep/.el-icon-arrow-up:before {
  content: '\e78f';
  color: #666666;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.divffromflex {
  display: flex;
  justify-content: space-between;
}
.fromflexrig {
  display: flex;
  justify-content: space-between;
  .el-form-item {
    margin-bottom: 5px;
  }
}
.butPrimary {
  margin: 0 20px 8px 0;
}
.aitemml {
  width: 200px;
}
.cardpadmargtop {
  margin-top: 24px;
  //padding-left: 20px;
  width: 100%;
}
.paginationtop {
  margin-top: 30px;
}
.piliangbut {
  margin-bottom: 24px;
}

/deep/.el-dialog__title {
  color: #1890ff;
}
/deep/.el-divider--horizontal {
  background-color: #1890ff;
}
/deep/.el-dialog__body {
  padding: 0;
}
.el-divider--horizontal {
  margin: 0 0 5px 0;
}
.dialogcenter {
  text-align: center;
  line-height: 200px;
  font-size: 16px;
  color: #000000;
}
.rowState {
  color: #606266;
}
.active {
  color: #1890ff;
}
// 转接口
.formFlex {
  display: flex;
  justify-content: space-around;
}
.inputForm {
  width: 68%;
  margin-right: 10px;
}
.dialogForm {
  .el-form {
    width: 100%;
    .el-form-item {
      width: 55%;
      text-align: center;
      margin: 20px 0 10px 0;
    }
  }
}
.box-card {
  width: 85%;
  height: 400px;
  overflow: scroll;
  margin: auto;
}
.el-card__body {
  padding: 0 20px;
}
.dialog-footer {
  margin-top: 20px;
}

/deep/.el-table__body > tr.current-row > td {
  background-color: none !important;
  color: #69a8ea;
}

.itemSlotheden {
  width: 23%;
  overflow: hidden; //超出的文本隐藏
  white-space: nowrap;
}
.itemSlotheden2 {
  width: 135px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  user-select: unset;//设置允许复制el-button的内容
}
</style>
