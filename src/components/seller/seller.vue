<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size = "36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}}}</span>
          <span class="text">{{seller.sellCount}}</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
             <span class="stress">{{seller.deliveryTime}}</span>份
            </div>
          </li>
        </ul>
        <div class="collect">
          <span class="iconfont icon-shixin" @click="collectflag = !collectflag"  :class="{'active':collectflag}"></span>
          <span class="text">{{collectflag ? '已收藏' : '收藏'}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrap">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="supports-item" v-for="item in seller.supports" >
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrap" ref="picWrapper">
          <ul class="pic-list"   ref="picList">
            <li class="pic-item" v-for="item in seller.pics">
              <img :src="item" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="seller-info">
        <h1>商家信息</h1>
        <ul class="info-list">
          <li class="info" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star'
import split from '../split/split'
import Bscroll from 'better-scroll'
    export default{
      data(){
        return {
          collectflag : false
        }
      },
      props : {
        seller : {
          type : Object
        }
      },
      components : {
        star,
        split
      },
      created(){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this._init();
      },
    methods : {
      _init(){
        this.$nextTick(() => {
          this.sellerScroll = new Bscroll(this.$refs.seller, {
            click: true
          })
          this._initScroll()
        })
      },
      _initScroll(){
        if(this.picsScroll){
          return;
        }
        const picwidth = 120;
        const margin = 6;
        let piclen = this.seller.pics.length;
        this.$refs.picList.style.width = (picwidth + margin) * piclen + 'px';
        this.picsScroll = new Bscroll(this.$refs.picWrapper,{
          scrollX : true
        })
      }
    },
    }
</script>

<style>
.seller{
  position: absolute;
  top: 174px;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  background: #f3f5f7;
}
.seller .seller-content .overview{
  position: relative;
  padding: 18px;
}
.seller .seller-content .overview .title{
  margin-bottom: 8px;
  line-height: 14px;
  color: rgb(7,17,27);
  font-size: 14px;
}
.seller .seller-content .overview .desc{
  padding-bottom:18px;

  border-bottom: solid 1px rgba(7,17,27,0.1);
  font-size: 0;
}
.seller .seller-content .overview .desc .star{
  display: inline-block;
  margin-right: 8px;
  vertical-align: top;
}
.seller .seller-content .overview .desc .text{
  display: inline-block;
  line-height: 18px;
  margin-right: 12px;
  vertical-align: top;
  font-size: 10px;
  color: rgb(77,85,93);
}
.seller .seller-content .overview .remark{
  display: flex;
  padding-top: 18px;
}
.seller .seller-content .overview .remark .block{
  flex: 1;
  border-right: 1px solid rgba(7,17,27,0.1);
  text-align: center;
}
.seller .seller-content .overview .remark .block:last-child{
  border-right: none;
}
.seller .seller-content .overview .remark .block h2{

  line-height: 10px;
  color: rgb(147,153,159);
}
.seller .seller-content .overview .remark .block .content{
  margin-top: 10px;
  font-size: 10px;
  font-weight: 200;
  color: rgb(7,17,27);
}
.seller .seller-content .overview .remark .block .content .stress{
  font-size: 24px;
}
.seller .seller-content .bulletin{
  padding: 18px 18px 0 18px;
}
.seller .seller-content .bulletin .title{
  margin-bottom: 8px;
  line-height: 14px;
  color: rgb(7,17,27);
  font-size: 14px;
}
.seller .seller-content .bulletin .supports .supports-item{
  border-top: solid 1px rgba(7,17,27,0.1);
  padding: 16px 12px;
  font-size: 0;

}
.seller .seller-content .bulletin .supports .supports-item .icon{
  display: inline-block;
  vertical-align: top;
  width: 12px;
  height: 12px;
  margin-right: 4px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
.seller .seller-content .bulletin .supports .supports-item .text{
  vertical-align: top;
  color: rgb(7,17,27);
  font-size: 10px;
}
.seller .seller-content .bulletin .content-wrap{
  padding: 0 12px 16px 12px;
  border: 1px solid rgba(7,17,27,0.1);
}
.seller .seller-content .bulletin .content-wrap .content{
  line-height: 24px;
  font-size: 12px;
  color: rgb(240,20,20);
}
.seller .seller-content .pics{
  padding: 18px;
}
.seller .seller-content .pics .title{
  margin-bottom:12px;
  line-height: 14px;
  color: rgb(7,17,27);
  font-size: 14px;
}
.seller .seller-content .pics .pic-wrap{
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}
.seller .seller-content .pics .pic-wrap .pic-list{
  font-size: 0;

}
.seller .seller-content .pics .pic-wrap .pic-list .pic-item{
  display: inline-block;
  margin-left: 6px;
  width: 120px;
  height: 90px;
}
.seller-info h1{
  margin: 0 18px;
  padding: 18px 0 12px 0;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.seller-info .info-list .info{
  font-size: 12px;
  font-weight: 200;
  color: rgb(7,17,27);
  line-height: 16px;
  padding: 16px 12px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.seller-info .info-list .info:last-child{
  border: none;
}
.collect{
  position: absolute;
  top: 18px;
  right: 8px;
  width: 50px;
  text-align: center;
  font-size: 0;
}
.collect .icon-shixin{
  font-size: 24px;
  line-height: 24px;
  color: #d4d6d9;
}
.collect .icon-shixin.active{
  color: rgb(240,20,20);
}
 .collect .text{
   display: block;
   font-size: 10px;
   color: rgb(77,85,93);
   line-height: 10px;
   padding-top:4px;
 }

 .seller .seller-content .bulletin  .decrease{
    background-image: url('./img/decrease_4@2x.png')
  }
  .seller  .seller-content .bulletin .discount{
    background-image: url('./img/discount_4@2x.png')
  }
  .seller  .seller-content .bulletin .guarantee{
    background-image: url('./img/guarantee_4@2x.png')
  }
  .seller  .seller-content .bulletin .invoice{
    background-image: url('./img/invoice_4@2x.png')
  }
  .seller  .seller-content .bulletin .special{
    background-image: url('./img/special_4@2x.png')
  }
</style>
