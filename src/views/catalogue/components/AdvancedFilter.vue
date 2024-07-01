<template>
  <div id="AdvancedFilter">
    <div class="search-criteria">
      <div class="title" style="color: #333333; margin-right: 32px">重点领域</div>
      <div class="right-items" style="display: flex">
        <div
          class="items"
          :class="itemlist.isSelected ? 'active' : ' '"
          @click="changeKeyareastype(index, itemlist)"
          v-for="(itemlist, index) in keyareas.dataFormat"
          :key="itemlist.value"
        >
          <span>{{ itemlist.title }}（{{ itemlist.title == '全部' ? allNum : dataTypeNum[index - 1] || '0' }}）</span>
          <!-- <span> ({{ itemlist.total }})</span> -->
        </div>
      </div>
    </div>
    <div class="search-criteria">
      <div class="title" style="color: #333333; margin-right: 32px">更新频率</div>
      <div class="right-items" style="display: flex">
        <div
          class="items"
          :class="itemlist.isSelected ? 'active' : ' '"
          @click="changeFrequency(index, itemlist)"
          v-for="(itemlist, index) in frequencyList.dataFormat"
          :key="itemlist.value"
        >
          <span
            >{{ itemlist.title }} （{{ itemlist.title == '全部' ? allNum : update_frequency[index - 1] || '0' }}）</span
          >
          <!-- <span> ({{ itemlist.total }})</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDictItems, getCatalogAmount } from '@/api/api'
import qs from 'qs'
export default {
  name: 'AdvancedFilter',
  data() {
    return {
      dataTypeNumList: [],
      dataTypeNum: [],
      update_frequency: [],
      allNum: 0,
      // 数据字典
      dataDictionary: {
        // 重点领域分类
        keyareastype: 'key_areas_type',
        // 更新频率
        frequency: 'update_frequency'
      },

      // 重点领域分类
      focusAreas: [],
      // 更新频率
      updateFrequency: [],

      keyareas: {
        title: '重点领域',
        dataFormat: []
      },
      frequencyList: {
        title: '更新频率',
        dataFormat: []
      },
      isActive: 0,
      categoryCode: '',
      treeItemId: '',
      catalogName: ''
    }
  },
  activated() {
    this.dictionaryList()
    this.fetchCatalogAmount()
  },
  created() {
    // this.dictionaryList()
  },
  mounted() {
    // 编目共享类型数据数量
    this.$bus.$on('code', keyNameList => {
      console.log(keyNameList, '------')
      this.categoryCode = keyNameList.keyName
      this.treeItemId = keyNameList.treeItemId
      // let categoryCode = qs.stringify({ categoryCode: key })
      // this.categoryCode = qs.stringify({ categoryCode: keyNameList.keyName})
      // this.treeItemId = qs.stringify({ treeItemId:keyNameList.treeItemId})
      // let categoryCode = qs.stringify(key)
      this.fetchCatalogAmount()
      // getCatalogAmount(categoryCode).then((res) => {
      //   if (res.success) {
      //     this.dataTypeNumList = res.body.dataTypeNumList
      //     console.log(this.dataTypeNumList)
      //     this.dataTypeNum = this.dataTypeNumList
      //       .filter((x) => Object.keys(x)[0].includes('key_areas_type'))
      //       .map((x) => Object.values(x)[0])
      //     this.allNum = res.body.allNum
      //     this.update_frequency = this.dataTypeNumList
      //       .filter((x) => Object.keys(x)[0].includes('update_frequency'))
      //       .map((x) => Object.values(x)[0])
      //   }
      // })
    })
  },
  // watch: {
  //   '$route.query.search': {
  //     handler(val, oldVal) {
  //       if (val != null) {
  //         this.fetchCatalogAmount( val)
  //       }
  //     },
  //     immediate: true,
  //     deep: true
  //   },
  // },
  beforeDestroy() {
    this.$bus.$off('code')
  },
  methods: {
    fetchCatalogAmount(val) {
      this.catalogName = val
      if (this.catalogName == undefined) {
        this.catalogName = ''
      }
      getCatalogAmount(this.categoryCode, this.treeItemId, this.catalogName).then(res => {
        if (res.success) {
          this.dataTypeNumList = res.body.dataTypeNumList
          this.dataTypeNum = this.dataTypeNumList
            .filter(x => Object.keys(x)[0].includes('key_areas_type'))
            .map(x => Object.values(x)[0])
          this.allNum = res.body.allNum
          this.update_frequency = this.dataTypeNumList
            .filter(x => Object.keys(x)[0].includes('update_frequency'))
            .map(x => Object.values(x)[0])
        }
      })
    },
    // 重置
    resetAdvanced() {
      this.keyareas.dataFormat.forEach((list, isindex) => {
        if (list.title != '全部') {
          list.isSelected = false
        }
        if (list.title == '全部') {
          list.isSelected = true
        }
      })
      this.frequencyList.dataFormat.forEach((list, isindex) => {
        if (list.title != '全部') {
          list.isSelected = false
        }
        if (list.title == '全部') {
          list.isSelected = true
        }
      })

      this.focusAreas = []
      this.updateFrequency = []
    },
    dictionaryList() {
      let { keyareastype, frequency } = this.dataDictionary
      getDictItems(keyareastype).then(res => {
        if (res.success) {
          this.keyareas.dataFormat = res.result
          this.keyareas.dataFormat.forEach((item, index, arr) => {
            this.$set(item, 'isSelected', false)
          })
          let obj = { title: '全部', isSelected: true }
          this.keyareas.dataFormat.unshift(obj)
        }
      })
      getDictItems(frequency).then(res => {
        if (res.success) {
          this.frequencyList.dataFormat = res.result
          this.frequencyList.dataFormat.forEach((item, index, arr) => {
            this.$set(item, 'isSelected', false)
          })
          let obj = { title: '全部', isSelected: true }
          this.frequencyList.dataFormat.unshift(obj)
        }
      })
    },
    changeKeyareastype(index, itemlist) {
      if (itemlist.title == '全部') {
        this.focusAreas = []
        this.keyareas.dataFormat.forEach((list, isindex) => {
          if (list.title != '全部') {
            list.isSelected = false
          }
          if (list.title == '全部') {
            list.isSelected = true
          }
        })
      } else {
        itemlist.isSelected = !itemlist.isSelected
        let ind = this.focusAreas.indexOf(itemlist.value)
        if (ind === -1) {
          this.focusAreas.push(itemlist.value)
        } else {
          this.focusAreas.splice(ind, 1)
        }

        if (this.focusAreas.length == 1) {
          if (itemlist.title != '全部') {
            // 如果点击的不是全部，那么全部就要自定不选
            this.keyareas.dataFormat.forEach((list, isindex) => {
              if (list.title == '全部') {
                // list[isindex].isSelected = false
                list.isSelected = false
              }
            })
          }
        }
      }
      this.$emit('changeKeyareas', this.focusAreas)
    },
    changeFrequency(index, itemlist) {
      if (itemlist.title == '全部') {
        this.updateFrequency = []
        this.frequencyList.dataFormat.forEach((list, isindex) => {
          if (list.title != '全部') {
            list.isSelected = false
          }
          if (list.title == '全部') {
            list.isSelected = true
          }
        })
      } else {
        itemlist.isSelected = !itemlist.isSelected
        let ind = this.updateFrequency.indexOf(itemlist.value)
        if (ind === -1) {
          this.updateFrequency.push(itemlist.value)
        } else {
          this.updateFrequency.splice(ind, 1)
        }

        if (this.updateFrequency.length == 1) {
          if (itemlist.title != '全部') {
            // 如果点击的不是全部，那么全部就要自定不选
            // let whole = this.updateFrequency.indexOf('全部')
            // this.updateFrequency.splice(whole, 1)
            this.frequencyList.dataFormat.forEach((list, isindex) => {
              if (list.title == '全部') {
                // list[isindex].isSelected = false
                list.isSelected = false
              }
            })
          }
        }
      }
      this.$emit('changeFrequency', this.updateFrequency)
    }
  }
}
</script>

<style lang="less" scoped>
#AdvancedFilter {
  padding: 0 32px;
  .search-criteria {
    display: flex;
    align-items: center;
    //   flex-wrap: wrap;
    //   width: 100%;
    margin: 0;
    padding: 15px 0;
    list-style: none;
    border-bottom: 1px solid #dcdee0;
    .title {
      width: 56px;
    }
    .items {
      margin-right: 16px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
    }
    .right-items {
      flex-wrap: wrap;
      flex: 1;
    }
  }
  .active {
    color: #1890ff;
  }
}
</style>
