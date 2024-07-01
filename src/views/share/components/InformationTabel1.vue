<template>
  <div id="InformationTabel">
    <div>
      
    </div>
    <el-table
      class="table-data"
      :header-cell-style="{ background: '#E6F7FF', color: '#333333' }"
      :data="informationTabelData"
      :cell-style="cellStyle"
      style="width: 100%"
    >
      <el-table-column prop="title" label="申请标题"></el-table-column>
      <el-table-column prop="title" label="编目名称" v-if="tabsOptions.tabsTitle == 'reject'"></el-table-column>
      <el-table-column prop="system" label="使用应用系统" v-if="tabsOptions.tabsTitle != 'reject'"> </el-table-column>
      <el-table-column prop="catalog" label="数据目录" v-if="tabsOptions.tabsTitle != 'reject'"> </el-table-column>
      <el-table-column prop="department" label="数源部门"> </el-table-column>
      <el-table-column prop="dataType" label="数据类型"> </el-table-column>
      <el-table-column prop="dataType" label="驳回时间" v-if="tabsOptions.tabsTitle == 'reject'"> </el-table-column>
      <el-table-column
        prop="totalNumber"
        v-if="tabsOptions.tabsTitle == 'release'"
        sortable
        label="数据共享量/被调用次数"
      >
        <template slot="header">
          <div>
            <div>数据共享量/</div>
            <div>被调用次数</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalNumber"
        v-if="tabsOptions.tabsTitle == 'useing'"
        sortable
        label="数据共享量/被调用次数"
      >
        <template slot="header">
          <div>
            <div>数据共享量/</div>
            <div>被调用次数</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="openTime" sortable v-if="tabsOptions.tabsTitle == 'examine'" label="发起时间">
      </el-table-column>
      <el-table-column prop="openTime" sortable v-if="tabsOptions.tabsTitle == 'release'" label="数据开通时间">
        <el-table-column prop="openTime" sortable v-if="tabsOptions.tabsTitle == 'useing'" label="数据开通时间"></el-table-column>
      </el-table-column>
      <el-table-column prop="openTime" sortable v-if="tabsOptions.tabsTitle == 'useing'" label="数据开通时间"></el-table-column>
      <el-table-column prop="openTime"  sortable v-if="tabsOptions.tabsTitle == 'release'" label="数据释放时间">
      </el-table-column>
      <el-table-column prop="openTime"  sortable v-if="tabsOptions.tabsTitle == 'release'" label="释放原因">
      </el-table-column>
      <el-table-column label="查看" v-if="tabsOptions.tabsTitle == 'release'">
        <template slot-scope="scope">
          <el-button type="text" size="small">使用记录</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作"  v-if="tabsOptions.tabsTitle == 'useing'">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="releaseDialog = true">释放数据</el-button>
          <el-button type="text" size="small" @click="onUsageData" >使用数据</el-button>
          <el-button type="text" size="small" @click="onRecord">使用记录</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作"  v-if="tabsOptions.tabsTitle == 'reject'">
        <template slot-scope="scope">
          <el-button type="text" size="small" >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="9999"
      >
      </el-pagination>
    </div>
    <!-- 释放数据弹窗 -->
    <el-dialog
      class="small-mask"
      :visible.sync="releaseDialog"
      width="30%"
    >
      <div class="title">提示</div>
      <div class="small-mask-info">
        <i class="el-icon-warning" style="color: #155bd4; font-size: 32px; margin-right: 10px"></i
        ><span style="color: #000000">是否确认提前释放数据？</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="releaseDialog = false">取消</el-button>
        <el-button size="mini" @click="verifyRelease"  :loading = loading type="primary">确认释放</el-button>
      </span>
    </el-dialog>
    <!-- 使用记录 -->
    <InformationRecord ref="record" />
    <!-- 使用数据 -->
    <!-- <InformationUsageData /> -->
  </div>
</template>

<script>
import InformationRecord from '@views/share/components/InformationRecord'
import { getreleaseData } from '@/api/api'
export default {
  props: {
    tabsOptions: {
      type: Object,
    },
  },
  name: 'InformationTabel',
  components: {
    InformationRecord,
  },
  data() {
    return {
      loading:false,
      releaseDialog:false,
      currentPage: 1,
      informationTabelData: [
        {
          title: '...申请消防车辆信息',
          system: '数智泰未来中和管理系统',
          catalog: '清三色预警信息',
          department: '孝感市人社局',
          dataType: '库表',
          dataCount: '1234',
          openTime: '2012-09-08',
        },
        {
          title: '...申请消防车辆信息',
          system: '数智泰未来中和管理系统',
          catalog: '公路桥梁信息',
          department: '孝感市街道',
          dataType: '街口',
          dataCount: '14',
          openTime: '2012-09-08',
        },
        {
          title: '...申请消防车辆信息',
          system: '数智泰未来中和管理系统',
          catalog: '欠薪组织信息',
          department: '孝感市',
          dataType: '接口',
          dataCount: '1234',
          openTime: '2012-09-08',
        },
        {
          title: '...申请消防车辆信息',
          system: '街道"往事警道"情连',
          catalog: '街道"往事警道"情连',
          department: '孝感市人警察局',
          dataType: '库表',
          dataCount: '0014',
          openTime: '2012-09-08'
        }
      ]
    }
  },
  methods: {
    //释放数据
    verifyRelease(){
      getreleaseData().then(res=>{
        this.loading = true
        if(res.success){
          this.loading = false
        }
        console.log(res)
      })
    },
    // 查看使用记录
    onRecord() {
      this.$refs.record.recordDrawer = true
    },
    handeleDrawer(title) {
      this.$refs.drawer.title = title
      this.$refs.drawer.drawer = true
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 设置指定列单元格字体颜色
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0 || columnIndex == 2 || columnIndex == 6) {
        return 'color:#1890FF'
      }
    },
    isShowAtiondrawer() {
      this.ationdrawer = true
    },
    // 点击打开使用数据
    onUsageData() {
      // this.usageData = true
       this.$router.push('/share/components/InformationUsageData')
    }
  }
}
</script>

<style lang="less" scoped>
#InformationTabel {
  width: 100%;
  //   height: 100%;
  // padding-top: 24px;
  .table-data {
    height: 100%;
    padding: 0 20px 0 20px;
    /deep/.el-table__row {
      height: 60px !important;
    }
  }

  .pagination-box {
    text-align: end;
    padding: 32px;
    background: #fff;
  }
  /deep/.el-table th.el-table__cell > .cell {
    display: flex;
    align-items: center;
  }
  .title {
    height: 60px;
    color: #1890ff;
    line-height: 60px;
    padding-left: 32px;
    font-weight: 500;
    border-bottom: 1px solid #1890ff;
  }
  .small-mask-info {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
/deep/ .el-dialog__body {
  padding: 0 0;
}
/deep/ .el-dialog__header {
  padding: 0 0;
}

// 抽屉
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

/deep/.el-timeline-item__tail {
  border-left: 2px solid #1890ff;
}
/deep/.el-timeline-item__node--normal {
  width: 15px;
  height: 15px;
}
.timelinemargin {
  margin-left: 140px;
}
.timelineItem {
  width: 537px;
  background-color: #f8fafb;
  padding: 20px 0;
  .timelineFlex {
    display: flex;
    .timelineDivwei {
      width: 120px;
      color: #333333;
      font-size: 14px;
      margin-bottom: 8px;
    }
    span {
      font-size: 14px;
      color: #777777;
    }
  }
}
.year {
  color: #333333;
  font-size: 16px;
  position: absolute;
  left: -120px;
  top: 1px;
}
.year2 {
  color: #333333;
  font-size: 16px;
  position: absolute;
  left: -100px;
  top: 20px;
}
.item {
  margin-left: 25px;
  font-size: 14px;
  .itemdivflex {
    display: flex;
    .timelinedivitem {
      display: flex;
      .timelinewei {
        width: 60px;
      }
      .timelineweibig {
        width: 75px;
      }
      span {
        width: 60px;
        font-size: 14px;
        color: #777777;
      }
    }
  }
}
.timelineForm {
  /deep/.el-form-item {
    height: 36px;
    margin: 0;
  }
}
</style>
