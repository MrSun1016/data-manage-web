<template>
  <div id="CatalogueExample">
   <p style="color: red;font-size: 12px;">*号表示该数据已脱敏无法展示</p>
    <!-- <el-table class="tab" :data="tableList" style="width: 100%;" :header-cell-style="{ background: '#E6F7FF', color: '#333333' }">
      <div v-for="(item, index) in titleList" :key="item.code">
        <el-table-column :prop="item.code" :label="item.title">
          <template slot-scope="scope">
            {{ scope.row[item.code] || '-' }}
          </template>
        </el-table-column>
      </div>
    </el-table> -->

    <el-table class="tab" :data="tableList" style="width: 100%;" :header-cell-style="{ background: '#E6F7FF', color: '#333333' }">
      <el-table-column v-for="item in titleList" :label="item.title" :key="item.code">
        <!-- :width="cloumnWidth(index)" -->
        <template slot-scope="scope">
          {{ scope.row[item.code] || '-' }}
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  props: ['catalogDataDetails'],
  name: 'CatalogueExample',
  data() {
    return {
      // 所有数据
      exatableData: {},
      // 表头
      titleList: [],
      // 表体内容
      tableList: []
    }
  },
  mounted() {
    // this.handleCurrentChange()
    this.$bus.$on('onExatableData', val => {
      console.log(val,'-----')
      this.exatableData = val
      this.titleList = val.titleList
      this.tableList = val.tableList
      this.tableList.map((item, index) => {
        item.data_up_time = this.formatTime(item.data_up_time)
        item.sm_gxsj = this.formatTime(item.sm_gxsj)
      })
      // data_up_time
      // sm_gxsj
    })
  }
}
</script>

<style lang="less" scoped>
#CatalogueExample {
  padding: 0 32px;
}
</style>
