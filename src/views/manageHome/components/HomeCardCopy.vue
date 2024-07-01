<template>
  <div id="homecard">
    <el-card class="cards">
      <div class="card-title">数据编目</div>
      <div class="box-info">
        <div class="card-info">
          <div style="font-size: 14px">
            已发布数据目录
            <!-- <img style="width: 10px; margin-left: 8px; margin-bottom: 5px" src="../../../assets/wenhao.png" alt="" /> -->
          </div>
          <div style="font-size: 28px">{{ cardCatalogData.catalogTotal || '0' }}个</div>
        </div>
        <div class="dataForm-box">
          <div class="cusa">
            <img src="../../../assets/shujuku.png" alt="" />
            <div>
              <div>库表</div>
              <div>{{ cardCatalogData.tableTotal || '0' }}</div>
            </div>
          </div>
          <div class="port">
            <!-- <img src="" alt=""> -->
            <img src="../../../assets/jiek.png" alt="" />
            <div>
              <div>接口</div>
              <div>{{ cardCatalogData.interfaceTotal || '0' }}</div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="cards">
      <div class="card-title">数据归集</div>
      <div class="box-info">
        <div class="card-info">
          <div style="font-size: 14px">
            已归集数据目录
            <!-- <img style="width: 10px; margin-left: 8px; margin-bottom: 5px" src="../../../assets/wenhao.png" alt="" /> -->
          </div>
          <div style="font-size: 28px">
            <span>{{ cardCollectionData.uploadTotal || '0' }}/</span
            ><span style="font-size: 14px">{{ cardCollectionData.wholeTotal || '0' }}</span
            >个
          </div>
        </div>
        <div class="count-box">
          <div class="two-title">归集数据量</div>
          <div class="two-count">{{ cardCollectionData.collection || '0' }}条</div>
        </div>
      </div>
    </el-card>
    <!-- 数据共享 -->
    <el-card class="cards-share">
      <div class="left">
        <div class="share-title">数据共享</div>
        <div class="share-info">
          <div class="left-box">
            <div class="left-title">已共享数据目录</div>
            <div class="df">
              <div class="left-count">{{ catalogShare.sharedDataDirectory || '0' }}个</div>
              <img src="../../../assets/home-Top.png" alt="" />
            </div>
          </div>
          <div class="mid-box">
            <div class="mid-top-box">
              <div style="display: flex">
                <div class="mid-title">已共享批量数据</div>
                <!-- <img class="wenhao" src="../../../assets/wenhao.png" alt="" /> -->
              </div>
              <div class="mid-count">{{ catalogShare.sharedBatchData || '0' }}个</div>
            </div>
            <div class="mid-top-box">
              <div style="display: flex">
                <div class="mid-title">已共享服务接口</div>
                <!-- <img class="wenhao" src="../../../assets/wenhao.png" alt="" /> -->
              </div>
              <div class="mid-count">{{ catalogShare.sharedServiceInterface || '0' }}个</div>
            </div>
          </div>
          <div class="share-gross">
            <div style="text-align: center">
              <div>共享数据量</div>
              <div style="font-size: 22px">{{ catalogShare.sharedDataVolume || '0' }}条</div>
            </div>
            <div>
              <div style="text-align: center">接口调用量</div>
              <div style="font-size: 22px; text-align: center">{{ catalogShare.interfaceAmount || '0' }}条</div>
            </div>
          </div>
          <div class="circle">
            <el-progress
              type="circle"
              style="z-index: 999"
              :width="108"
              :stroke-width="10"
              :percentage="catalogShare.interfaceSuccessRate"
            ></el-progress>
            <div style="text-align: center; color: #000000; margin-top: 10px; font-weight: 500">接口调用成功率</div>
            <!-- 进度条背景 -->
            <div class="circle-background"></div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getDataCataloging, getDataCollection, getDataApply } from '@/api/api'
export default {
  name: 'homecard',
  data() {
    return {
      // 数据编目请求参数
      dataCatalogingBo: {
        catalogStatus: 0,
        catalogTotal: 0,
        dataFormat: '',
        deptId: '',
        interfaceTotal: 0,
        tableTotal: 0,
        type: '',
      },
      // 数据目录请求参数
      dataCollectionBo: {
        catalogId: '',
        collection: 0,
        deptId: '',
        id: '',
        totalNum: 0,
        uploadTotal: 0,
        wholeTotal: 0,
      },
      cardCatalogData: {},
      cardCollectionData: {},
      catalogShare: {},
    }
  },
  activated() {
    this.fetchDataCataloging()
    this.fetchDataCollection()
    this.fetchDataApply()
  },
  methods: {
    // 数据编目
    fetchDataCataloging() {
      getDataCataloging(this.dataCatalogingBo).then((res) => {
        if (res.success){
          this.cardCatalogData = res.body
          this.cardCatalogData.catalogTotal = this.formatNumber(this.cardCatalogData.catalogTotal)
          this.cardCatalogData.tableTotal = this.formatNumber(this.cardCatalogData.tableTotal)
          this.cardCatalogData.interfaceTotal = this.formatNumber(this.cardCatalogData.interfaceTotal)
        }
      })
    },
    // 数据归集
    fetchDataCollection() {
      getDataCollection(this.dataCollectionBo).then((res) => {
        if (res.success) {
          this.cardCollectionData = res.body
          this.cardCollectionData.uploadTotal = this.formatNumber(this.cardCollectionData.uploadTotal)
          this.cardCollectionData.wholeTotal = this.formatNumber(this.cardCollectionData.wholeTotal)
          this.cardCollectionData.collection = this.formatNumber(this.cardCollectionData.collection)
        }
      })
    },
    // 数据共享
    fetchDataApply() {
      getDataApply().then((res) => {
        if (res.success) {
          this.catalogShare = res.body
          this.catalogShare.sharedDataDirectory = this.formatNumber(this.catalogShare.sharedDataDirectory)
          this.catalogShare.sharedBatchData = this.formatNumber(this.catalogShare.sharedBatchData)
          this.catalogShare.sharedDataVolume = this.formatNumber(this.catalogShare.sharedDataVolume)
          this.catalogShare.interfaceAmount = this.formatNumber(this.catalogShare.interfaceAmount)
          if (this.catalogShare.interfaceSuccessRate == null) this.catalogShare.interfaceSuccessRate = 0
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
#homecard {
  display: flex;
  margin-top: 40px;
  justify-content: space-between;
  .cards {
    color: #000000;
    width: 23%;
    // height: 259px;
    background: #fff;
  }
  .card-title {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    color: #1890ff;
    background: #e6f7ff;
  }
  .box-info {
    padding: 24px 0;
    .card-info {
      text-align: center;
    }
    .dataForm-box {
      display: flex;
      height: 48px;
      margin-top: 24px;
      justify-content: space-around;
      text-align: center;
      .cusa {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        font-size: 14px;
        border-right: 1px solid #d9d9d9;
        img {
          width: 44px;
          margin-right: 8px;
        }
      }
      .port {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        font-size: 14px;
        img {
          width: 44px;
          margin-right: 8px;
        }
      }
    }
    .count-box {
      margin-top: 24px;
      text-align: center;
      .two-count {
        font-size: 20px;
      }
    }
  }
  .cards-share {
    width: 50%;
    .share-title {
      height: 60px;
      line-height: 60px;
      padding-left: 20px;
      color: #1890ff;
      background: #e6f7ff;
    }
    .share-info {
      display: flex;
      justify-content: space-around;
      color: #000000;
      height: 200px;
      background: #fff;
      .left-box {
        margin-top: 70px;
        .left-title {
        }
        .df {
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: space-between;
          .left-count {
            font-size: 22px;
          }
          img {
            width: 23px;
            height: 32px;
          }
        }
      }
      .mid-box {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .mid-top-box {
          .mid-count {
            text-align: center;
            font-size: 22px;
          }
        }
      }
      .share-gross {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
      }
      .circle {
        margin-top: 15px;
        position: relative;
      }
    }
  }
  .wenhao {
    width: 10px;
    height: 10px;
    margin-top: 5px;
    margin-left: 8px;
  }
  .circle-background {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    background: #c7dcfb;
    position: absolute;
    bottom: 87px;
    left: 10px;
  }
  /deep/ .el-progress path:first-child {
    // 修改进度条背景色
    stroke: #fff;
  }
  /deep/.el-card__body{
    padding: 0 0 !important;
  }
}
</style>