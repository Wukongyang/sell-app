<template>
  <div id="merchant" class="merchant">
    <ul class="content">
      <div class="Merchants-ifreshair">
        <div class="shop-name">
          <p class="name">{{sellerInfo.name}}</p>
          <Rate allow-half v-model="sellerInfo.serviceScore" />
          <label for>({{sellerInfo.rankRate}})</label>
          <label for>月销售{{sellerInfo.sellCount}}单</label>
        </div>
        <div v-show="flag" class="collect">
          <i class="iconfont icon-xin" style="color:brown" @click="flag=!flag"></i>
          <label @click="flag=!flag">已收藏</label>
        </div>
        <div v-show="!flag" class="collect">
          <i class="iconfont icon-xin" @click="flag=!flag"></i>
          <label @click="flag=!flag">未收藏</label>
        </div>
      </div>
      <div class="situation">
        <div class="allitem">
          <div class="item">
            <label for>起送价</label>
            <label for><span style="fontSize:25px">{{sellerInfo.minPrice}}</span> 元</label>
          </div>
          <div class="item">
            <label for>商家配送费</label>
            <label for><span style="fontSize:25px">{{sellerInfo.deliveryPrice}}</span> 元</label>
          </div>
          <div class="item">
            <label for>平均配送时间</label>
            <label for><span style="fontSize:25px">{{sellerInfo.deliveryTime}}</span>  分钟</label>
          </div>
        </div>
      </div>

      <Card>
        <div class="notice">
          <h3>公告与活动</h3>
          <label style="color:red">{{sellerInfo.bulletin}}</label>
        </div>
      </Card>
      <Card>
        <i class="iconfont icon-jian1" style="color:#ff9900"></i>
        <label for>在线支付满25立减20</label>
      </Card>
      <Card>
        <i class="iconfont icon-jian1" style="color:#2db7f5"></i>
        <label for>在线支付满25立减20</label>
      </Card>
      <Card>
        <i class="iconfont icon-te1" style="color:#19be6b"></i>
        <label for>进店特价优惠</label>
      </Card>
      <Card>
        <i class="iconfont icon-jian1" style="color:#2db7f5"></i>
        <label for>在线支付满25立减20</label>
      </Card>
      <Card>
        <i class="iconfont icon-zhe1" style="color:#ed4014"></i>
        <label for>新客户打8折</label>
      </Card>
      <Card>
        <i class="iconfont icon-jian1" style="color:#19be6b"></i>
        <label for>在线支付满25立减20</label>
      </Card>
      <Card>
        <i class="iconfont icon-hui" style="color:#2db7f5"></i>
        <label for>在线支付满25立减20</label>
      </Card>
      <div class="Merchants-live">
        <h3>商家实景</h3>
        <div class="photo">
          <div class="photo-box" v-for="(v,k) in sellerInfo.pics" :key="k">
            <img :src="v" alt />
          </div>
        </div>
      </div>

      <div class="Merchants-info">
        <h3>商家信息</h3>
        <div>
          <p class="info-list" v-for="(v,k) in sellerInfo.infos" :key="k">{{v}}</p>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { Seller } from "@/api/apis";
export default {
  data() {
    return {
      flag: false,//是否收藏
      sellerInfo: [] //商家信息
    };
  },
  mounted() {
    let merchantbox = new BScroll("#merchant", {
      click: true
    }); //初始化better-scroll
  },
  created() {
    this.getsellerInfo();
  },
  methods: {
    async getsellerInfo() {
      let { data } = await Seller();
      this.sellerInfo = data;
    }
  },
  computed: {}
};
</script>

<style lang="less" >
.merchant {
  height: 100%;
  overflow: auto;
  .Merchants-ifreshair {
    display: flex;
    align-items: center;
    .shop-name {
      padding: 10px;
      flex: 2.5;
      .name {
        font-size: 20px;
        font-weight: bold;
      }
    }
    .collect {
      flex: 0.9;
      display: flex;
      flex-direction: column;
      align-items: center;
      .ivu-icon {
        font-size: 25px;
      }
    }
  }
  .situation {
    background-color: #fff;
    padding: 10px;
    .allitem {
      border-top: 1px solid #ccc;
      display: flex;
      height: 70px;
      align-items: center;
      .item {
        flex: 1;
        text-align: center;
        display: flex;
        flex-direction: column;
      }
    }
  }
  .ivu-card {
    border-bottom: none;
    .notice {
      line-height: 30px;
    }
  }
  .Merchants-live {
    padding: 15px;
    border-top: 1px solid #ccc;
    .photo {
      display: flex;
      justify-content: space-between;
      .photo-box {
        flex: 1;
        padding: 10px;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
  .Merchants-info {
    padding: 15px;
    line-height: 50px;
    .info-list {
      border-top: 1px solid #ccc;
      font-size: 12px;
    }
  }
}
</style>