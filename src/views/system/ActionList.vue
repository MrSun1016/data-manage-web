<template>
  <div>
    <a-card :bordered="false">
      <!-- 查询区域 -->

      <div class="table-page-search-wrapper">
        <el-form :inline="true" @keyup.enter.native="searchQuery">
          <div class="divffromflex">
            <el-form-item label="操作人">
              <a-input placeholder="请输入搜索关键词" v-model="queryParam.username"></a-input>
            </el-form-item>

            <el-form-item label="操作时间">
              <el-date-picker
                size="small"
                v-model="datepicker"
                :default-time="['00:00:00', '23:59:59']"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                class="datawei"
                @change="onDateChange"
              >
              </el-date-picker>
            </el-form-item>

            <!-- <a-form-item label="操作类型" style="left: 10px">
              <j-dict-select-tag
                style="width: 230px"
                v-model="queryParam.operateType"
                placeholder="请选择操作类型"
                dictCode="operate_type"
              />
            </a-form-item> -->
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 10px">重置</a-button>
            </span>
          </div>
          <!-- <div class="fromflexrig"> -->
          <!-- </div> -->
        </el-form>
      </div>
    </a-card>
    <!-- table区域-begin -->
    <a-card class="acardmargin">
      <!-- <a-table
        ref="table"
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <div v-show="queryParam.logType == 2" slot="expandedRowRender" slot-scope="record" style="margin: 0">
          <div style="margin-bottom: 5px">
            <a-badge status="success" style="vertical-align: middle;" /><span style="vertical-align: middle;"
              >请求方法:{{ record.method }}</span
            >
          </div>
          <div>
            <a-badge status="processing" style="vertical-align: middle;" /><span style="vertical-align: middle;"
              >请求参数:{{ record.requestParam }}</span
            >
          </div>
        </div> -->
      <!-- 字符串超长截取省略号显示-->
      <!-- <span slot="logContent" slot-scope="text">
          <j-ellipsis :value="text" :length="40" />
        </span>
      </a-table> -->
      <!-- table区域-end -->

      <!-- :header-cell-style="{
          background: '#E6F7FF',
          color: '#333333',
          fontSize: '14px'
        }" -->
      <el-table
        :header-cell-style="{
          background: '#FAFAFA',
          fontWeight: '400',
          color: '#333333',
          fontSize: '14px'
        }"
        border
        stripe
        v-loading="loading"
        :data="tabData"
        style="width: 100%"
        @selection-change="handleSelect"
        :row-class-name="tableRowClassName"
      >
        <!-- <el-table-column type="selection" align="center" min-width="8%"> </el-table-column> -->
        <el-table-column prop="username" label="用户名" min-width="12%"> </el-table-column>
        <el-table-column prop="departName" label="部门" min-width="15%"> </el-table-column>
        <el-table-column prop="phone" label="手机号" min-width="12%"> </el-table-column>
        <el-table-column prop="operationPage" label="操作页面" min-width="21%"> </el-table-column>
        <el-table-column prop="logContent" label="操作摘要" min-width="19%"> 
           <template slot-scope="scope">
              <span v-if="scope.row.logContent && scope.row.logContent.length > 10">
                <el-popover
                    placement="top-start"
                    title=""
                    trigger="hover"
                    width="300"
                    height="400"
                    popper-class="workorder-logContent"
                >
                    <div>{{ scope.row.logContent }}</div>
                    <span slot="reference">
                      {{ scope.row.logContent.substr(0,18) + '...' }}
                    </span>
                </el-popover>
              </span>
            <span v-else>{{ scope.row.logContent }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="操作日期" min-width="13%"> </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <el-pagination
        class="paginationtop"
        background
        @size-change="handleSize"
        @current-change="getRolesTable"
        :current-page="queryParam.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryParam.pageSize"
        :total="total"
        :pager-count="5"
        layout="->,total, prev, pager, next, sizes, jumper"
      >
      </el-pagination>
    </a-card>
  </div>
</template>

<script>
import { getLogList } from '@/api/api'
import { filterObj } from '@/utils/util'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JEllipsis from '@/components/jeecg/JEllipsis'
import { Message } from 'element-ui'
export default {
  name: 'LogList',
  mixins: [JeecgListMixin],
  components: {
    JEllipsis
  },
  data() {
    return {
      description: '这是日志管理页面',
      datepicker: [],
      // 查询条件
      queryParam: {
        pageNum: 1,
        pageSize: 10,
        startDate: '',
        endDate: '',
        username: ''
      },

      total: 0,
      tabData: [],
      loading: true,
      selectTableID: [],
      tabKey: '2',
      // 表头
      // columns: [
      //   {
      //     title: '#',
      //     dataIndex: '',
      //     key: 'rowIndex',
      //     align: 'center',
      //     customRender: function(t, r, index) {
      //       return parseInt(index) + 1
      //     }
      //   },

      //   {
      //     title: '用户名',
      //     dataIndex: 'userid',
      //     align: 'center',
      //     sorter: true
      //   },
      //   {
      //     title: '部门',
      //     dataIndex: 'username',
      //     align: 'center',
      //     sorter: true
      //   },
      //   // {
      //   //   title: 'IP',
      //   //   dataIndex: 'ip',
      //   //   align: 'center',
      //   //   sorter: true
      //   // },

      //   {
      //     title: '手机号',
      //     dataIndex: 'logType_dictText',
      //     /*customRender:function (text) {
      //         if(text==1){
      //           return "登录日志";
      //         }else if(text==2){
      //           return "操作日志";
      //         }else{
      //           return text;
      //         }
      //       },*/
      //     align: 'center'
      //   },
      //   {
      //     title: '操作页面',
      //     dataIndex: 'costTime',
      //     align: 'center',
      //     sorter: true
      //   },
      //   {
      //     title: '日志内容',
      //     align: 'left',
      //     dataIndex: 'logContent',
      //     scopedSlots: { customRender: 'logContent' },
      //     sorter: true
      //   },
      //   {
      //     title: '创建时间',
      //     dataIndex: 'createTime',
      //     align: 'center',
      //     sorter: true
      //   }
      // ],
      // labelCol: {
      //   xs: { span: 1 },
      //   sm: { span: 2 }
      // },
      // wrapperCol: {
      //   xs: { span: 10 },
      //   sm: { span: 16 }
      // },
      url: {
        list: '/sys/log/list'
      }
    }
  },
  created() {
    this.getRolesTable()
  },
  methods: {
    getRolesTable(page = 1) {
      this.loading = true
      this.queryParam.pageNum = page

      getLogList(this.queryParam).then(res => {
        if (res.success) {
          this.tabData = res.body.content
          this.total = res.body.total
          this.tabData.map(item => {
            item.createTime = this.formatTime(item.createTime)
          })
          this.loading = false
        } else {
          Message.error(res.header.message)
        }
      })
    },
    handleSize(pageSize) {
      this.queryParam.pageSize = pageSize
      this.getRolesTable()
      console.log(pageNum)
    },
    searchQuery() {
      this.getRolesTable()
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
    // getQueryParams() {
    //   var param = Object.assign({}, this.queryParam, this.isorter)
    //   param.field = this.getQueryField()
    //   param.pageNo = this.ipagination.current
    //   param.pageSize = this.ipagination.pageSize
    //   delete param.createTimeRange // 时间参数不传递后台
    //   if (this.superQueryParams) {
    //     param['superQueryParams'] = encodeURI(this.superQueryParams)
    //     param['superQueryMatchType'] = this.superQueryMatchType
    //   }
    //   return filterObj(param)
    // },

    // 重置
    searchReset() {
      var that = this
      that.queryParam = {
        pageNum: 1,
        pageSize: 10,
        startDate: '',
        endDate: '',
        username: ''
      } //清空查询区域参数
      that.datepicker = []
      that.loadData(this.ipagination.current)
    },
    // 日志类型
    // callback(key) {
    //   // 动态添加操作类型列
    //   if (key == 2) {
    //     this.tabKey = '2'
    //     this.columns.splice(7, 0, this.operateColumn)
    //   } else if (this.columns.length == 9) {
    //     this.tabKey = '1'
    //     this.columns.splice(7, 1)
    //   }

    //   let that = this
    //   that.queryParam.logType = key
    //   that.loadData()
    // },
    onDateChange: function(value) {
      console.log(value)
      if (value === null) {
        this.queryParam.startDate = ''
        this.queryParam.endDate = ''
      } else {
        this.queryParam.startDate = value[0]
        this.queryParam.endDate = value[1]
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@assets/less/common.less';
.divffromflex {
  display: flex;
  justify-content: space-between;
}
.fromflexrig {
  display: flex;
  justify-content: flex-end;
  margin: 20px 15px 20px 0;
}
.acardmargin {
  margin-top: 24px;
  width: 100%;
}
.datawei {
  width: 280px;
}
/deep/.el-range-separator {
  margin: 0 15px 0 0;
}

.workorder-logContent {
    background-color: #000;
    color: #ffffff;
    border-color: #000;
    // 想要显示全部，下面就不用写了
    padding-bottom: 4px !important;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 15;
    -webkit-box-orient: vertical;
  }
</style>
