<template>
  <div>
    <el-card>
      <el-form
        :inline="true"
        label-width="110px"
        label-position="left"
        :model="releaseing"
        ref="releaseing"
        class="demo-form-inline faderfrom"
      >
        <div class="divffromflex">
          <el-form-item label="数据目录：" prop="catalogName">
            <el-input size="small" v-model="releaseing.catalogName" placeholder="请输入" class="aitemml"></el-input>
          </el-form-item>

          <el-form-item label="使用应用系统：" prop="useAppSystem">
            <el-select v-model="releaseing.useAppSystem" size="small" clearable placeholder="请选择" class="aitemml">
              <el-option
                :label="source.appName"
                :value="source.appName"
                v-for="(source, index) in sourceList"
                :key="source.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="申请部门：" prop="applyDept">
            <el-select
              v-model="releaseing.applyDept"
              size="small"
              filterable
              clearable
              placeholder="请选择"
              class="aitemml"
            >
              <el-option
                :label="source.nodeName"
                :value="source.nodeCode"
                v-for="source in citys"
                :key="source.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="divffromflex" v-show="isSearch">
          <el-form-item label="数据类型：" prop="shareType">
            <el-select v-model="releaseing.shareType" size="small" clearable placeholder="请选择" class="aitemml">
              <el-option
                :label="field.text"
                :value="field.value"
                v-for="(field, index) in datefromList.shareType"
                :key="field.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态：" prop="myDataStatus">
            <el-select v-model="releaseing.myDataStatus" size="small" clearable placeholder="请选择" class="aitemml">
              <el-option
                :label="share.text"
                :value="share.value"
                v-for="(share, index) in datefromList.shareDataStatus"
                :key="share.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据开通时间：" prop="openDate">
            <el-date-picker
              class="pickerDate"
              size="small"
              value-format="yyyy-MM-dd"
              v-model="releaseing.openDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </div>

        <div class="fromflexrig">
          <el-form-item class="fromweizhi">
            <el-button type="text" size="mini" @click="isSearch = !isSearch"
                >高级搜索<i :class="isSearch ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i
              ></el-button>
            <el-button type="primary" size="small" @click="submitRelease" class="buthei">查询</el-button>
            <el-button size="small" @click="resetexcel('releaseing')" class="buthei">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="cardpadmargtop">
      <el-table
        ref="tableInterface"
        :data="tableInterface"
        tooltip-effect="dark"
        v-loading="loading"
        style="width: 100%"
        :header-cell-style="{ background: '#E6F7FF', color: '#333333' }"
        @sort-change="sortChange"
        class="tablemargin"
      >
        <el-table-column prop="catalogName" label="数据目录" min-width="20%" :show-overflow-tooltip="true">
          <template slot-scope="{ row, $index }">
            <!-- <a type="primary" @click="toDetails(row)"
              style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
              {{ row.catalogName }}
            </a> -->
            <el-button type="text" class="itemSlotheden2" @click="toDetails(row)">{{ row.catalogName || '-' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="useAppSystem" label="使用应用系统" min-width="12%" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column prop="sourceUnit" label="数源部门" min-width="14%" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column prop="applyDept" label="申请部门" min-width="14%" :show-overflow-tooltip="true"> </el-table-column>
        <el-table-column prop="shareType" label="数据类型" min-width="8%"> </el-table-column>
        <el-table-column prop="myDataStatus" label="状态" min-width="8%"> </el-table-column>

        <el-table-column prop="totalNumber" sortable="custom" min-width="13%">

          <template slot-scope="{ row }">
            {{ row.totalNumber || '0' }}
          </template>

          <template slot="header">
            <div>
              <div>数据共享量/</div>
              <div>被调用次数</div>
            </div>
          </template>
          
        </el-table-column>

        <el-table-column prop="openDate" label="数据开通时间" sortable="custom" min-width="14%">
          <template slot-scope="{ row, $index }">
            <el-button type="text" @click="toReview(row)">{{ row.openDate }}</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="openDate" label="操作" sortable="custom" min-width="12%" v-if="hasPerms('isMyData:modifyAuthProject')" >
          <template slot-scope="{ row, $index }">
            <el-button
                type="text"
                :disabled=" !(row.myDataStatus == '使用中') || !(row.shareType == '接口') "
                @click="modifyAuthProject(row)">
                更换授权项目
            </el-button>
          </template>
        </el-table-column>        

      </el-table>
      <!-- 分页器 -->
      <el-pagination
        class="paginationtop"
        background
        :current-page="releaseing.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="releaseing.pageSize"
        :total="total"
        :pager-count="5"
        layout="->,total, prev, pager, next, sizes, jumper"
        @size-change="releaseingSizeChange"
        @current-change="releaseingpage"
      >
      </el-pagination>

      <el-dialog :title='"当前授权项目：" + appName' :visible.sync="dialogTransfer" :before-close="cancelTransfer" width="60%" top="1%" style="overflow-y: hidden;">
        <el-divider class="dividerhrcol"></el-divider>
        <div class="dialogForm">
          <el-form :model="form" class="formFlex" @submit.native.prevent @keyup.enter.native="changeAppName" :inline="true">
            <el-form-item label="应用名称： " style="white-space:nowrap;">
              <el-input v-model="form.projectName" placeholder="请输入应用名称" size="small" class="inputForm" @input="mountList(currentRow.pageNum)"></el-input>
              <el-button size="small" type="primary" @click="changeAppName" class="btnForm">搜 索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-card class="box-card" v-loading="appLoading">
          <el-table
            :data="gridData"
            :header-cell-style="{ color: '#333333' }"
            highlight-current-row
            @current-change="handleCurrentChange"
          >
            <el-table-column label="应用名称" min-width="25%" :show-overflow-tooltip="true">
              <template slot-scope="{ row, $index }">
                <span class="itemSlotheden">{{ row.appName || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述" min-width="25%">
              <template slot-scope="{ row, $index }">
                <el-tooltip class="item" effect="dark" :content="row.descr" placement="top-start">
                  <span class="itemSlotheden">{{ row.descr || '-' }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" min-width="25%">
              <template slot-scope="{ row, $index }">
                <el-tooltip class="item" effect="dark" :content="row.ctime" placement="top-start">
                  <span class="itemSlotheden">{{ row.ctime || '-' }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="修改时间" min-width="25%">
              <template slot-scope="{ row, $index }">
                <el-tooltip class="item" effect="dark" :content="row.mtime" placement="top-start">
                  <span class="itemSlotheden">{{ row.mtime || '-' }}</span>
                </el-tooltip>
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

        <!-- 分页器 -->
        <el-pagination
          class="paginationtop"
          background
          :current-page="currentRow.pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="currentRow.pageSize"
          :total="currentRow.total"
          :pager-count="5"
          layout="->,total, prev, pager, next, sizes, jumper"
          @size-change="appSizeChange"
          @current-change="mountList"
        >
        </el-pagination>

      </el-dialog>

    </el-card>
  </div>
</template>
<script>
import { getshareDataPage, mechanismTree, queryAppName, getAuthProjectList, getCurrentAuthProjectName, modifyAuthProject } from '@/api/api'
import { hasPerms } from '@/utils/hasPermission'
import { mapState } from 'vuex'
import qs from 'qs'
import { Message } from 'element-ui'
export default {
  name: 'releaseingData',
  data() {
    return {
      releaseing: {
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
        queryType: 1, //查询类型 1:我的数据 2:审批中 3:正在使用 4:已释放列表 5:共享驳回记录
        rejectDate: '',
        rowStart: 0,
        shareOffDate: '',
        shareOffStatus: '',
        shareType: '',
        sort: 0,
        useAppSystem: '',
        username: ''
      },
      // 数源应用系统
      sourceList: [],
      // 分页器
      total: 0, //总共数据条数
      dateList: {
        //使用应用系统
        useAppSystem: 'source_system',
        //共享数据状态
        shareDataStatus: 'share_data_status',
        //数据类型
        shareType: 'share_data_type'
      },
      citys: [],
      tableInterface: [],
      loading: true, //加载
      //更换授权项目
      gridData: [],
      dialogTransfer: false,
      form: { projectName: '' },
      currentRow: {
        appName: '',
        catalogId: '',
        isMount: 1,
        appId: '',
        pageNum: 1,//应用起始页
        pageSize: 10,//应用条数
        total: 0,//应用总数
        applyId: '',
      },
      loadSubmit: false,
      appLoading: true, //应用列表加载
      appName: '',//当前授权项目名称
      showNameColumn: false,
      isSearch: false,// 高级搜索
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        //  pagequeryList: this.pagequeryList,
        //     toNameitem: this.toNameitem
        if (this.$route.params.toNameitem == '编目详情') {
          this.releaseing = this.$route.params.pagequeryList
          console.log('this.releaseing', this.releaseing)
          this.$nextTick(() => {
            this.releaseingpage(this.releaseing.pageNum)
          })
          this.$route.params.toNameitem = ''
          this.$route.params.pagequeryList = ''
        }
      }
    }
  },
  mounted() {
    this.dateFrom()
    this.chanismTree()
    this.releaseingpage()
    this.sourceSystemList()
  },
  activated() {
    // this.releaseing.applyDept = this.$route.query.applyDept;
    this.releaseing.myDataStatus = this.$route.query.myDataStatus;
    this.releaseingpage();
  },
  methods: {
    // 数源应用系统
    sourceSystemList() {
      queryAppName().then(res => {
        this.sourceList = res.body
      })
    },
    chanismTree() {
      mechanismTree().then(res => {
        if (res.success) {
          // this.citys = res.body.children
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
          this.citys = treeToArr(res.body.children)
        }
      })
    },
    // 跳详情
    toDetails(row) {
      console.log(row)
      this.$router.push({
        // path: '/datefrom/cataloglist'
        name: 'datefrom-cataloglist',
        params: {
          itemId: row.catalogId,
          pagequery: this.releaseing,
          toName: '我的数据'
        }
      })
    },
    toReview(row) {
      console.log(row)
      let type = '历史'
      let sign = '4'
      this.$router.push({
        // path: '/MessageCenter/WorkOrderProcessing'
        name: 'MessageCenter-WorkOrderProcessing',
        query: {
          catalogId: row.catalogId,
          applyTitle: row.applyTitle,
          processCode: row.processCode,
          fromItem: '我的数据',
          type: type,
          sign
        }
      })
    },
    dateFrom() {
      const { useAppSystem, shareDataStatus, shareType } = this.dateList
      //使用应用系统
      this.$store.dispatch('getUseAppSystem', useAppSystem)
      //共享数据状态
      // shareDataStatus: 'share_data_status',
      this.$store.dispatch('getShareDataStatus', shareDataStatus)
      //数据类型
      this.$store.dispatch('getShareType', shareType)
    },
    // 排序
    sortChange({ column, prop, order }) {
      // dateField 储存的
      if (prop == 'totalNumber') {
        this.releaseing.dateField = prop
        if (order == 'ascending') {
          //上升
          this.releaseing.sort = 1
        } else if (order == 'descending') {
          //下降
          this.releaseing.sort = 2
        } else if (order == null) {
          //空
          this.releaseing.dateField = ''
          this.releaseing.sort = ''
        }
      } else if (prop == 'openDate') {
        this.releaseing.dateField = prop
        if (order == 'ascending') {
          //上升
          this.releaseing.sort = 1
        } else if (order == 'descending') {
          //下降
          this.releaseing.sort = 2
        } else if (order == null) {
          //空
          this.releaseing.dateField = ''
          this.releaseing.sort = ''
        }
      }
      this.releaseingpage()
    },
    // 查询
    submitRelease() {
      this.releaseing.dateField = ''
      this.releaseing.sort = ''
      this.releaseingpage()
    },
    // 重置
    resetexcel(releaseing) {
      this.$refs[releaseing].resetFields()
    },
    // 每页展示条数
    releaseingSizeChange(pageSize) {
      this.releaseing.pageSize = pageSize
      this.releaseingpage()
    },
    // 切换分页
    releaseingpage(page = 1) {
      this.loading = true
      this.tableInterface = []
      this.releaseing.pageNum = page
      getshareDataPage(this.releaseing).then(res => {
        if (res.success) {
          this.tableInterface = res.body.content
          this.total = res.body.total
          this.tableInterface.map((item, index) => {
            item.openDate = this.timeCycle(item.openDate)
          })
          this.loading = false
        }
      })
    },
    //时间转换
    timeCycle(da) {
      if (da != null) {
        var date = new Date(da)
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        // var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        // var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        // var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return Y + M + D
      }
    },
    //更换授权项目
    modifyAuthProject(row) {
      this.getAppName(row)
      this.mountList()
      this.dialogTransfer = true
    },
    // 点击操作的弹框表格数据
    mountList(page = 1) {
      this.appLoading = true
      this.currentRow.pageNum = page
      getAuthProjectList(this.form.projectName,this.currentRow.pageNum,this.currentRow.pageSize)
        .then(res => {
          if (res.success) {
            this.gridData = res.body.content
            this.currentRow.total = res.body.total
            this.gridData.map((item, index) => {
              item.ctime = this.formatTime(item.ctime)
              item.mtime = this.formatTime(item.mtime)
            })
            this.appLoading = false
          } else {
            Message.error(res.message)
            this.appLoading = false
          }
        })
        .catch(() => {
          Message.error(res.message)
          this.loading = false
        })
    },
    // 弹窗里的搜索  失去焦点或者回车触发
    changeAppName(val) {
      this.mountList();
    },
    // 单选点击表格行
    handleCurrentChange(val) {
      this.currentRow.appId = val.appId
      this.currentRow.appName = val.appName
    },
    // 取消
    cancelTransfer() {
      this.dialogTransfer = false
      this.form.projectName = ''
      this.currentRow = {
        appName: '',
        catalogId: '',
        isMount: 1,
        appId: '',
        pageNum: 1,//应用起始页
        pageSize: 10,//应用条数
        total: 0,//应用总数
        applyId: '',
      }
    },
    //授权项目
    determineTransfer() {
      this.loadSubmit = true
      let authAppBo = {
        applyId: this.currentRow.applyId,
        appId: this.currentRow.appId
      }
      modifyAuthProject(authAppBo)
      .then(res => {
          if (res.success) {
            Message({
              message: '重新授权成功!',
              type: 'success'
            })
            this.loadSubmit = false
            this.cancelTransfer()
          } else {
            Message.error(res.message)
            this.loadSubmit = false
          }
      })
      .catch(() => {
        Message.error(res.message)
        this.loadSubmit = false
      })
    },
    //应用每页展示条数
    appSizeChange(pageSize) {
      this.currentRow.pageSize = pageSize
      this.mountList()
    },
    //获取当前授权项目名称
    getAppName(row) {
      this.currentRow.applyId = row.applyId
      getCurrentAuthProjectName(row.applyId)
        .then(res => {
          if (res.success) {
            this.appName = res.body
          } else {
            Message.error(res.message)
          }
        })
        .catch(() => {
          Message.error(res.message)
        })
    },
    hasPerms,

  },
  computed: {
    ...mapState({
      datefromList: state => state.indatafrom.datefromList
    })
  },
}
</script>

<style lang="less" scoped>
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
.buthei {
  height: 32px;
}
.cardpadmargtop {
  margin-top: 24px;
  // padding-left: 20px;
  width: 100%;
}
.paginationtop {
  margin-top: 15px;
}
.aitemml {
  width: 200px;
}
.pickerDate {
  width: 200px;
}
/deep/.el-table th.el-table__cell > .cell {
  display: flex;
  align-items: center;
}
.itemSlotheden2 {
  width: 190px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align:left;
  user-select: unset;//设置允许复制el-button的内容
}

//更换授权项目样式
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
  // display: flex;
  // justify-content: space-around;
}

.inputForm {
  width: 150%;
  margin-right: 10px;
  // margin: 0 0;
}
.btnForm {
  font-size: 13px;
}

.dialogForm {
  .el-form {
    width: 100%;

    .el-form-item {
      width: 100%;
      text-align: center;
      margin: 10px 0 10px -116px;
    }
  }
}

.box-card {
  width: 95%;
  height: 400px;
  overflow: scroll;
  margin: auto;
}    

.dialog-footer {
  margin-top: 2px;
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


</style>
