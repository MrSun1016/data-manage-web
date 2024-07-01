<template>
  <div id="CatalogueHead" style="overflow-y: auto;">
    <!-- 头部 -->
    <div class="header">
      <i class="el-icon-back" @click="goBack" style="font-size: 24px; margin: 0 30px; cursor: pointer"></i>
      <span style="vertical-align: super">{{catalogName}}</span>
    </div>
    <CatalogueDataDetails />
  </div>
</template>

<script>
  import CatalogueDataDetails from "@views/catalogue/components/CatalogueDataDetails";
export default {
  name: 'CatalogueHead',
  components:{
    CatalogueDataDetails
  },
  data() {
    return {
      catalogName:'',
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
  },
  activated(){
    // this.catalogName =  localStorage.getItem('catalogName')
  },  
  mounted(){
    this.catalogName =  localStorage.getItem('catalogName')
  },
}
</script>

<style lang="less" scoped>
@theme-color: #1890ff;
#CatalogueHead {
  padding: 24px 24px;
  height: calc(100vh - 64px);
  .header {
    height: 62px;
    line-height: 62px;
    background: #fff;
    color: @theme-color;
    margin-bottom: 24px;
  }
}
</style>