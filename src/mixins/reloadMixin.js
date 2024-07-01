import { mapState } from "vuex";
import reloadBus from '@/mixins/reloadBus'
import Vue from 'vue'
import { isInteger } from "core-js/fn/number";
import {simpleDebounce} from "@//utils/util"

export const reloadMixin = {
  data(){
    return{
      actionType:Vue.ls.get('ORG_DATA')
    }
  },
  created(){
    reloadBus.$on('reloadInit', (e) => {
      this.$store.commit('SET_ORG_DATA',e)
      // Vue.ls.set('ORG_DATA',e);
      this.reloadInit(e)
    })
  },
  watch: {
    actionType(val) {
      // this.value = this.demo;
      this.inInit(val)
    }
  },

  methods:{
    reloadInit(e){
      console.log(e)
    },
  },
  beforeDestroy () { // 在组件销毁之前清除自定义事件
    // reloadBus.$off('reloadInit');
    // reloadBus.$on('reloadInit', (e) => {
    //   this.$store.commit('SET_ORG_DATA',e)
    //   this.reloadInit(e)
    // })
  },
  destroyed () { // 在组件销毁之前清除自定义事件
    // reloadBus.$off('reloadInit');
    // reloadBus.$on('reloadInit', (e) => {
    //   this.$store.commit('SET_ORG_DATA',e)
    //   this.reloadInit(e)
    // })
  }

}