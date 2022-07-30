<template>
    <div class="text-center">
        <router-link to="/" class="btn btn-primary m-1" v-if="isAuthenticated" active-class="active">home</router-link>
        <router-link to="/login" class="btn btn-primary m-1" v-if="!isAuthenticated" active-class="active">login</router-link>
        <router-link to="/register" class="btn btn-primary m-1" v-if="!isAuthenticated" active-class="active">register</router-link>
        <button class="btn btn-primary m-1" @click="logout" v-if="isAuthenticated" active-class="active">logout</button>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                isAuthenticated: this.$store.getters.getIsAuthenticated
            }
        },
        mounted() {
            this.$store.watch(
                (state) => {
                  this.isAuthenticated = state.isAuthenticated
                }
            )
        },
        methods: {
            logout() {
                axios.post('api/logout').then(response => {
                    this.$store.dispatch('logout')
                    this.$router.push({
                        name: 'Login'
                    });
                }).catch(error => {

                })
            }
        }
    }

</script>
