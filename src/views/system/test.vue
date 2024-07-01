<!--  -->
<template>
  <div>
    <a-card :bordered="false">
      <!-- table区域-begin -->
      <div>
        <a-table ref="table" bordered size="middle" rowKey="id" :columns="columns" :dataSource="dataSource"> </a-table>
      </div>
    </a-card>
  </div>
</template>

<script>
import { deleteAction, postAction, getAction } from '@/api/manage'
export default {
  data () {
    return {
      columns: [     
          {
            title: '部门',
            align: "center",
            width: 180,
            dataIndex: 'departName'
          },
          {
            title: '状态',
            align: "center",
            width: 80,
            dataIndex: 'delFlag_dictText',
            scopedSlots: {customRender: 'status'},
          },
          {
            title: '创建日期',
            align: "center",
            width: 100,
            dataIndex: 'createTime'
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: {customRender: 'action'},
            align: "center",
            width: 170
          }

        ],
      dataSource:[],
      url: {
        queryList: "/sys/sysDepart/queryList"
      }
    };
  },

  components: {},

  computed: {},

  mounted () {
    getAction(this.url.queryList).then(res => {
        if(res){
          const {result} =res
          this.dataSource=result.records
        }
    })
  },

  methods: {}
}

</script>
<style lang='less' scoped>
</style>