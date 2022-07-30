
import Vue from 'vue';
import VueRouter from 'vue-router';


// import Login from './components/Login.vue'
// import Register from '../components/Register.vue'
// import Post from './components/Post.vue'


Vue.use(VueRouter);

const routes = [
    // { path: '/login', component: Login },
    // { path: '/register', component: Register },
    // { path: '/post', component: Post },
];

const router = new VueRouter({
    routes
});

export default router;