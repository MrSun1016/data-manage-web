<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="updateData" size="small" ref="updateData" class="demo-form-inline faderfrom">
        <div class="divffromflex">
          <el-form-item label="数据目录：" prop="catalogName">
            <el-input size="small" v-model="updateData.catalogName" placeholder="请输入" class="aitemml"></el-input>
          </el-form-item>
          <el-form-item label="数源部门：" prop="sourceUnit">
            <el-select
              v-model="updateData.sourceUnit"
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
          <el-form-item label="更新状态：" prop="updateStatus">
            <!-- @change="$forceUpdate()"  -->
            <el-select v-model="updateData.updateStatus" size="small" clearable placeholder="请选择" class="aitemml">
              <el-option
                :label="frequencyitem.text"
                :value="frequencyitem.text"
                v-for="frequencyitem in datefromList.updateTatus"
                :key="frequencyitem.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div class="divffromflex">
          <el-form-item label="更新周期：" prop="updateFrequency">
            <el-select v-model="updateData.updateFrequency" size="small" clearable placeholder="请选择" class="aitemml">
              <el-option
                :label="frequencyitem.text"
                :value="frequencyitem.value"
                v-for="(frequencyitem, index) in datefromList.frequency"
                :key="frequencyitem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="系统名称：" prop="sourceSystem">
            <el-input size="small" v-model="updateData.sourceSystem" placeholder="请输入" class="aitemml"></el-input>
          </el-form-item>

          <el-form-item label="数据库名：" prop="databaseName">
            <el-input size="small" v-model="updateData.databaseName" placeholder="请输入" class="aitemml"></el-input>
          </el-form-item>
        </div>

        <div class="fromflexrig">
          <el-form-item class="fromweizhi">
            <el-button type="primary" size="small" @click="submitUpdate" class="butfromccwei">查询</el-button>
            <el-button size="small" @click="resetexcel('updateData')" class="butfromccwei">重置</el-button>
          </el-form-item>
          <el-form-item label="数据表名：" prop="tableName">
            <el-input size="small" v-model="updateData.tableName" placeholder="请输入" class="aitemml"></el-input>
          </el-form-item>
          <el-form-item label="数据格式：" prop="dataFormat">
            <el-select v-model="updateData.dataFormat" size="small" clearable placeholder="请选择" class="aitemml">
              <el-option label="excel" value="excel"></el-option>
              <el-option label="数据库" value="数据库"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="cardpadmargtop">
      <el-table
        ref="tableUpdate"
        :data="tableUpdate"
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#E6F7FF', color: '#333333' }"
        class="tablemargin"
      >
        <el-table-column prop="catalogName" label="数据目录">
          <template slot-scope="{ row }">
            <el-tooltip class="over-item" :content="row.catalogName" placement="top">
              <el-button type="text" class="itemSlotheden2" @click="toShareLog(row)">{{
                row.catalogName || '-'
              }}</el-button>
              <!-- <el-button type="text" class="tabnamewei" @click="toShareLog(row)">{{ row.catalogName || '-' }}</el-button> -->
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="sourceUnit" label="数源部门" :show-overflow-tooltip="true">
          <!-- <template slot-scope="{ row, $index }">
            <span>{{ row.sourceUnit || '-' }}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="updateFrequency" label="更新周期">
          <template slot-scope="{ row }">
            <span>{{ catastatusbtn(row.updateFrequency) || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sourceSystem" label="应用系统">
          <template slot-scope="{ row }">
            <span>{{ row.sourceSystem || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalNum" label="数据量">
          <template slot-scope="{ row }">
            <span>{{ row.totalNum || '0' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="databaseName" label="数据库名">
          <template slot-scope="{ row }">
            <span>{{ row.databaseName || '0' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tableName" label="数据表名">
          <template slot-scope="{ row }">
            <span>{{ row.tableName || '0' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dataFormat" label="数据格式">
          <template slot-scope="{ row }">
            <span>{{ row.dataFormat || '0' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最近更新时间">
          <template slot-scope="{ row }">
            <el-tooltip class="over-item" :content="row.importTime" placement="top">
              <el-button type="text" class="itemSlot" @click="closeTimeLine(row)">{{
                row.importTime || '-'
              }}</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="updateStatus" label="更新状态"></el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        class="paginationtop"
        background
        :current-page="updateData.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="updateData.pageSize"
        :total="total"
        :pager-count="5"
        layout="->,total, prev, pager, next, sizes, jumper"
        @size-change="updateSizeChange"
        @current-change="updatePage"
      >
      </el-pagination>
    </el-card>
    <el-drawer title :visible.sync="isAdministrator" direction="rtl" ref="isAdministrator" size="36%">
      <!-- <div class=" drawerdivposi"> -->
      <template slot="title">
        <div class="titleItem">{{ titleItem }}更新记录</div>
      </template>
      <el-divider></el-divider>
      <el-timeline class="timelinemargin">
        <el-timeline-item
          v-for="(item, index) in activities"
          :key="index"
          type="primary"
          color="#409EFF"
          placement="top"
        >
          <div class="timelineItem">
            <div class="year">{{ item.updatedTime || '-' }}</div>
            <!-- <div class="year">{{ item.address }}</div> -->
            <div class="item">
              <div style="margin-bottom: 5px">
                <span>更新数据量：{{ item.importNum || '-' }}</span>
              </div>
              <!-- <div class="yearFlex">
                  <div>
                    <span>操作人：</span>
                    <span class="flexItem">{{ item.operator || '-' }}</span>
                  </div>
                  <div>
                    <span>操作部门：</span>
                    <span class="flexItem">{{ item.departName || '-' }}</span>
                  </div>
                </div> -->
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </el-drawer>
  </div>
</template>
<script>
import { pageQueryList, updateLog } from '@/api/api'
import { mapState } from 'vuex'
import qs from 'qs'
export default {
  name: 'LibraryTableUpdate',
  data() {
    return {
      activities: [],
      isAdministrator: false,
      updateData: {
        apiName: '',
        catalogName: '',
        sourceUnit: '',
        dataFormat: '',
        databaseName: '',
        orderByField: '',
        pageNum: 1,
        pageSize: 10,
        requestMode: '',
        responseType: '',
        rowStart: 0,
        sourceSystem: '',
        tableName: '',
        updateFrequency: '',
        updateStatus: ''
      },
      // 分页器
      // page: 1, //当前页数
      // pagesize: 10, //当前页显示条数
      total: 0, //总共数据条数
      tableUpdate: [],
      dataDictionary: {
        // 更新频率
        frequency: 'update_frequency',
        // 更新状态
        updateTatus: 'update_tatus'
      },
      loading: true, //加载
      titleItem: ''
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        //  pagequeryList: this.pagequeryList,
        //     toNameitem: this.toNameitem
        if (this.$route.params.toNameitem == '编目详情') {
          this.updateData = this.$route.params.pagequeryList
          this.$nextTick(() => {
            this.updatePage(this.updateData.pageNum)
          })
          this.$route.params.toNameitem = ''
          this.$route.params.pagequeryList = ''
        }
      }
    }
  },
  activated() {
    this.updateData.dataFormat = this.$route.query.dataFormat
    this.updateData.updateStatus = this.$route.query.updateStatus
    // this.updatePage()
    // this.dictionaryList()
  },
  mounted() {
    this.updateData.updateStatus = this.$route.query.type
    this.updateData.updateFrequency = this.$route.query.date
    this.updatePage()
    this.dictionaryList()
    this.$store.dispatch('chanismTree')
  },
  methods: {
    closeTimeLine(row) {
      this.isAdministrator = true
      this.titleItem = row.catalogName

      let timeId = qs.stringify({ catalogId: row.id })

      updateLog(timeId).then(res => {
        if (res.success) {
          this.activities = res.body
          this.activities.forEach((item, index) => {
            item.updatedTime = this.formatTime(item.updatedTime)
          })
        }
      })
    },

    dictionaryList() {
      let { frequency, updateTatus } = this.dataDictionary
      // 更新频率
      this.$store.dispatch('getFrequencyList', frequency)
      // 更新状态
      this.$store.dispatch('getUpdateTatus', updateTatus)
    },
    // 更新周期
    catastatusbtn(val) {
      for (const key in this.datefromList.frequency) {
        if (this.datefromList.frequency[key].value == val) {
          // console.log(this.datefromList.catalogueList[key].value,val);
          // console.log(val);
          return this.datefromList.frequency[key].text
        }
      }
    },
    resetexcel(excelData) {
      this.$refs[excelData].resetFields()
    },
    updatePage(page = 1) {
      this.loading = true
      this.updateData.pageNum = page
      pageQueryList(this.updateData).then(res => {
        if (res.success) {
          this.tableUpdate = res.body.content
          this.tableUpdate.forEach(v => {
            v.importTime = this.formatTime(v.importTime)
          })
          this.total = res.body.total
          this.loading = false
        }
      })
    },
    updateSizeChange(pageSize) {
      this.updateData.pageSize = pageSize
      this.updatePage()
    },
    submitUpdate() {
      this.updatePage()
    },
    toShareLog(row) {
      console.log(row)
      this.$router.push({
        // path: '/datefrom/cataloglist'
        name: 'datefrom-cataloglist',
        params: {
          itemId: row.id,
          pagequery: this.updateData,
          toName: '库表更新'
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
.el-select {
  /deep/.el-input {
    display: flex;
  }
}
/deep/.el-icon-arrow-up:before {
  content: '\e78f';
  color: #666666;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.divffromflex {
  display: flex;
  justify-content: space-between;
}
.fromflexrig {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.fromweizhi {
  width: 280px;
  display: flex;
  justify-content: flex-end;
}
.aitemml {
  width: 200px;
}
.cardpadmargtop {
  margin-top: 24px;
  //padding-left: 20px;
  width: 100%;
}
.paginationtop {
  margin-top: 30px;
}
.itemSlot {
  width: 89px;
  overflow: hidden; //超出的文本隐藏
  white-space: nowrap;
  text-overflow: ellipsis;
}
.titleItem {
  font-size: 16px;
  font-weight: 500;
  color: #1890ff;
}
/deep/.el-timeline-item__tail {
  border-left: 2px solid #1890ff;
}

/deep/.el-timeline-item__node--normal {
  width: 15px;
  height: 15px;
  left: -2px;
}
.timelinemargin {
  margin-left: 100px;
}
.timelineItem {
  background-color: #f8fafb;
  padding: 20px 0;
}
.year {
  width: 90px;
  word-wrap: break-word;
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  color: #333333;
  position: absolute;
  left: -120px;
  top: 1px;
}
.item {
  margin-left: 25px;
  font-size: 15px;
  // span {
  //   padding-left: 10px;
  // }
  .yearFlex {
    display: flex;
    .flexItem {
      padding-right: 32px;
      color: #777777;
    }
  }
}
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
.itemSlotheden2 {
  width: 105px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  user-select: unset;//设置允许复制el-button的内容
}
</style>
