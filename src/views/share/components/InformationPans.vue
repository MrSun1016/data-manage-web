<template>
  <el-form
    :model="tabsOptions.inquireData"
    label-position="left"
    @keyup.enter.native="onInquire"
    label-width="120px"
    inline
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
          <el-option v-for="item in sourceList" :key="item.id" :label="item.appName" :value="item.appName"> </el-option>
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
            :value="institutionItem.nodeName"
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
          <el-option v-for="item in datefromList.shareType" :key="item.value" :label="item.text" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据开通时间：" v-if="tabsOptions.tabsTitle == 'useing'" style="width: 330px">
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
      <el-form-item label="数据开通时间：" v-else-if="tabsOptions.tabsTitle == 'release'" style="width: 330px">
        <el-date-picker
          @change="onInquire"
          v-model="tabsOptions.inquireData.openDate"
          value-format="yyyy-MM-dd"
          class="item-picker"
          type="date"
          placeholder="选择日期"
          size="small"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="数据发起时间：" v-show="tabsOptions.tabsTitle == 'examine'" style="width: 330px">
        <el-date-picker
          @change="onInquire"
          v-model="tabsOptions.inquireData.launchDate"
          value-format="yyyy-MM-dd"
          type="date"
          class="item-picker"
          size="small"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
    </div>
    <div :class="tabsOptions.tabsTitle == 'release' ? 'thirdly' : 'thirdly-none'">
      <el-form-item label="数据释放时间：" v-show="tabsOptions.tabsTitle == 'release'">
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
      <el-form-item label="释放状态：" v-show="tabsOptions.tabsTitle == 'release'">
        <el-select
          ref="shareOffStatus"
          @keydown.enter.native="disableVisible"
          class="items"
          v-model="tabsOptions.inquireData.shareOffStatus"
          size="small"
          clearable
          placeholder="请选择"
        >
          <el-option v-for="item in datefromList.releaseType" :key="item.value" :label="item.text" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :class="tabsOptions.tabsTitle == 'release' ? 'release-Name' : 'examine-useing-name'">
        <el-button size="small" type="primary" @click="onInquire">查询</el-button>
        <el-button size="small" @click="onReset">重置</el-button>
      </el-form-item>
    </div>
    <!-- :span="tabsOptions.tabsTitle == 'examine' ? 24 : tabsOptions.tabsTitle == 'useing' ? 24 : 8" -->
  </el-form>
</template>

<script>
import { mapState } from 'vuex'
import { queryAppName, mechanismTree } from '@/api/api'
export default {
  name: 'InformationPans',
  props: ['tabsOptions', 'currentPage'],
  data() {
    return {
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
  activated() {
    this.fetchQueryAppName()
    this.fetchMechanismTreet()
    this.dateFrom()
  },
  created() {},
  methods: {
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
      this.tabsOptions.inquireData.pageNum = 1
      // 让父组件默认跳回第一页
      this.$emit('handleCurrenPage', 1)
      this.$emit('initShareDataPage')
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
      this.onInquire()
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
</style>