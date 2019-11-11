// 引入模块
import req from '@/utils/request'


//获取店铺信息接口
export const shopList = params => req.get('/api/seller', params)

//商品信息

export const goodsInfo = params => req.get('/api/goods', params)

// 评价

export const Ratings= params => req.get('api/ratings', params)


//商家详情
export const Seller= params => req.get('/api/seller', params)

