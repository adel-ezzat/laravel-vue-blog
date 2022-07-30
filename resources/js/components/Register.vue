<template>
    <div>

        <div class="mb-3">
            <label for="email" class="form-label">User name</label>
            <input type="email" class="form-control" placeholder="Name" v-model="user.name">
            <span class="bg-danger text-white p-1 rounded" v-if="errors.name">{{ errors.name[0] }}</span>
        </div>

        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" placeholder="E-mail" v-model="user.email">
            <span class="bg-danger text-white p-1 rounded" v-if="errors.email">{{ errors.email[0] }}</span>
        </div>

        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" placeholder="Password" v-model="user.password">
            <span class="bg-danger text-white p-1 rounded" v-if="errors.password">{{ errors.password[0] }}</span>
        </div>

        <div class="d-grid gap-2">
            <button class="btn btn-primary" @click="register">Register</button>
        </div>


    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                user: {
                    name: '',
                    email: '',
                    password: ''
                },
                errors: []
            }
        },
        methods: {
            register() {
                axios.post('api/create-user', this.user).then(response => {
                    if (response.data.status == 'success') {
                        this.user = {}
                        this.errors = []
                        this.$swal({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            icon: 'success',
                            title: 'User registered successfully'
                        })
                    }
                }).catch(error => {
                    if (error.response) {
                        this.errors = error.response.data.errors;
                    }
                })
            }
        }
    }

</script>
