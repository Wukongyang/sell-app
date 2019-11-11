<template>
  <div class="home">
  <div>test</div>
    <div class="bgc-box" :style="bgUrl"></div>

    <div class="box" style="width:100%">
      <div class="top-box">
        <img :src="shopList.avatar" alt />
        <div class="top-right-box">
          <div class="top-rightInfo-box">
            <div>{{shopList.name}}</div>
            <div>{{shopList.description}}/{{shopList.deliveryTime}}分钟送达</div>
            <div>{{list}}</div>
          </div>

          <div>5个</div>
        </div>
      </div>
      <div class="bulletin">
        <i class="iconfont icon-gonggao"></i>
        <span class="content">{{shopList.bulletin}}</span>
      </div>
    </div>

    <div class="nav-box">
      <router-link :class="{active:$route.path==='/goods'}" to="/goods">商品</router-link>
      <router-link :class="{active:$route.path==='/evaluate'}" to="/evaluate">评价</router-link>
      <router-link :class="{active:$route.path==='/merchant'}" to="/merchant">商家</router-link>
    </div>
    <router-view></router-view>

    <div class="shopCaricon" :class="{active:shopcarlist.length}" @click="show=!show">
      <Badge :count="shopseleteNum">
        <i class="iconfont icon-gouwuche"></i>
      </Badge>
    </div>

    <transition name="slide-fade">
      <Card class="shopcar-bread" v-show="show&&shopcarlist.length">
        <template v-for="(v,k) in shopcarlist">
          <div class="shops" :key="k">
            <label style=" flex: 1;">{{v.name}}</label>
            <label style=" flex: 1;">￥{{v.price*v.num}}</label>
            <div class="addAndreduce">
              <i class="iconfont icon-jian" @click="changeNum(-1,k)"></i>
              <span>{{v.num}}</span>
              <Icon type="md-add-circle" @click.native="changeNum(1,k)" />
            </div>
          </div>
        </template>
      </Card>
    </transition>

    <div class="shopcar">
      <label class="totalprice" :class="{changecolor:shopcarlist.length}">￥{{shoptotalPrice}}</label>
      <label style="flex:0.9;justifyContent: center">另需配送费</label>
      <label
        v-show="shoptotalPrice<20"
        class="deliveryMount"
        :class="{active:shopcarlist.length}"
      >￥20元起送</label>
      <label
        v-show="shoptotalPrice>=20"
        class="deliveryMount"
        :class="{active:shopcarlist.length}"
        style="fontSize:25px"
      >结算</label>
    </div>
  </div>
</template>

<script>
import { shopList } from "@/api/apis.js";
export default {
  data() {
    return {
      shopList: {},
      bgUrl: "",
      show: false //购物车面板显示与隐藏
    };
  },

  methods: {
    async getshopliat() {
      let res = await shopList();
      this.shopList = res.data;
      this.bgUrl = `background:url(${res.data.avatar})`;
    },
    changeNum(num,k){
     console.log(this.shopcarlist) 
      
      //  this.$store.commit({
      //   type:"changeNum",
      //   num,
      //   k,
        
      // })
    },
    changeStr() {
      setInterval(() => {
        let a = this.shopList.bulletin.substr(0, 1); //截取第一个
        let b = this.shopList.bulletin.substring(1); //截取最后一个
        this.shopList.bulletin = b + a;
      }, 1000);
    }
  },
  created() {
    this.getshopliat();
  },
  mounted() {
    this.changeStr();
  },
  destroyed() {
    clearInterval(this.changeStr());
  },

  computed: {
    //头部商家信息处理
    list() {
      if (!this.shopList.supports) return;
      let str = "";
      this.shopList.supports.forEach(v => {
        str += v.description + ",";
      });
      return str;
    },
    // 购物车信息
    shopcarlist() {
      return this.$store.getters.shopcarlist;
    },
    //计算购物车选中数量
    shopseleteNum() {
      let num = 0;
      for (let v of this.shopcarlist) {
        num += v.num;
      }
      return num;
    },
    // 购物车总价
    shoptotalPrice() {
      let totalprice = 0;
      for (let v of this.shopcarlist) {
        totalprice += v.num * v.price;
      }
      return totalprice;
    }
  }
};
</script>

<style lang="less">
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;

  .nav-box {
    display: flex;
    justify-content: space-around;
    line-height: 40px;
    height: 40px;
    min-height: 40px;

    border: 1px solid #ccc;
    a {
      color: black;
      width: 100%;
      height: 100%;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      &.active {
        color: brown;
      }
    }
  }
  .bgc-box {
    position: relative;
    height: 165px;

    filter: blur(2px);
    z-index: -1;
  }
  .box {
    position: absolute;
   
  }

  .top-box {
    color: #fff;
    display: flex;
    padding: 10px 20px 0 20px;
    img {
      width: 80px;
      height: 80px;
    }
    .top-right-box {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-rightInfo-box {
        flex: 1;
        margin-left: 15px;
      }
    }
  }
  .bulletin {
    height: 30px;
    align-items: center;
    color: #fff;

    display: flex;
    .content {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 10px;
    }

    .icon-gonggao {
      line-height: 70px;
      font-size: 30px;
    }
  }

  .shopcar {
    height: 60px;
    width: 100%;
    background-color: #131d26;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .totalprice {
      flex: 1;
      justify-content: flex-end;
      font-size: 20px;
      font-weight: bold;
    }
    .changecolor {
      color: #ed4014;
    }
    .deliveryMount {
      background-color: #2b343d;
      flex: 0.9;
      justify-content: center;
      font-weight: bold;
      &.active {
        background-color: #ed4014;
        color: #fff;
      }
    }

    label {
      height: 100%;
      line-height: 60px;
      display: flex;
    }
  }
  .shopCaricon {
    position: fixed;
    z-index: 10;
    bottom: 15px;
    left: 15px;
    text-align: center;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    border: 6px solid #131d26;
    background-color: #2b343d;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.active {
      background-color: #ed4014;
    }
    .icon-gouwuche {
      color: #ccc;
      font-size: 30px;
    }
  }
  .shopcar-bread {
    width: 100%;
    position: fixed;
    bottom: 60px;
    font-size: 20px;
    .shops {
      display: flex;
      justify-content: space-around;
      .addAndreduce {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 25px;
        display: flex;
        .ivu-icon-md-add-circle {
          color: #2d8cf0;
        }
        .icon-jian {
          font-size: 25px;
          color: #2d8cf0;
        }
      }
    }
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all 0.5s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.5s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(200px); //设置运动方向
    opacity: 0;
  }
}
</style>