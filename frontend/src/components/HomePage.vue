<template>
    <div>
      <h1>Welcome to the Home Page</h1>
      <button @click="logout">Logout</button>
  
      <h2>Posts</h2>
      <form @submit.prevent="createPost">
        <input type="text" v-model="title" placeholder="Post Title">
        <input type="text"  v-model="newPost" placeholder="Write a new post" />
        <button type="submit">Add Post</button>
      </form>
  
      <ul>
        <li v-for="post in posts" :key="post.id">
          <span>{{ post.content }}</span>
          <button @click="editPost(post)">Edit</button>
          <button @click="deletePost(post.id)">Delete</button>
        </li>
      </ul>
  
      <div v-if="editMode">
        <h3>Edit Post</h3>
        <input v-model="editedPost" />
        <button @click="updatePost">Update</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from "vuex";
  
  export default {
    data() {
      return {
        title: "",
        newPost: "",
        editedPost: "",
        editMode: false,
        editingPostId: null,
      };
    },
    computed: {
      ...mapState(["posts", "user"]),
    },
    methods: {
      async logout() {
        await this.$store.dispatch("logout");
        this.$router.push("/login");
      },
      async createPost() {
        if (this.newPost.trim()) {
          await this.$store.dispatch("createPost", { 
            title: this.title,
            content: this.newPost,
            author: this.user.id
          });
          this.newPost = "";
        }
      },
      editPost(post) {
        this.editMode = true;
        this.editingPostId = post.id;
        this.editedPost = post.content;
      },
      async updatePost() {
        if (this.editedPost.trim()) {
          await this.$store.dispatch("updatePost", {
            id: this.editingPostId,
            content: this.editedPost,
          });
          this.cancelEdit();
        }
      },
      async deletePost(postId) {
        await this.$store.dispatch("deletePost", postId);
      },
      cancelEdit() {
        this.editMode = false;
        this.editedPost = "";
        this.editingPostId = null;
      },
    },
  };
  </script>