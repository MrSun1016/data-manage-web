<template>
  <div>
    <el-card
      ><p class="jibentop">编目日志</p>
      <el-divider class="pdivider"></el-divider>
    </el-card>
    <el-card> </el-card>
  </div>
</template>
<script>
export default {
  name: 'Cataloglog',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.jibentop {
  font-size: 16px;
  font-weight: 600;
  color: #1890ff;
}
.pdivider {
  margin: 15px 0;
}
::v-deep .el-divider {
  background-color: #1890ff;
}
</style>
