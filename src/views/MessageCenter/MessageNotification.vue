<template>
  <div>
    <div v-show="!announcements && !iscontentcod">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部消息" name="全部">
            <MessageSearch @clickSubmit="clickSubmit" />
          </el-tab-pane>
          <el-tab-pane label="未读消息" name="未读">
            <MessageSearch @clickSubmit="clickSubmit" />
          </el-tab-pane>
          <el-tab-pane label="已读消息" name="已读">
            <MessageSearch @clickSubmit="clickSubmit" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-card class="cardmargtop">
        <el-button type="text" class="piliangbut" v-show="activeName !== '已读'" @click="isShowBatchRead"
          >批量已读</el-button
        >
        <el-button type="text" class="piliangbut" @click="isDeletion">批量删除</el-button>
        <el-table
          :header-cell-style="{
            background: '#E6F7FF',
            fontWeight: '600',
            color: '#333333',
            fontSize: '14px'
          }"
          :data="tabelMessage"
          v-loading="loading"
          style="width: 100%"
          @selection-change="handleSelect"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="selection" align="center" min-width="8%"> </el-table-column>
          <el-table-column label="消息标题" min-width="23%">
            <template slot-scope="{ row, $index }">
              <div class="yuancolor2" v-show="row.state == '未读' && activeName == '全部'"></div>
              <span>{{ row.title }}</span>
              <!-- <p :class="{ active: row.state == '未读' && activeName == '全部' }">{{ row.title }}</p> -->
            </template>
          </el-table-column>
          <el-table-column prop="departName" label="消息来源" min-width="25%"> </el-table-column>
          <el-table-column prop="messageType" label="消息类型" min-width="24%"> </el-table-column>
          <el-table-column prop="createTime" label="消息接收时间" min-width="26%"> </el-table-column>
          <el-table-column label="操作" min-width="20%">
            <template slot-scope="{ row, $index }">
              <el-button
                type="text"
                class="butmargin"
                slot="reference"
                @click="viewingItem(row)"
                v-has="'notification:lookUp'"
                >查看</el-button
              >
              <el-button type="text" slot="reference" @click="deleteItemId(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <el-pagination
          class="paginationtop"
          background
          @size-change="handleSizeChange"
          @current-change="getRolesDraft"
          :current-page="pageUser.pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageUser.pageSize"
          :total="total"
          :pager-count="5"
          layout="->,total, prev, pager, next, sizes, jumper"
        >
        </el-pagination>

        <!-- 查看抽屉 -->
        <!-- title="数据共享审批催办" -->
        <!-- <el-drawer
          :visible.sync="messageViewing"
          direction="rtl"
          @close="closeDrawer"
          :show-close="showClose"
          ref="messageViewing"
          size="30%"
        >
          <div slot="title" class="drawerTitle">
            <span class="colorspan">{{ viewMessage.title }}</span>
            <span>{{ viewMessage.createTime }}</span>
          </div>
          <el-divider></el-divider>
          <div class="drawerBody">
            <div class="drawerheder">
              <span class="bodydepartment">{{ viewMessage.content }}</span>
            </div>
          </div>
        </el-drawer> -->

        <!-- 单个删除 -->
        <el-dialog title="提示" :visible.sync="deleteVisible" width="30%">
          <el-divider></el-divider>
          <p class="dialogcenter">是否确认删除该数据？</p>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="deleteVisible = false" class="deletmarg">取 消</el-button>
            <el-button size="small" type="primary" @click="deleteBatch">确 认</el-button>
          </span>
        </el-dialog>
        <!-- 批量删除 -->
        <el-dialog title="提示" :visible.sync="batchDeletion" width="30%">
          <el-divider></el-divider>
          <p class="dialogcenter">是否确认批量删除已选数据？</p>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="batchDeletion = false" class="deletmarg">取 消</el-button>
            <el-button size="small" type="primary" @click="batchDeletionList">确 认</el-button>
          </span>
        </el-dialog>
        <!-- 批量已读 -->
        <el-dialog title="提示" :visible.sync="batchRead" width="30%">
          <el-divider></el-divider>
          <p class="dialogcenter">是否确认批量已读已选数据？</p>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="batchRead = false" class="deletmarg">取 消</el-button>
            <el-button type="primary" size="small" :loading="loadread" :disabled="loadread" @click="batchReadList">{{
              loadread ? '提交中...' : '确认'
            }}</el-button>
          </span>
        </el-dialog>
      </el-card>
    </div>
    <MessagesAnnouncements
      ref="news"
      :visible.sync="announcements"
      v-show="announcements"
      @reRequest="reRequest"
    ></MessagesAnnouncements>
    <MessageContentcod
      ref="contentcod"
      v-show="iscontentcod"
      :visible.sync="iscontentcod"
      @reRequest="reRequest"
    ></MessageContentcod>
  </div>
</template>
<script>
import MessageSearch from '@views/MessageCenter/components/MessageSearch'
import MessageContentcod from '@views/MessageCenter/components/MessageContentcod'
import MessagesAnnouncements from '@views/MessageCenter/components/MessagesAnnouncements'
import { pageUserMessage, deleteBatchMessage, readBatchMessage } from '@/api/api'

import { Message } from 'element-ui'
export default {
  name: 'MessageNotification',
  components: {
    MessageSearch,
    MessagesAnnouncements,
    MessageContentcod
  },
  data() {
    return {
      activeName: '全部',
      tabelMessage: [
        {
          catalogName: '121212',
          sourceSystem: '121212',
          createdTime: '121212'
        }
      ],
      pageUser: {
        state: '',
        sarTime: '', //开始时间
        endTime: '', //结束时间
        readtime: '',
        messageType: '',
        pageNum: 1,
        pageSize: 10,
        title: ''
      },
      total: 0,
      newsID: [],
      // 单个删除
      isSelectID: [],
      // 查看抽屉
      messageViewing: false,
      showClose: false,
      // 点击删除
      deleteVisible: false,
      // 批量删除
      batchDeletion: false,
      // 批量已读
      batchRead: false,
      // 加载
      loading: false,
      // 消息公告
      announcements: false,
      messageType: '',
      // 公告推送
      iscontentcod: false,
      loadread: false
    }
  },

  watch: {
    $route: {
      immediate: true,
      handler() {
        if (this.$route.params.toName == '共享') {
          this.pageUser = this.$route.params.formInline
          let row = this.$route.params.itemId
          this.$nextTick(() => {
            this.getRolesDraft(this.pageUser.pageNum)
            this.announcements = true
            this.$refs.news.getViewSingle(row, this.pageUser)
          })
          this.$route.params.toName = ''
          this.$route.params.itemId = ''
          this.$route.params.formInline = ''
        }
      }
    }
    // tabelMessage: {
    //   immediate: true,
    //   handler() {
    //     this.$bus.$emit('getTabelMessage')
    //   }
    // }
  },
  mounted() {
    this.getRolesDraft()
  },
  activated() {
    this.messageType = this.$route.query.mesageType
    this.pageUser.state = this.$route.query.mesageType
    this.messageType ? (this.activeName = this.messageType) : (this.activeName = '全部')
    this.getRolesDraft()
  },
  methods: {
    handleClick(tab, event) {
      this.pageUser = {
        state: '',
        createTime: '',
        messageType: '',
        pageNum: 1,
        pageSize: 10,
        title: ''
      }
      if (tab.name != '全部') {
        this.pageUser.state = this.activeName
      }
      this.getRolesDraft()
    },
    // 分页器切换
    handleSizeChange(pageSize) {
      this.pageUser.pageSize = pageSize
      this.getRolesDraft()
    },
    getRolesDraft(page = 1) {
      this.loading = true
      this.tabelMessage = []
      this.pageUser.pageNum = page
      this.$bus.$emit('getTabelMessage')
      pageUserMessage(this.pageUser).then(res => {
        if (res.success) {
          this.tabelMessage = res.body.content
          this.total = res.body.total
          this.tabelMessage.map(item => {
            item.createTime = this.formatTime(item.createTime)
          })
          this.loading = false
        }
      })
    },

    clickSubmit(messageChoice) {
      this.pageUser.title = messageChoice.title
      this.pageUser.messageType = messageChoice.messageType
      this.pageUser.sarTime = messageChoice.sarTime
      this.pageUser.endTime = messageChoice.endTime
      this.getRolesDraft()
    },
    reRequest() {
      this.getRolesDraft(this.pageUser.pageNum)
    },
    // 点击删除
    deleteItemId(row) {
      this.deleteVisible = true
      this.isSelectID.push(row.userMessageId)
    },
    deleteBatch() {
      deleteBatchMessage(this.isSelectID).then(res => {
        if (res.success) {
          Message({
            message: '删除成功！',
            type: 'success'
          })
          this.deleteVisible = false
          this.getRolesDraft()
        } else {
          this.deleteVisible = false
          Message.error(res.message)
        }
      })
    },

    // 批量删除
    isDeletion() {
      if (this.newsID.length == 0) {
        Message({
          showClose: true,
          message: '请至少勾选一条数据',
          type: 'warning'
        })
      } else {
        this.batchDeletion = true
      }
    },
    batchDeletionList() {
      deleteBatchMessage(this.newsID).then(res => {
        if (res.success) {
          Message({
            message: '删除成功！',
            type: 'success'
          })
          this.batchDeletion = false
          this.newsID = []
          this.getRolesDraft()
        } else {
          this.batchDeletion = false
          Message.error(res.message)
        }
      })
    },

    // 批量已读
    isShowBatchRead() {
      if (this.newsID.length == 0) {
        Message({
          showClose: true,
          message: '请至少勾选一条数据',
          type: 'warning'
        })
      } else {
        this.batchRead = true
      }
    },
    batchReadList() {
      this.loadread = true
      readBatchMessage(this.newsID).then(res => {
        if (res.success) {
          Message({
            message: '已批量已读！',
            type: 'success'
          })
          this.batchRead = false
          this.newsID = []
          this.getRolesDraft()
          this.loadread = false
        } else {
          this.batchRead = false
          Message.error(res.message)
          this.loadread = false
        }
      })
    },

    // 点击查看
    viewingItem(row) {
      if (row.messageType == '公告推送类') {
        this.iscontentcod = true
        this.$refs.contentcod.getContent(row)
      } else if (row.messageType == '消息通知类' || '工单审批类') {
        this.announcements = true
        this.rowItemId = row.userMessageId
        this.$refs.news.getViewSingle(row, this.pageUser)
      }
    },
    // 关闭抽屉
    closeDrawer() {
      pageUserMessage(this.pageUser).then(res => {
        if (res.success) {
          this.tabelMessage = res.body.content
          this.total = res.body.total
          this.tabelMessage.map(item => {
            item.createTime = this.timeCycle(item.createTime)
          })
        }
      })
    },

    // 表格点击全选
    // 选中当前行的数据
    handleSelect(row) {
      this.newsID = []
      if (row.length > 0) {
        row.forEach((value, index) => {
          this.newsID.push(value.userMessageId)
        })
      }
    },
    // 全选
    // 选中背景色
    tableRowClassName({ row }) {
      let color = ''
      for (let item of this.newsID.values()) {
        if (item === row.userMessageId) {
          color = 'table-SelectedRow-bgcolor'
        }
      }
      return color
    },
    //时间转换
    timeCycle(da) {
      if (da != null) {
        var date = new Date(da)
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() + ':'
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return Y + M + D + h + m + s
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cardmargtop {
  margin-top: 25px;
}
.butmargin {
  margin-right: 24px;
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
.drawerTitle {
  display: flex;
  justify-content: space-between;
  margin: 0 5px;
  .colorspan {
    color: #1890ff;
  }
}
.drawerBody {
  margin: 0 50px 0 25px;
  div {
    margin: 7px 0;
  }
}
.drawerfooter {
  margin-top: 24px !important;
}
.bodydepartment {
  margin-right: 15px;
}

.spancolor {
  color: #1890ff;
}

::v-deep .el-dialog__body {
  margin: 0 0 20px 0;
  padding: 0;
  // height: 450px;
}
/deep/ .el-dialog__title {
  font-size: 16px;
  color: #1890ff;
}
.dialogcenter {
  margin: 100px 0;
  text-align: center;
  font-size: 16px;
  color: #000000;
}

.active {
  font-weight: 600;
}
.yuancolor2 {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #f53f3f;
  margin-right: 5px;
}
// 分页器
.paginationtop {
  padding-top: 20px;
}
</style>
