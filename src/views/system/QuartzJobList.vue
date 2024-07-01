<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form-model layout="inline" :model="queryParam" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="10">
            <a-form-model-item label="任务类名" prop="jobClassName">
              <a-input placeholder="请输入任务类名" v-model="queryParam.jobClassName"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :md="6" :sm="10">
            <a-form-model-item label="任务状态" prop="status">
              <a-select style="width: 220px" v-model="queryParam.status" placeholder="请选择状态">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="0">正常</a-select-option>
                <a-select-option value="-1">停止</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>

          <a-col :md="6" :sm="10">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form-model>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('定时任务信息')">导出</a-button>
      <a-upload
        name="file"
        :showUploadList="false"
        :multiple="false"
        :headers="tokenHeader"
        :action="importExcelUrl"
        @change="handleImportExcel"
      >
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete" />删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a
        >项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        @change="handleTableChange"
      >
        <!-- 字符串超长截取省略号显示-->
        <span slot="jobClassName" slot-scope="text">
          <j-ellipsis :value="text" :length="15" />
        </span>
        <span slot="description" slot-scope="text">
          <j-ellipsis :value="text" :length="20" />
        </span>
        <span slot="parameterRender" slot-scope="text">
          <j-ellipsis :value="text" :length="20" />
        </span>

        <span slot="action" slot-scope="text, record">
          <a @click="resumeJob(record)" v-if="record.status == -1">启动</a>
          <a @click="pauseJob(record)" v-if="record.status == 0">停止</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item><a @click="executeImmediately(record)">立即执行</a></a-menu-item>
              <a-menu-item><a @click="handleEdit(record)">编辑</a></a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

        <!-- 状态渲染模板 -->
        <template slot="customRenderStatus" slot-scope="status">
          <a-tag v-if="status == 0" color="green">已启动</a-tag>
          <a-tag v-if="status == -1" color="orange">已暂停</a-tag>
        </template>
        <!-- 运行状态渲染模板 -->
        <template slot="customRenderRunningStatus" slot-scope="runningStatus">
          <a-tag v-if="runningStatus == 0" color="green">运行中</a-tag>
          <a-tag v-if="runningStatus == -1" color="orange">挂起</a-tag>
        </template>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <quartzJob-modal ref="modalForm" @ok="modalFormOk"></quartzJob-modal>
  </a-card>
</template>

<script>
import QuartzJobModal from './modules/QuartzJobModal'
import { getAction } from '@/api/manage'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JEllipsis from '@/components/jeecg/JEllipsis'

export default {
  name: 'QuartzJobList',
  mixins: [JeecgListMixin],
  components: {
    QuartzJobModal,
    JEllipsis,
  },
  data() {
    return {
      description: '定时任务在线管理',
      refreshInterval: null,
      // 查询条件
      queryParam: {},
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          },
        },
        {
          title: '任务类名',
          align: 'center',
          dataIndex: 'jobClassName',
          sorter: true,
          width: 150,
          scopedSlots: { customRender: 'jobClassName' },
          /*            customRender:function (text) {
              return "*"+text.substring(9,text.length);
            }*/
        },
        {
          title: 'cron表达式',
          align: 'center',
          dataIndex: 'cronExpression',
        },
        {
          title: '参数',
          align: 'center',
          width: 150,
          dataIndex: 'parameter',
          scopedSlots: { customRender: 'parameterRender' },
        },
        {
          title: '描述',
          align: 'center',
          width: 250,
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' },
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'status',
          scopedSlots: { customRender: 'customRenderStatus' },
          filterMultiple: false,
          filters: [
            { text: '已启动', value: '0' },
            { text: '已暂停', value: '-1' },
          ],
        },
        {
          title: '运行状态',
          align: 'center',
          dataIndex: 'runningStatus',
          scopedSlots: { customRender: 'customRenderRunningStatus' },
          filterMultiple: false,
          filters: [
            { text: '运行中', value: '0' },
            { text: '挂起', value: '-1' },
          ],
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          width: 180,
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        list: '/sys/quartzJob/list',
        delete: '/sys/quartzJob/delete',
        deleteBatch: '/sys/quartzJob/deleteBatch',
        pause: '/sys/quartzJob/pause',
        resume: '/sys/quartzJob/resume',
        exportXlsUrl: 'sys/quartzJob/exportXls',
        importExcelUrl: 'sys/quartzJob/importExcel',
        execute: 'sys/quartzJob/execute',
        runningStatus: '/sys/quartzJob/runningStatus',
      },
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },

  methods: {
    //筛选需要重写handleTableChange
    handleTableChange(pagination, filters, sorter) {
      console.log(typeof filters.status, '-------')
      //分页、排序、筛选变化时触发
      //TODO 筛选
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      //这种筛选方式只支持单选
      if (filters.status === undefined) this.filters.status = filters.status
      else if (typeof filters.status === 'object') this.filters.status = filters.status[0]
      else this.filters.status = filters.status

      if (filters.runningStatus === undefined) this.filters.runningStatus = filters.runningStatus
      else if (typeof filters.runningStatus === 'object') this.filters.runningStatus = filters.runningStatus[0]
      else this.filters.runningStatus = filters.runningStatus

      // this.filters.status = filters.status;
      this.ipagination = pagination
      this.loadData()
    },
    pauseJob: function (record) {
      var that = this
      //暂停定时任务
      this.$confirm({
        title: '确认暂停',
        content: '是否暂停选中任务?',
        onOk: function () {
          getAction(that.url.pause, { jobClassName: record.jobClassName }).then((res) => {
            if (res.success) {
              that.$message.success(res.message)
              that.loadData()
              that.onClearSelected()
            } else {
              that.$message.warning(res.message)
            }
          })
        },
      })
    },
    resumeJob: function (record) {
      var that = this
      //恢复定时任务
      this.$confirm({
        title: '确认启动',
        content: '是否启动选中任务?',
        onOk: function () {
          console.log(record)
          getAction(that.url.resume, { jobClassName: record.jobClassName }).then((res) => {
            if (res.success) {
              that.$message.success(res.message)
              that.loadData()
              that.onClearSelected()
            } else {
              that.$message.warning(res.message)
            }
          })
        },
      })
    },
    executeImmediately(record) {
      var that = this
      //立即执行定时任务
      this.$confirm({
        title: '确认提示',
        content: '是否立即执行任务?',
        onOk: function () {
          getAction(that.url.execute, { id: record.id }).then((res) => {
            if (res.success) {
              that.$message.success(res.message)
              that.loadData()
              that.onClearSelected()
            } else {
              that.$message.warning(res.message)
            }
          })
        },
      })
    },
    updateColumnData(id, column, newValue) {
      getAction(this.url.runningStatus, null).then((res) => {
        if (res.success) {
          for (var i = 0; i < res.result.length; i++) {
            id = res.result[i].id;
            column = 'runningStatus';
            newValue = res.result[i].runningStatus;
            
            const rowIndex = this.dataSource.findIndex((item) => item.id === id);
            if (rowIndex !== -1) {
              this.dataSource[rowIndex][column] = newValue;
            }

          }
        }
      })
    },
    startDataRefresh() {
      // 设置定时器每隔一定时间调用searchQuery方法
      this.refreshInterval = setInterval(this.updateColumnData, 3000); // 每3秒刷新一次
    },
    stopDataRefresh() {
      // 清除定时器
      if (this.refreshInterval) {
        clearInterval(this.refreshInterval);
      }
    },
  },
  created() {
    this.startDataRefresh();
  },
  beforeDestroy() {
    this.stopDataRefresh();
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>