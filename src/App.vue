<template>
  <div id="app">
   <v-header :seller="seller"></v-header>
    <div class="tabs">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
    <router-view :seller="seller"></router-view>
    </keep-alive>



  </div>
</template>

<script>
import header from './components/header/header'
import axios from 'axios'
import {urlParse} from './common/js/util'
const ERR_OK = 0;
export default {
  data(){
    return {
      seller : {
        id : (() => {
          let queryParam = urlParse();
          return queryParam.id
        })
      },
    }
  },
  created(){
    axios.get('/api/seller').then((response) => {
             response = response.data;
             if (response.errno === ERR_OK) {
                this.seller = response.data;
             }
         });
  },
  components : {
    'v-header' : header
  }
}
</script>

<style>
.tabs {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: solid 1px  rgba(7,17,27,0.1);
}
.tab-item{
  flex: 1;
  text-align: center;
}
.tabs .tab-item a{
  display: block;
  font-size: 14px;
  color: rgb(77, 85, 93)
}
.tabs .tab-item a.active{
  font-size: 14px;
  color: rgb(240,20,20)
}
</style>
