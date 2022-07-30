import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Home from '../components/Home.vue'
import store from '../store';
import axios from 'axios'

Vue.use(VueRouter);

const routes = [{
        path: '/login',
        component: Login,
        name: 'Login',
        meta: {
            disableIfLoggedIn: true
        }
    },
    {
        path: '/register',
        component: Register,
        name: 'Register',
        meta: {
            disableIfLoggedIn: true
        }
    },
    {
        path: '/',
        component: Home,
        name: 'Home',
        meta: {
            disableIfLoggedIn: false
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.getToken}`
    let isAuthenticated = store.getters.getIsAuthenticated

    if (to.meta.disableIfLoggedIn && isAuthenticated) {
             return next({name: 'Home'}); 
    } else {
        return next();
    }
})

export default router;
