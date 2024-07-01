<template>
  <div id="CatalogueTable">
    <!-- 头部 -->
    <div class="table-header">
      <label>
        <div class="items" @click="handleCataloguesSort('时间')" style="fontweight: 500">
          更新时间
          <i class="icons-items"
            ><i :class="{ active: timeSortAct === 2 }" class="el-icon-caret-bottom"></i
            ><i :class="{ active: timeSortAct === 1 }" class="el-icon-caret-top"></i
          ></i>
        </div>
      </label>
      <label>
        <div class="items" @click="handleCataloguesSort('归集')" style="fontweight: 500">
          归集量
          <i class="icons-items"
            ><i :class="{ active: catalogSort === 2 }" class="el-icon-caret-bottom"></i
            ><i :class="{ active: catalogSort === 1 }" class="el-icon-caret-top"></i
          ></i>
        </div>
      </label>
      <label>
        <div class="items" @click="handleCataloguesSort('浏览')" style="fontweight: 500">
          浏览量
          <i class="icons-items"
            ><i :class="{ active: browseSort === 2 }" class="el-icon-caret-bottom"></i
            ><i :class="{ active: browseSort === 1 }" class="el-icon-caret-top"></i
          ></i>
        </div>
      </label>
      <!-- <el-button type="text" class="items" style="fontWeight: 500">数据目录{{ total }}个</el-button> -->
    </div>
    <!-- 头部End -->
    <!-- 内容区 -->
    <div class="table-content" v-if="catalogueTableData.length" v-loading="tableLoading">
      <div v-for="item in ListSort" :key="item.id">
        <div class="content-left">
          <div class="info">
            <div class="info-items">
              <span
                style="color: #333333; margin-right: 40px; cursor: pointer; fontweight: 600"
                @click="goCatalogueDetail(item)"
                >{{ item.catalogName || '-' }}</span
              >
              <el-tag v-if="typeof item.dataRange == 'string'" class="tag" size="mini">
                {{ item.dataRange || '-' }}
              </el-tag>

              <el-tag v-else class="tag" v-for="tagsRange in item.dataRange" :key="tagsRange" size="mini">
                {{ tagsRange || '-' }}
              </el-tag>
              <!-- <el-tag class="tag" size="mini" v-for="dataRanges in dataRanges" :key="dataRanges">{{
                dataRanges == '[]' ? '-' : 'dataRanges'
              }}</el-tag> -->
            </div>
            <div class="info-items">
              <span>重点领域：</span> <span>{{ item.keyAreasType || '-' }}</span>
            </div>
            <div class="info-items">
              <span>数源单位：</span> <span>{{ item.sourceUnit || '-' }}</span>
            </div>
            <div class="info-items">
              <span>{{ item.upOrRelease }}：</span> <span>{{ item.releaseTime || '-' }}</span>
            </div>
            <div class="info-items" style="color: #333333">
              <span style="margin-right: 10px" v-show="item.shareType">{{ item.shareType }}</span>
              <span style="margin-right: 10px">浏览量：{{ item.viewNum }}</span>
              <span>归集量：{{ item.notionalPoolingNum || '0' }}</span>
            </div>
          </div>
          <div class="btns">
            <el-button
              v-login
              v-if="item.interfaceIsMount == '1'"
              type="primary"
              size="small"
              @click="handeleDrawer('接口', item)"
              style="margin-bottom: 20px"
              ><img style="margin-right: 8px" src="~@assets//port.png" alt="" />申请接口</el-button
            >

            <el-button
              v-login
              :disabled="item.isHide"
              v-if="item.interfaceIsMount != '1' && item.tableIsMount != '1'"
              type="text"
              class="piliangbut"
              @click="onApplyForCollection(item.id)"
            >
              申请归集
            </el-button>
            <el-button
              v-login
              v-if="item.tableIsMount == '1'"
              type="primary"
              size="small"
              @click="handeleDrawer('库表', item)"
              ><img style="margin-right: 8px" src="~@assets/cusa.png" alt="" /> 申请库表</el-button
            >
          </div>
        </div>
        <!-- <el-divider></el-divider> -->
      </div>
    </div>
    <div class="divdata" v-else><p>暂无数据</p></div>
    <!-- <div v-show="loading">数据正在加载中...</div> -->
    <!-- 申请接口-库表 -->
    <CatalogueDrawer ref="drawer" />
    <!-- 申请归集弹窗 -->
    <ApplyForCollectionDialog ref="dialog" />
  </div>
</template>

<script>
import { getDataUseInfo } from '@/api/api'
import CatalogueDrawer from '@views/catalogue/components/CatalogueDrawer'
import ApplyForCollectionDialog from '@views/catalogue/components/ApplyForCollectionDialog'
export default {
  name: 'CatalogueTable',
  components: {
    CatalogueDrawer,
    ApplyForCollectionDialog,
  },
  props: ['catalogueTableData', 'serviceName'],
  data() {
    return {
      tableLoading: false,
      timeSortAct: 1,
      catalogSort: 0,
      browseSort: 0,
      dataRanges: [],
      dataRangeList: [],
      dataRangeItem: '',
      sortType: '',
    }
  },
  activated() {
    // 初始化排序
    this.initSort()
  },
  mounted() {},
  computed: {
    ListSort() {
      if (this.sortType == '浏览') {
        return this.browseSort == 0
          ? this.catalogueTableData
          : this.browseSort == 1
          ? this.catalogueTableData.slice().sort((x, y) => y.viewNum - x.viewNum)
          : this.catalogueTableData.slice().sort((x, y) => x.viewNum - y.viewNum)
      } else if (this.sortType == '归集') {
        return this.catalogSort == 0
          ? this.catalogueTableData
          : this.catalogSort == 1
          ? this.catalogueTableData.slice().sort((x, y) => y.notionalPoolingNum - x.notionalPoolingNum)
          : this.catalogueTableData.slice().sort((x, y) => x.notionalPoolingNum - y.notionalPoolingNum)
      } else if (this.sortType == '时间') {
        return this.timeSortAct == 0
          ? this.catalogueTableData
          : this.timeSortAct == 1
          ? this.catalogueTableData.slice().sort((x, y) => y.updateTime - x.updateTime)
          : this.catalogueTableData.slice().sort((x, y) => x.updateTime - y.updateTime)
      }
    },
  },
  methods: {
    initSort() {
      let type = this.$route.query.type
      if (type) {
        this.sortType = type
        this.handleCataloguesSort(type)
      } else {
        this.sortType = '时间'
        this.browseSort = 0
        this.catalogSort = 0
        this.timeSortAct = 0
        this.handleCataloguesSort(this.sortType)
      }
    },
    onApplyForCollection(id) {
      this.$refs.dialog.collectionDialog = true
      this.$refs.dialog.catalogId = id
    },
    handleCataloguesSort(sortType) {
      this.sortType = sortType
      if (this.sortType == '浏览') {
        this.browseSort++
        this.catalogSort = 0
        this.timeSortAct = 0
        if (this.browseSort > 2) this.browseSort = 1
      } else if (this.sortType == '归集') {
        this.browseSort = 0
        this.timeSortAct = 0
        this.catalogSort++
        if (this.catalogSort > 2) this.catalogSort = 1
      } else if (this.sortType == '时间') {
        this.browseSort = 0
        this.catalogSort = 0
        this.timeSortAct++
        if (this.timeSortAct > 2) this.timeSortAct = 1
      }
    },
    goCatalogueDetail(itemData) {
      this.$router.push({
        path: '/catalogue/datacatalogue/details',
        query: {
          id: itemData.id,
          interfaceIsMount: itemData.interfaceIsMount,
          tableIsMount: itemData.tableIsMount,
          serviceName: this.serviceName,
          isHide: itemData.isHide,
          dataFormat: itemData.dataFormat,
        },
      })
      localStorage.setItem('catalogName', itemData.catalogName)
      let catalogId = itemData.id
      // let catalogId = "307020400930030000/000085"
      getDataUseInfo(catalogId).then((res) => {
        if (res.success) {
          this.$bus.$emit('onExatableData', res.body)
        }
      })
    },
    handeleDrawer(title, item) {
      this.$refs.drawer.catalogId = item.id
      this.$refs.drawer.catalogName = item.catalogName
      this.$refs.drawer.title = title
      this.$refs.drawer.drawer = true
      this.$refs.drawer.interfaceInit()
      if (title == '库表') this.$refs.drawer.fetchDataItemInfo()
      else return
    },
  },
}
</script>

<style lang="less" scoped>
#CatalogueTable {
  .table-header {
    height: 48px;
    color: #333333;
    display: flex;
    align-items: center;
    background: #e6f7ff;
    .items {
      margin-left: 36px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .icons-items {
        display: flex;
        flex-direction: column-reverse;
        color: #bfbfbf;
        margin-left: 11px;
        .el-icon-caret-bottom {
          margin-top: -8px;
        }
      }
    }
  }
  .table-content {
    .content-left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 33px 0 32px;
      background-color: #fff;
      .info-items {
        margin: 10px 0;
      }
      .tag {
        // margin-right: 16px;
        border-radius: 10px;
        padding: 0 12px;
        text-align: center;
      }
      .btns {
        width: 108px;
        display: flex;
        flex-direction: column;
        .piliangbut {
          // height: 36px;
          margin-bottom: 10px;
          border-radius: 4px;
          border: 1px solid #1890ff;
          color: #1890ff;
          font-size: 14px;
        }
        /deep/.el-button + .el-button {
          margin-left: 0px !important;
        }
      }
    }
  }
  .divdata {
    width: 100%;
    margin-top: 80px;
    p {
      font-size: 16px;
      color: darkgrey;
      text-align: center;
    }
  }
  .small-mask-info {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .title {
    height: 60px;
    color: #1890ff;
    line-height: 60px;
    padding-left: 32px;
    font-weight: 500;
    border-bottom: 1px solid #1890ff;
  }

  /deep/ .el-dialog__body {
    padding: 0 0;
  }
  /deep/ .el-dialog__header {
    padding: 0 0;
  }
  .deletmarg {
    margin-right: 20px;
  }
}
/deep/.el-divider--horizontal {
  margin: 0;
}
.active {
  color: #1890ff;
}
</style>
