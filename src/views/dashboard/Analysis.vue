<template>

  <div style="">
    <water-parmeter-key ref='waterParmeterRef' v-if="$store.getters.orgData.orgCategory==4" />
    <!-- <prameter-key ref='prameterKeyRef' v-else></prameter-key> -->
  </div>
</template>

<script>
// import prameterKey from '@/views/prameterKey/prameterKey'
// import waterParmeterKey from '@/views/prameterKey/waterCompany/waterParmeterKey'
import { reloadMixin } from '@/mixins/reloadMixin.js'
  import Vue from 'vue'
  export default {
    mixins:[reloadMixin],
    name: "Analysis",
    components: {
      // prameterKey,
      // waterParmeterKey
    },
    data() {
      return {
        // $store.getters.orgData.orgCategory==4
        orgCategory: {}
      }
    },

    created() {
     
    },
    mounted(){
      this.orgCategory=Vue.ls.get('ORG_DATA').orgCategory
    },

    methods: {
      reloadInit(e){
        // let reloadType=false
        // if(this.orgCategory!=4&&e.orgCategory){
        //   reloadType=true
        // }
     
        this.orgCategory=e.orgCategory
        this.$nextTick(item=>{
          if(e.orgCategory==4&&this.$refs.waterParmeterRef){
            this.$refs.waterParmeterRef.reloadInit(e)
          }
        })

      }

    }
  }
</script>