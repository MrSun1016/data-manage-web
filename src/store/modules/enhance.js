import Vue from 'vue'
import { mechanismTree } from '@/api/api'
const enhance = {
  state: {
    enhanceJs: {},
    citys: []
  },
  mutations: {
    ADD_TABLE_ENHANCE: (state, record) => {
      if (!state.enhanceJs) {
        let obj = {}
        let arr = []
        arr.push({ ...record })
        obj[record.code] = arr
        state.enhanceJs = obj
      } else {
        if (!state.enhanceJs[record.code]) {
          let arr = []
          arr.push({ ...record })
          state.enhanceJs[record.code] = arr
        }
        state.enhanceJs[record.code].push({ ...record })
      }
      let arr = state.enhanceJs[record.code]
      while (arr.length > 16) {
        arr.shift()
      }
      Vue.ls.set('enhance_' + record['code'], arr)
    },
    CITYS(state, citys) {
      state.citys = citys
    },
  },
  actions: {
    addEhanceRecord({ commit }, record) {
      commit('ADD_TABLE_ENHANCE', record)
    },
    chanismTree({ commit }) {
      mechanismTree().then(res => {
        if (res.success) {
          // this.citys = res.body.children
          function treeToArr(data, res = []) {
            data.forEach(item => {
              res.push({
                // pid: pid,
                id: item.id,
                nodeCode: item.nodeCode,
                nodeName: item.nodeName,
                parentId: item.parentId
              })
              if (item.children && item.children.length !== 0) {
                treeToArr(item.children, res)
              }
            })
            return res
          }
          let citys = treeToArr(res.body.children)
          commit('CITYS', citys)
        }
      })
    },
  }
}
export default enhance