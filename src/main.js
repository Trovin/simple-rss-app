import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueGraph from 'vue-graph'

Vue.use(VueGraph)

new Vue({ store, render: h => h(App),}).$mount('#app');
