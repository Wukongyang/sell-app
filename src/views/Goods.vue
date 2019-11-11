<template>
  <div class="goods">
    <div id="left-box" class="left-box">
      <ul class="content">
        <ul class="menu" width="80px">
          <li
            :class="{active:i===menuClass}"
            v-for="(i,k) in navlist"
            :key="k"
            :name="i"
            @click="clickmenu(i)"
          >
            <Icon style="color:red" type="md-heart" />
            {{i}}
          </li>
        </ul>
      </ul>
    </div>

    <div id="right-box" class="right-box">
      <ul class="content">
        <div v-for="(item,k) in list" :key="k" :id="item.name">
          <div class="title">{{item.name}}</div>
          <Card v-for="(i,n) in item.foods" :key="n">
            <img :src="i.icon" alt />
            <div class="content1">
              <div>
                <div style="fontSize:16px;fontWeight:bold">{{i.name}}</div>
                <div style="fontSize:12px;">{{i.description}}</div>
                <div style="fontSize:12px;">月销售{{i.sellCount}}份,好评率{{i.rating}}%</div>
                <div>
                  <span style="color:red">￥{{i.price}}</span>
                  <del>{{i.oldPrice}}</del>
                </div>
              </div>
              <div class="btn">
                <i v-if="i.num>0" @click="changeNum(-1,i.name)" class="iconfont icon-jian"></i>
                <span v-if="i.num!=0">{{i.num}}</span>
                <Icon @click.native="changeNum(1,i.name)" type="md-add-circle" />
              </div>
            </div>
          </Card>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
     // navlist: [],

      menuClass: "热销榜" //刷新页面，保持默认高亮
    };
  },
  methods: {
    
    //点击左侧菜单
    clickmenu(i) {
      this.menuClass = i;
      this.rightbox.scrollToElement(`#${i}`, 800); //滚动到的元素位置，直接使用选择器选中对应元素
    },
    //调用vuex中的方法，改变vuex中的值才能真正实现两个页面间的数据关联
    changeNum(num,name){
      this.$store.commit({
        type:"changeNum",
        num,
        name
      })
    }
    //滚动右边栏
  },
  created() {
    //dispatch是调用actions异步请求的方法
    this.$store.dispatch("getgoodsInfo");//在vuex中发送获取商品属性的请求
  },
  mounted() {
    //初始化better-scroll
    this.leftbox = new BScroll("#left-box", {
      click: true
    });
    //better-scroll需要设置click和probeType才能点击，和监听滚动
    this.rightbox = new BScroll("#right-box", {
      click: true,
      probeType: 3
    });
    //监听滚动事件
    this.rightbox.on("scroll", ({ y }) => {
      y = Math.abs(y);
      this.getHeight.forEach(v => {
        if (y >= v.min && y < v.max) {
          this.menuClass = v.index; //判断滚动到的区间，高亮对应菜单
        }
      });
    });
  },
  computed: {
    //获取每个元素高度
    getHeight() {
      let arr = []; //定义空数组保存数据
      let total = 0; //累加的值
      this.navlist.forEach(v => {
        let height = document.getElementById(v).offsetHeight;
        arr.push({ min: total, max: total + height, index: v }); //计算需要的数组
        total += height;
      });
      return arr;
    },
    //从vuex state获取商品列表
    list() {
      this.$store.state.goodsList.forEach(v => {
        v.foods.forEach(i => {
          if (i.oldPrice) {
            i.oldPrice = `￥${i.oldPrice}`; //旧价格格式
          }
          return;
        });
      });
      return this.$store.state.goodsList
    },
    // 获取菜单列表
    navlist(){
      return this.$store.getters.navlist
    }
  }
};
</script>

<style lang="less">
.goods {
  display: flex;
  height: 100%;

  .right-box {
    height: 100%;
    flex: 1;
    background-color: aliceblue;
    overflow: auto;
    .title {
      line-height: 40px;
      text-indent: 15px;
    }
    .ivu-card-body {
      display: flex;
      padding: 5px;
      img {
        width: 70px;
        height: 70px;
      }
      .content1 {
        flex: 1;
        margin-left: 5px;
        display: flex;
        justify-content: space-between;
        .btn {
          font-size: 25px;
          line-height: 25px;
          display: flex;
          align-items: flex-end;
          justify-content:first baseline;
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
  }
  .left-box {
    height: 100%;
    overflow: auto;
    .menu {
      width: 80px;
      li {
        display: flex;
        align-items: center;
        padding: 5px;
        height: 70px;
        &.active {
          background-color: aliceblue;
        }
      }
    }
  }
}
</style>