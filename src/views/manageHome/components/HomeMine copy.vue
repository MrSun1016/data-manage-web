<template>
  <div>
    <div id="homemine" v-show="!isshowHaredetails">
      <!-- 我的数据目录 -->
      <el-card class="homemine-box">
        <div class="title">
          <div class="left-title">
            <img class="img" src="../../../assets/hometodo.png" alt="" />
            <div style="font-size: 20px">我的数据目录</div>
          </div>
          <div class="right-move" style="cursor: pointer" @click="handleMore">
            <div style="margin-right: 8px">更多</div>
            <i class="el-icon-d-arrow-right"></i>
          </div>
        </div>
        <div class="catalog">
          <div class="catalog-item">数据目录</div>
          <div class="catalog-item">数源应用系统</div>
          <div class="catalog-item">数源部门</div>
          <div class="catalog-item">上架时间</div>
        </div>
        <div style="min-height: 242px; background: #fff; position: relative">
          <div class="no-data" v-show="myCatalogData.length <= 0">暂无数据</div>
          <div class="info" v-for="datas in myCatalogData" :key="datas.id">
            <!-- <el-tooltip :content="datas.catalogName" effect="light" placement="top">
            <div class="catalog-item">{{ datas.catalogName || '-' }}</div>
          </el-tooltip> -->
            <div class="catalog-item" style="color: #1890ff; cursor: pointer" @click="handleCatalogDet(datas)">
              {{ datas.catalogName || '-' }}
            </div>
            <!-- <el-tooltip class="item" effect="light" :content="datas.sourceSystem" placement="top">
            <div class="catalog-item">{{ datas.sourceSystem || '-' }}</div>
          </el-tooltip> -->
            <div class="catalog-item">{{ datas.sourceSystem || '-' }}</div>
            <div class="catalog-item">{{ datas.sourceUnit || '-' }}</div>
            <div class="catalog-item">{{ datas.releaseTime || '-' }}</div>
          </div>
        </div>
      </el-card>
      <!-- 帮助文档 -->
      <el-card class="help-text">
        <div class="title">
          <div class="item">
            <img class="img" src="../../../assets/banshou.png" alt="" />
            <div style="font-size: 20px; margin-left: 8px">帮助文档</div>
          </div>
          <div class="item" style="cursor: pointer" @click="handleHelpMore">
            <div style="margin-right: 8px">更多</div>
            <i class="el-icon-d-arrow-right"></i>
          </div>
        </div>
        <!-- 帮助文档内容 -->
        <div v-if="helpDocData.length > 0" style="min-height: 242px; background: #fff; cursor: pointer">
          <div
            class="help-info"
            v-for="helps in helpDocData"
            :key="helps.title"
            @click="downLoad(helps.uploadFileName)"
          >
            <div style="color: #1890ff"><span v-show="helps.isTop===1" style="color: red;">【置顶】</span>{{ helps.uploadFileName || '-' }}</div>
            <div>{{ helps.releaseTime || '-' }}</div>
          </div>
        </div>
        <div v-else class="no-data">
          <div>暂无数据</div>
        </div>
      </el-card>
    </div>
    <Sharedetails
      ref="sharedetails"
      v-show="isshowHaredetails"
      @goBack="goBack"
      :visible.sync="isshowHaredetails"
    ></Sharedetails>
  </div>
</template>

<script>
import { studyWorldPage, getDictItems, getMyDataPage } from '@/api/api'
import { download } from '@/api/manage'
import Sharedetails from '@/views/datefrom/components/Sharedetails'
export default {
  name: 'homemine',
  components: {
    Sharedetails,
  },
  data() {
    return {
      isshowHaredetails: false,
      todoList: [],
      helpText: [],
      learning: {
        dataName: '',
        id: 0,
        orderByField: '',
        pageNum: 1,
        pageSize: 6,
        rowStart: 0,
        releaseScope: [],
        startDate: '',
        endDate: '',
        uploadFileName: '',
        queryType: 2,
        dataManagementType: '1', //帮助文档
      },
      reqCatalogData: {
        applicationDepartment: '',
        catalogName: '',
        dataType: '',
        openingTime: '',
        orderByField: '',
        orgCode: '',
        pageSize: 5,
        relatedGovernment: '',
        rowStart: 0,
        sourceSystem: '',
        stutas: '',
        userName: '',
      },
      myCatalogData: [],
      helpDocData: [],
      impTemplate: 'data_management_type',
      formInline: {
        catalogName: '',
        sourceSystem: '',
        sourceUnit: '',
        status: '',
        cataStatus: '',
        imputationStatus: '',
        pageNum: 1,
        pageSize: 10,
        rowStart: 0,
      },
      flag: null,
    }
  },
  created() {
    this.fetchDictItems()
    this.fetchWorldPage()
    this.fetchMyDataPage()
  },
  activated(){
    this.isshowHaredetails = false
  },
  methods: {
    goBack(val) {
      console.log(val,'返回按钮')
      this.isshowHaredetails = val
      this.$bus.$emit('handleComponents',this.isshowHaredetails)
    },
    handleCatalogDet(data) {
      this.isshowHaredetails = true
      this.$refs.sharedetails.loading = true
      this.$refs.sharedetails.loading1 = true
      this.$refs.sharedetails.activeName = 'first'
      this.$refs.sharedetails.inquireData.catalogId = data.id
      this.$refs.sharedetails.fetchShareDataPage()
      this.$refs.sharedetails.dateFrom()
      this.$refs.sharedetails.getDetailsLsit(data.id, this.formInline)
      this.$bus.$emit('handleComponents',this.isshowHaredetails)
    },
    fetchMyDataPage() {
      getMyDataPage(this.reqCatalogData).then((res) => {
        if (res.success) {
          this.myCatalogData = res.body.content
          this.myCatalogData.forEach((v) => {
            v.releaseTime = this.formatTime(v.releaseTime, 'hms')
          })
        }
      })
    },
    handleHelpMore() {
      this.$router.push({
        path: '/system/helpdoc',
      })
    },
    handleMore() {
      this.$router.push({
        path: '/datefrom/cataloglist',
      })
    },
    // 从数据字典获取帮助文档code
    fetchDictItems() {
      getDictItems(this.impTemplate).then((res) => {
        if (res.code == 200) {
          let result = res.result.find((v) => {
            return v.text == '帮助文档'
          })
          this.learning.dataManagementType = result.vale
        }
      })
    },
    fetchWorldPage() {
      studyWorldPage(this.learning).then((res) => {
        if (res.success) {
          this.helpDocData = res.body.content
          this.helpDocData.forEach((item, index) => {
            item.releaseTime = this.formatTime(item.releaseTime, 'hms')
          })
        }
      })
    },
    // 文件下载
    downLoad(fileName) {
      // let fileName = this.datas.businessAeview.applyFlieName
      download({ fileName })
        .then((res) => {
          const blob = new Blob([res], {
            type: 'application/json;charset=UTF-8',
          }) // res就是接口返回的文件流
          const link = document.createElement('a') // 创建a标签
          const objectUrl = window.URL.createObjectURL(blob)
          link.href = objectUrl
          link.download = fileName
          link.click()
          window.URL.revokeObjectURL(objectUrl) // 释放内存
        })
        .catch((error) => {
          this.$message.warning('模板导出失败')
        })
    },
  },
}
</script>

<style lang="less" scoped>
#homemine {
  display: flex;
  justify-content: space-between;
  margin-top: 42px;
  .homemine-box {
    width: 66%;
    color: #000;
    .title {
      display: flex;
      height: 52px;
      padding: 0 16px;
      color: #1890ff;
      background: #fff;
      justify-content: space-between;
      .left-title {
        display: flex;
        align-items: center;
      }
      .right-move {
        display: flex;
        align-items: center;
      }
    }
    .info {
      display: flex;
      justify-content: space-between;
      padding: 12px 12px;
    }
    .no-data {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #909399;
    }
  }
  .help-text {
    width: 32%;
    background: #fff;
    position: relative;
    .title {
      display: flex;
      justify-content: space-between;
      background: #e6f7ff;
      height: 52px;
      color: #1890ff;
      padding: 0 12px;
      .item {
        display: flex;
        align-items: center;
      }
    }
    .help-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 12px;
      height: 46px;
      background: #fff;
    }
    .no-data {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  .catalog {
    display: flex;
    justify-content: space-between;
    height: 46px;
    align-items: center;
    padding: 0 12px;
  }
  .catalog-item {
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /deep/.el-card__body{
    padding: 0 0 !important;
  }
}
</style>