<template>
  <div id="InformationHead">
    <el-tabs v-show="!isShow" v-model="infromationType" @tab-click="handleClick">
      <el-tab-pane label="审批中" name="examine">
        <InformationPans
          @handleCurrenPage="handleCurrenPage"
          @initShareDataPage="initShareDataPage"
          :tabsOptions="tabsOptions"
        />
      </el-tab-pane>
      <el-tab-pane label="正在使用" name="useing">
        <InformationPans
          @handleCurrenPage="handleCurrenPage"
          @initShareDataPage="initShareDataPage"
          :tabsOptions="tabsOptions"
        />
      </el-tab-pane>
      <el-tab-pane label="已释放列表" name="release">
        <InformationPans
          @handleCurrenPage="handleCurrenPage"
          @initShareDataPage="initShareDataPage"
          :tabsOptions="tabsOptions"
        />
      </el-tab-pane>
      <el-tab-pane label="已驳回" name="reject">
        <InformationReject
          @handleCurrenPage="handleCurrenPage"
          @initShareDataPage="initShareDataPage"
          :tabsOptions="tabsOptions"
        />
      </el-tab-pane>
    </el-tabs>
    <el-card class="cardpadmargtop">
      <!-- <InformationTabel v-show="tabsOptions.tabsTitle != 'reject'" :tabsOptions="tabsOptions" /> -->
      <!-- 审批中 -->
      <InformationExamine
        ref="exatablesLoading"
        v-show="tabsOptions.tabsTitle == 'examine'"
        :informationData="informationData"
      />
      <!-- 正在使用 -->
      <InformationUseing
        ref="usetablesLoading"
        v-show="tabsOptions.tabsTitle == 'useing'"
        @initShareDataPage="initShareDataPage"
        :informationData="informationData"
      />
      <!-- 已释放数据 -->
      <InformationRelease
        ref="reltablesLoading"
        v-show="tabsOptions.tabsTitle == 'release'"
        :informationData="informationData"
      />
      <!--  已驳回 -->
      <InformationRejectTabel
        ref="tablesLoading"
        v-show="tabsOptions.tabsTitle == 'reject'"
        :informationData="informationData"
      />
      <div class="pagination-box" v-show="!isShow">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="pageSize"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          background
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getshareDataPage } from '@/api/api'
import InformationRelease from '@views/share/components/InformationRelease'
import InformationExamine from '@views/share/components/InformationExamine'
import InformationUseing from '@views/share/components/InformationUseing'
import InformationPans from '@views/share/components/InformationPans'
import InformationReject from '@views/share/components/InformationReject'
import InformationRejectTabel from '@views/share/components/InformationRejectTabel'
export default {
  name: 'InfromationHead',
  components: {
    InformationPans,
    InformationReject,
    InformationRejectTabel,
    InformationExamine,
    InformationUseing,
    InformationRelease,
  },
  data() {
    return {
      pageSize: [10, 20, 30, 40, 50],
      total: 0,
      currentPage: 1,
      tabsOptions: {
        tabsTitle: 'examine',
        inquireData: {
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
          queryType: 2, //查询类型 1:我的数据 2:审批中 3:正在使用 4:已释放列表 5:共享驳回记录
          rejectDate: '',
          rowStart: 0,
          shareOffDate: '',
          shareOffStatus: '',
          shareType: '',
          sort: 0,
          useAppSystem: '',
          username: '',
        },
      },
      informationData: [],
      infromationType: 'examine',
      type: 0,
      isShow: false,
    }
  },
  activated() {
    // this.$bus.$on('handleReaseData',_=>{
    //   console.log('监听')
    //   // this.initShareDataPage()
    // })
    this.$bus.$on('handleUpdate', (_) => {
      this.initShareDataPage()
    })
    this.$bus.$on('handleHide', (applicationShow) => {
      this.isShow = applicationShow
    })
    this.type = this.$route.query.type
    if (this.type) {
      switch (this.type) {
        case 1:
          this.infromationType = 'examine'
          this.tabsOptions.tabsTitle = this.infromationType
          // this.tabsOptions.tabsTitle = 'examine'
          this.tabsOptions.inquireData.queryType = 2
          this.initShareDataPage()
          break
        case 2:
          this.infromationType = 'useing'
          this.tabsOptions.tabsTitle = this.infromationType
          // this.tabsOptions.tabsTitle = 'useing'
          this.tabsOptions.inquireData.queryType = 3
          this.initShareDataPage()
          break
        case 3:
          this.infromationType = 'release'
          this.tabsOptions.tabsTitle = this.infromationType
          // this.tabsOptions.tabsTitle = 'release'
          this.tabsOptions.inquireData.queryType = 4
          this.initShareDataPage()
          break
      }
    } else {
      this.initShareDataPage()
    }
  },
  beforeDestroy() {
    this.$bus.$off('handleHide')
  },
  mounted() {
    this.isShow = false
    // this.initShareDataPage()
  },
  methods: {
    handleCurrenPage(currentPage) {
      this.currentPage = currentPage
    },
    //初始化查询审批中数据
    initShareDataPage() {
      this.$refs.exatablesLoading.tableLoading = true
      this.$refs.usetablesLoading.tableLoading = true
      this.$refs.reltablesLoading.tableLoading = true
      this.$refs.tablesLoading.tableLoading = true
      getshareDataPage(this.tabsOptions.inquireData).then(async (res) => {
        if (res.success) {
          this.$refs.exatablesLoading.tableLoading = false
          this.$refs.usetablesLoading.tableLoading = false
          this.$refs.reltablesLoading.tableLoading = false
          this.$refs.tablesLoading.tableLoading = false
          this.informationData = await res.body.content
          this.handleEllipsis()
          this.total = res.body.total
          this.informationData.forEach((i) => {
            i.launchDate = this.timeCycle(i.launchDate)
            i.openDate = this.timeCycle(i.openDate)
            i.shareOffDate = this.timeCycle(i.shareOffDate)
            i.rejectDate = this.timeCycle(i.rejectDate)
          })
        } else {
          this.$refs.exatablesLoading.tableLoading = false
          this.$refs.usetablesLoading.tableLoading = false
          this.$refs.reltablesLoading.tableLoading = false
          this.$refs.tablesLoading.tableLoading = false
        }
      })
    },
    // 替换前三位字符为省略号
    handleEllipsis() {
      this.informationData.forEach((v) => {
        v.applyTitleCopy = v.applyTitle.replace(/^.{3}/, '...')
      })
    },
    timeCycle(da) {
      if (da != null) {
        var date = new Date(da)
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        return Y + M + D
      }
    },
    //每页显示几条
    handleSizeChange(pageSizes) {
      this.tabsOptions.inquireData.pageSize = pageSizes
      this.initShareDataPage()
    },
    //分页查询
    handleCurrentChange(page) {
      this.tabsOptions.inquireData.pageNum = page
      this.initShareDataPage()
    },
    handleClick(tab, event) {
      this.tabsOptions.tabsTitle = tab.paneName
      switch (tab.paneName) {
        case 'examine':
          this.tabsOptions.inquireData.queryType = 2 //审批中
          this.tabsOptions.inquireData.pageSize = 10
          this.tabsOptions.inquireData.pageNum = 1
          this.tabsOptions.inquireData.useAppSystem = ''
          this.initShareDataPage()
          break
        case 'useing':
          this.tabsOptions.inquireData.queryType = 3 // 正在使用
          this.tabsOptions.inquireData.pageSize = 10
          this.tabsOptions.inquireData.pageNum = 1
          this.tabsOptions.inquireData.useAppSystem = ''
          this.tabsOptions.inquireData.catalogName = ''
          this.tabsOptions.inquireData.applyTitle = ''
          this.tabsOptions.inquireData.applyDept = ''
          this.tabsOptions.inquireData.shareType = ''
          this.tabsOptions.inquireData.openDate = ''
          this.tabsOptions.inquireData.launchDate = ''
          this.tabsOptions.inquireData.shareOffDate = ''
          this.tabsOptions.inquireData.shareOffStatus = ''
          this.initShareDataPage()
          break
        case 'release':
          this.tabsOptions.inquireData.queryType = 4 // 已释放数据
          this.tabsOptions.inquireData.pageSize = 10
          this.tabsOptions.inquireData.pageNum = 1
          this.tabsOptions.inquireData.useAppSystem = ''
          this.tabsOptions.inquireData.catalogName = ''
          this.tabsOptions.inquireData.applyTitle = ''
          this.tabsOptions.inquireData.applyDept = ''
          this.tabsOptions.inquireData.shareType = ''
          this.tabsOptions.inquireData.openDate = ''
          this.tabsOptions.inquireData.launchDate = ''
          this.tabsOptions.inquireData.shareOffDate = ''
          this.tabsOptions.inquireData.shareOffStatus = ''
          this.initShareDataPage()
          break
        default:
          this.tabsOptions.inquireData.queryType = 5 //驳回
          this.tabsOptions.inquireData.pageSize = 10
          this.tabsOptions.inquireData.pageNum = 1
          this.tabsOptions.inquireData.useAppSystem = ''
          this.tabsOptions.inquireData.catalogName = ''
          this.tabsOptions.inquireData.applyTitle = ''
          this.tabsOptions.inquireData.applyDept = ''
          this.tabsOptions.inquireData.shareType = ''
          this.tabsOptions.inquireData.openDate = ''
          this.tabsOptions.inquireData.launchDate = ''
          this.tabsOptions.inquireData.shareOffDate = ''
          this.tabsOptions.inquireData.shareOffStatus = ''
          this.initShareDataPage()
      }
    },
  },
}
</script>

<style lang="less" scoped>
#InformationHead {
  margin-top: 24px;
  background: #fff;
  .items {
    width: 200px;
    text-align: center;
  }
  /deep/.el-tabs__nav-scroll {
    height: 60px;
    padding-left: 32px;
    line-height: 58px;
  }
  /deep/.el-tabs__nav-wrap::after {
    background-color: #1890ff !important;
  }
  /deep/.el-tabs__content {
    // padding: 0 32px;
    padding-left: 32px;
  }
  .cardpadmargtop {
    margin-top: 24px;
    width: 100%;
  }
  .pagination-box {
    text-align: end;
    padding: 32px;
    background: #fff;
  }
}
</style>
