<template>
  <div id="Maintenance">
    <OpenPlatformHeader />
    <div class="content">
      <!-- 表单查询区Str -->
      <div class="form-search">
        <el-form :inline="true" :model="inquireData" class="demo-form-inline">
          <div class="sear-info-box">
            <el-form-item label="应用名称">
              <el-input clearable size="small" v-model="inquireData.appName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="责任单位">
              <el-select clearable filterable size="small" v-model="inquireData.departName" placeholder="请选择">
                <el-option
                  v-for="departments in department"
                  :key="departments.id"
                  :label="departments.nodeName"
                  :value="departments.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="应用状态">
              <el-select clearable size="small" v-model="inquireData.state" placeholder="请选择">
                <el-option label="启用" value="1"></el-option>
                <el-option label="关闭" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
              <el-button @click="onReset" size="small">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <!-- 表单查询区End -->
      <!-- 表格区Str -->
      <div class="content-table">
        <div class="btns">
          <el-button type="primary" size="small" @click="handleAddapply">新增应用</el-button>
          <el-button type="primary" size="small" @click="handleDelAll" :disabled="disabled">批量删除</el-button>
        </div>
        <div class="table-box" v-loading="tableLoading">
          <el-table
            :header-cell-style="{ background: '#E6F7FF', color: '#333333' }"
            :data="infoMaintenData"
            @selection-change="handleSelectionChange"
            style="width: 100%"
          >
            <el-table-column type="selection"> </el-table-column>
            <el-table-column prop="appName" label="应用名称">
              <template slot-scope="{ row }">
                {{ row.appName || '-' }}
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="应用描述">
              <template slot-scope="{ row }">
                {{ row.remark || '-' }}
              </template>
            </el-table-column>
            <el-table-column prop="updatedTime" label="添加时间">
              <template slot-scope="{ row }">
                {{ row.updatedTime || '-' }}
              </template>
            </el-table-column>
            <el-table-column prop="departName" label="责任单位">
              <template slot-scope="{ row }">
                {{ row.departName || '-' }}
              </template>
            </el-table-column>
            <el-table-column prop="state" label="状态">
              <template slot-scope="scope">
                <el-switch
                  class="switchStyle"
                  v-model="scope.row.state"
                  active-value="1"
                  active-text="启用"
                  inactive-text="关闭"
                  inactive-value="0"
                  @change="change(scope.row)"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scoped">
                <el-button type="text" @click="handleEdit(scoped.row)">编辑</el-button>
                <el-button type="text" @click="handleCopySysten(scoped.row)">复制</el-button>
                <el-button type="text" @click="handleDel(scoped.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 表格区End -->
      <!-- 分页器Str -->
      <div class="paginationtop">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="getRoles"
          :current-page="1"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="1"
          :total="total"
          layout="->,total, prev, pager, next, sizes, jumper"
        >
        </el-pagination>
      </div>
      <!-- 分页器End -->
      <!-- 操作弹窗 -->
      <el-dialog :visible.sync="applyDialog" width="30%" :before-close="handleClose">
        <p style="text-align: left; font-weight: bold; color: #000">{{ title }}应用</p>
        <el-form :data="requiredData" label-width="70px">
          <el-form-item label="应用名称">
            <el-input size="small" v-model="requiredData.appName" placeholder="请输入应用名称"></el-input>
          </el-form-item>
          <el-form-item label="应用描述" prop="remark">
            <el-input type="textarea" v-model="requiredData.remark" :rows="4" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel" size="small">取 消</el-button>
          <el-button type="primary" @click="handleSubmit" size="small" :loading="loading">{{
            loading ? '提交中...' : '提交'
          }}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getPageTableSystem,
  mechanismTree,
  getDeleteBatchSystem,
  getaddSystem,
  getCopySystem,
  getDataSourceEdit,
  getModifyState,
} from '@/api/api'
import qs from 'qs'
import { Message, MessageBox } from 'element-ui'
import OpenPlatformHeader from '@/components/page/OpenPlatformHeader'

export default {
  name: 'maintenance',
  components: {
    OpenPlatformHeader,
  },
  data() {
    return {
      title: '',
      loading: false,
      // 新增-编辑参数
      requiredData: {
        appName: '',
        remark: '',
        id: '',
        state: '0',
      },
      applyDialog: false,
      disabled: true,
      checked: false,
      ids: [],
      delIds: [],
      delSingle: [],
      department: [],
      inquireData: {
        // 应用名称
        appName: '',
        // 责任单位
        departName: '',
        // 应用状态
        state: '',
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      tableLoading: false,
      infoMaintenData: [],
    }
  },
  activated() {
    this.title = this.$route.query.add
    this.applyDialog = this.$route.query.flag
    this.fetchPageTableSystem()
    this.fetchMechanismTree()
  },
  methods: {
    // 取消
    handleCancel() {
      this.applyDialog = false
      this.loading = false
      this.requiredData.id = ''
      this.requiredData.appName = ''
      this.requiredData.remark = ''
    },
    // 编辑
    handleEdit(rowData) {
      this.title = '编辑'
      this.applyDialog = true
      this.requiredData.id = rowData.id
      this.requiredData.appName = rowData.appName
      this.requiredData.remark = rowData.remark
    },
    // 复制
    handleCopySysten(rowData) {
      let id = qs.stringify({ id: rowData.id })
      getCopySystem(id).then((res) => {
        if (res.body.code == 200) {
          Message.success(res.body.message)
          this.fetchPageTableSystem()
        } else {
          Message.error(res.body.message)
        }
      })
    },
    // 新增-编辑系统维护
    handleSubmit() {
      this.loading = true
      if (this.title == '新增') {
        getaddSystem(this.requiredData)
          .then((res) => {
            if (res.body.code == 200) {
              this.fetchPageTableSystem()
              this.loading = false
              this.handleCancel()
              Message.success(`操作${res.body.message}`)
            } else {
              this.applyDialog = false
              this.loading = false
              Message.error(`操作${res.body.message}`)
            }
          })
          .catch((e) => {
            this.applyDialog = false
            this.loading = false
          })
      } else if (this.title == '编辑') {
        getDataSourceEdit(this.requiredData).then((res) => {
          this.loading = true
          if (res.success) {
            this.loading = false
            this.handleCancel()
            this.fetchPageTableSystem()
          } else {
            this.loading = false
            this.applyDialog = false
          }
        })
      }
    },
    handleClose(done) {
      MessageBox.confirm('确认关闭？')
        .then((_) => {
          this.handleCancel()
          done()
        })
        .catch((_) => {})
    },
    // 新增应用
    handleAddapply() {
      this.title = '新增'
      this.applyDialog = true
    },
    // 单个删除
    handleDel(rowData) {
      this.delSingle.push(rowData.id)
      MessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.fetchDeleteBatchSystem(this.delSingle)
      })
    },
    // 批量删除
    handleDelAll() {
      this.delIds = []
      const length = this.ids.length
      for (let i = 0; i < length; i++) {
        this.delIds.push(this.ids[i].id)
        MessageBox.confirm('此操作将永久删除该数据,将会删除' + this.delIds.length + '条数据 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.fetchDeleteBatchSystem(this.delIds)
        })
      }
    },
    handleSelectionChange(selection) {
      this.ids = selection
      this.ids.length > 0 ? (this.disabled = false) : (this.disabled = true)
    },
    change(rowData) {
      this.requiredData.id = rowData.id
      this.requiredData.state = rowData.state
      getModifyState(this.requiredData).then((res) => {
        console.log(res)
        if (!res.success) {
          Message.error(res.header.message)
        }
        if (res.body.code == 200) {
          Message.success(`操作${res.body.message}`)
        } else if (res.body.code == 500) {
          Message.error(`操作${res.body.message}`)
        }
      })
    },
    fetchDeleteBatchSystem(delIds) {
      getDeleteBatchSystem(delIds).then((res) => {
        if (res.success) {
          Message.success('删除成功')
          this.fetchPageTableSystem()
        } else {
          Message.error('删除失败')
        }
      })
    },
    fetchPageTableSystem() {
      this.tableLoading = true
      getPageTableSystem(this.inquireData).then((res) => {
        if (res.success) {
          this.infoMaintenData = res.body.content
          this.infoMaintenData.forEach((v) => {
            v.updatedTime = this.formatTime(v.updatedTime)
          })
          this.total = res.body.total
          this.tableLoading = false
        } else {
          this.tableLoading = false
          Message.error(res.header.message)
        }
      })
    },
    // 数源部门
    fetchMechanismTree() {
      mechanismTree().then((res) => {
        if (res.success) {
          function treeToArr(data, res = []) {
            data.forEach((item) => {
              res.push({
                // pid: pid,
                id: item.id,
                nodeCode: item.nodeCode,
                nodeName: item.nodeName,
                parentId: item.parentId,
              })
              if (item.children && item.children.length !== 0) {
                treeToArr(item.children, res)
              }
            })
            return res
          }
          this.department = treeToArr(res.body.children)
        }
      })
    },
    handleSizeChange(pageSize) {
      this.inquireData.pageSize = pageSize
      this.fetchPageTableSystem()
    },
    getRoles(pageNum) {
      this.inquireData.pageNum = pageNum
      this.fetchPageTableSystem()
    },
    // 查询
    onSubmit() {
      this.inquireData.pageNum = 1
      this.fetchPageTableSystem()
    },
    // 重置
    onReset() {
      ;(this.inquireData.appName = ''), (this.inquireData.departName = ''), (this.inquireData.state = '')
    },
  },
  mounted() {
    // this.$bus.$on('handleSysAddapply', flag => {
    //   console.log(flag)
    //   // this.applyDialog = flag
    // })
  },
  //解绑事件
  // beforeDestroy() {
  //   this.$bus.$off('handleSysAddapply')
  // },
}
</script>

<style lang="less" scoped>
#Maintenance {
  // height: calc(100% - 64px);
  background: #f2f2f3;
  .content {
    // padding: 24px;
    .form-search {
      background: #fff;
      .sear-info-box {
        display: flex;
        justify-content: space-between;
        padding: 24px;
      }
    }
    .content-table {
      // height: 100%;
      margin-top: 24px;
      padding: 24px;
      background: #fff;
      .btns {
        margin-bottom: 24px;
      }
    }
    .paginationtop {
      padding: 0 24px 24px 0;
      background: #fff;
    }
    /deep/.el-dialog__header {
      padding: 0 0 !important;
      padding: 24px;
    }
    /deep/.el-dialog__body {
      text-align: center;
    }
  }
  /** 
    switch文字内联样式
    */
  /deep/ .switchStyle .el-switch__label {
    position: absolute;
    display: none;
    color: #fff;
  }
  /deep/.switchStyle .el-switch__label--left {
    z-index: 9;
    left: 21px;
  }
  /deep/.switchStyle .el-switch__label--right {
    z-index: 9;
    // left: -14px;
  }
  /deep/.switchStyle .el-switch__label.is-active {
    display: block;
  }
  /deep/.switchStyle.el-switch .el-switch__core,
  /deep/.el-switch .el-switch__label {
    width: 60px !important;
  }
}
</style>