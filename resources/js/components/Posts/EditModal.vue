<template>
    <div>
        <!-- start edit modal -->
        <b-modal title="Edit Post" id="edit-post" @ok="updatePost" @show="savePostBeforeEdit" @hidden="cancelEdit"
            hide-backdrop>

            <input type="text" :class="['form-control my-2', errors.title ? 'is-invalid' : '']" placeholder="Title"
                v-model="postEdit.title">

            <span class="bg-danger text-white p-1 rounded" v-if="errors.title">
                {{ errors.title[0] }}
            </span>

            <textarea :class="['form-control my-2', errors.title ? 'is-invalid' : '']" placeholder="Body" cols="10"
                rows="5" v-model="postEdit.body"></textarea>

            <span class="bg-danger text-white p-1 rounded" v-if="errors.body">
                {{ errors.body[0] }}
            </span>

        </b-modal>
        <!-- end edit modal -->
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'post-edit-modal',
        props: ['post'],
        watch: {
            post(post) {
                this.postEdit = post
            }
        },
        data() {
            return {
                errors: [],
                postEdit: {},
                postBeforeEdit: {}
            }
        },
        methods: {
            updatePost(modalEvent) {
                modalEvent.preventDefault() // prevent close modal
                axios.put(`api/update-post/${this.post.id}`, this.post)
                    .then(response => {
                        if (response.data.status == 'success') {
                            this.postBeforeEdit = {...this.post}
                            this.$bvModal.hide('edit-post') // hide modal
                            this.swalToast('success', 'Post updated successfully');
                        }
                    }).catch((error) => {
                        this.errors = error.response.data.errors;
                    })
            },
            savePostBeforeEdit() {
                // used spread to make new copy of original object  
                // to prevent modify the copied object
                this.postBeforeEdit = {...this.post}
            },
            cancelEdit() {
                this.postEdit.id = this.postBeforeEdit.id
                this.postEdit.title = this.postBeforeEdit.title
                this.postEdit.body = this.postBeforeEdit.body
            }
        }
    }

</script>
