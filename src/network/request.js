import axios from 'axios'

export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000/api/wh",
    timeout: 5000
  })

  //2.axios的拦截器
  //请求成功和请求失败
  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })

  //响应成功和响应失败
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  //3.发送真正的网络请求
  return instance(config)
}
