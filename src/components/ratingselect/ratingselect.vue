<template>
<div class="ratingselect">
  <div class="rating-type">
    <span class="block positive" @click="select(2,$event)" :class="{'active':selectType === 2}">{{desc.all}}
      <span class="count">{{ratingss.length}}</span></span>
    <span class="block positive"  @click="select(0,$event)" :class="{'active':selectType === 0}">{{desc.positive}}
      <span class="count">{{negatives.length}}</span></span>
    <span class="block negative"  @click="select(1,$event)" :class="{'active':selectType === 1}">{{desc.negative}}
      <span class="count">{{positives.length}}</span></span>
  </div>
  <div class="switch" @click="toggleContent">
    <span class="icon iconfont icon-queren1" :class="{'ons':onlyContent}"></span>
    <span class="text">只看有内容的评价</span>
  </div>
</div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
    props : {
      ratingss : {
        type : Array,
        default(){
          return []
        }
      },
      selectType: {
        type : Number,
        default : ALL
      },
      onlyContent: {
        type : Boolean,
        default : false
      },
      desc : {
        type : Object,
        default(){
          return {
            all : '全部',
            positive : '满意',
            negative : '不满意'
          }
        }
      }
    },
    computed: {
      positives(){
        return this.ratingss.filter((rat) => {
              return rat.rateType === POSITIVE;
        })
      },
      negatives(){
        return this.ratingss.filter((rat) => {
              return rat.rateType === NEGATIVE;
        })
      },
    },
    methods : {
      select(type,event){
        if(!event._constructed){
          return;
        }else{
          this.$emit('select',type)
        }

      },
      toggleContent(event){
          if(!event._constructed){
              return;
            }else{
              this.$emit('toggle');
            }

      },
    },
}
</script>

<style>
.ratingselect .rating-type{
  padding: 18px 0;
  margin: 0 18px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
  font-size: 0;
}
.ratingselect .rating-type .block{
  display: inline-block;
  padding: 8px 12px;
  margin-right: 8px;
  border-radius: 1px;
  color: rgb(77,85,93);
  font-size: 12px;
  line-height: 16px;
}
.ratingselect .rating-type .block.active{
  color: white;
}
.ratingselect .rating-type .block.positive{
  background: rgba(0,160,220,0.2);
}
.ratingselect .rating-type .block.positive.active{
  background: rgb(0,160,220);
}
.ratingselect .rating-type .block.negative{
  background: rgba(77,85,93,0.2);
}
.ratingselect .rating-type .block.negative.active{
   background: rgb(77,85,93);
}
.ratingselect .rating-type .block .count{
  font-size: 8px;
  margin-left: 2px;

}
.ratingselect .switch{
  padding: 12px 18px;
  line-height: 24px;
  border-bottom: solid 1px rgba(7,17,27,0.1);
  color: rgb(147,153,159);
  font-size: 0;
}
.ratingselect .switch .icon-queren1{
  display: inline-block;
  vertical-align: top;
  margin-right: 4px;
  font-size: 24px;
}
.ratingselect .switch .text{
  display: inline-block;
  vertical-align: top;
  font-size: 12px;

}
.ratingselect .switch .icon-queren1.ons{
  color: #00c850;
}
</style>
