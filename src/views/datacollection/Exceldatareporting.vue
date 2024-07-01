<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="pagequery" size="small" ref="pagequery" class="demo-form-inline faderfrom">
        <div class="divffromflex">
          <el-form-item label="数据目录：" prop="catalogName" class="topfromitem">
            <el-input size="small" v-model="pagequery.catalogName" placeholder="请输入" class="aitemml"></el-input>
          </el-form-item>
          <el-form-item label="数源部门：" prop="sourceUnit">
            <el-select
              v-model="pagequery.sourceUnit"
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
          <el-form-item label="更新状态：" class="topfromitem" prop="updateStatus">
            <el-select v-model="pagequery.updateStatus" size="small" clearable placeholder="请选择" class="aitemml">
              <el-option
                :label="frequencyitem.text"
                :value="frequencyitem.text"
                v-for="(frequencyitem, index) in datefromList.updateTatus"
                :key="frequencyitem.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="fromflexrig">
          <el-form-item label="更新周期：" prop="updateFrequency">
            <el-select v-model="pagequery.updateFrequency" size="small" clearable placeholder="请选择" class="aitemml">
              <el-option
                :label="frequencyitem.text"
                :value="frequencyitem.value"
                v-for="(frequencyitem, index) in datefromList.frequency"
                :key="frequencyitem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="fromweizhi">
            <el-button type="primary" size="small" @click="submitexcel" class="butfromccwei">查询</el-button>
            <el-button size="small" @click="resetexcel('pagequery')" class="butfromccwei">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <el-card class="cardpadmargtop">
      <el-table
        ref="tableData"
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#E6F7FF', color: '#333333' }"
      >
        <el-table-column prop="catalogName" label="数据目录">
          <template slot-scope="{ row }">
            <el-tooltip class="over-item" :content="row.catalogName" placement="top">
              <el-button type="text" class="itemSlotheden2" @click="toShare(row)">{{
                row.catalogName || '-'
              }}</el-button>
              <!-- <el-button type="text" class="tabnamewei " @click="toShare(row)">{{ row.catalogName || '-' }}</el-button> -->
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="sourceUnit" label="数源部门" :show-overflow-tooltip="true">
          <!-- <template slot-scope="{ row, $index }">
            <span>{{ row.sourceUnit || '-' }}</span>
          </template> -->
        </el-table-column>
        <el-table-column label="更新周期">
          <template slot-scope="{ row }">
            <span>{{ catastatusbtn(row.updateFrequency) || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalNum" label="数据量">
          <template slot-scope="{ row }">
            <span>{{ row.totalNum || '0' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="databaseName" label="数据库名">
          <template slot-scope="{ row }">
            <span>{{ row.databaseName || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tableName" label="数据表名">
          <template slot-scope="{ row }">
            <span>{{ row.tableName || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最近更新时间">
          <template slot-scope="{ row }">
            <el-tooltip class="over-item" :content="row.importTime" placement="top">
              <el-button type="text" class="itemSlotheden" @click="closeTimeLine(row)">{{
                row.importTime || '-'
              }}</el-button>
            </el-tooltip>

            <!-- <el-button type="text" v-if="row.importTime == null" class="itemSlotheden" @click="closeTimeLine(row)">{{
              row.importTime
            }}</el-button> -->
          </template>
        </el-table-column>
        <el-table-column label="更新状态">
          <template slot-scope="{ row }">
            <span class="yuancolor3" v-show="row.updateStatus == '已更新'">{{ row.updateStatus || '-' }}</span>
            <span class="yuancolor2" v-show="row.updateStatus == '待更新'">{{ row.updateStatus || '-' }}</span>
            <span class="yuancolor1" v-show="row.updateStatus == '更新已超时'">{{ row.updateStatus || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" @click="changeLeadingin(row)" v-has="'dataReporting:lmport'">导入</el-button>
            <el-button type="text" @click="download(row)" v-has="'dataReporting:downloadTemplate'">下载模板</el-button>
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

      <!-- 点击最近更新日期弹出更新记录 -->
      <el-drawer title :visible.sync="exceldrawer" direction="rtl" ref="exceldrawer" size="36%">
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
              <div class="year">{{ item.importTime || '-' }}</div>
              <!-- <div class="year">{{ item.address }}</div> -->
              <div class="item">
                <div style="margin-bottom: 5px">
                  <span>更新数据量：{{ item.importNum || '-' }}</span>
                </div>
                <div class="yearFlex">
                  <div>
                    <span>操作人：</span>
                    <span class="flexItem">{{ item.operator || '-' }}</span>
                  </div>
                  <div>
                    <span>操作部门：</span>
                    <span class="flexItem">{{ item.departName || '-' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
        <div class="nodata" v-show="activities.length <= 0">暂无数据</div>
      </el-drawer>

      <!-- 导入的弹窗 -->
      <el-dialog title="导入" class="dialoghei" :visible.sync="isExcleLeadingin" width="30%">
        <el-divider></el-divider>
        <div class="dialogmarg centerupload">
          <el-upload
            drag
            class="upload-demo"
            ref="upload"
            name="file"
            action="/dtwave-om/api/datacollection/importExcel"
            :data="catalogIditem"
            :file-list="fileList"
            :auto-upload="false"
            accept=".xls,.xlsx"
            :headers="headerObj"
            :on-change="handleChange"
            :on-success="uploadSuccessExcel"
          >
            <!-- :data={pictureName:this.imageName} -->
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">点击图标选择Excel文件上传</div>
          </el-upload>
        </div>
        <span slot="footer" class="dialog-footer excelbutweizhi">
          <el-button size="small" @click="closeUpload" class="butonqumarg">取 消</el-button>
          <el-button type="primary" size="small" :loading="uploading" :disabled="isdisabled" @click="importParameter">{{
            uploading ? '解析中...' : '提交解析'
          }}</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { postPageQuery, importExcel } from '@/api/api'
import { updateList } from '@/api/department'
import { downloadShare } from '@/api/department'
import { Message } from 'element-ui'
import { mapState } from 'vuex'
export default {
  name: 'Exceldatareporting',
  data() {
    return {
      total: 0, //总共数据条数
      tableData: [],
      exceldrawer: false,
      activities: [],
      titleItem: '',
      pagequery: {
        catalogName: '',
        sourceUnit: '',
        orderByField: '',
        pageNum: 1,
        pageSize: 10,
        rowStart: 0,
        updateStatus: '',
        updateFrequency: ''
      },
      loading: true, //加载
      isExcleLeadingin: false,
      isdisabled: true,
      uploading: false,
      ressult: '',
      // /dtwave-om/api/datacollection/importExcel
      localPathUrl: false,
      headerObj: {
        'X-Access-Token': JSON.parse(window.localStorage.getItem('pro__Access-Token')).value
      },
      importExcel: {},
      courseId: '12',
      // 导入
      fileName: '',
      file: {},
      fileList:[],
      result: '',
      resbodyList: {},
      catalogIditem: { catalogId: '', file: '' },
      dataDictionary: {
        // 更新频率
        frequency: 'update_frequency',
        // 更新状态
        updateTatus: 'update_tatus'
      }
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        if (this.$route.params.toNameitem == '编目详情') {
          this.pagequery = this.$route.params.pagequeryList
          this.$nextTick(() => {
            this.getRoles(this.pagequery.pageNum)
          })
          this.$route.params.toNameitem = ''
          this.$route.params.pagequeryList = ''
        }
      }
    }
  },
  activated() {
    this.pagequery.updateStatus = this.$route.query.type
    this.pagequery.updateFrequency = this.$route.query.date
    this.getRoles()
    this.dictionaryList()
    this.$store.dispatch('chanismTree')
  },
  mounted() {
    // this.pagequery.updateStatus = this.$route.query.type
    //  this.pagequery.updateFrequency = this.$route.query.date
    this.getRoles()
    // this.dictionaryList()
  },
  methods: {
    handleChange(file, fileList) {
      this.file = file.raw
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]] // 获取最后一次选择的文件
      }
      console.log('this.fileList', this.file, this.fileList)
      let resFileName = file.name
      this.catalogIditem.file = resFileName
      this.isdisabled = false
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
          return this.datefromList.frequency[key].text
        }
      }
    },

    // 点击查询
    submitexcel() {
      this.getRoles()
    },
    // 点击页面切换
    getRoles(page = 1) {
      this.loading = true
      this.pagequery.pageNum = page
      let { pagequery } = this
      postPageQuery(pagequery).then(res => {
        if (res.success) {
          this.tableData = res.body.content
          this.tableData.forEach(v => {
            v.importTime = this.formatTime(v.importTime)
          })
          this.total = res.body.total
          this.loading = false
        }
      })
    },
    // 每页显示条数
    handleSizeChange(pageSize) {
      this.pagequery.pageSize = pageSize
      this.getRoles()
    },
    // 跳转详情
    toShare(row) {
      console.log(row)
      this.$router.push({
        // path: '/datefrom/cataloglist'
        name: 'datefrom-cataloglist',
        params: {
          itemId: row.id,
          pagequery: this.pagequery,
          toName: '数据上报'
        }
      })
    },
    // 导入
    changeLeadingin(row) {
      this.isExcleLeadingin = true
      this.isdisabled = true
      this.catalogIditem.catalogId = row.id
    },

    uploadSuccessExcel(res, file, fileList) {
      this.fileName = file.name
      console.log('0000000')
      if (res.success) {
        this.uploading = false
        this.disable = false
        this.isExcleLeadingin = false
        this.getRoles()
        this.$refs.upload.clearFiles()
        // this.isdisabled = true
        this.$message.success(`${this.fileName}上传成功`)
      } else {
        this.uploading = false
        this.isExcleLeadingin = false
        this.$refs.upload.clearFiles()
        // this.$message.warning(`上传失败!  `+res.message)

        Message({
          message: `上传失败!  `+res.message,
          type: 'error',
          showClose: true,
          duration: 0,
        });
      }
    },
    importParameter() {
      this.uploading = true
      this.$refs.upload.submit()
      console.log('1111111')
    },
    closeUpload() {
      this.$refs.upload.clearFiles()
      this.isExcleLeadingin = false
    },
    getCurrentTime() {
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1
      let day = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
      let hours = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
      let minutes = new Date().getMinutes() < 10 ? '0' + new Date().getHours() : new Date().getHours()
      return year + '-' + month + '-' + day + ' ' + hours + '-' + minutes
    },
    download(row) {
      console.log(12, row)
      let dataId = { dataId: row.id }
      downloadShare(dataId)
        .then(res => {
          const blob = new Blob([res], {
            type: 'application/json;charset=UTF-8'
          }) // res就是接口返回的文件流
          const link = document.createElement('a') // 创建a标签
          const objectUrl = window.URL.createObjectURL(blob)
          link.href = objectUrl
          link.download = row.catalogName + this.getCurrentTime() + '.xls'
          link.click()
          window.URL.revokeObjectURL(objectUrl) // 释放内存
        })
        .catch(error => {
          this.$message.warning('模板导出失败')
        })
    },
    // 点击时间
    closeTimeLine(row) {
      this.exceldrawer = true
      this.titleItem = row.catalogName
      // let timeId = row.id
      let timeId = JSON.stringify(row.id)
      updateList(timeId).then(res => {
        if (res.success) {
          this.activities = res.body
          this.activities.map((item, index) => {
            item.importTime = this.formatTime(item.importTime)
          })
        }
      })
    },

    // 点击重置
    resetexcel(excelData) {
      this.$refs[excelData].resetFields()
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
/deep/.el-tooltip__popper.is-dark {
  background: #0095ff;
}
.yuancolor1 {
  color: #d40000;
  // background-color: red;
}
.yuancolor2 {
  color: #00b42a;
}
.yuancolor3 {
  color: #777777;
}
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
/deep/.el-dialog__title {
  color: #1890ff;
}
/deep/.el-dialog__body {
  padding: 0;
}
.itemSlotheden {
  width: 89px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.itemSlotheden2 {
  width: 124px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  user-select: unset;//设置允许复制el-button的内容
}

/deep/.el-tooltip__popper {
  border-bottom-color: #e3f1ff;
}

.divffromflex {
  display: flex;
  justify-content: space-between;
}
.fromflexrig {
  display: flex;
  justify-content: space-between;
  .el-form-item {
    margin-bottom: 5px;
  }
}

.aitemml {
  width: 200px;
}
.cardpadmargtop {
  margin-top: 24px;
  //padding-left: 20px;
  width: 100%;
}
// .tabnamewei {
//   width: 90px;
//   overflow: hidden;
//   white-space: nowrap;
//   text-overflow: ellipsis;
// }
.paginationtop {
  margin-top: 30px;
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
/deep/.el-timeline-item__timestamp.is-top {
  margin: 0;
}
.timelineItem {
  background-color: #f8fafb;
  padding: 20px 0;
}
.titleItem {
  font-size: 16px;
  font-weight: 500;
  color: #1890ff;
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
.dialogmarg {
  margin: 32px 40px 0 40px;
}
.centerupload {
  text-align: center;
}
.mbcolor {
  color: #1890ff;
}
.butonqumarg {
  margin-right: 10px;
}
.nodata {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
