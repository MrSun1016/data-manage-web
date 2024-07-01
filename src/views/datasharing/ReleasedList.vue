<template>
  <div id="releasedlist">
    <el-card class="box-card" v-show="!isshowHaredetails">
      <el-form
        :model="tabsOptions.inquireData"
        label-position="left"
        @keyup.enter.native="onInquire"
        label-width="120px"
        inline
        class="examine-form"
      >
        <div class="first" style="display: flex; justify-content: space-between">
          <el-form-item label="使用应用系统：" style="width: 330px">
            <el-select
              ref="loanStatusSelect"
              @keydown.enter.native="disableVisible"
              class="items"
              v-model="tabsOptions.inquireData.useAppSystem"
              size="small"
              clearable
              placeholder="请选择"
            >
              <el-option v-for="item in sourceList" :key="item.id" :label="item.appName" :value="item.appName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据目录：" style="width: 330px">
            <el-input
              class="items"
              v-model="tabsOptions.inquireData.catalogName"
              size="small"
              clearable
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="申请标题：" style="width: 330px">
            <el-input
              class="items"
              v-model="tabsOptions.inquireData.applyTitle"
              size="small"
              clearable
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </div>
        <div class="second" style="display: flex; justify-content: space-between">
          <el-form-item label="数源部门：" style="width: 330px">
            <el-select
              ref="applyDept"
              @keydown.enter.native="disableVisible"
              clearable
              filterable
              class="items"
              v-model="tabsOptions.inquireData.applyDept"
              size="small"
              placeholder="请选择"
            >
              <el-option
                v-for="institutionItem in institution"
                :key="institutionItem.id"
                :label="institutionItem.nodeName"
                :value="institutionItem.nodeCode"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据类型：" style="width: 330px">
            <el-select
              ref="shareType"
              @keydown.enter.native="disableVisible"
              class="items"
              v-model="tabsOptions.inquireData.shareType"
              clearable
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in datefromList.shareType"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据开通时间：" style="width: 330px">
            <el-date-picker
              @change="onInquire"
              v-model="tabsOptions.inquireData.openDate"
              class="item-picker"
              type="date"
              placeholder="选择日期"
              size="small"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <div style="display: flex; justify-content: space-between">
          <el-form-item label="数据释放时间：">
            <el-date-picker
              @change="onInquire"
              v-model="tabsOptions.inquireData.shareOffDate"
              value-format="yyyy-MM-dd"
              class="item-picker"
              type="date"
              placeholder="选择日期"
              size="small"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="释放状态：">
            <el-select
              ref="shareOffStatus"
              @keydown.enter.native="disableVisible"
              class="items"
              v-model="tabsOptions.inquireData.shareOffStatus"
              size="small"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in datefromList.releaseType"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            style="width: 330px"
            :class="tabsOptions.tabsTitle == 'release' ? 'release-Name' : 'examine-useing-name'"
          >
            <el-button size="small" type="primary" @click="onInquire">查询</el-button>
            <el-button size="small" @click="onReset">重置</el-button>
          </el-form-item>
        </div>
        <!-- :span="tabsOptions.tabsTitle == 'examine' ? 24 : tabsOptions.tabsTitle == 'useing' ? 24 : 8" -->
      </el-form>
    </el-card>
    <div :class="isshowHaredetails ? 'trueCss' : 'falseCss'" class="box-card" style="margin-top: 24px">
      <InformationRelease ref="exatablesLoading" @handleShow="handleShow" :informationData="informationData" />
      <div class="pagination-box" v-show="!isshowHaredetails">
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
    </div>
  </div>
</template>
      
      <script>
import InformationRelease from '@views/share/components/InformationRelease'
import { mapState } from 'vuex'
import { queryAppName, mechanismTree, getshareDataPage } from '@/api/api'
export default {
  name: 'releasedlist',
  components: { InformationRelease },
  data() {
    return {
      isshowHaredetails: false,
      pageSize: [10, 20, 30, 40, 50],
      total: 0,
      currentPage: 1,
      informationData: [],
      tabsOptions: {
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
          queryType: 4, //查询类型 1:我的数据 2:审批中 3:正在使用 4:已释放列表 5:共享驳回记录
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
      dateFromList: {
        //使用应用系统
        useAppSystem: 'source_system',
        //数源部门
        applyDept: 'source_unit',
        //释放状态
        releaseType: 'share_data_release_status',
        //数据类型
        shareType: 'share_data_type',
      },
      // 使用应用系统
      sourceList: [],
      institution: [],
      // visible:true,
    }
  },
  mounted() {
    this.fetchQueryAppName()
    this.fetchMechanismTreet()
    this.initShareDataPage()
    this.dateFrom()
  },
  activated() {
    this.tabsOptions.inquireData.applyDept = this.$route.query.applyDept
    this.getRolesDraft()
  },
  methods: {
    handleShow(val) {
      this.isshowHaredetails = val
    },
    //分页查询
    handleCurrentChange(page) {
      this.tabsOptions.inquireData.pageNum = page
      this.initShareDataPage()
    },
    //每页显示几条
    handleSizeChange(pageSizes) {
      this.tabsOptions.inquireData.pageSize = pageSizes
      this.initShareDataPage()
    },
    initShareDataPage() {
      this.$refs.exatablesLoading.tableLoading = true
      getshareDataPage(this.tabsOptions.inquireData).then(async (res) => {
        if (res.success) {
          this.$refs.exatablesLoading.tableLoading = false
          this.informationData = await res.body.content
          this.handleEllipsis()
          this.total = res.body.total
          this.informationData.forEach((i) => {
            i.launchDate = this.formatTime(i.launchDate, 'hms')
            i.openDate = this.formatTime(i.openDate, 'hms')
            i.shareOffDate = this.formatTime(i.shareOffDate, 'hms')
            i.rejectDate = this.formatTime(i.rejectDate, 'hms')
          })
        } else {
          this.$refs.exatablesLoading.tableLoading = false
        }
      })
    },
    // 替换前三位字符为省略号
    handleEllipsis() {
      this.informationData.forEach((v) => {
        v.applyTitleCopy = v.applyTitle.replace(/^.{3}/, '...')
      })
    },
    disableVisible() {
      this.$refs.loanStatusSelect.visible = false
      this.$refs.applyDept.visible = false
      this.$refs.shareType.visible = false
      this.$refs.applyDept.visible = false
      this.$refs.shareOffStatus.visible = false
    },
    fetchMechanismTreet() {
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
          this.institution = treeToArr(res.body.children)
        }
      })
    },
    // 使用应用系统
    fetchQueryAppName() {
      queryAppName().then((res) => {
        this.sourceList = res.body
      })
    },
    // 查询
    onInquire() {
      this.initShareDataPage()
    },
    dateFrom() {
      const { useAppSystem, applyDept, releaseType, shareType } = this.dateFromList
      //使用应用系统
      this.$store.dispatch('getUseAppSystem', useAppSystem)
      //数源部门
      this.$store.dispatch('getApplyDept', applyDept)
      //释放状态
      this.$store.dispatch('getReleaseType', releaseType)
      //数据类型
      this.$store.dispatch('getShareType', shareType)
    },
    onReset() {
      ;(this.tabsOptions.inquireData.useAppSystem = ''),
        (this.tabsOptions.inquireData.catalogName = ''),
        (this.tabsOptions.inquireData.applyTitle = ''),
        (this.tabsOptions.inquireData.applyDept = ''),
        (this.tabsOptions.inquireData.shareType = ''),
        (this.tabsOptions.inquireData.openDate = ''),
        (this.tabsOptions.inquireData.launchDate = ''),
        (this.tabsOptions.inquireData.shareOffDate = ''),
        (this.tabsOptions.inquireData.shareOffStatus = '')
      //   this.onInquire()
    },
    getRolesDraft(page = 1) {
      this.$refs.exatablesLoading.tableLoading = true
      this.tabsOptions.inquireData.pageNum = page
      getshareDataPage(this.tabsOptions.inquireData).then(async (res) => {
        if (res.success) {
          this.$refs.exatablesLoading.tableLoading = false
          this.informationData = await res.body.content
          this.handleEllipsis()
          this.total = res.body.total
          this.informationData.forEach((i) => {
            i.launchDate = this.formatTime(i.launchDate, 'hms')
            i.openDate = this.formatTime(i.openDate, 'hms')
            i.shareOffDate = this.formatTime(i.shareOffDate, 'hms')
            i.rejectDate = this.formatTime(i.rejectDate, 'hms')
          })
        } else {
          this.$refs.exatablesLoading.tableLoading = false
        }
      })

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
.examine-form {
  background: #fff;
  padding: 0 24px;
}
.thirdly {
  display: flex;
  justify-content: space-between;
}
.thirdly-none {
  text-align: end;
}
.item-picker {
  width: 192.5px;
}
.release-Name {
  width: 330px;
  text-align: end;
}
.examine-useing-name {
  text-align: end;
}
.pagination-box {
  text-align: end;
  padding: 32px;
  background: #fff;
}
/deep/.trueCss {
  padding: 0;
  border: none;
}
/deep/.falseCss {
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
}
</style>