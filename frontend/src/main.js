import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './assets/styles/styles.scss';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import socketio from 'socket.io-client';
import VueSocketIOExt from 'vue-socket.io-extended';
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, { locale })


const BASE_URL =
	process.env.NODE_ENV === 'production' ? '/' : '//localhost:3000';
const socket = socketio(BASE_URL);

Vue.use(VueSocketIOExt, socket, { store });

// Vue.use(VueSocketIO, SocketInstance);

Vue.use(ElementUI);

Vue.directive('focus', {
	inserted(el) {
		el.focus();
	},
	update(el) {
		el.focus();
	},
});

Vue.config.productionTip = false;
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');


