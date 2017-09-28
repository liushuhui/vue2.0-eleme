// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import goods from './components/goods/goods.vue'
import seller from './components/seller/seller.vue'
import ratings from './components/ratings/ratings.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  //配置路由
  routes : [
    {
    path : '/goods',
    component : goods
    },
    {
    path : '/ratings',
    component : ratings
    },
    {
    path : '/seller',
    component : seller
    }
    ],
    //路由跳转样式
    linkActiveClass : 'active'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
//设置默认路由
router.push('goods')
