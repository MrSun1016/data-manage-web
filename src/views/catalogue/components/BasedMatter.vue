<template>
  <div id="BasedMatter">
    <div class="data-format">
      <ul class="search-criteria" style="justify-content: space-between">
        <li style="color: #333333; margin-right: 24px">更新周期</li>
        <li
          class="items"
          :class="itemlist.isSelected ? 'active' : ' '"
          @click="changeFrequency(index, itemlist)"
          v-for="(itemlist, index) in frequency.dataFormat"
          :key="itemlist.value"
        >
          <span
            >{{ itemlist.title
            }}<span>（{{ itemlist.title == '全部' ? allNum || '0' : serviceupdate[index - 1] || '0' }}）</span>
          </span>
          <!-- <span> {{ itemlist.total }}</span> -->
        </li>
      </ul>
      <ul class="search-criteria">
        <li style="color: #333333; margin-right: 24px">是否电子证照</li>
        <li
          class="items"
          style="margin-right: 15px;"
          :class="itemlist.isSelected ? 'active' : ' '"
          @click="changeElectronic(index, itemlist)"
          v-for="(itemlist, index) in electronic.dataFormat"
          :key="itemlist.value"
        >
          <span
            >{{ itemlist.title
            }}<span>（{{ itemlist.title == '全部' ? allNum || '0' : gatherNumElc[index - 1] || '0' }}）</span>
          </span>
          <!-- <span> {{ itemlist.total }}</span> -->
        </li>
      </ul>
      <ul class="search-criteria">
        <li style="color: #333333; margin-right: 24px">资源类型</li>
        <li
          class="items"
          style="margin-right: 15px;"
          @click="changeresource(index, itemlist)"
          :class="itemlist.isSelected ? 'active' : ' '"
          v-for="(itemlist, index) in resource.dataFormat"
          :key="itemlist.value"
        >
          <span
            >{{ itemlist.title }}
            <span>（{{ itemlist.title == '全部' ? allNum || '0' : gatherNum[index - 1] || '0' }}）</span></span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getDictItems, getServiceAmount } from '@/api/api'
import qs from 'qs'
export default {
  name: 'BasedMatter',
  data() {
    return {
      serviceNumList: [],
      serviceupdate: [],
      electronic: [],
      gatherNum: [],
      gatherNumElc: [],
      allNum: '',
      // 数据字典
      dataDictionary: {
        // 数据格式
        datatype: 'data_type',
        // 更新频率
        frequency: 'update_frequency',
        // 是否电子证照
        electronic: 'electronic_certificate'
        // // 共享类型
        // frequencyType: 'frequency_type',
      },
      isActive: 0,

      // 更新周期
      frequencyType: [],
      // 是否电子证照
      electronicType: [],
      // 资源类型
      resourceType: [],

      frequency: {
        title: '更新周期',
        dataFormat: []
      },
      electronic: {
        title: '是否电子证照',
        dataFormat: []
      },
      resource: {
        title: '资源类型',
        dataFormat: []
      },
      sourceUnitList: {
        sourceUnitCode: '',
        implementationCode: '',
        implementationName: '',
        businessCode: '',
        businessName: '',
        catalogName: ''
      }
    }
  },
  activated() {
    this.sourceUnitList = {}
    this.fetchServiceAmount()
    this.dictionaryList()
    this.$bus.$on('onReset', _ => {
      this.resetBased()
    })
  },
  created() {
    // this.dictionaryList()
  },
  mounted() {
    // 编目共享类型数据数量
    this.$bus.$on('handleNode', nodeCode => {
      this.sourceUnitList.sourceUnitCode = nodeCode
      this.fetchServiceAmount()
    })
    this.$bus.$on('serviceAmountList', serviceList => {
      this.sourceUnitList.implementationCode = serviceList.implementationCode
      this.sourceUnitList.implementationName = serviceList.implementationName
      this.sourceUnitList.businessCode = serviceList.businessCode
      this.sourceUnitList.businessName = serviceList.businessName
      this.sourceUnitList.catalogName = serviceList.catalogName
      this.fetchServiceAmount()
    })
  },
  beforeDestroy() {
    this.$bus.$off('handleNode')
    this.$bus.$off('serviceAmountList')
    this.$bus.$off('onReset')
  },
  methods: {
    resetBased() {
      this.frequency.dataFormat.forEach((list, isindex) => {
        if (list.title != '全部') {
          list.isSelected = false
        }
        if (list.title == '全部') {
          list.isSelected = true
        }
      })
      this.electronic.dataFormat.forEach(list => {
        if (list.title != '全部') {
          list.isSelected = false
        }
        if (list.title == '全部') {
          list.isSelected = true
        }
      })
      this.resource.dataFormat.forEach((list, isindex) => {
        if (list.title != '全部') {
          list.isSelected = false
        }
        if (list.title == '全部') {
          list.isSelected = true
        }
      })
      this.$bus.$emit('fatherReset')
    },
    // 获取数量
    fetchServiceAmount() {
      // 默认查孝感市
      let params = qs.stringify(this.sourceUnitList)
      console.log('params“params', params)
      getServiceAmount(params).then(res => {
        if (res.success) {
          this.serviceNumList = res.body.serviceNumList
          this.allNum = res.body.allNum
          // 更新周期
          this.serviceupdate = this.serviceNumList
            .filter(x => Object.keys(x)[0].includes('serviceupdate'))
            .map(x => Object.values(x)[0])
          // 是否是电子证照

          let electronicYes = this.serviceNumList
            .filter(x => Object.keys(x)[0].includes('electronicYesAmount'))
            .map(x => Object.values(x)[0])
          let electronicNo = this.serviceNumList
            .filter(x => Object.keys(x)[0].includes('electronicNoAmount'))
            .map(x => Object.values(x)[0])
          this.gatherNumElc = [...electronicYes, ...electronicNo]
          // 库表
          let tableAmount = this.serviceNumList
            .filter(x => Object.keys(x)[0].includes('tableAmount'))
            .map(x => Object.values(x)[0])
          // 接口
          let apiAmount = this.serviceNumList
            .filter(x => Object.keys(x)[0].includes('apiAmount'))
            .map(x => Object.values(x)[0])
          // 未归集
          let collectNoAmount = this.serviceNumList
            .filter(x => Object.keys(x)[0].includes('collectNoAmount'))
            .map(x => Object.values(x)[0])
          this.gatherNum = [...tableAmount, ...apiAmount, ...collectNoAmount]
        }
      })
    },
    dictionaryList() {
      let { frequency, datatype, electronic } = this.dataDictionary
      // 更新周期
      getDictItems(frequency).then(res => {
        if (res.success) {
          this.frequency.dataFormat = res.result
          this.frequency.dataFormat.forEach((item, index, arr) => {
            this.$set(item, 'isSelected', false)
          })
          let obj = { title: '全部', isSelected: true }
          this.frequency.dataFormat.unshift(obj)
        }
      })
      // 数据格式
      getDictItems(datatype).then(res => {
        if (res.success) {
          this.resource.dataFormat = res.result
          this.resource.dataFormat.forEach((item, index, arr) => {
            this.$set(item, 'isSelected', false)
          })
          let obj = { title: '全部', isSelected: true }
          this.resource.dataFormat.unshift(obj)
        }
      })
      // 是否电子证照
      getDictItems(electronic).then(res => {
        if (res.success) {
          this.electronic.dataFormat = res.result
          this.electronic.dataFormat.forEach((item, index, arr) => {
            this.$set(item, 'isSelected', false)
          })
          let obj = { title: '全部', isSelected: true }
          this.electronic.dataFormat.unshift(obj)
        }
      })
    },
    changeFrequency(index, itemlist) {
      if (itemlist.title == '全部') {
        this.frequencyType = []
        this.frequency.dataFormat.forEach((list, isindex) => {
          if (list.title != '全部') {
            list.isSelected = false
          }
          if (list.title == '全部') {
            list.isSelected = true
          }
        })
      } else {
        itemlist.isSelected = !itemlist.isSelected
        let ind = this.frequencyType.indexOf(itemlist.value)
        if (ind === -1) {
          this.frequencyType.push(itemlist.value)
        } else {
          this.frequencyType.splice(ind, 1)
        }

        if (this.frequencyType.length == 1) {
          if (itemlist.title != '全部') {
            // 如果点击的不是全部，那么全部就要自定不选
            this.frequency.dataFormat.forEach((list, isindex) => {
              if (list.title == '全部') {
                // list[isindex].isSelected = false
                list.isSelected = false
              }
            })
          }
        }
      }
      this.$emit('servicesCycle', this.frequencyType)
    },
    changeElectronic(index, itemlist) {
      if (itemlist.title == '全部') {
        this.electronicType = []
        this.electronic.dataFormat.forEach((list, isindex) => {
          if (list.title != '全部') {
            list.isSelected = false
          }
          if (list.title == '全部') {
            list.isSelected = true
          }
        })
      } else {
        itemlist.isSelected = !itemlist.isSelected
        let ind = this.electronicType.indexOf(itemlist.value)
        if (ind === -1) {
          this.electronicType.push(itemlist.value)
        } else {
          this.electronicType.splice(ind, 1)
        }

        if (this.electronicType.length == 1) {
          if (itemlist.title != '全部') {
            // 如果点击的不是全部，那么全部就要自定不选
            this.electronic.dataFormat.forEach((list, isindex) => {
              if (list.title == '全部') {
                // list[isindex].isSelected = false
                list.isSelected = false
              }
            })
          }
        }
      }
      this.$emit('servicesLicense', this.electronicType)
    },
    changeresource(index, itemlist) {
      // this.isActive = index
      if (itemlist.title == '全部') {
        this.resourceType = []
        this.resource.dataFormat.forEach((list, isindex) => {
          if (list.title != '全部') {
            list.isSelected = false
          }
          if (list.title == '全部') {
            list.isSelected = true
          }
        })
      } else {
        itemlist.isSelected = !itemlist.isSelected
        let ind = this.resourceType.indexOf(itemlist.title)
        if (ind === -1) {
          this.resourceType.push(itemlist.title)
        } else {
          this.resourceType.splice(ind, 1)
        }

        if (this.resourceType.length == 1) {
          if (itemlist.title != '全部') {
            // 如果点击的不是全部，那么全部就要自定不选
            // let whole = this.resourceType.indexOf('全部')
            // this.resourceType.splice(whole, 1)
            this.resource.dataFormat.forEach((list, isindex) => {
              if (list.title == '全部') {
                // list[isindex].isSelected = false
                list.isSelected = false
              }
            })
          }
        }
      }
      this.$emit('servicesResources', this.resourceType)
    }
  }
}
</script>

<style lang="less" scoped>
#BasedMatter {
  padding: 0 24px;
  .data-format {
    .search-criteria {
      display: flex;
      align-items: center;
      width: 100%;
      //   height: 70px;
      margin: 0;
      padding: 15px 0;
      list-style: none;
      border-bottom: 1px solid #dcdee0;
      .items {
        // margin-right: 16px;
        cursor: pointer;
      }
    }
  }
  .active {
    color: #1890ff;
  }
}
</style>
