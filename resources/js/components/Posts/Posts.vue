<template>
    <div class="container">
        <!-- posts -->
        <div v-for="post in posts.data" :key="post.id" class="my-3">
            <h4> {{ post.title }} </h4>
            <p> {{ post.body }} </p>

            <b-button v-b-modal.edit-post @click="editPost(post)" class="btn btn-success bt-sm">
                Edit Post
                <b-icon icon="pencil-square"></b-icon>
            </b-button>

            <button type="button" class="btn btn-danger" @click="deletePost(post)">
                 Delete
                <b-icon icon="trash-fill"></b-icon>
            </button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'posts-component',
        props: ['posts'],
        watch: {
            post: function () {
                this.$emit('postEdited', this.post);
            }
        },
        data: function () {
            return {
                post: {}
            }
        },
        methods: {
            editPost(post) {
                this.post = post;
            },
            deletePost(post) {
                let deleteFunction = () => {
                    axios.delete(`api/delete-post/${post.id}`).then(response => {
                        if (response.data.status == 'success') {
                            this.swalToast('success', 'Your Post has been deleted.');
                            this.$emit('postDeleted');
                        }
                    }).catch((error) => {
                        if (error.status == 'error') {
                            this.swalToast('danger', 'Your Post has not been deleted.');
                        }
                    })
                };
                this.swalConfirm('Yes, delete it!', deleteFunction);
            }

        }
    }

</script>
