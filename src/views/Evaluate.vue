<template>
  <div id="evaluate" class="evaluate">
    <ul class="content">
      <Card class="comprehensive">
        <div class="left-box">
          <label style="color:orange;fontSize:25px">3.9</label>
          <label style="color:black">综合评分</label>
          <label style>高于周边商家69.2%</label>
        </div>
        <div class="right-box">
          <div style="display:flex;align-items: center; ">
            <label>服务态度</label>
            <Rate show-text allow-half v-model="valueCustomText">
              <span style="color: #f5a623">{{ valueCustomText }}</span>
            </Rate>
          </div>
          <div style="display:flex;align-items: center; ">
            <label>服务态度</label>
            <Rate show-text allow-half v-model="valueCustomText">
              <span style="color: #f5a623">{{ valueCustomText }}</span>
            </Rate>
          </div>
          <div>
            <div>送达时间 40分钟</div>
          </div>
        </div>
      </Card>
      <div class="Comment-statistical">
        <div class="btn">
          <Button type="primary" @click.native="allListBtn">全部{{allEvaluate}}</Button>
          <Button type="info" @click.native="likeBtn">满意{{like}}</Button>
          <Button @click.native="dislikeBtn">不满意{{disLike}}</Button>
        </div>
      </div>
      <div class="select">
        <i v-if="flag" class="iconfont icon-dagou" @click="changeWatch"></i>
        <i v-else style="color:#2d8cf0" class="iconfont icon-dagou" @click="returnAll"></i>

        <label>只看有内容的评价</label>
      </div>

      <Card v-for="(v,k) in evaluateList" :key="k">
        <div class="avatar">
          <Avatar :src="v.avatar" />
        </div>
        <div class="avaluateContent">
          <div class="usernameAndtime">
            <label for>{{v.username}}</label>
            <label for>{{v.rateTime |filtertime}}</label>
          </div>
          <p>
            <Rate disabled v-model="v.score" />
            <span v-if="v.deliveryTime" style="color: #f5a623">{{v.deliveryTime}}分钟送达</span>
          </p>
          <div>{{v.text}}</div>
          <div class="Like">
            <i v-if="v.rateType===0" style="color:#2d8cf0" class="iconfont icon-zan"></i>
            <i v-else class="iconfont icon-zan-copy"></i>
            <label v-for="(v,k) in v.recommend" :key="k">{{v}}</label>
          </div>
        </div>
      </Card>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { Ratings } from "@/api/apis.js";
import moment from "moment";
export default {
  data() {
    return {
      valueCustomText: 3,
      evaluateList: [],
      allEvaluate: 0, //全部评论数据
      disLike: 0,
      like: 0, //满意的数据
      flag: true //查看有内容按钮
    };
  },
  methods: {
    async getInfo() {
      let { data } = await Ratings();
      this.evaluateList = data;
      this.allEvaluate = data.length;
      data.forEach(v => (v.rateType === 0 ? this.like++ : this.disLike++));
    },
    //选择查看有内容的评论
    changeWatch() {
      this.flag = !this.flag;
      let newArr = [];
      this.evaluateList.forEach(v => {
        if (v.text) {
          newArr.push(v);
        }
      });
      this.evaluateList = newArr;
    },
    //还原全部内容
    async returnAll() {
      this.flag = !this.flag;
      let { data } = await Ratings();
      this.evaluateList = data;
    },
    //全部按钮
    async allListBtn() {
      let { data } = await Ratings();
      this.evaluateList = data;
    },
    //满意按钮
    async likeBtn() {
      let newArr = [];
      let { data } = await Ratings();
      data.forEach(v => {
        if (v.rateType === 0) {
          newArr.push(v);
        }
      });
      this.evaluateList = newArr;
    },
    //不满意按钮
    async dislikeBtn() {
      let newArr = [];
      let { data } = await Ratings();
      data.forEach(v => {
        if (v.rateType === 1) {
          newArr.push(v);
        }
      });
      this.evaluateList = newArr;
    }
  },
  created() {
    this.getInfo();
  },
  mounted() {
    //更好地滚动,必须在mounted钩子函数中使用
    let evaluatebox = new BScroll("#evaluate", {
      click: true
    });
  },
  computed: {},
  filters: {
    //处理评论时间
    filtertime(time) {
      return moment(time).format("MM.DD hh:mm:ss");
    }
  }
};
</script>

<style lang="less" >
.evaluate {
  height: 100%;
  overflow: auto;
  .comprehensive {
    .ivu-card-body {
      padding: 10px;
      display: flex;
      .left-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        text-align: center;
        border-right: 1px solid #ccc;
        line-height: 30px;
      }
      .right-box {
        flex: 1.5;
        padding: 0 0 0 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .ivu-rate {
          display: flex;
          align-items: center;
          .ivu-rate-star {
            margin-right: 0;
          }
        }
      }
    }
  }
  .Comment-statistical {
    padding: 0 20px;
    .btn {
      border-bottom: 1px solid #ccc;
      line-height: 70px;
      .ivu-btn {
        margin-right: 15px;
      }
    }
  }
  .select {
    line-height: 50px;
    text-indent: 20px;
    border-bottom: 1px solid #ccc;
    font-size: 18px;
    display: flex;
    align-items: center;
    i {
      font-size: 25px;
    }
  }
  .ivu-card-body {
    display: flex;
    .avatar {
      margin-right: 10px;
    }
    .avaluateContent {
      flex: 1;
    }
    .usernameAndtime {
      display: flex;
      justify-content: space-between;
    }
    .Like {
      label {
        margin: 0 5px;
        border: 1px solid aliceblue;
      }
    }
  }
}
</style>