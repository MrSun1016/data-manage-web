let homeList = [
  {
    name:'一条公告',
    title:'公告',
    text:'公告具体内容'
  }
]

export default {
  'get|/dtwave-om/query/home': option => {
    return {
      status: 200,
      message: 'success',
      data: homeList
    }
  }
}