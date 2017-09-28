<template>
<transition name="move">
  <div class="foods" v-show="showDetail" ref="Food">
    <div class="foodContent">
      <div class="img-header">
        <img :src="food.image">
        <div class="back" @click="hideShow">
          <i class="icon iconfont icon-back"></i>
        </div>

      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="control-wrap">
        <control :foods = "food"></control>
      </div>
      <transition name="floats">
        <div @click="addFirst($event)" class="buy" v-show="!food.count || food.count === 0">
        加入购物车</div>
      </transition>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect @select="selectRating" @toggle="toggleContent" :select-type="selectType" :only-content="onlyContent"
          :desc="desc" :ratingss="food.ratings"></ratingselect>
          <div class="rating-warp">
            <ul class="" v-show="food.ratings || food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">

                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" width="12" height="12" class="avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'iconfont icon-dianzan': rating.rateType === 0,
                  'iconfont icon-ic_thumb_down_px':rating.rateType===1}"></span>{{rating.text}}</p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
    </div>
  </div>
</transition>

</template>

<script>
import Bscroll from 'better-scroll'
import control from '../cartcontrol/cartcontrol'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import {formatDate} from './../../common/js/date'

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
    props : {
      food : {
        type : Object
      }
    },
    data(){
      return {
        showDetail :false,
        selectType : ALL,
        onlyContent : true,
        desc : {
            all : '全部',
            positive : '推荐',
            negative : '吐槽'
        }

      }
    },
    components : {
      control,
      split,
      ratingselect
    },
    filters:{
        formatDate(time){
          let date = new Date(time);
          return formatDate(date,'yyyy-mm-dd hh:ss')
        },
      },
    methods : {
      show() {
        this.showDetail = true;
        this.selectType = ALL;
        this.onlyContent = true;
        if(this.showDetail){
          this.$nextTick(() => {
              this._initScroll();
          })
        }

      },
      selectRating(type){
        this.selectType =type;
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow(type,text){
        if(this.onlyContent && !text){
          return false;
        }
        if(this.selectType === ALL){
          return true;
        }else{
          return type === this.selectType;
        }
      },
      addFirst(event){
        // console.log(event)
          if(!event._constructed){
            return
          }
          this.$set(this.food,'count',1);
          this.$root.$emit('cart.add',event.target);
      },
      _initScroll(){
        this.$nextTick(() => {
            if(!this.scroll){
         this.scroll  = new Bscroll(this.$refs.Food,{
           click : true
         })
        }
        else{
          this.scroll.refresh()
        }
        })

      },
      hideShow(){
        this.showDetail = false;
      },
    },
}
</script>

<style>
.foods{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  width: 100%;
  background: white;
  z-index: 30;
  transition: all 0.4s ease
}
.foods .foodContent .img-header{
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
}
.foods .foodContent .img-header img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.foods .foodContent .img-header .back{
  position: absolute;
  top: 10px;
  left: 0;
}
.foods .foodContent .img-header .back  .icon-back{
  display: block;
  padding: 10px;
  font-size: 20px;
  color: white;
}
.foods .foodContent .content{
  position: relative;
  padding: 18px;
}
.foods .foodContent .content .title{
  line-height: 14px;
  margin-bottom:8px;
  font-size: 14px;
  font-weight: 700;
  color: rgb(7,17,27);
}
.foods .foodContent .content .detail{
  margin-top: 8px;
  line-height:10px;
  height: 10px;
  font-size: 0;
}
.foods .foodContent .content .detail .sell-count,
.foods .foodContent .content .detail .rating{
  font-size: 10px;
  color: rgb(147,153,159);
}
.foods .foodContent .content .detail .sell-count{
  margin-right: 12px;
}
.foods .foodContent .content .price{
  font-size: 10px;
  font-weight: 700;
  line-height: 24px;
  margin-top: 18px;
}
.foods .foodContent .content .price .now{
  margin-right: 8px;
  font-size: 14px;
  color: rgb(240,20,20);
}
.foods .foodContent .content .price .old{
  text-decoration: line-through;
  color: rgb(147,153,159);
  padding-left: 4px;
}
.foods .foodContent .content .control-wrap{
  position: absolute;
  right: 12px;
  bottom: 12px;
}
.foods .foodContent .content .buy{
  position: absolute;
  right: 18px;
  bottom: 18px;
  z-index: 10;
  height: 24px;
  line-height: 24px;
  padding: 0 12px;
  box-sizing: border-box;
  border-radius: 12px;
  font-size: 10px;
  color: #fff;
  background: rgb(0,160,220);
}
.foods .foodContent .info{
  padding: 18px;
}
.foods .foodContent .info .title{
  line-height: 12px;
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 14px;
  color: rgb(7,17,27);
}
.foods .foodContent .info .text{
  padding: 0 8px;
  font-size: 12px;
  font-weight: 200;
  color: rgb(77,85,93);
  line-height: 24px;
}
.foods .foodContent .rating{
  padding-top: 18px;
}
.foods .foodContent .rating .title{
  line-height: 14px;
  margin-left: 18px;
  font-size: 14px;
  color: rgb(7,17,27);
}
.foods .foodContent .rating .rating-warp{
  padding : 0 18px;
}
.foods .foodContent .rating .rating-warp .rating-item{
  position:relative;
  padding: 16px 0;
  border-bottom: solid 1px rgba(7, 17, 27, 0.1);
}
.foods .foodContent .rating .rating-warp .rating-item .user{
  position: absolute;
  right: 0;
  top : 16px;
  line-height : 12px;
  font-size : 0;
}
.foods .foodContent .rating .rating-warp .rating-item .time{
  margin-bottom: 6px;
  line-height:12px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.foods .foodContent .rating .rating-warp .rating-item .text{
  line-height: 12px;
  font-size: 12px;
  color: rgb(7, 17, 27);
}
.foods .foodContent .rating .rating-warp .rating-item .text .icon-dianzan{
  margin-right: 4px;
  line-height: 16px;
  font-size: 12px;
  color: rgb(0, 160, 220);
}
.foods .foodContent .rating .rating-warp .rating-item .text .icon-ic_thumb_down_px{
  margin-right: 4px;
  line-height: 16px;
  font-size: 12px;
   color: rgb(147, 153, 159);
}
.foods .foodContent .rating .rating-warp .rating-item .user .name{
  display : inline-block;
  margin-right : 6px;
  vertical-align :top;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.foods .foodContent .rating .rating-warp .rating-item .user img{
  border-radius : 50%;
}
.foods .foodContent .rating .rating-warp .no-rating{
  padding: 16px 0;
  font-size: 12px;
  color: rgb(147, 153, 159);
}
.move-enter-active,.move-leave-active{
  transform: translate3d(0,0,0);
}
.move-enter,.move-leave-active{
  transform: translate3d(100%,0,0);
}
.floats-enter-active,.floats-leave-active{
 transition: opacity .2s;
}
.floats-enter,.floats-leave-active{
 opacity: 0;
}
</style>
