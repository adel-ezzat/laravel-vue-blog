<template>
    <div>

        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" placeholder="E-mail" v-model="user.email">
            <span class="bg-danger text-white p-1 rounded" v-if="errors.email">
                {{ errors.email[0] }}
            </span>

        </div>

        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" placeholder="Password" v-model="user.password">
            <span class="bg-danger text-white p-1 rounded" v-if="errors.password">
                {{ errors.password[0] }}
            </span>
        </div>

        <div class="d-grid gap-2">
            <button class="btn btn-primary" @click="login">Login</button>
            <span class="bg-danger text-white text-center p-1 rounded" v-if="message">
                {{ message }}
            </span>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                user: {
                    email: '',
                    password: ''
                },
                errors: [],
                message: ''
            }
        },
        methods: {
            login() {
                axios.post('api/login', this.user).then(response => {
                    if (response.data.status == 'success') {
                        this.errors = [];
                        this.message = '';
                        let token = response.data.token;
                        this.$store.dispatch('login', {token, isAuthenticated: true} )
                        this.$router.push({name: 'Home'});

                    }
                }).catch(error => {
                    if (error.response.data.errors) {
                        this.errors = error.response.data.errors;
                    }
                    if (error.response.data.message) {
                        this.message = error.response.data.message
                    }
                })
            }
        }
    }

</script>
