
import Vue from 'vue';
import router from './router'
import store from './store';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import MyHeader from './components/MyHeader.vue'

Vue.use(VueSweetalert2);


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


Vue.component('pagination', require('laravel-vue-pagination'));

Vue.mixin({
    methods: {
      swalToast: function (icon, title) {
        this.$swal({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: icon,
            title: title
        })
      },
       swalConfirm: function (confirmText, callback) {
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: confirmText
            }).then((result) => {
                if (result.isConfirmed) {
                    callback()
                }
            })
        }
      
    },
  })

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        MyHeader
    }
});
