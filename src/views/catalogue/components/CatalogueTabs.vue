<template>
  <div id="CatalogueTable">
    <el-tabs class="tabs" v-model="catalogueTableName">
      <el-tab-pane label="库表" name="cusa" :disabled="disabled1">
        <CatalogueCusa :catalogDataDetails="catalogDataDetails" />
      </el-tab-pane>
      <el-tab-pane label="接口" name="prot" :disabled="disabled2">
        <CataloguePort :catalogDataDetails="catalogDataDetails" :shareApiInfo="shareApiInfo" />
      </el-tab-pane>
      <el-tab-pane label="数据示例" name="example" :disabled="disabled3">
        <CatalogueExample :catalogDataDetails="catalogDataDetails" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CatalogueExample from '@views/catalogue/components/CatalogueExample'
import CataloguePort from '@views/catalogue/components/CataloguePort'
import CatalogueCusa from '@views/catalogue/components/CatalogueCusa'
export default {
  props: ['catalogDataDetails', 'dataFormat','shareApiInfo'],
  name: 'CatalogueTable',
  components: {
    CatalogueCusa,
    CataloguePort,
    CatalogueExample,
  },
  data() {
    return {
      catalogueTableName: 'prot',
      disabled1: false,
      disabled2: false,
      disabled3: false,
    }
  },
  created() {},
  activated() {
    // this.initTabs()
  },
  mounted() {
    ;(this.interfaceIsMount = this.$route.query.interfaceIsMount), (this.tableIsMount = this.$route.query.tableIsMount)
    ;(this.isHistory = this.$route.query.isHistory), (this.relatedGovernment = this.$route.query.relatedGovernment)
    this.initTabs()
  },
  methods: {
    initTabs() {
      // let currentName = this.$route.query.dataFormat
      //是历史数据且是事项主线目录
      if (this.isHistory == '1' && this.relatedGovernment == '是') {
        this.catalogueTableName = 'cusa'
        // 库表
        this.disabled1 = false
        // 接口
        this.disabled2 = true
        // 数据示例
        this.disabled3 = true
        // 接口
      } else if (this.interfaceIsMount == '1' && this.tableIsMount == '1') {
        this.catalogueTableName = 'cusa'
        this.disabled1 = false
        this.disabled2 = false
        this.disabled3 = false
        // 库表-excel
      } else if (this.tableIsMount == '1') {
        this.catalogueTableName = 'cusa'
        // 库表
        this.disabled1 = false
        // 接口
        this.disabled2 = true
        // 数据示例
        this.disabled3 = false
        // 数据示例
      } else if ( this.interfaceIsMount == '1') {
        this.catalogueTableName = 'prot'
        // 库表
        this.disabled1 = true
        // 接口
        this.disabled2 = false
        // 数据示例
        this.disabled3 = true
      }else if (this.interfaceIsMount == null && this.tableIsMount == null) {//针对事项主线目录历史数据
        this.catalogueTableName = ' '
        this.disabled1 = true
        this.disabled2 = true
        this.disabled3 = true
      } else if (this.interfaceIsMount != '1' && this.tableIsMount != '1') {
        this.catalogueTableName = ' '
        this.disabled1 = true
        this.disabled2 = true
        this.disabled3 = true
      }
    },
  },
}
</script>

<style lang="less" scoped>
#CatalogueTable {
  background: #fff;
  /deep/.el-tabs__nav-scroll {
    padding: 0 32px;
  }
  /deep/.el-tabs__nav-wrap::after {
    border-bottom: 1px solid #1890ff;
  }
}
</style>