<template>
  <div class="pagination-page">
    <a-pagination
      v-model="paging.current"
      :total="paging.total"
      :page-size="paging.size"
      :page-size-options="paging.sizeOptions"
      show-size-changer
      show-quick-jumper
      @showSizeChange="onShowSizeChange"
      @change="onChange"
      class="pagination"
    >
      <template slot="buildOptionText" slot-scope="props">
        <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
        <span v-if="props.value === '50'">全部</span>
      </template>
    </a-pagination>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Pagination',
  components: {
    
  },
  props:{
    paging:{
      type:Object,
      default:{}
    }
  },
  mixins: [],
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  created () {
    
  },
  methods: {
    // 页面设置变化
    onShowSizeChange(current, pageSize) {
      this.$emit('pageChange',current,pageSize)
      this.paging.size = pageSize;
    },
    // 页面跳转
    onChange(pageNumber){
      this.$emit('pageChange',pageNumber,this.paging.size)
    },
  }
}

</script>

<style lang="less" scoped>
.pagination-page{
  // 分页信息
  .pagination{
    position: absolute;
    bottom:20px;
    left:50% - 25px
  }
}
</style>
