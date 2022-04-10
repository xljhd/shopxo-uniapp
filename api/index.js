import request from './request.js'
import url from './config.js'
const api = {}
var url_config = url.url
//测试
api.test = (params, header) => request.globalRequest(url_config + '/test', 'POST', params)

api.productList = (params, header) => request.globalRequest(url_config + '/product/list', 'GET', params)

module.exports = api;
