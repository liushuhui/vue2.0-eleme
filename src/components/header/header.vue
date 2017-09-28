<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟到达
        </div>
        <div v-if ="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length+'个'}}</span>
        <i class="icon iconfont icon-qiehuanqiyou"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon iconfont icon-qiehuanqiyou"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" >
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="supports-item" v-for="item in seller.supports" >
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
         <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="buttin">{{seller.bulletin}}</div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon iconfont icon-close"></i>
      </div>
    </div>
    </transition>

  </div>
</template>

<script>
  import star from '../star/star'
  export default{
    props : {
      seller : {
        type : Object,
      }
    },
    components:{
      star
    },
    data(){
      return {
        detailShow : false,
      }
    },
    methods: {
      showDetail(){
        this.detailShow = true
      },
      hideDetail(){
        this.detailShow =false
      }
    },
    created(){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
</script>

<style>
  .header{
    position: relative;
    background: rgba(7,17,27,0.5);
    color: #fff;
    overflow: hidden;
  }
  .header .content-wrapper{
    position: relative;
    padding: 24px 12px 18px 24px;
    /* font-size: 0; */
  }
  .header .content-wrapper .avatar{
    display: inline-block;
    vertical-align: top;
  }
  .header .content-wrapper .avatar img{
    border-radius: 2px;
  }
  .header .content-wrapper .content{
    display: inline-block;
    margin-left: 16px;
  }
  .header .content-wrapper .content .title{
    margin: 2px 0 8px 0;
  }
  .header .content-wrapper .content .title .brand{
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 18px;
    background-image: url('./img/brand@2x.png');
    background-size: 30px 18px;
    background-repeat: no-repeat;
  }
  .header .content-wrapper .content .title .name{
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }
  .header .content-wrapper .content .description{
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
  }
  .header .content-wrapper .content .support .icon{
    display: inline-block;
    vertical-align: middle;
    width: 12px;
    height: 12px;
    margin-right:4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }
  .header .content-wrapper .content .support .text{
    font-size: 12px;
    line-height: 12px;

  }
  .header .content-wrapper .support-count{
    position: absolute;
    right: 12px;
    bottom: 8px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    background-color: rgba(0,0,0,0.2);
    border-radius: 14px;
    text-align: center;
  }
  .header .content-wrapper .support-count .count{
    font-size: 15px;
    vertical-align: top;
  }
  .header .content-wrapper .support-count .icon-qiehuanqiyou{
    font-size: 10px;
  }
  .header .bulletin-wrapper{
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7,17,27,0.2);
  }
  .header .bulletin-wrapper .bulletin-title{
    display: inline-block;
    margin-top: 8px;
    width: 22px;
    height: 12px;
    background-image: url('./img/bulletin@2x.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .header .bulletin-wrapper .bulletin-text{
    font-size: 10px;
    vertical-align: top;
    margin: 0 4px;
  }
  .header .bulletin-wrapper .icon-qiehuanqiyou{
    position: absolute;
    font-size: 10px;
    right: 5px;
    top: 4px;
  }
  .header .background{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: rgba(7,17,27,0.8);
    filter: blur(10px);

  }
  .header .detail{
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(7,17,27,0.8);
    /* filter: blur(10px); */
  }
  .header .detail .clearfix{
    display: inline-block;
  }
  .header .detail .clearfix:after{
    display: block;
    content: '.';
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
  .header .detail .detail-wrapper{
    min-height: 100%;
    width: 100%;
  }
  .header .detail .detail-wrapper .detail-main{
    margin-top: 64px;
    padding-bottom: 64px;
  }
  .header .detail .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    font-size: 32px;
    color: rgba(255,255,255,0.5);
    clear: both;
    margin: -64px auto 0 auto;
  }
   .header .detail .detail-wrapper .detail-main .name{
     line-height: 16px;
     font-size: 16px;
     font-weight: 700;
     text-align: center;
   }
   .header .detail .detail-wrapper .detail-main .star-wrapper{
     margin: 16px 11px 28px 0;
     text-align: center;
   }
  .header .detail .detail-wrapper  .title{
    display: flex;
    width: 80%;
    margin: 0 auto 24px auto;
  }
  .header .detail .detail-wrapper  .line{
    display: inline-block;
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.2);
    margin: auto;
  }
  .header .detail .detail-wrapper  .text{
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700;
  }
  .header .detail .detail-wrapper .supports{
    padding: 0 0 28px 36px;

  }
  .header .detail .detail-wrapper .supports .supports-item{
    color: white;
    padding: 0 6px 12px 16px;
  }
  .header .detail .detail-wrapper .supports .supports-item .text{
    font-size: 12px;
    font-weight: 200;
    color: rgb(255,255,255);
    line-height: 12px;
    vertical-align: top;
  }
  .header .detail .detail-wrapper .supports .supports-item .icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-right: 6px;
  }
  .header .detail .detail-wrapper .buttin{
    padding: 0 48px;
    font-size: 12px;
    font-weight: 200;
    color: rgb(255,255,255);
    line-height: 24px;
  }
  .fade-enter-active, .fade-leave-active{
    transition: opacity 1s ;
  }
  .fade-enter, .fade-leave-active{
    opacity: 0;
  }
  .header   .decrease{
    background-image: url('./img/decrease_1@2x.png')
  }
  .header   .discount{
    background-image: url('./img/discount_1@2x.png')
  }
  .header   .guarantee{
    background-image: url('./img/guarantee_1@2x.png')
  }
  .header   .invoice{
    background-image: url('./img/invoice_1@2x.png')
  }
  .header   .special{
    background-image: url('./img/special_1@2x.png')
  }
</style>
