<template>
  <div id="CatalogueCusa">
    <div class="info-top">
      <div class="top-left">
        <div class="left-title">
          <p class="titles">数据库名：</p>
          <p class="titles">更新频率：</p>
        </div>
        <div class="right-info">
          <p class="items">{{ catalogDataDetails.databaseName || '-' }}</p>
          <p class="items">{{ catalogDataDetails.updateFrequency || '-' }}</p>
        </div>
      </div>
      <div class="top-right">
        <div class="right-title">
          <p class="titles">库类型：</p>
          <p class="titles">最近更新时间：</p>
        </div>
        <div class="right-info">
          <p class="items">{{ catalogDataDetails.databaseType || '-' }}</p>
          <p class="items">{{ catalogDataDetails.updateTime || '-' }}</p>
        </div>
      </div>
      <div class="top-right">
        <div class="right-title">
          <p class="titless">表名：</p>
        </div>
        <div class="right-info">
          <p class="items">{{ catalogDataDetails.bmCatalogDataSource.tableName || '-' }}</p>
        </div>
      </div>
    </div>
    <!-- <div>暂无数据</div> -->
    <div>
      <el-table
        class="tab"
        :data="catalogDataDetails.dataList"
        :header-cell-style="{ background: '#E6F7FF', color: '#333333' }"
      >
        <el-table-column label="序号" type="index"> </el-table-column>
        <el-table-column prop="name" label="中文名称">
          <template slot-scope="{ row }">
            {{ row.name || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="engName" label="英文名称">
          <template slot-scope="{ row }">
            {{ row.enName || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="dataType" label="数据类型">
          <template slot-scope="{ row }">
            {{ row.dataType || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="dataLength" label="数据长度">
          <template slot-scope="{ row }">
            {{ row.dataLength || '-' }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="dataDictionary" label="数据字典项">
          <template slot-scope="{ row }">
            {{ row.dataDictionary || '-' }}
          </template>
        </el-table-column> -->
        <el-table-column prop="dataLevel" label="数据级别">
          <template slot-scope="{ row }">
            {{ row.dataLevel || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="defaultValue" label="默认值">
          <template slot-scope="{ row }">
            {{ row.defaultValue || '-' }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['catalogDataDetails'],
  name: 'CatalogueCusa',
  data() {
    return {
      dataList:''
    }
  },
  watch:{
    catalogDataDetails(newVal){
      newVal.updateTime =  this.formatTime(newVal.updateTime)
      this.dataList = newVal.dataList
    }
  }
}
</script>

<style lang="less" scoped>
#CatalogueCusa {
  padding: 0 32px;
  .info-top {
    display: flex;
    .top-left {
      display: flex;
      //   padding: 0 32px;
      margin-right: 50px;
    }
    .top-right {
      display: flex;
      margin-right: 50px;
    }
    .titles {
      width: 110px;
    }
    .titless {
      width: 70px;
    }
    .items {
      width: 180px;
      color: #777777;
    }
  }
  //   .tab{
  //     padding: 0 20px;
  //   }
}
</style>