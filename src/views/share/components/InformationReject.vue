<template>
  <div>
    <el-form :inline="true"
    @keyup.enter.native="submitexcel"
    :model="tabsOptions.inquireData" ref="pagequery" class="demo-form-inline faderfrom">
      <div class="divffromflex">
        <el-form-item label="数据目录：" prop="catalogName" class="topfromitem">
          <el-input
            size="small"
            clearable
            v-model="tabsOptions.inquireData.catalogName"
            placeholder="请输入"
            class="aitemml"
          ></el-input>
        </el-form-item>

        <el-form-item label="使用应用系统：" class="topfromitem" prop="sourceSystem">
          <el-select
            ref="useAppSystem"
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

        <!-- :default-time="['00:00:00', '23:59:59']" -->
        <el-form-item label="保存日期：" prop="endTime">
          <el-date-picker
          @change="submitexcel"
            size="small"
            v-model="saveData"
            value-format="yyyy-MM-dd"
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
          <el-button type="primary" size="small" @click="submitexcel" class="butfromccwei">查询</el-button>
          <el-button size="small" @click="resetexcel" class="butfromccwei">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { queryAppName } from '@/api/api'
export default {
  name: 'InformationReject',
  props: ['tabsOptions'],
  data() {
    return {
      saveData: [],
      dateFromList: {
        //使用应用系统
        useAppSystem: 'source_system',
      },
      // 使用应用系统
      sourceList: [],
    }
  },
  activated() {
    this.fetchQueryAppName()
  },
  created() {
    this.dateFrom()
  },
  methods: {
    disableVisible() {
      this.$refs.useAppSystem.visible = false
    },
    // 使用应用系统
    fetchQueryAppName() {
      queryAppName().then((res) => {
        this.sourceList = res.body
      })
    },
    submitexcel() {
      // 让父组件默认跳回第一页
      this.$emit('handleCurrenPage',1)
      this.tabsOptions.inquireData.pageNum = 1
      this.tabsOptions.inquireData.startDate = this.saveData[0]
      this.tabsOptions.inquireData.endDate = this.saveData[1]
      this.$emit('initShareDataPage')
    },
    // 点击重置
    resetexcel() {
      ;(this.tabsOptions.inquireData.catalogName = ''),
        (this.tabsOptions.inquireData.useAppSystem = ''),
        (this.tabsOptions.inquireData.launchDate = ''),
        (this.tabsOptions.inquireData.rejectDate = '')
      this.saveData = []
    },
    dateFrom() {
      //使用应用系统
      this.$store.dispatch('getUseAppSystem', this.dateFromList.useAppSystem)
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
.aitemml {
  width: 200px;
}
.fromitemdata {
  width: 120px;
}
.fromdatatime {
  margin-right: 10px;
}
/deep/.el-range-separator {
  margin: 0 5px 0 0;
}
</style>
