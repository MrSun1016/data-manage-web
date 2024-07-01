<template>
  <div class="targer-dev-page">
    <!-- 左侧组织树 -->
    <business-tree
      v-if="treeData.length > 0"
      defaultValue="all"
      :treeData="treeData"
      :isRMenu="true"
      @clickTree="clickTree"
      @addIndex="addIndex"
      :isEditTree="true"
      @changeTreeData="changeTree"
    />
    <div style="width: 90%">
      <a-card :bordered="false">
        <!-- 操作按钮区域 -->
        <div class="table-operator">
          <a-button @click="handleAdd(treeData)" type="primary" icon="plus">新增</a-button>
          <a-input-search
            v-model="indexName"
            placeholder="请输入"
            style="width: 200px; float: right"
            @blur="search"
            @pressEnter="search"
          />
          <br /><br />
        </div>

        <!-- table区域-begin -->
        <div>
          <a-table
            rowKey="id"
            :columns="columns"
            size="middle"
            :pagination="false"
            :dataSource="dataSource"
            :loading="loading"
          >
            <span slot="action" slot-scope="text, record">
              <a @click="showdetail(record)">详情</a>
              <span v-if="record.enables == '0' || record.enables == ''">
                <a-divider type="vertical" />
                <a @click="handleEdit(record, treeData)">编辑</a>
                <a-divider type="vertical" />
                <a @click="Submit(record)">提交</a>
                <a-divider type="vertical" />
                <a style="color: red" @click="Del(record)">删除</a>
              </span>
            </span>
          </a-table>
          <pagination :paging="page" @pageChange="pageChange" style="padding: 25px 20px 10px 40px" />
        </div>
        <!-- table区域-end -->
        <add-target ref="modalForm" @ok="modalFormOk" @queryCondition="gettargetpageAPI"></add-target>
        <a-drawer :title="'详情'" :width="700" @close="handleCanceldetail" :visible="detailvisible">
          <detail-target :detailform="detailform" />
        </a-drawer>
      </a-card>
    </div>
  </div>
</template>

<script>
import addTarget from './components/addTarget'
import detailTarget from '@/components/detailTarget'
import {
  getdomaintree,
  gettargetpage,
  savetargeinfo,
  updatetargeinfo,
  deletetargeinfo,
  savedomain,
  updatedomain,
  deletedomain,
} from '@/api/api'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import JEllipsis from '@/components/jeecg/JEllipsis'
import BusinessTree from '@/components/BusinessTree'
import Pagination from '@/components/Pagination'

const columns = [
  {
    title: '指标名称',
    width: '10%',
    dataIndex: 'indexName',
    key: 'indexName',
  },
  {
    title: '指标类型',
    width: '10%',
    dataIndex: 'indexType',
    key: 'indexType',
    scopedSlots: { customRender: 'indexType' },
    customRender: (text) => {
      if (text == '0') {
        text = '单一指标'
      } else {
        text = '复合指标'
      }
      return text
    },
  },
  {
    title: '创建人',
    width: '10%',
    dataIndex: 'createBy',
    key: 'createBy',
    scopedSlots: { customRender: 'createBy' },
  },
  {
    title: '状态',
    width: '10%',
    dataIndex: 'enables', // 0禁用 1启用
    key: 'enables',
    customRender: (text) => {
      if (text == '1') {
        text = '已提交'
      } else {
        text = '未提交'
      }
      return text
    },
  },
  {
    title: '操作',
    width: '20%',
    dataIndex: 'action',
    // fixed: 'right',
    scopedSlots: { customRender: 'action' },
    align: 'center',
  },
]
export default {
  name: 'targetManage',
  mixins: [JeecgListMixin],
  components: {
    JEllipsis,
    addTarget,
    detailTarget,
    BusinessTree,
    Pagination,
  },
  data() {
    return {
      indexName: '',
      page: {
        current: 1,
        total: 0,
        size: 20,
        sizeOptions: ['20', '30', '40'],
      },
      columns: columns,
      loading: false,
      detailvisible: false,
      detailform: {},
      selectdomainid: '', //选中业务域id
      treeData: [],
      // treeData: [
      //   {
      //     domainName: '商管',
      //     domainId: 'sg',
      //     children: [
      //       {
      //         domainName: '财务',
      //         domainId: 'cw',
      //       },
      //       {
      //         domainName: '运营',
      //         domainId: 'yy',
      //       },
      //       {
      //         domainName: '管理',
      //         domainId: 'gl',
      //       },
      //       {
      //         domainName: '拓展',
      //         domainId: 'tz',
      //       },
      //     ],
      //   },
      //   {
      //     domainName: '房开',
      //     domainId: 'fk',
      //   },
      //   {
      //     domainName: '物业',
      //     domainId: 'wy',
      //   },
      // ],
    }
  },
  created() {
    this.gettreedataAPI()
    this.gettargetpageAPI()
    this.loadData()
  },
  methods: {
    async gettreedataAPI() {
      let res = await getdomaintree()
      if (res.success) {
        this.treeData = res.body
      }
    },
    async gettargetpageAPI() {
      var obj = {
        pageNum: this.page.current,
        pageSize: this.page.size,
      }
      if (this.selectdomainid != 'all' && this.selectdomainid != '') {
        obj.domainId = this.selectdomainid
      }
      if (this.indexName != '') {
        obj.indexName = this.indexName
      }
      this.loading=true
      let res = await gettargetpage(obj)
      if (res.success) {
        this.dataSource = res.body.content
        this.page.total = res.body.total
      }
       this.loading=false
    },
    loadData() {
      // this.dataSource = [
      //   {
      //     bsFormula: '11',
      //     createBy: '-1',
      //     createTime: '2021-09-18T01:18:27',
      //     domainId: 1,
      //     id: 1,
      //     indexCode: '22',
      //     indexName: '测试指标',
      //     indexType: '0',
      //     indexUnit: '',
      //     relIndexCode: '',
      //     updateBy: '-1',
      //     updateTime: '2021-09-18T01:18:27',
      //     enables: '0',
      //     updateFrequency: '年',
      //   },
      //   {
      //     bsFormula: '123132',
      //     createBy: '-1',
      //     createTime: '2021-09-18T02:04:24',
      //     domainId: 1,
      //     id: 2,
      //     indexCode: '40289f0c7bf6a5c5017bf6a5c5d60000',
      //     indexName: 'test1',
      //     indexType: '1',
      //     indexUnit: '万',
      //     relIndexCode: '1',
      //     updateBy: '-1',
      //     updateTime: '2021-09-18T02:04:24',
      //     enables: '1',
      //     updateFrequency: '周',
      //   },
      // ]
    },
    search() {
      this.gettargetpageAPI()
    },
    Submit(record) {
      let that = this
      that.$confirm({
        title: '提交确认',
        content: '您确认要提交吗？一旦提交不能撤销?',
        onOk: function () {
          record.enables = '1'
          updatetargeinfo(record)
            .then((res) => {
              if (res.success) {
                that.$message.success('已提交')
                that.gettargetlistAPI()
              } else {
                //that.$message.error(res.header.message)
              }
            })
            .catch((rej) => {
              //that.$message.warning(rej)
            })
        },
      })
    },
    Del(record) {
      let that = this
      that.$confirm({
        title: '删除确认',
        content: '您确认要删除?',
        onOk: function () {
          deletetargeinfo({ assetIndexId: record.id })
            .then((res) => {
              if (res.success) {
                that.$message.success('已删除')
                that.gettargetpageAPI()
              } else {
                //that.$message.error(res.header.message)
              }
            })
            .catch((rej) => {
              // that.$message.warning(rej)
            })
        },
      })
    },
    handleCanceldetail() {
      this.detailvisible = false
    },
    showdetail(record) {
      this.detailform = record
      if (!Array.isArray(this.detailform.relIndexCode) && this.detailform.relIndexCode != undefined) {
        var str = this.detailform.relIndexCode.split(',')
        this.detailform.relIndexCode = str
      }

      this.detailvisible = true
    },
    clickTree(data) {
      console.log(data)
      this.selectdomainid = data.domainId

      this.gettargetpageAPI()
    },
    addIndex(data) {
      this.selectdomainid = data.domainId
    },
    // 树结构修改
    changeTree(type, data) {
      console.log(type, data)
      if (type == 'add') {
        if (data.level > 0) {
          data.parentId = data.id
          data.parentIds = data.parentIds + ',' + data.id
        }
        let params = {
          domainName: data.domainName,
          level: data.level + 1,
          parentId: data.parentId,
          parentIds: data.parentIds,
        }
        savedomain(params)
          .then((res) => {
            if (res.success) {
              this.gettreedataAPI()
            }
          })
          .catch((rej) => {})
      } else if (type == 'edit') {
        let params = {
          domainId: data.domainId,
          domainName: data.domainName,
          level: data.level,
          parentId: data.parentId,
          parentIds: data.parentIds,
        }
        updatedomain(params)
          .then((res) => {
            if (res.success) {
              this.gettreedataAPI()
            }
          })
          .catch((rej) => {})
      } else if (type == 'deleted') {
        deletedomain({ assetDomainId: data.domainId })
          .then((res) => {
            if (res.success) {
              this.gettreedataAPI()
            }else{
              this.$message.error(res.header.message) 
            }
          })
          .catch((rej) => {})
      }
    },
    handleAdd(treeData) {
      this.detailform = {
        indexType: '0',
        domainId: this.selectdomainid,
        //relIndexCode: '',
      }
      this.$refs.modalForm.add(this.detailform, treeData)
      this.$refs.modalForm.title = '新增'
      this.$refs.modalForm.disableSubmit = false
    },
    pageChange(current, size) {
      this.page.current = current
      this.page.size = size
      this.gettargetpageAPI()
    },
  },
}
</script>


<style lang="less" scoped>
.targer-dev-page {
  display: flex;
  background-color: #fff;
  padding: 10px 20px;
  > div:nth-child(1) {
    min-width: 180px;
  }
  .page-content {
    border: 2px solid #f2f2f2;
    padding: 10px;
    max-height: calc(100vh - 110px);
    overflow-y: auto;
  }
}
</style>