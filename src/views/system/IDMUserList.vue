<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper" style="border-bottom: 1px solid rgb(232 232 232)">
      <!-- 搜索区域 -->
      <a-form layout="inline" :form="queryParam">
        <a-row :gutter="24">
          <a-col :md="8" :sm="10">
            <a-form-item label="状态" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
              <a-select v-model="queryParam.userStatus" placeholder="请选择状态">
                <a-select-option value="1"> 启用 </a-select-option>
                <a-select-option value="0"> 停用 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="10">
            <a-form-item label="账号" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
              <a-input placeholder="请输入账号查询" v-model="queryParam.userName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="10">
            <a-form-item label="姓名" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
              <a-input placeholder="请输入姓名查询" v-model="queryParam.nickName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="10">
            <a-form-item label="手机号" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18, offset: 1 }">
              <a-input placeholder="请输入手机号查询" v-model="queryParam.mobile"></a-input>
            </a-form-item>
          </a-col>
          <span style="float: right; overflow: hidden" class="table-page-search-submitButtons">
            <a-col :md="6" :sm="24">
              <a-button type="primary" @click="searchQuery">查询</a-button>
              <a-button style="margin-left: 8px" @click="searchReset">重置</a-button>
            </a-col>
          </span>
        </a-row>
      </a-form>
    </div>
    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :pagination="false"
        :dataSource="dataSource"
        :loading="loading"
      >
        <template slot="avatarslot" slot-scope="text, record">
          <div class="anty-img-wrap">
            <a-avatar shape="square" :src="getAvatarView(record.avatar)" icon="user" />
          </div>
        </template>
        <span slot="status" slot-scope="text">
          {{ statusData[text] }}
        </span>
        <span slot="sex" slot-scope="text">
          {{ sexData[text] }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="authorization(record)">授权</a>
        </span>
      </a-table>
      <pagination :paging="page" @pageChange="pageChange" style="padding: 25px 20px 10px 40px" />
    </div>
  </a-card>
</template>

<script>
import { getIDMUserList,getAuthorization, frozenBatch } from '@/api/api'
import Pagination from '@/components/Pagination'
export default {
  name: 'IDMUserList',
  components: {
    Pagination,
  },
  data() {
    return {
      dataSource: [],
      page: {
        current: 1,
        total: 0,
        size: 20,
        sizeOptions: ['20', '30', '40'],
      },
      loading: false,
      queryParam: {},
      statusData: { '-1': '退休', 0: '未启动', 1: '正常', 2: '冻结' },
      sexData: { 1: '男', 2: '女' },
      columns: [
        {
          title: '用户账号',
          align: 'center',
          dataIndex: 'userName',
          width: 120,
          sorter: true,
        },
        {
          title: '用户姓名',
          align: 'center',
          width: 100,
          dataIndex: 'nickName',
        },
        {
          title: '性别',
          align: 'center',
          width: 80,
          dataIndex: 'gender',
          scopedSlots: { customRender: 'gender' },
          customRender: (text) => {
            if (text == '1') {
              text = '男'
            } else if (text == '2') {
              text = '女'
            }
            return text
          },
        },
        {
          title: '手机号码',
          align: 'center',
          width: 100,
          dataIndex: 'mobile',
        },
        {
          title: '部门',
          align: 'center',
          width: 180,
          dataIndex: 'dept',
        },
        {
          title: '状态',
          align: 'center',
          width: 80,
          dataIndex: 'userStatus',
          scopedSlots: { customRender: 'userStatus' },
          customRender: (text) => {
            if (text == '1') {
              text = '启用'
            } else {
              text = '停用'
            }
            return text
          },
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center',
          width: 170,
        },
      ],
    }
  },
  created() {
    this.getIDMUserListAPI()
  },
  methods: {
    async getIDMUserListAPI() {
      var obj = {
        pageNum: this.page.current,
        pageSize: this.page.size,
      }
      if (this.queryParam.userStatus) {
        obj.userStatus = this.queryParam.userStatus
      }
      if (this.queryParam.userName) {
        obj.userName = this.queryParam.userName
      }
      if (this.queryParam.mobile) {
        obj.mobile = this.queryParam.mobile
      }
      if (this.queryParam.nickName) {
        obj.nickName = this.queryParam.nickName
      }
      this.loading = true
      let res = await getIDMUserList(obj)
      if (res.success) {
        this.dataSource = res.body.content
        this.page.total = res.body.total
      }
      this.loading = false
    },
    authorization(record) {
      let that = this
      that.loading = true
      getAuthorization(record.id).then((res) => {
        if (res.success) {
           that.loading =false
          that.$message.success(res.header.message)
          that.loadData()
        } else {
          that.$message.error(res.header.message)
          that.loading =false
        }
      })
    },
    searchQuery() {
      this.getIDMUserListAPI()
    },
    searchReset() {
      this.queryParam = {}
      this.getIDMUserListAPI()
    },
    pageChange(current, size) {
      this.page.current = current
      this.page.size = size
      this.getIDMUserListAPI()
    },
  },
}
</script>
<style lang="less" scoped>
.page-content {
  border: 2px solid #f2f2f2;
  padding: 10px;
  max-height: calc(100vh - 110px);
  overflow-y: auto;
}
</style>