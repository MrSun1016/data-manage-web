<template>
  <div id="PublishedDirectory">
    <el-card>
      <el-form :inline="true" :model="pagequery" size="small" ref="pagequery" class="demo-form-inline faderfrom">
        <div class="divffromflex">
          <el-form-item label="目录名称：" prop="catalogName" class="topfromitem">
            <el-input size="small" v-model="pagequery.catalogName" placeholder="请输入" class="aitemml"></el-input>
          </el-form-item>
          <el-form-item label="所属区域：" class="topfromitem" prop="area">
            <el-select v-model="pagequery.area" size="small" clearable placeholder="请选择" class="aitemml">
              <el-option label="孝感市" value="孝感市"></el-option>
              <el-option label="孝昌县" value="孝昌县"></el-option>
              <el-option label="大悟县" value="大悟县"></el-option>
              <el-option label="安陆市" value="安陆市"></el-option>
              <el-option label="云梦县" value="云梦县"></el-option>
              <el-option label="汉川市" value="汉川市"></el-option>
              <el-option label="应城市" value="应城市"></el-option>
              <el-option label="孝南区" value="孝南区"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门名称：" prop="departName">
            <el-select
              v-model="pagequery.departName"
              size="small"
              clearable
              filterable
              placeholder="请选择"
              class="aitemml"
            >
              <el-option
                :label="source.nodeName"
                :value="source.nodeName"
                v-for="source in citys"
                :key="source.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="divffromflex">
          <el-form-item label="超时时间：">
            <el-date-picker
              v-model="times"
              type="daterange"
              :default-time="['00:00:00', '23:59:59']"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="pickerwei"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="更新方式：" prop="dataFormat">
            <el-select v-model="pagequery.dataFormat" size="small" clearable placeholder="请选择" class="aitemml">
              <el-option label="excel" value="excel"></el-option>
              <el-option label="数据库" value="数据库"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="更新周期：" prop="updateFrequency">
            <el-select v-model="pagequery.updateFrequency" size="small" clearable placeholder="请选择" class="aitemml">
              <el-option
                :label="frequencyitem.text"
                :value="frequencyitem.text"
                v-for="(frequencyitem, index) in datefromList.frequency"
                :key="frequencyitem.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <div class="fromflexrig">
        <!-- <el-form-item> -->
        <el-button size="small" @click="resetexcel('pagequery')">重置</el-button>
        <el-button type="primary" size="small" @click="handleCurrentChange(1)">查询</el-button>
        <!-- </el-form-item> -->
      </div>
    </el-card>
    <el-card class="cardpadmargtop">
      <el-table
        ref="tableData"
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#E6F7FF', color: '#333333' }"
      >
        <el-table-column prop="area" label="所属区域"> </el-table-column>
        <el-table-column prop="catalogName" label="目录名称" width="120px">
          <template slot-scope="{ row }">
            <el-tooltip class="over-item" :content="row.catalogName" placement="top">
              <span class="itemSlotheden2">{{ row.catalogName || '-' }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="departName" label="部门名称" :show-overflow-tooltip="true">
          <!-- <template slot-scope="{ row, $index }">
            <span>{{ row.sourceUnit || '-' }}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="updateFrequency" label="更新周期">
          <template slot-scope="{ row }">
            <span>{{ row.updateFrequency || '-' }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="dataFormat" label="更新方式">
          <template slot-scope="{ row }">
            <span>{{ row.dataFormat || '-' }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="dataUpdatedTime " label="最近更新时间">
          <template slot-scope="{ row }">
            <span>{{ row.dataUpdatedTime || '-' }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="timeoutPeriod" label="本年度超时周期 ">
          <template slot-scope="{ row }">
            <span>{{ row.timeoutPeriod || '-' }}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="updateStatus" label="更新状态">
          <template slot-scope="{ row }">
            {{ row.updateStatus || '-' }}
          </template>
          <!-- <template slot-scope="{ row }">
            <span class="yuancolor3" v-show="row.updateStatus == '已更新'">{{ row.updateStatus || '-' }}</span>
            <span class="yuancolor2" v-show="row.updateStatus == '待更新'">{{ row.updateStatus || '-' }}</span>
            <span class="yuancolor1" v-show="row.updateStatus == '更新已超时'">{{ row.updateStatus || '-' }}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="totalNum" label="数据总量">
          <template slot-scope="{ row }">
            <span>{{ row.totalNum || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="detailNum" label="超时时间">
          <template slot-scope="{ row }">
            <el-button type="text" @click="timeOutDetails(row)">{{ row.detailNum || '-' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        class="paginationtop"
        background
        :current-page="pagequery.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagequery.pageSize"
        :total="total"
        :pager-count="5"
        layout="->,total, prev, pager, next, sizes, jumper"
        @size-change="handleSizeChange"
        @current-change="getRoles"
      >
      </el-pagination>

      <el-dialog title :visible.sync="isAdministrator" width="45%">
        <!-- <div class=" drawerdivposi"> -->
        <template slot="title">
          <div class="titleItem">{{ titleItem }}超时时间记录</div>
        </template>
        <el-divider></el-divider>
        <div class="dialogcenter">
          <!-- <div class="dialogcenter_div" v-for="(item, index) in activities" :key="index">
            <div>
              {{ item.timeOut }}
            </div>
          </div> -->
          <el-table :data="activities" :header-cell-style="{ color: '#333333' }" highlight-current-row>
            <el-table-column prop="area" label="所属区域" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column prop="departName" label="部门名称" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column prop="catalogName" label="目录名称" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column prop="updateFrequency" label="更新周期" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column prop="dataFormat" label="更新方式" :show-overflow-tooltip="true"> </el-table-column>
            <el-table-column prop="timeOut" label="超时时间" :show-overflow-tooltip="true"> </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button size="small" @click="isAdministrator = false">取 消</el-button> -->
          <el-button size="small" type="primary" @click="isAdministrator = false">确 认</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { catalogUpdateBadList, updateBadDetailList } from '@/api/api'
import { mapState } from 'vuex'
export default {
  name: 'PublishedDirectory',
  data() {
    return {
      pagequery: {
        catalogName: '',
        area: '',
        departName: '',
        startDate: '',
        endDate: '',
        updateFrequency: '',
        dataFormat: '',
        pageNum: 1,
        pageSize: 10
      },
      // 更新频率
      frequency: 'update_frequency',
      loading: false,
      tableData: [],
      total: 0,
      times: [],

      // 超时时间
      isAdministrator: false,
      activities: [],
      titleItem: ''
    }
  },
  mounted() {
    this.dictionaryList()
    this.handleCurrentChange(1)
  },
  methods: {
    dictionaryList() {
      // 更新频率
      this.$store.dispatch('getFrequencyList', this.frequency)
      this.$store.dispatch('chanismTree')
    },
    getRoles(page = 1) {
      this.pagequery.pageNum = page

      this.handleCurrentChange()
    },
    handleCurrentChange(num) {
      this.loading = true
      // console.log(num)
      if (num) {
        this.pagequery.pageNum = num
      }
      if (this.times) {
        if (this.times.length != 0) {
          this.pagequery.startDate = this.times[0]
          this.pagequery.endDate = this.times[1]
        }
      } else {
        this.pagequery.startDate = ''
        this.pagequery.endDate = ''
      }
      // console.log('this.pagequery.pageNum', this.pagequery.pageNum)
      catalogUpdateBadList(this.pagequery).then(res => {
        if (res.success) {
          this.tableData = res.body.content
          this.tableData.forEach(v => {
            // if (v.detailNum) {
            //   v.detailNum = this.formatTime(v.detailNum, 'hms')
            // }
            if (v.dataUpdatedTime) {
              v.dataUpdatedTime = this.formatTime(v.dataUpdatedTime, 'hms')
            }
          })
          // console.log("this.tableData", this.tableData);
          this.total = res.body.total
          this.loading = false
        }
      })
    },
    // 每页显示条数
    handleSizeChange(pageSize) {
      this.pagequery.pageSize = pageSize
      this.handleCurrentChange()
    },
    // 更新周期
    // catastatusbtn(val) {
    //   for (const key in this.datefromList.frequency) {
    //     if (this.datefromList.frequency[key].value == val) {
    //       return this.datefromList.frequency[key].text
    //     }
    //   }
    // },
    // 点击重置
    resetexcel(excelData) {
      this.$refs[excelData].resetFields()
      this.times = []
    },
    timeOutDetails(row) {
      this.isAdministrator = true
      this.titleItem = row.catalogName
      let catalogId = {
        catalogId: row.catalogId
      }
      updateBadDetailList(catalogId).then(res => {
        if (res.success) {
          this.activities = res.body.content
        }
      })
    }
  },
  computed: {
    ...mapState({
      datefromList: state => state.indatafrom.datefromList,
      citys: state => state.enhance.citys
    })
  }
}
</script>

<style lang="less" scoped>
.divffromflex {
  display: flex;
  justify-content: space-between;
}

.fromflexrig {
  display: flex;
  flex-direction: row-reverse;
}

.cardpadmargtop {
  margin-top: 24px;
  padding-left: 20px;
  width: 100%;
}

.aitemml {
  width: 250px;
}

.pickerwei {
  width: 250px;
}
/deep/.el-range-separator {
  margin: 0 15px 0 0;
}

/deep/.el-dialog__title {
  color: #1890ff;
}

/deep/.el-divider--horizontal {
  background-color: #1890ff;
}

/deep/.el-dialog__body {
  padding: 0;
}

.el-divider--horizontal {
  margin: 0 0 5px 0;
}

.dialogcenter {
  width: 100%;
  height: 200px;
  margin-top: 20px;
  text-align: center;
}

.titleItem {
  font-size: 16px;
  font-weight: 500;
  color: #1890ff;
}
.itemSlotheden2 {
  width: 115px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}
</style>
