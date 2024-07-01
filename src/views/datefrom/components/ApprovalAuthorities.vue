<template>
  <div class="approval">
    <div style="margin-bottom: 5px" class="timelineFlex">
      <div class="timelineDivwei">说明：</div>
      <span style="color:#666">{{ upShelfProcess.applyRemark || '-' }}</span>
    </div>
    <div style="margin-bottom: 5px" class="timelineFlex">
      <div class="timelineDivwei">审批结果：</div>
      <span>{{ upShelfProcess.approvalResult || '-' }}</span>
    </div>
  </div>
</template>
<script>
import { geApprovalData } from '@/api/api'
export default {
  name: 'upShelfProcess',
  props: ['upShelfProcess'],
  data() {
    return {}
  },
  methods: {
    // getApproval(row, shareHistory) {
    //   let processCode = ''
    //   let taskNameId = ''
    //   let processDefinitionKey
    //   // if()
    //   // 目录新增审核：catalogSubmit
    //   // 目录上架审核：catalogUpShelf
    //   // 目录下架审核：catalogOffShelf
    //   // 目录共享审核：shareApply
    //   geApprovalData(row.id, processDefinitionKey, processCode, taskNameId).then(res => {
    //     if (res.success) {
    //       this.datas = res.body
    //       console.log('datas', this.datas)
    //     }
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
.approval {
  display: flex;
  flex-direction: column;
  .timelineFlex {
    display: flex;
    .timelineDivwei {
      width: 120px;
      //   color: #333333;
      font-size: 14px;
      margin: 0 15px 10px 0;
    }
    .timelineDivwei2 {
      width: 120px;
      //   color: #333333;
      font-size: 14px;
    }
  }
}
</style>
