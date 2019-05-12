import Vue from 'vue'
import lazyload from 'vue-lazyload'

Vue.use(lazyload, {
  preLoad: 1,
  error: require('@/assets/images/errorLoading.jpeg'),
  loading: require('@/assets/images/loading.gif')
})
