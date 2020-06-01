var Fly = require('flyio/dist/npm/wx')
// var Fly = require('./wx')
var fly = new Fly()
fly.config.timeout = 10000
// fly.config.baseURL = 'http://127.0.0.1:7001'
//添加请求拦截器
fly.interceptors.request.use(request => {
	//请求方式依赖于插件flyio
	request.headers['X-Tag'] = 'flyio';
	// request.headers['Content-type'] = 'application/json';
	request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  //给所有请求添加自定义header
  const token = uni.getStorageSync('token')
  if (token) { request.headers['Authorization'] = token }
  //终止请求
  //return Promise.reject(new Error(""))
  //可以显式返回request, 也可以不返回，默认返回request
  return request
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  response => {
    //只将请求结果的data字段返回
	console.log('reponse响应拦截器正常')
    return response.data
  },
  err => {
    //发生网络错误后会走到这里
	console.log('响应拦截器发生错误',err)
    //return Promise.resolve("ssss")
  }
)
export default fly
