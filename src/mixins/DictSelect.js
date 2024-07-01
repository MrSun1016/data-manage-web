export const DictSelect = {
  data(){
    return{
      indexUnitSD: [
        { id: '万元', name: '万元' },
        { id: '%', name: '%' },
        { id: '万平', name: '万平' },
        { id: '分', name: '分' },
        { id: '元/人', name: '元/人' },
        { id: '亿元', name: '亿元' },
        { id: '起', name: '起' },
      ],
      updateFrequencySD: [
        { id: '年', name: '年' },
        { id: '月', name: '月' },
        { id: '周', name: '周' },
        { id: '日', name: '日' },
      ],
      startConditionSD: [
        { id: '>', name: '大于' },
        { id: '>=', name: '大于等于' },
        { id: '=', name: '等于' },
        { id: '<', name: '小于' },
      ],
      endConditionSD: [
        { id: '>', name: '大于' },
        { id: '>=', name: '大于等于' },
        { id: '=', name: '等于' },
        { id: '<', name: '小于' },
        { id: '至无穷大', name: '至无穷大' },
      ],
      calTypeSD: [
        { id: 'CAL_DEFUALT', name: '默认' },
        { id: 'CAL_CONDITION', name: '条件' },
      ],
      inputTypeSD: [
        { id: 'INPUT_TEXT', name: '文本' },
        { id: 'INPUT_SELECT', name: '下拉' },
      ],
      checkTypeSD: [
        { id: 'VALID_NUMBER', name: '数值' },
        { id: 'VALID_TEXT', name: '文本' },
      ],
    }
  },
}