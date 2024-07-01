<template>
  <!-- 数据编目--草稿箱 -->
  <div>
    <div>
      <el-card>
        <el-form :inline="true" ref="sizeForm" size="small" :model="sizeForm" class="farderfromflex">
          <div class="divffromflex">
            <el-form-item label="数据目录：" prop="catalogName">
              <el-input v-model="sizeForm.catalogName" placeholder="请输入" size="small"></el-input>
            </el-form-item>
            <el-form-item label="应用系统：" prop="sourceSystem">
              <el-select v-model="sizeForm.sourceSystem" clearable placeholder="请选择" size="small">
                <el-option
                  :label="source.appName"
                  :value="source.appName"
                  v-for="source in sourceList"
                  :key="source.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保存日期：">
              <el-date-picker
                v-model="datepicker"
                :default-time="['00:00:00', '23:59:59']"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                class="datawei"
              >
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="fromflexrig">
            <el-form-item size="large">
              <el-button type="primary" size="small" class="buthei" @click="onSubmit">查询</el-button>
              <el-button size="small"class="buthei" @click="resetForm('sizeForm')">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-card>

      <el-card class="cardmargtop">
        <el-button type="primary" class="addweihei" v-has="'iscatalog:newData'" @click="addshowModify"
          ><i class="el-icon-plus"></i> 新增</el-button
        >
        <el-button type="text" class="piliangbut" @click="exportbut">批量导出</el-button>
        <el-table
          :header-cell-style="{
            background: '#E6F7FF',
            fontWeight: '600',
            color: '#333333',
            fontSize: '14px'
          }"
          v-loading="loading"
          :data="tabData"
          style="width: 100%"
          @selection-change="handleSelect"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="selection" align="center" min-width="8%"> </el-table-column>
          <el-table-column label="编目名称" min-width="23%" :show-overflow-tooltip="true">
            <template slot-scope="{ row }">
              <el-button type="text" class="itemSlotheden2" @click="toAddCatalogue(row)">{{ row.catalogName || '-' }}</el-button>
              <!-- <el-button type="text" slot="reference" @click="toAddCatalogue(row)">{{ row.catalogName }}</el-button> -->
            </template>
          </el-table-column>
          <el-table-column prop="sourceSystem" label="数源系统" min-width="23%"> </el-table-column>
          <el-table-column prop="createdTime" label="保存时间" min-width="26%"> </el-table-column>
          <el-table-column label="操作" min-width="20%">
            <template slot-scope="{ row }">
              <el-button type="text" slot="reference" @click="deleteDraftbox(row)" v-has="'drafts:delete'"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <el-pagination
          class="paginationtop"
          background
          @size-change="handleSizeChange"
          @current-change="getRolesDraft"
          :current-page="sizeForm.pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="sizeForm.pageSize"
          :total="total"
          :pager-count="5"
          layout="->,total, prev, pager, next, sizes, jumper"
        >
        </el-pagination>

        <!-- 点击删除 -->
        <el-dialog title="提示" :visible.sync="deleteDraft" width="30%">
          <el-divider class="dividerhrcol"></el-divider>
          <p class="dialogcenter"><i class="el-icon-info iconcolor"></i> 是否确认删除该目录？</p>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="deleteDraft = false">取 消</el-button>
            <el-button size="small" type="primary" @click="deleteDraftli">确 认</el-button>
          </span>
        </el-dialog>

        <!-- 点击导出 -->
        <el-dialog title="提示" :visible.sync="exportDraft" width="30%">
          <el-divider class="dividerhrcol"></el-divider>
          <p class="dialogcenter"><i class="el-icon-info iconcolor"></i> 是否确认导出</p>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="exportDraft = false">取 消</el-button>
            <el-button size="small" type="primary" @click="exportan">确 认</el-button>
          </span>
        </el-dialog>
      </el-card>
    </div>
    <!-- <AddOrModify
      ref="add"
      v-show="isshowModify"
      :visible.sync="isshowModify"
      @draftSuccess="draftSuccess"
      @closeDraft="closeDraft"
    ></AddOrModify> -->
  </div>
</template>
<script>
import { postDraftsList, postDraftsPage, deleteDraftsDel, queryAppName } from '@/api/api'
import { exportDraftsXls } from '@/api/department'
import { MessageBox, Message } from 'element-ui'
import { mapState } from 'vuex'
export default {
  name: 'Draftbox',
  data() {
    return {
      sizeForm: {
        catalogName: '',
        sourceSystem: '',
        sarTime: '', //开始时间
        endTime: '', //结束时间
        pageNum: 1,
        pageSize: 10,
        rowStart: 0
      },
      // 日期
      datepicker: [],
      // 分页器
      // page: 1, //当前页数
      // pagesize: 10, //当前页显示条数
      total: 0, //总共数据条数
      // 数源应用系统
      sourceList: [],
      // 表格的选中
      selectTableID: [],
      system: 'source_system',
      // 表格数据
      tabData: [],

      // 删除的弹窗
      deleteDraft: false,
      deleteRowId: [],

      // 跳转新增页面
      // isshowModify: false,
      // 设置标识，判断是从编辑进的还是草稿箱进的

      exportDraft: false,
      loading: false
    }
  },
  mounted() {
    this.getFrom()
  },
  created() {
    this.getRolesDraft()
    this.sourceSystemList()
  },
  methods: {
    // 数源系统
    sourceSystemList() {
      queryAppName().then(res => {
        this.sourceList = res.body
      })
    },
    getFrom() {
      let { system } = this
      // 数源应用系统
      this.$store.dispatch('getApplicationList', system)
    },
    //时间转换
    timeCycle(da) {
      if (da != null) {
        var date = new Date(da)
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return Y + M + D + h + m + s
      }
    },
    // 草稿箱的数据请求
    // getDrafts() {
    //   // this.loading = true
    //   if (this.datepicker) {
    //     if (this.datepicker.length != 0) {
    //       this.sizeForm.sarTime = this.datepicker[0]
    //       this.sizeForm.endTime = this.datepicker[1]
    //     }
    //   } else {
    //     this.sizeForm.sarTime = ''
    //     this.sizeForm.endTime = ''
    //   }
    //   let sizeForm = this.sizeForm
    //   postDraftsList(sizeForm).then(res => {
    //     if (res.success) {
    //       this.tabData = res.body
    //       this.total = res.body.total
    //       this.tabData.map((item, index) => {
    //         item.createdTime = this.timeCycle(item.createdTime)
    //       })
    //     }
    //   })
    //   // this.loading = false
    // },
    /*
    每页数量发生改变的监听
    */
    handleSizeChange(pageSize) {
      this.sizeForm.pageSize = pageSize
      this.getRolesDraft()
    },
    // 根据选择加当前页发请求
    getRolesDraft(page = 1) {
      this.loading = true
      this.sizeForm.pageNum = page
      if (this.datepicker) {
        if (this.datepicker.length != 0) {
          this.sizeForm.sarTime = this.datepicker[0]
          this.sizeForm.endTime = this.datepicker[1]
        }
      } else {
        this.sizeForm.sarTime = ''
        this.sizeForm.endTime = ''
      }
      postDraftsPage(this.sizeForm).then(res => {
        if (res.success) {
          this.tabData = res.body.content
          this.total = res.body.total
          this.tabData.map((item, index) => {
            item.createdTime = this.timeCycle(item.createdTime)
          })
          this.loading = false
        }
      })
    },

    // 点击查询
    onSubmit() {
      this.getRolesDraft()
    },

    resetForm(sizeForm) {
      this.$refs[sizeForm].resetFields()
      this.datepicker = []
      this.sizeForm = {
        catalogName: '',
        sourceSystem: '',
        sarTime: '', //开始时间
        endTime: '', //结束时间
        pageNum: 1,
        pageSize: 10,
        rowStart: 0
      }
    },
    handleSelect(row) {
      this.selectTableID = []
      if (row.length > 0) {
        row.forEach(value => {
          this.selectTableID.push(value.id)
        })
      }
    },

    // 选中背景色
    tableRowClassName({ row }) {
      let color = ''
      for (let item of this.selectTableID.values()) {
        if (item === row.id) {
          color = 'table-SelectedRow-bgcolor'
        }
      }
      return color
    },

    // 点击删除的
    deleteDraftbox(row) {
      this.deleteDraft = true
      this.deleteRowId = row.id
    },

    //点击确认删除
    deleteDraftli() {
      let arrayid = [this.deleteRowId.toString()]
      deleteDraftsDel(arrayid).then(res => {
        if (res.success) {
          Message({
            message: '删除成功！',
            type: 'success'
          })
        } else {
          Message.warning('删除失败')
        }
        this.deleteDraft = false
        this.getRolesDraft()
      })
    },
    exportbut() {
      if (this.selectTableID.length == 0) {
        Message.warning('请至少勾选一个选项')
      } else {
        this.exportDraft = true
      }
    },
    // 导出
    exportan() {
      let someId = { selectID: this.selectTableID }

      exportDraftsXls(someId)
        .then(res => {
          let _this = this
          let year = new Date().getFullYear()
          let month = new Date().getMonth() + 1
          let day = new Date().getDate()
          let hours = new Date().getHours()
          let minutes = new Date().getMinutes()
          if (hours < 10) {
            hours = '0' + hours
          }
          if (minutes < 10) {
            minutes = '0' + minutes
          }
          _this.times = year + '-' + month + '-' + day + ' ' + hours + '-' + minutes

          const link = document.createElement('a') // 创建a标签
          const blob = new Blob([res], {
            // type: 'application/vnd.ms-excel'
            type: 'application/json;charset=UTF-8'
            // type:'application/force-download;charset=utf-8'
            // type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }) // res就是接口返回的文件流
          const objectUrl = URL.createObjectURL(blob)
          link.href = objectUrl
          link.download = '草稿箱批量导出' + ' ' + _this.times + '.xlsx'
          link.click()
          URL.revokeObjectURL(objectUrl) // 释放内存
          Message({
            message: '导出成功！',
            type: 'success'
          })
        })
        .catch(error => {
          Message.error('模板导出失败')
        })
      this.exportDraft = false
    },

    // 点击编辑
    toAddCatalogue(row) {
      // this.isshowModify = true
      this.$router.push({
        path: '/datefrom/AddOrModify',
        query: {
          id: row.id,
          comeFrom: '4'
        }
      })
      // this.$refs.add.getDraftboxAddData(row.id)
      // this.$bus.$emit('draftbox', row.id)
    },

    // 新增页面保存成功
    // draftSuccess(val) {
    //   // this.isshowModify = val
    //   this.getDrafts()
    // }
    // 点击取消
    // closeDraft(val) {
    //   this.isshowModify = val
    //   // this.getDrafts()
    // }

    // 新增
    addshowModify() {
      // this.isshowModify = true
      // /datefrom/AddOrModify
      // this.$bus.$emit('addData', 'add')
      this.$router.push({
        path: '/datefrom/AddOrModify',
        query: {
          comeFrom: '1',
        },
      })
      // this.$refs.add.getAddData(false)
    },

  },
  computed: {
    ...mapState({
      datefromList: state => state.indatafrom.datefromList
    })
  }
}
</script>

<style lang="less" scoped>
/deep/.el-range-separator {
  margin: 0 15px 0 0;
}
.datawei {
  width: 280px;
}
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
}
.fromitemdata {
  width: 120px;
}
.fromdatatime {
  margin-right: 10px;
}
.aitemml {
  width: 200px;
  height: 32px;
}
.aitemmlmini {
  width: 200px;
  height: 32px;
}
.el-divider--horizontal {
  margin: 0 0 5px 0;
}
.paginationtop {
  margin-top: 10px;
}
.piliangbut {
  width: 88px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #1890ff;
  color: #1890ff;
  margin-bottom: 20px;
  line-height: 32px;
  font-size: 14px;
  padding: 0 17px;
}
/deep/.table-SelectedRow-bgcolor {
  td {
    background: rgba(24, 144, 255, 0.12) !important;
  }
}
.cardmargtop {
  margin-top: 25px;
  // padding: 0 20px 0 20px;
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
/deep/.el-icon-info {
  width: 26px;
  height: 26px;
  color: #1890ff;
}
.dialogcenter {
  text-align: center;
  line-height: 200px;
  font-size: 16px;
  color: #000000;
}
// .buthei {
//   height: 32px;
// }
.el-form--inline .el-form-item {
  margin-right: 0;
}
.itemSlotheden2 {
  width: 170px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align:left;
  user-select: unset;//设置允许复制el-button的内容
}
.addweihei {
  width: 80px;
  height: 32px;
  margin-right: 10px;
  font-size: 14px;
  line-height: 32px;
  padding: 0;
}
</style>
