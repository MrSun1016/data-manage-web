<template>
  <div>
    <div v-show="!isshowNewAnnoun && !isshowContent">
      <el-card>
        <el-form :inline="true" :model="cement" size="small" ref="cement" class="demo-form-inline faderfrom">
          <div class="divffromflex">
            <el-form-item label="公告标题" prop="titile" class="topfromitem">
              <el-input size="small" v-model="cement.titile" placeholder="请输入" class="aitemml"></el-input>
            </el-form-item>

            <el-form-item label="状态" class="topfromitem" prop="sendStatus">
              <el-select v-model="cement.sendStatus" clearable placeholder="请选择" size="small">
                <el-option
                  :label="announ.text"
                  :value="announ.value"
                  v-for="announ in datefromList.announcement"
                  :key="announ.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="发布时间：">
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
            <el-form-item class="fromweizhi">
              <el-button type="primary" size="small" @click="submitexcel" class="butfromccwei">查 询</el-button>
              <el-button size="small" @click="resetexcel('cement')" class="butfromccwei">重 置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-card>
      <el-card class="cardmargtop">
        <el-button class="butPrimary" type="primary" size="small" @click="newAdd" v-has="'isNotice:issueNotice'"
          >发布公告</el-button
        >
        <el-button class="butPrimary" type="primary" size="small" @click="batchDelete" v-has="'isNotice:Alldelete'"
          >批量删除</el-button
        >
        <el-table
          :header-cell-style="{
            background: '#FAFAFA',
            fontWeight: '400',
            color: '#333333',
            fontSize: '14px',
          }"
          border
          stripe
          v-loading="loading"
          :data="tabData"
          style="width: 100%"
          @selection-change="handleSelect"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="selection" align="center" min-width="8%"> </el-table-column>
          <el-table-column label="公告标题" min-width="21%">
            <template slot-scope="{ row, $index }">
              <div @click="titleContent(row)">
                <span class="tabname" v-if="row.isTop == '是'">[置顶]</span>
                <span class="tabnamewei">{{ row.titile }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="userIds" label="发布范围" min-width="20%"> </el-table-column>
          <el-table-column prop="sendTime" label="发布时间" min-width="12%"> </el-table-column>
          <el-table-column prop="sendStatus" label="状态" min-width="12%"> </el-table-column>
          <el-table-column prop="sender" label="操作人" min-width="14%"> </el-table-column>
          <el-table-column label="操作" min-width="13%">
            <template slot-scope="{ row }">
              <div class="tempFlex">
                <div class="topdiv">
                  <div @click="topMessage(row)" class="tabnamewei" v-if="row.isTop == '是'">取消置顶</div>
                  <div @click="topMessage(row)" class="tabnamewei" v-if="row.isTop == '否' || row.isTop == null">
                    置顶
                  </div>
                </div>
                <div @click="isondelete(row)" class="tabnamewei margdiv" v-has="'isNotice:delete'">删除</div>
                <div class="tabnamewei" @click="duplicate(row)" v-has="'isNotice:noticeCopy'">复制</div>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <el-pagination
          class="paginationtop"
          background
          @size-change="handleSize"
          @current-change="getRolesTable"
          :current-page="cement.pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="cement.pageSize"
          :total="total"
          :pager-count="5"
          layout="->,total, prev, pager, next, sizes, jumper"
        >
        </el-pagination>
      </el-card>
      <!-- 保存 -->
      <el-dialog title="保存提示" :visible.sync="isShowdelete" width="30%">
        <el-divider></el-divider>
        <p class="dialogcenter">是否确认删除?</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelDelete" size="small" class="deletmarg">取 消</el-button>
          <el-button type="primary" size="small" @click="isDelete">确 认</el-button>
        </span>
      </el-dialog>
      <!-- 置顶 -->
      <el-dialog title="保存提示" :visible.sync="isShowTop" width="30%">
        <el-divider></el-divider>
        <p class="dialogcenter" v-show="topItem.isTop == '否' || topItem.isTop == null">是否确认置顶?</p>
        <p class="dialogcenter" v-show="topItem.isTop == '是'">是否确认取消置顶?</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelTop" size="small" class="deletmarg">取 消</el-button>
          <el-button type="primary" size="small" @click="isTop">确 认</el-button>
        </span>
      </el-dialog>
      <!-- 取消置顶 -->
      <!-- <el-dialog title="保存提示" :visible.sync="isShowTop" width="30%">
        <el-divider></el-divider>
        <p class="dialogcenter">是否确认取消置顶?</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelTop" size="small" class="deletmarg">取 消</el-button>
          <el-button type="primary" size="small" @click="isTop">确 认</el-button>
        </span>
      </el-dialog> -->
    </div>
    <!-- 新增 -->
    <NewAnnouncement
      ref="NewAnnoun"
      v-show="isshowNewAnnoun"
      :visible.sync="isshowNewAnnoun"
      @refresh="refresh"
    ></NewAnnouncement>
    <!-- 预览 -->
    <MessageContent ref="content" v-show="isshowContent"   :visible.sync="isshowContent"></MessageContent>
  </div>
</template>
<script>
import { MessageBox, Message } from 'element-ui'
import { mapState } from 'vuex'
import { getTableList, queryById, postedit } from '@/api/api'
import { deleteBatch } from '@/api/department'
import NewAnnouncement from './modules/NewAnnouncement'
import MessageContent from './modules/MessageContent'
export default {
  name: 'SysAnnouncementList',
  components: {
    NewAnnouncement,
    MessageContent,
  },
  data() {
    return {
      cement: {
        titile: '',
        topfromitem: '',
        startTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      datepicker: [],
      tabData: [],
      loading: false,
      selectTableID: [],
      announcement: 'announcement_status',
      // 预览
      isshowContent: false,
      // 新增
      isshowNewAnnoun: false,
      // 删除
      isShowdelete: false,
      ids: '',
      // 置顶
      isShowTop: false,
      topItem: {},
    }
  },
  created() {
    this.getFrom()
    this.getRolesTable()
  },
  methods: {
    getFrom() {
      let { announcement } = this
      // 公告状态
      this.$store.dispatch('getAnnouncement', announcement)
    },
    // 点标题预览
    titleContent(row) {
      if (row.sendStatus == '编辑中') {
        this.isshowNewAnnoun = true
        this.$refs.NewAnnoun.duplicateAnnounce(row)
      } else {
        this.isshowContent = true
        this.$refs.content.getContent(row)
      }
    },
    // 置顶
    topMessage(row) {
      this.topItem = row
      // console.log(this.topItem)
      this.isShowTop = true
    },
    isTop() {
      let topList
      if (this.topItem.isTop == '否' || this.topItem.isTop == null) {
        topList = {
          isTop: '是',
          id: this.topItem.id,
        }
      } else {
        topList = {
          isTop: '否',
          id: this.topItem.id,
        }
      }

      postedit(topList).then((res) => {
        if (res.success) {
          Message({
            message: res.message,
            type: 'success',
          })
          this.isShowTop = false
          this.getRolesTable()
        } else {
          this.isShowTop = false
          Message.error(res.message)
        }
      })
    },
    cancelTop() {
      this.isShowTop = false
      // let topList = {
      //   isTop: '',
      //   setTopTime: '',
      //   id: ''
      // }
    },
    // 取消置顶
    // cancelTopping() {},
    // 删除
    isondelete(row) {
      this.isShowdelete = true
      this.ids = row.id
    },
    // 批量删除
    batchDelete() {
      this.isShowdelete = true
      console.log(this.selectTableID)
    },
    // 确认删除
    isDelete() {
      let deltId
      if (this.ids != '') {
        deltId = this.ids
      } else {
        deltId = this.selectTableID
      }
      deleteBatch(deltId).then((res) => {
        if (res.success) {
          Message({
            message: res.message,
            type: 'success',
          })
          this.isShowdelete = false
          this.getRolesTable()
        } else {
          this.isShowdelete = false
          Message.error(res.message)
        }
      })
      this.ids = ''
    },
    cancelDelete() {
      this.isShowdelete = false
      this.ids = ''
    },
    // 新增
    newAdd() {
      this.isshowNewAnnoun = true
    },
    // 复制
    duplicate(row) {
      this.isshowNewAnnoun = true
      this.$refs.NewAnnoun.duplicateAnnounce(row)
    },
    refresh() {
      this.getRolesTable()
    },
    // 分页
    getRolesTable(page = 1) {
      this.loading = true
      this.cement.pageNum = page
      if (this.datepicker) {
        if (this.datepicker.length != 0) {
          this.cement.startTime = this.datepicker[0]
          this.cement.endTime = this.datepicker[1]
        }
      } else {
        this.cement.startTime = ''
        this.cement.endTime = ''
      }
      // let { titile, topfromitem, startTime, endTime, pageNum, pageSize } = this.cement
      getTableList(this.cement)
        .then((res) => {
          if (res.success) {
            this.tabData = res.body.content
            this.total = res.body.total
            this.tabData.forEach((item, index) => {
              item.sendTime = this.formatTime(item.sendTime)
            })
            this.loading = false
          } else this.loading = false
        })
        .catch((_) => {
          this.loading = false
        })
    },
    handleSize(pageSize) {
      this.cement.pageSize = pageSize
      this.getRolesTable()
    },
    submitexcel() {
      this.getRolesTable()
    },
    resetexcel(excelData) {
      this.$refs[excelData].resetFields()
      this.datepicker = []
    },
    handleSelect(row) {
      this.selectTableID = []
      if (row.length > 0) {
        row.forEach((value) => {
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
    getCurrentTime() {
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1
      let day = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
      let hours = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
      let minutes = new Date().getMinutes() < 10 ? '0' + new Date().getHours() : new Date().getHours()
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
    },
  },
  computed: {
    ...mapState({
      datefromList: (state) => state.indatafrom.datefromList,
    }),
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
/deep/.el-range-separator {
  margin: 0 15px 0 0;
}
.datawei {
  width: 280px;
}
.cardmargtop {
  margin-top: 25px;
  .butPrimary {
    margin: 0 20px 20px 0;
  }
}
.tabnamewei {
  margin: 0;
  color: #409eff;
  cursor: pointer;
}
.tabname {
  color: #ff0000;
  cursor: pointer;
}
.margdiv {
  margin-right: 10px !important;
}
.tempFlex {
  display: flex;
  .topdiv {
    width: 60px;
    margin-right: 10px !important;
  }
}
/deep/.table-SelectedRow-bgcolor {
  td {
    background: rgba(24, 144, 255, 0.12) !important;
  }
}
.paginationtop {
  margin-top: 10px;
}
/deep/.el-dialog__body {
  padding: 0;
}
/deep/.el-dialog__title {
  color: #1890ff;
}
/deep/.el-divider--horizontal {
  margin: 0;
}
.dialogcenter {
  text-align: center;
  line-height: 200px;
  font-size: 16px;
  color: #000;
}
</style>
