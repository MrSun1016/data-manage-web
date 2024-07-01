<template>
    <!-- <OpenPlatformHeader /> -->
    <div class="usageDataCard">
      <div class="content-box">
        <div class="flex-box">
          <i class="el-icon-back" @click="goBack" style="font-size:24px;cursor: pointer;margin-right: 36px;"></i>
          <div class="basic-title">基本信息</div>
        </div>
        <div class="basic-info-content">
          <div class="content-left leftmargin">
            <div class="left-title" style="color: #333333">
              <p class="items">目录名称：</p>
              <p class="items">数据格式：</p>
              <p class="items">更新周期：</p>
              <p class="items">信息资源摘要：</p>
            </div>
            <div class="right-info" style="width: 300px">
              <p class="items-info">{{ serviceData.catalogName || '-' }}</p>
              <p class="items-info">{{ serviceData.dataFormat || '-' }}</p>
              <p class="items-info">{{ serviceData.updateFrequency || '-' }}</p>
              <p class="items-info">{{ serviceData.informationSummary || '-' }}</p>
            </div>
          </div>
          <div class="content-mid">
            <div class="mid-fix" style="display: flex; margin-right: 205px">
              <div class="left-title" style="color: #333333; flex-direction: column">
                <p class="items">数源单位：</p>
                <p v-if="serviceData.dataFormat!='接口'" class="items">库表类型：</p>
                <p class="items">更新日期：</p>
              </div>
              <div class="right-info">
                <p class="items-info">{{ serviceData.sourceUnit || '-' }}</p>
                <p v-if="serviceData.dataFormat!='接口'" class="items-info">{{ serviceData.databaseTableType || '-' }}</p>
                <p class="items-info">{{ serviceData.updateTime || '-' }}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <!-- 下面的tabs做判断，根据表格的库表或接口选择 -->
          <Interface v-if="shareType == '接口'" :shareApiInfo="shareApiInfo" />
          <LibraryTable v-else :serviceData="serviceData" />
        </div>
      </div>
    </div>
</template>
<script>
import OpenPlatformHeader from '@/components/page/OpenPlatformHeader'
import LibraryTable from '@views/share/components/LibraryTable'
import Interface from '@views/share/components/Interface'
import { getDataUseInfo, getDataUseApiInterfaceInfo } from '@/api/api'
import { Message } from 'element-ui'
export default {
  name: 'InformationUsageData',
  components: {
    OpenPlatformHeader,
    LibraryTable,
    Interface,
  },
  data() {
    return {
      serviceData: {},
      shareApiInfo: {},
      shareType: '',
    }
  },
  activated(){
   
  },
  created() {
    this.shareType = this.$route.query.shareType
    let catalogId = this.$route.query.catalogId
    getDataUseApiInterfaceInfo(catalogId).then((res) => {
      if (res.success) {
        this.shareApiInfo = res.body
      }
    })
    getDataUseInfo(catalogId).then((res) => {
      if (res.success) {
        this.serviceData = res.body
        this.serviceData.updateTime = this.formatTime(this.serviceData.updateTime,'hms')
        this.serviceData.tableList.forEach((item) => {
          if(item.createTime !='' || item.datetime_field !='' || item.timestamp_field !='')
          item.createTime = this.formatTime(item.createTime,'hms')
          item.datetime_field = this.formatTime(item.datetime_field,'hms')
          item.timestamp_field = this.formatTime(item.timestamp_field,'hms')
        })
      } else {
        Message.error(res.header.message)
      }
    })
  },
  methods: {
    goBack() {
      this.$router.back()
    },
  },
}
</script>

<style lang="less" scoped>
.usageDataCard {
  // margin: 24px;
}
/deep/.el-card__body {
  padding: 0;
}
.content-box {
  background: #fff;
  .flex-box {
    display: flex;
    height: 60px;
    padding: 0 32px;
    // justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #1890ff;
    .basic-title {
      color: #1890ff;
      font-weight: 600;
    }
  }
  .basic-info-content {
    display: flex;
    padding: 32px;
    .content-left {
      width: 50%;
      display: flex;
    }
  }
  .items {
    width: 180px;
    color: #333333;
  }
  .items-info {
    color: #777777;
  }
}
</style>
