<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="excelUpdate" size="small" ref="excelUpdate" class="demo-form-inline faderfrom">
        <div class="divffromflex">
          <el-form-item label="数据目录：" prop="catalogName">
            <el-input size="small" v-model="excelUpdate.catalogName" placeholder="请输入" class="aitemml"></el-input>
          </el-form-item>

          <el-form-item label="更新状态：" prop="updateStatus">
            <el-select v-model="excelUpdate.updateStatus" size="small" clearable placeholder="请选择" class="aitemml">
              <el-option
                :label="frequencyitem.text"
                :value="frequencyitem.text"
                v-for="(frequencyitem, index) in datefromList.updateTatus"
                :key="frequencyitem.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="更新周期：" prop="updateFrequency">
            <el-select
              v-model="excelUpdate.updateFrequency"
              size="small"
              clearable
              placeholder="请选择"
              class="aitemml"
            >
              <el-option
                :label="frequencyitem.text"
                :value="frequencyitem.value"
                v-for="(frequencyitem, index) in datefromList.frequency"
                :key="frequencyitem.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="divffromflex">
          <el-form-item label="系统名称：" prop="sourceSystem">
            <el-input size="small" v-model="excelUpdate.sourceSystem" placeholder="请输入" class="aitemml"></el-input>
          </el-form-item>

          <el-form-item label="数源部门：" prop="sourceUnit">
            <el-select
              v-model="excelUpdate.sourceUnit"
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

          <el-form-item class="fromweizhi">
            <el-button type="primary" size="small" @click="submitExcelUpdate" class="butfromccwei">查 询</el-button>
            <el-button size="small" @click="resetexcel('excelUpdate')" class="butfromccwei">重 置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="cardpadmargtop">
      <!-- style="width: 100%" -->
      <el-table
        ref="tableUpdate"
        :data="tableUpdate"
        tooltip-effect="dark"
        v-loading="loading"
        :header-cell-style="{ background: '#E6F7FF', color: '#333333' }"
        class="tablemargin"
      >
        <el-table-column prop="catalogName" label="数据目录">
          <template slot-scope="{ row, $index }">
            <el-tooltip class="over-item" :content="row.catalogName" placement="top">
              <el-button type="text" class="itemSlotheden2" @click="toShareLog(row)">{{
                row.catalogName || '-'
              }}</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="sourceUnit" label="数源部门" :show-overflow-tooltip="true">
          <!-- <template slot-scope="{ row, $index }">
            <span>{{ row.sourceUnit || '-' }}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="updateFrequency" label="更新周期" width="110px">
          <template slot-scope="{ row, $index }">
            <span>{{ catastatusbtn(row.updateFrequency) || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sourceSystem" label="应用系统" :show-overflow-tooltip="true">
          <template slot-scope="{ row, $index }">
            <span>{{ row.sourceSystem || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalNum" label="数据量" width="110px">
          <template slot-scope="{ row, $index }">
            <span>{{ row.totalNum || '0' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最近更新时间">
          <template slot-scope="{ row, $index }">
            <el-tooltip class="item" effect="dark" :content="row.importTime" placement="top-start">
              <el-button class="itemSlot" type="text" @click="administrator(row)">{{
                row.importTime || '-'
              }}</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="updateStatus" label="更新状态" width="110px">
          <template slot-scope="{ row, $index }">
            <span>{{ row.updateStatus || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="挂载操作" width="200px">
          <template slot-scope="{ row, $index }">
            <div>
              <el-button
                type="text"
                v-if="row.isMount == '1'"
                @click="isShowUnmount(row)"
                v-has="'administrator:unmount'"
                >取消挂载</el-button
              >
            </div>
            <div>
              <el-button
                type="text"
                v-if="row.isMount == '2'"
                @click="isShowRemount(row)"
                v-has="'administrator:unmount'"
                >重新挂载</el-button
              >
            </div>
            <div>
              <el-button
                type="text"
                v-if="row.isInterface == '1'"
                @click="isShowisInterface(row)"
                v-has="'administrator:interfaceMount'"
                >取消新增共享模式</el-button
              >
            </div>
            <div>
              <el-button
                type="text"
                v-if="row.isInterface == '0'"
                @click="isShowTransfer(row)"
                v-has="'administrator:interfaceMount'"
                >新增共享模式</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <!-- <a href="javascript:;" :title="title" style="margin-right:10px"> -->
      <el-pagination
        class="paginationtop"
        background
        :current-page="excelUpdate.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="excelUpdate.pageSize"
        :total="total"
        :pager-count="5"
        layout="->,total, prev, pager, next, sizes, jumper"
        @size-change="handleSizeChange"
        @current-change="updatePage"
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
          <el-button size="small" @click="cancelUnmount">取 消</el-button>
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
          <el-form :model="form" class="formFlex" @submit.native.prevent @keyup.enter.native="changeApiName">
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
            <el-table-column label="API名称" min-width="25%" :show-overflow-tooltip="true">
              <template slot-scope="{ row, $index }">
                <span class="itemSlotheden">{{ row.taskName || '-' }}</span>
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

      <!-- 点击最近更新日期弹出更新记录 -->
      <el-drawer title :visible.sync="isAdministrator" direction="rtl" ref="isAdministrator" size="36%">
        <!-- <div class=" drawerdivposi"> -->
        <template slot="title">
          <div class="titleItem">{{ titleItem }}更新记录</div>
        </template>
        <el-divider></el-divider>
        <el-timeline class="timelinemargin">
          <el-timeline-item
            v-for="(item, index) in activities"
            :key="index"
            type="primary"
            color="#409EFF"
            placement="top"
          >
            <div class="timelineItem">
              <div class="year">{{ item.updatedTime || '-' }}</div>
              <!-- <div class="year">{{ item.address }}</div> -->
              <div class="item">
                <div style="margin-bottom: 5px">
                  <span>更新数据量：{{ item.importNum || '0' }}</span>
                </div>
                <!-- <div class="yearFlex">
                  <div>
                    <span>操作人：</span>
                    <span class="flexItem">{{ item.operator || '-' }}</span>
                  </div>
                  <div>
                    <span>操作部门：</span>
                    <span class="flexItem">{{ item.departName || '-' }}</span>
                  </div>
                </div> -->
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </el-drawer>
    </el-card>
  </div>
</template>
<script>
import {
  pageTableUpdate,
  tableMount,
  interfaceMountList,
  cancelInterfaceMount,
  // mechanismTree,
  updateLog
} from '@/api/api'
import { interfaceMountSave } from '@/api/department'
import { mapState } from 'vuex'

import { Message } from 'element-ui'
import qs from 'qs'
export default {
  name: 'LibraryTableUpdate',
  data() {
    return {
      excelUpdate: {
        apiName: '',
        catalogName: '',
        dataFormat: '',
        databaseName: '',
        orderByField: '',
        pageNum: 1,
        pageSize: 10,
        requestMode: '',
        responseType: '',
        rowStart: 0,
        updateStatus: '',
        updateFrequency: '',
        tableName: '',
        updateFrequency: ''
      },
      // 分页器
      // page: 1, //当前页数
      // pagesize: 10, //当前页显示条数
      total: 0, //总共数据条数
      tableUpdate: [],
      dataDictionary: {
        // 更新频率
        frequency: 'update_frequency',
        // 更新状态
        updateTatus: 'update_tatus'
      },
      // citys: [],
      isUnmount: false,
      isRemount: false,
      mount: {
        catalogId: '',
        mountType: ''
      },
      isInterfaceMount: false,
      dialogTransfer: false,
      form: { name: '' },
      gridData: [],
      currentRow: {
        apiName: '',
        catalogId: '',
        isMount: 1,
        taskId: ''
      },
      isInterId: '',
      loading: false,
      loadSubmit: false,
      // 更新记录
      isAdministrator: false,
      activities: [],
      titleItem: ''
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        //  pagequeryList: this.pagequeryList,
        //     toNameitem: this.toNameitem
        if (this.$route.params.toNameitem == '编目详情') {
          this.excelUpdate = this.$route.params.pagequeryList
          this.$nextTick(() => {
            this.updatePage(this.excelUpdate.pageNum)
          })
          this.$route.params.toNameitem = ''
          this.$route.params.pagequeryList = ''
        }
      }
    }
  },
  created() {
    this.updatePage()
    this.dictionaryList()
    this.mountList()
    this.chanismTree()
  },
  methods: {
    chanismTree() {
      this.$store.dispatch('chanismTree')
      // mechanismTree().then(res => {
      //   if (res.success) {
      //     // this.citys = res.body.children
      //     function treeToArr(data, res = []) {
      //       data.forEach(item => {
      //         res.push({
      //           // pid: pid,
      //           id: item.id,
      //           nodeCode: item.nodeCode,
      //           nodeName: item.nodeName,
      //           parentId: item.parentId
      //         })
      //         if (item.children && item.children.length !== 0) {
      //           treeToArr(item.children, res)
      //         }
      //       })
      //       return res
      //     }
      //     this.citys = treeToArr(res.body.children)
      //   }
      // })
    },
    // 更新记录抽屉
    administrator(row) {
      this.isAdministrator = true
      this.titleItem = row.catalogName

      let timeId = qs.stringify({ catalogId: row.id })

      updateLog(timeId).then(res => {
        if (res.success) {
          this.activities = res.body
          this.activities.map((item, index) => {
            item.updatedTime = this.formatTime(item.updatedTime)
          })
        }
      })
    },
    // 新增共享模式
    isShowTransfer(row) {
      this.mountList()
      this.dialogTransfer = true
      this.currentRow.catalogId = row.id
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
    // 新增共享模式
    determineTransfer() {
      this.loadSubmit = true
      interfaceMountSave(this.currentRow)
        .then(res => {
          if (res.success) {
            Message({
              message: '成功!',
              type: 'success'
            })
            this.dialogTransfer = false
            this.loadSubmit = false
            this.updatePage()
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
          Message.error('请求失败')
        })
    },
    // 取消
    cancelTransfer() {
      this.dialogTransfer = false
      this.form.name = ''
      this.currentRow = {
        apiName: '',
        catalogId: '',
        isMount: 1,
        taskId: ''
      }
    },
    toShareLog(row) {
      console.log(row)
      this.$router.push({
        // path: '/datefrom/cataloglist'
        name: 'datefrom-cataloglist',
        params: {
          itemId: row.id,
          pagequery: this.excelUpdate,
          toName: '库表更新管理'
        }
      })
    },
    dictionaryList() {
      let { frequency, updateTatus } = this.dataDictionary
      // 更新频率
      this.$store.dispatch('getFrequencyList', frequency)
      // 更新状态
      this.$store.dispatch('getUpdateTatus', updateTatus)
    },
    // 更新周期
    catastatusbtn(val) {
      for (const key in this.datefromList.frequency) {
        if (this.datefromList.frequency[key].value == val) {
          return this.datefromList.frequency[key].text
        }
      }
    },
    // 初始化请求数据/根据当前页面
    updatePage(page = 1) {
      this.loading = true
      this.excelUpdate.pageNum = page
      pageTableUpdate(this.excelUpdate)
        .then(res => {
          if (res.success) {
            this.tableUpdate = res.body.content
            this.tableUpdate.forEach(v => {
              v.importTime = this.formatTime(v.importTime)
            })
            this.total = res.body.total
            this.loading = false
          }
        })
        .catch(() => {
          Message.error('列表查询失败')
        })
    },
    // 根据当前显示多少条
    handleSizeChange(pageSize) {
      this.excelUpdate.pageNum = page
      this.updatePage()
    },
    // 点击查询
    submitExcelUpdate() {
      this.updatePage()
    },
    resetexcel(excelUpdate) {
      this.$refs[excelUpdate].resetFields()
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
      let mountList = qs.stringify(this.mount)
      tableMount(mountList)
        .then(res => {
          if (res.success) {
            Message({
              message: '提交成功!',
              type: 'success'
            })
            this.isUnmount = false
            this.mount = {
              catalogId: '',
              mountType: ''
            }
            this.updatePage()
          } else {
            this.isUnmount = false
            Message.error(res.message)
          }
        })
        .catch(() => {
          Message.error('发送错误')
        })
    },
    cancelUnmount() {
      this.isUnmount = false
      this.mount = {
        catalogId: '',
        mountType: ''
      }
    },
    // 重新挂载
    isShowRemount(row) {
      this.isUnmount = true
      this.mount = {
        catalogId: row.id,
        mountType: '2'
      }
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
              message: '取消成功!',
              type: 'success'
            })
            this.isInterfaceMount = false
            this.updatePage()
            this.isInterId = ''
          } else {
            this.isInterfaceMount = false
            Message.error(res.header.message)
          }
        })
        .catch(() => {
          Message.error('发送失败')
        })
    },

    // 单选点击表格行
    handleCurrentChange(val) {
      this.currentRow.taskId = val.taskId
      this.currentRow.apiName = val.taskName
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
  justify-content: flex-end;

  .el-form-item {
    margin-bottom: 5px;
  }
}

.fromweizhi {
  width: 282px;
  display: flex;
  justify-content: flex-end;
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

.iconcolor {
  font-size: px;
  color: #1890ff;
}

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

::v-deep .el-divider {
  background-color: #1890ff;
}

::v-deep .el-drawer__header {
  margin-bottom: 20px;
}

::v-deep .el-drawer__header > span {
  font-size: 16px;
  color: #1890ff;
}

/deep/.el-divider--horizontal {
  background-color: #1890ff;
  margin-top: 0;
}

/deep/.el-timeline-item__tail {
  border-left: 2px solid #1890ff;
}

/deep/.el-timeline-item__node--normal {
  width: 15px;
  height: 15px;
  left: -2px;
}

.timelinemargin {
  margin-left: 100px;
}

/deep/.el-timeline-item__timestamp.is-top {
  margin: 0;
}

.timelineItem {
  background-color: #f8fafb;
  padding: 20px 0;
}

.titleItem {
  font-size: 16px;
  font-weight: 500;
  color: #1890ff;
}

.year {
  width: 90px;
  word-wrap: break-word;
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  color: #333333;
  position: absolute;
  left: -120px;
  top: 1px;
}

.item {
  // margin-left: 25px;
  // font-size: 15px;
  // span {
  //   padding-left: 10px;
  // }
  .yearFlex {
    display: flex;

    .flexItem {
      padding-right: 32px;
      color: #777777;
    }
  }
}

.dialogmarg {
  margin: 32px 40px 0 40px;
}

.centerupload {
  text-align: center;
}

.mbcolor {
  color: #1890ff;
}

.butonqumarg {
  margin-right: 10px;
}

.itemSlot {
  width: 120px;
  overflow: hidden; //超出的文本隐藏
  white-space: nowrap;
  text-overflow: ellipsis;
}

.itemSlotheden2 {
  width: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  user-select: unset;//设置允许复制el-button的内容
}
</style>

