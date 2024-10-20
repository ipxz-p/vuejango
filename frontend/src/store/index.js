import { createStore } from "vuex";
import Cookies from "js-cookie";
import api from "@/axios.js";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state: {
    posts: [],
    accessToken: null,
    refreshToken: null,
    user: null,
  },
  mutations: {
    setTokens(state, tokens) {
      state.accessToken = tokens.access;
      state.refreshToken = tokens.refresh;

      Cookies.set("accessToken", tokens.access, {
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("refreshToken", tokens.refresh, {
        secure: true,
        sameSite: "Strict",
      });
    },
    clearTokens(state) {
      state.accessToken = null;
      state.refreshToken = null;
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    },
    setUser(state, user) {
      state.user = user;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
    addPost(state, post) {
      state.posts.push(post);
    },
    updatePost(state, { id, content }) {
      const post = state.posts.find((post) => post.id === id);
      if (post) {
        post.content = content;
      }
    },
    deletePost(state, postId) {
      state.posts = state.posts.filter((post) => post.id !== postId);
    },
  },

  actions: {
    async register({ commit }, userData) {
      const response = await api.post("register/", userData);
      commit("setTokens", response.data);
    },
    async login({ commit }, credentials) {
      const response = await api.post("auth/login/", credentials);
      commit("setTokens", response.data);
    },
    async logout({ commit }) {
      commit("clearTokens");
    },
    async createPost({ commit }, postData) {
      const response = await api.post("posts/", postData);
      commit("addPost", response.data);
    },
    async updatePost({ commit }, postData) {
      await api.put(`posts/${postData.id}/`, { content: postData.content });
      commit("updatePost", postData);
    },
    async deletePost({ commit }, postId) {
      await api.delete(`posts/${postId}/`);
      commit("deletePost", postId);
    },
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => Cookies.get(key),
        setItem: (key, value) =>
          Cookies.set(key, value, { secure: true, sameSite: "Strict" }),
        removeItem: (key) => Cookies.remove(key),
      },
    }),
  ],
});

export default store;
