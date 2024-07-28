import 'babel-polyfill';
import '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue'
import App from './App.vue'
import router from './router';
import smoothscroll from 'smoothscroll-polyfill';

// Initialize the polyfill
smoothscroll.polyfill();


Vue.config.productionTip = false;

new Vue({
	el: '#app',
	render: h => h(App),
	router
});
