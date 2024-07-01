import { axios } from '@/utils/request'

//post
export function postDateFromList(url, params) {
  return axios({
    url: url,
    method: 'post'
  })
}