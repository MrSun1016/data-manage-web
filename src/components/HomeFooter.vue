<template>
  <div id="homefooter">
    <div class="footer-content">
      <div>版权所有：孝感市政务服务和大数据管理局</div>
      <div>技术支持：杭州数澜科技有限公司</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homefooter',
}
</script>

<style lang="less" scoped>
#homefooter {
  height: 81px;
  background: #1890ff;
  .footer-content {
    width: 800px;
    font-size: 20px;
    margin: 0 auto;
    display: flex;
    height: 100%;
    color: #fff;
    justify-content: space-between;
    align-items: center;
  }
}
</style>