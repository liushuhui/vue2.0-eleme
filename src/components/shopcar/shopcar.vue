<template>
<div>
  <div class="shopcar">
    <div class="content" >
      <div class="content-left" @click="toggleList">
        <div class="log-wrap">
          <div class="log" :class="{'active':totalCount > 0}">
            <i class="icon iconfont icon-gouwuche" ></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'active':totalPrice > 0}">￥{{totalPrice}}元</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <transition name="drop" v-for="ball in balls" v-on:before-enter="beforeEnter"
        v-on:enter="enter" v-on:after-enter="afterEnter">
      <div class="ball" v-show="ball.show" >
        <div class="inner inner-hook"></div>
      </div>
      </transition>
    </div>
    <transition name="transHeight">
    <div class="shopcar-list" v-show="listShow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content" ref="foodlist">
        <ul>
          <li class="food" v-for="food in selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.price * food.count}}</span>
            </div>
            <div class="cartcontorl-wrap">
              <cartcontrol :foods="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>

  </div>
  <transition name="backdrops">
  <div class="backdrop" v-show="showBackdrop" @click="hideBackdrop"></div>
  </transition>
  </div>
</template>
<script>
import cartcontrol from '../cartcontrol/cartcontrol'
import Bscroll from 'better-scroll'
  export default{
      data(){
        return {
          balls : [
            {
            show : false,
            },
            {
            show : false,
            },
            {
            show : false,
            },
            {
            show : false,
            },
            ],
            dropBalls : [],
            listShow : false,
        }
      },
      props: {
        selectFoods: {
        type : Array,
        default:[]
      },
      deliveryPrice :{
        type : Number,
        default : 0
      },
      minPrice :{
        type : Number,
        default : 0
      }
    },
    components:{
        cartcontrol
      },
    created(){
       this.$root.$on('cart.add', this.drop)
       //console.log(this.selectFoods)
    },
    methods:{
        pay(){
          if(this.totalPrice < this.minPrice){
            return;
          }
          window.alert(`支付${this.totalPrice}元`)
        },
        hideBackdrop(){
          this.listShow = false;
        },
        empty(){
          this.selectFoods.forEach((food) =>{
            //console.log(food.count)
            food.count = 0;
          })
        },
       _initScroll(){
         this.foodlistScroll = new Bscroll(this.$refs.foodlist,{
           click : true
         })
       },
      toggleList(){
        if(!this.totalCount){
          return
          //console.log(this.selectFoods.length)
        }else{
          this.listShow = !this.listShow;
          //console.log(this.selectFoods.length)
        }
          if(this.listShow) {
            this.$nextTick(() => {
              if(!this.foodlistScroll){
                  this._initScroll()
              }else {
                this.foodlistScroll.refresh()
              }
            })
          }


      },
      drop(el) {
        for (let i = 0, l = this.balls.length; i < l; i++) {
            let ball = this.balls[i]
              if (!ball.show) {
                ball.show = true
                ball.el = el
                this.dropBalls.push(ball)
                //console.log(ball)
                //console.log(ball.el)
                return
              }
      }
      },
      beforeEnter(el){
          let count = this.balls.length
            while (count--) {
          let ball = this.balls[count]
            if (ball.show) {
                let rect = ball.el.getBoundingClientRect()
                let x = rect.left - 32;
                let y = -(window.innerHeight - rect.top - 22)
                el.style.display = ''
                el.style.webkitTransform = `translate3d(0,${y}px,0)`
                el.style.transform = `translate3d(0,${y}px,0)`
                let inner = el.querySelector('.inner-hook')
                inner.style.webkitTransform = `translate3d(${x}px,0,0)`
                inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
      },
      enter(el){
            el.offsetHeight // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发
            this.$nextTick(() => {
              el.style.webkitTransform = 'translate3d(0,0,0)'
              el.style.transform = 'translate3d(0,0,0)'
              let inner = el.querySelector('.inner-hook')
              inner.style.webkitTransform = 'translate3d(0,0,0)'
              inner.style.transform = 'translate3d(0,0,0)'
      })
      },
      afterEnter(el){
              let ball = this.dropBalls.shift()
                 if (ball) {
                    ball.show = false
                    el.style.display = 'none'
                }
              }

    },
    computed: {
      totalPrice(){
        let total = 0;
        this.selectFoods.forEach((food) => {
          if(food.count){
            total += food.price * food.count;
          }
        })
        return total;
      },
      totalCount(){
        let count = 0;
        this.selectFoods.forEach((food) =>{
          count += food.count;
        })
        return count
      },
      payDesc(){
        if(this.totalPrice === 0){
          return `￥${this.minPrice}元起送`
        }
        else if(this.totalPrice < this.minPrice){
          let diff = this.minPrice - this.totalPrice;
          return  `还差￥${diff}元起送`
        }
        else{
          return '去结算'
        }
      },
      payClass(){
        if(this.totalPrice>=this.minPrice){
          return 'enough'
        }
      },
      showBackdrop(){
        if(this.listShow && this.totalPrice){
          return true
        }
        else{
          this.listShow = false
          return false;
        }

      },
    }
  }
</script>
<style>
.shopcar{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 48px;
  z-index: 50;

}
.shopcar .content{
  background: #141d27;
  display: flex;
}
.shopcar .content .content-left{
  flex: 1;
}
.shopcar .content .content-left .log-wrap{
  position: relative;
  display: inline-block;
  vertical-align: top;
  height: 56px;
  width: 56px;
  border-radius: 50%;
  line-height: 56px;
  top: -10px;
  margin: 0 12px;
  padding: 6px;
  box-sizing: border-box;
  text-align: center;
  background: #141d27;

}

.shopcar .content .content-left .log-wrap .log{
  width: 100%;
  height: 100%;
  background: #2b343c;
  border-radius:50%;
  line-height: 44px;
  color: #80858a;
}
.shopcar .content .content-left .log-wrap .active{
  background: rgb(0,160,220);
  color: white;

}
.shopcar .content .content-left .log-wrap .log .icon-gouwuche{
  font-size: 24px;
}
.shopcar .content .content-left .price{
  display: inline-block;
  /* vertical-align: top; */
  margin-top: 12px;
  padding-right: 12px;
  line-height: 24px;
  font-size: 16px;
  color: rgba(255,255,255,0.4);
  font-weight: 700;
  border-right: solid 1px rgba(255,255,255,0.1);
  box-sizing: border-box;
}
.shopcar .content .content-left .active{
  color: white;
}
.shopcar .content .content-left .desc{
  position: relative;
  display: inline-block;
  /* vertical-align: top; */
  margin: 12px 0 0 12px;
  font-size: 10px;
  color: rgba(255,255,255,0.4);
  font-weight: 700;
  line-height: 24px;
}
.shopcar .content .content-right{
  flex: 0 0 105px;
  width: 105px;
   height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  color: rgba(255,255,255,0.4);
  background: #2b333b;
}
.shopcar .content .content-right .enough{
  background: #00b43c;
  color: white;
}
.shopcar .content .content-right .enough{
  background: #00b43c;
  color: white;
}
.shopcar .content .content-left .log-wrap .num{
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 16px;
  background: rgb(240,20,20);
  border-radius: 16px;
  line-height: 16px;
  font-weight: 700;
  font-size: 9px;
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
  color: #fff;
}
.ball-container .ball{
  position: fixed;
  left: 32px;
  bottom: 22px;
  z-index: 200;
}
.drop-enter,.drop-enter-active{
  transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
}
.ball-container .ball .inner{
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgb(0,160,220);
  transition: all 0.4s linear;
}
.shopcar-list{
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  background: white;
  transform: translate3d(0,-100%,0);
}
.shopcar-list .list-header{
  height: 40px;
  line-height: 40px;
  background: #f3f5f7;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.shopcar-list .list-header .title{
  display: inline-block;
  font-size: 14px;
  font-weight: 200px;
  color: rgb(7,17,27);
  padding-left: 18px;
}
.shopcar-list .list-header .empty{
  position: absolute;
  right: 8px;
  color: rgb(0,160,220);
  font-size: 12px;
  padding: 0 10px;
}
.list-content{
  min-height: 217px;
  overflow: hidden;
}
.list-content .food{
  position: relative;
  display: flex;
  height: 48px;
  margin: 0 18px;
  border-bottom: solid 1px rgba(7,17,27,0.1);
}
.list-content .food .name{
  flex: 1;
  font-size: 14px;
  color: rgb(7,17,27);
  line-height: 48px;
  font-weight: 700;
}
.list-content .food .price{
  font-size: 14px;
  font-weight: 700;
  line-height: 48px;
  color: rgb(240,20,20);
  padding: 0 12px 0 18px;
}
.list-content .food .cartcontorl-wrap{
  font-size: 14px;
  margin-top: 6px;
}
.transHeight-enter-active,.transHeight-leave-active{
  transition: all 0.5s;
}
.transHeight-enter,.transHeight-leave-active{
  transform: translate3d(0,0,0);
}
.backdrop{
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(7,17,27,0.6);
  z-index: 40;
  width: 100%;
  height: 100%;
  filter: blur(10px);
}
.backdrops-enter-active,.backdrops-leave-active{
  transition: opacity 0.5s ;
}
.backdrops-enter,.backdrops-leave-active{
  opacity: 0;
}
</style>

