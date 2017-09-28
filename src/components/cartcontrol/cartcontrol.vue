<template>
  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div class="cart-decrese"
    v-show="foods.count > 0" @click.stop.prevent="decreseCart">
    <span class="inner icon iconfont icon-jianshao inner"></span>
    </div>
    </transition>
    <div class="cart-count" v-show="foods.count > 0">
      <span>{{foods.count}}</span>
    </div>
    <div class="cart-add" @click.stop.prevent="addCart">
      <i class="iconfont icon-icon-test outer"></i>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props : {
    foods : {
      type : Object
    },
  },
  created(){
    // console.log(this.foods)
  },
  methods : {
    addCart(event){
      //console.log(event.target)
      if(!event._constructed){ //阻止非vue事件
        return;
      }
      if(!this.foods.count){
        Vue.set(this.foods,'count',1);
      }
      else{
        this.foods.count ++;
      }
      this.$root.$emit('cart.add', event.target)
    },
    decreseCart(event){
      if(!event._constructed || !this.foods.count){
        return;
      }
      else{
        this.foods.count --;
      }
    }
  }
}
</script>

<style>
.cart-decrese{
  display: inline-block;
  padding: 6px;
  width: 24px;
  transition: all 0.4s linear;
}
.cart-decrese .inner{
  display: inline-block;
  line-height: 24px;
  font-size: 24px;
  color: rgb(0,160,220);
}
.cart-add{
  display: inline-block;
  padding: 6px;
}
.cart-add .outer{
  line-height: 24px;
  font-size: 24px;
  color: rgb(0,160,220);
}
.cart-count{
  display: inline-block;
  vertical-align: top;
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  color: rgb(147,153,159);
  padding: 8px 0;
}
 .fadeRotate-enter-active,.fadeRotate-leave-active{
  transform: translate3d(0,0,0);
}
.fadeRotate-enter-active .inner,.fadeRotate-leave-active .inner{
  display: inline-block;
  transform: rotate(0);
}
.fadeRotate-enter, .fadeRotate-leave-active{
  opacity: 0;
  transform: translate3d(24px,0,0);
}
.fadeRotate-enter .inner, .fadeRotate-leave-active .inner{
  transform: rotate(180deg);
}
</style>
