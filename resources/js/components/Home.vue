<template>
    <div>
        <post-add-modal @postAdded="getPosts"> </post-add-modal>        
        <post-edit-modal :post="editPost"></post-edit-modal>
        <posts-component @postDeleted="getPosts" @postEdited="postEdited" :posts="posts"/>

        <pagination align="center" :data="posts" @pagination-change-page="getPosts">
            <span slot="prev-nav">&lt;</span>
            <span slot="next-nav">&gt;</span>
        </pagination>
    </div>
</template>

<script>
    import axios from 'axios'
    import PostsComponent from './Posts/Posts.vue'
    import PostEditModal from './Posts/EditModal.vue'
    import PostAddModal from './Posts/AddModal.vue'

    export default {
        data() {
            return {
                posts: {},
                editPost: {
                    id: '',
                    title: '',
                    body: ''
                }
            }
        },
        components: {
            PostsComponent,
            PostEditModal,
            PostAddModal
        },
        created() {
            this.getPosts();
        },
        methods: {
            postEdited(post)
            {
                this.editPost = post;
            },
            getPosts(page = 1) {
                axios.get(`api/get-posts?page=${page}`)
                    .then(response => {
                        this.posts = response.data.data;
                    })
            }
        }
    }

</script>
