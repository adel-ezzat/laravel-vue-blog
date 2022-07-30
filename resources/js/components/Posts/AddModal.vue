<template>
    <div>
        <!-- Button trigger modal -->
        <b-button v-b-modal.add-post class="btn btn-success bt-sm float-end">
            Add Post
            <b-icon icon="plus-circle-fill"></b-icon>
        </b-button>

        <!-- start add modal -->
        <b-modal title="Add Post" 
        id="add-post" 
        @ok="createPost" 
        @show="resetModal" 
        hide-backdrop>
        
            <input type="text" :class="['form-control my-2', errors.title ? 'is-invalid' : '']" placeholder="Title"
                v-model="post.title">
                
            <span class="bg-danger text-white p-1 rounded" v-if="errors.title">
                {{ errors.title[0] }}
            </span>

            <textarea :class="['form-control my-2', errors.title ? 'is-invalid' : '']" placeholder="Body" cols="10" rows="5" v-model="post.body"></textarea>

            <span class="bg-danger text-white p-1 rounded" v-if="errors.body">
                {{ errors.body[0] }}
            </span>
        </b-modal>
        <!-- end add modal -->
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'post-add-modal',
        data() {
            return {
                post: {
                    id: '',
                    title: '',
                    body: ''
                },
                errors: []
            }
        },
        methods: {
            createPost(modalEvent) {
                modalEvent.preventDefault() // prevent close modal
                axios.post('api/create-post', this.post)
                    .then(response => {
                        if (response.data.status == 'success') {
                            this.$bvModal.hide('add-post') // hide modal
                            this.swalToast('success', 'Created successfully');
                            this.$emit('postAdded');
                        }
                    }).catch((error) => {
                        this.errors = error.response.data.errors;
                    })
            },
            resetModal() {
                this.post = {
                    id: '',
                    title: '',
                    body: ''
                };
                this.errors = []
            }
        }
    }

</script>
