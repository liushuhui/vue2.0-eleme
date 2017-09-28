<template>

  <div class="goods">
      <div class="menu-wrapper" ref="menuWrap">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item"
          :class="{'current' :courrentIndex===index}" @click="selectMenu(index)">
            <span class="text"><span v-show="item.type>0" class="icon"
              :class="classMap[item.type]"></span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="food-wrapper" id="wrapper" ref="foodWrap">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="goDetail(food)" v-for="food in item.foods" class="food-item">
                <div class="icon" >
                  <img :src="food.icon" width="57" height="57">
                </div>
                <div class="content">
                   <h2 class="name">{{food.name}}</h2>
                   <p class="desc">{{food.description}}</p>
                   <div class="extra">
                     <span class="count">月售{{food.sellCount}}份</span>
                     <span>好评率{{food.rating}}</span>
                   </div>
                   <div class="price">
                     <span class="now">￥{{food.price}}</span>
                     <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                   </div>
                   <div class="control-Wrap">
                     <cartcontrol :foods="food"></cartcontrol>
                   </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcar  :selectFoods="selectFoods"  :deliveryPrice="seller.deliveryPrice"
      :minPrice = "seller.minPrice"></shopcar>
      <food :food="selectFood" ref="myFood"></food>
  </div>


</template>

<script>
import axios from 'axios'
import Bscroll from 'better-scroll'
import shopcar from '../shopcar/shopcar'
import cartcontrol from '../cartcontrol/cartcontrol'
import food from '../food/food'
import Vue from 'vue'

const ERR_OK = 0
const eventHub = new Vue()
    export default{
      data(){
        return{
          goods : [],
          listHeight : [],
          foodsScrollY:0,
          selectFood :{}
        }
      },
      components : {
        shopcar,
        cartcontrol,
        food
      },
      props : {
        seller :{
          type : Object
        }
      },
      created(){
        axios.get('/static/data.json').then((res) =>{
          this.goods = res.data.goods;
          // console.log(this.goods)
          this.$nextTick(() =>{
            this._initScroll()//初始化scroll
            this._calculateHeight(); // 初始化列表高度列表
          })

        })

        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      },
      computed:{
        courrentIndex(){
          for(let i = 0; i<this.listHeight.length; i++){
            let height1 = this.listHeight[i];
            let height2 = this.listHeight[i + 1];
            if(!height2 || (this.foodsScrollY >= height1 && this.foodsScrollY < height2)){
              return i;
            }
          }
          return 0;
        },
        selectFoods(){
          let foods = [];
          this.goods.forEach((good) => {
            good.foods.forEach((food) => {
              if(food.count){
                foods.push(food)
              }
            })
          })
          return foods;
        }
      },
      methods: {
        selectMenu(index){
           if (!event._constructed) {
                return
              }
         /*
          let foodList = this.$refs.foodWrap.getElementsByClassName('food-list-hook')
          let el = foodList[index]
          this.foodsScroll.scrollToElement(el,300) */
          this.foodsScroll.scrollTo(0,-this.listHeight[index],300)
          // console.log(index)
        },
        goDetail(food){
          this.selectFood = food
          //console.log(this.selectFood)
          this.$refs.myFood.show()

        },
        _initScroll(){
          this.menuWrap = new Bscroll(this.$refs.menuWrap,{
            click : true
          });
          this.foodsScroll = new Bscroll(this.$refs.foodWrap,{
            click : true,
            probeType : 3
          });
          //监听滚动事件
        this.foodsScroll.on('scroll',(pos) => {
            this.foodsScrollY = Math.abs(Math.round(pos.y))

        })
        // console.log(this.foodsScrollY)
        },
        _calculateHeight(){
          let foodList = this.$refs.foodWrap.getElementsByClassName('food-list-hook');
          let height = 0;
          this.listHeight.push(height)
          // console.log(this.listHeight)
          // console.log(foodList);
          for(let i = 0;i < foodList.length; i++){
            let item = foodList[i];
            height += item.clientHeight;
            this.listHeight.push(height);

          }
            // console.log(this.listHeight)


        },

      },

    }
</script>

<style>
  .goods{
    display: flex;
    position: absolute;
    top: 177px;
    bottom: 46px;
    width: 100%;overflow: hidden;
  }
  .goods .menu-wrapper{
    /* flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。 */
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
  }
  .menu-wrapper .menu-item{
    display: table;
    width: 56px;
    height: 56px;
    line-height: 14px;
    padding: 0 12px;
  }
  .menu-wrapper .current{
    position: relative;
    z-index: 10;
    margin-top: -1px;
    background: #c0c0c0;
    font-weight: 700;

  }

  .menu-wrapper .menu-item .icon{
    display: inline-block;
    vertical-align: middle;
    width: 12px;
    height: 12px;
    margin-right:4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }
  .menu-wrapper .menu-item .text{
    display: table-cell;
    vertical-align: middle;
    width: 56px;
    font-size: 12px;
    border-bottom:solid 1px rgba(7,17,27,0.1);
  }
  .food-wrapper{
    flex: 1;
  }
  .food-wrapper .food-list .title{
    padding-left:14px;
    height: 26px;
    line-height: 26px;
    border-left: solid 2px #d9dde1;
    color: rgb(147,153,159);
    background: #f3f5f7;
    font-size: 12px;
  }
  .food-wrapper .food-list .food-item{
    position: relative;
    display: flex;
    margin: 0 18px;
    padding:18px 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .food-wrapper .food-list .food-item .icon{
    flex: 0 0 57px;
    margin-right:10px;
  }
  .food-wrapper .food-list .food-item .content{
    flex: 1;
  }
  .food-wrapper .food-list .food-item .content .name{
    margin: 2px 0 8px 0;
    font-size: 14px;
    line-height: 14px;
    height: 14px;
    font-weight: 700;
    color: rgb(7,17,27);
  }
  .food-wrapper .food-list .food-item .content .desc,.extra{
    font-size: 10px;
    line-height: 12px;
    color: rgb(147, 153, 159);
  }
  .food-wrapper .food-list .food-item .content .desc{
    margin-bottom: 8px;
  }
  .food-wrapper .food-list .food-item .content .extra .count{
    margin-right: 12px;
  }
  .food-wrapper .food-list .food-item .content .price{
    font-size: 10px;
    font-weight: 700;
    line-height: 24px;
  }
   .food-wrapper .food-list .food-item .content .price .now{
     margin-right: 8px;
     font-size: 14px;
     color: rgb(240,20,20)
   }
   .food-wrapper .food-list .food-item .content .price .old{
     text-decoration: line-through;
     color: rgb(147,153,159);
     padding-left: 4px;
   }
   .control-Wrap{
     position: absolute;
     right: 0;
     bottom: 12px;
     z-index: 20;
   }
  .goods   .decrease{
    background-image: url('../header/img/decrease_2@2x.png')
  }
  .goods   .discount{
    background-image: url('../header/img/discount_2@2x.png')
  }
  .goods   .guarantee{
    background-image: url('../header/img/guarantee_2@2x.png')
  }
  .goods   .invoice{
    background-image: url('../header/img/invoice_2@2x.png')
  }
  .goods   .special{
    background-image: url('../header/img/special_2@2x.png')
  }
</style>
