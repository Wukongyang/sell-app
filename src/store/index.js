import Vue from 'vue'
import Vuex from 'vuex'
import { goodsInfo } from "@/api/apis.js";//获取商品列表api

Vue.use(Vuex)

export default new Vuex.Store({
  //管理交互的状态
  state: {
    goodsList: [],//商品列表
  },
  // 改变状态必需使用mutation
  mutations: {
    changeNum(state, obj) {

      // state.goodsList[obj.index].foods[obj.n].num += obj.num
      for (const item of state.goodsList) {
        for (const foods of item.foods) {
          if (foods.name === obj.name) {
            foods.num += obj.num
          }
        }

      }

    },
    // 更新商品列表
    getgoodsInfo(state, obj) {
      state.goodsList = obj.data
    }
  },
  actions: {//专门用来发送异步请求
    //发送获取商品信息请求
    async getgoodsInfo({ commit }) {
      let { data } = await goodsInfo()
      commit({//通知mutation更新状态
        type: "getgoodsInfo",
        data
      })
    }

  },
  modules: {
  },
  getters: {
    //计算菜单列表
    navlist(state) {
      let navlist = []
      state.goodsList.forEach(v => {
        navlist.push(v.name)
      })
      return navlist
    },
    //计算购物车列表
    shopcarlist(state) {
      let arr = []//定义空数组保存购物车列表
      // 选取商品列表中数量不为0的商品
      for (let item of state.goodsList) {
        for (let foods of item.foods) {
          if (foods.num > 0) {
            arr.push(foods)
          }
        }
      }
      let newarr=[]
      var obj = {};
      // 含对象的数组去重
     return newarr = arr.reduce((item, next)=> {
      obj[next.name] ? '' : obj[next.name] = true && item.push(next); 
         return item;
      },[]); 
     
    }
  }
})


