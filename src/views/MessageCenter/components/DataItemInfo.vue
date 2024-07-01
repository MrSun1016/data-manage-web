<template>
  <div id="dataItemInfo" style="width:100%;">
      <el-table v-show="!disable" :data="datas.tableDataDataList" :header-cell-style="{ background: '#E6F7FF' }" style="width:100%;">
        <el-table-column prop="name" label="中文名称">
          <template slot-scope="{ row }">
            {{ row.name || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="enName" label="英文名称">
          <template slot-scope="{ row }">
            {{ row.enName || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="dataLength" label="数据长度">
          <template slot-scope="{ row }">
            {{ row.dataLength }}
          </template>
        </el-table-column>
        <el-table-column prop="shareProperty" label="共享属性">
          <template slot-scope="{ row }">
            {{ row.shareProperty || '-' }}
          </template>
        </el-table-column>

        <el-table-column prop="openAttribute" label="开放属性">
          <template slot-scope="{ row }">
            {{ row.openAttribute || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="primaryKey" label="是否主键">
          <template slot-scope="{ row }">
            {{ row.primaryKey || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="nullValue" label="是否可为空" width="120px">
          <template slot-scope="{ row }">
            {{ row.nullValue || '-' }}
          </template>
        </el-table-column>
      </el-table>
    <p class="foldss" @click="handleTableShow">{{ this.disable ? '展开' : '收起' }}</p>
  </div>
</template>

<script>
export default {
  name: 'dataItemInfo',
  props: {
    datas: {
      type: Object
    }
  },
  data() {
    return {
      disable: false
    }
  },
  methods: {
    handleTableShow() {
      this.disable = !this.disable
    }
  }
}
</script>

<style lang="less" scoped>
#dataItemInfo {
  background: #f8fafb;
  // padding-bottom: 30px;
  // position: relative;
}
.foldss {
  position: absolute;
  right: 15px;
  // right: 0px;
  // bottom: -5px;
  cursor: pointer;
  z-index: 99;
}
/deep/.el-table__row {
  background: rgba(24, 144, 255, 0.12);
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
  background: rgba(24, 144, 255, 0.12);
}
</style>
