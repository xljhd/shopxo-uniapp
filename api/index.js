import request from './request.js'
import url from './config.js'
const api = {}
var url_config = url.url
//测试
api.test = (params, header) => request.globalRequest(url_config + '/test', 'POST', params)
//首页数据
api.productList = (params, header) => request.globalRequest(url_config + '/product/list', 'GET', params)
//轮播数据
api.bannerList = (params, header) => request.globalRequest(url_config + '/home/advertise/list', 'GET', params)

module.exports = api;
