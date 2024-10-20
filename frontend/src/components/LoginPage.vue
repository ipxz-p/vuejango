<template>
    <div>
      <form @submit.prevent="handleLogin">
        <input v-model="username" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async handleLogin() {
        try {
          await this.$store.dispatch('login', { 
            username: this.username, 
            password: this.password 
          });
          this.$router.push('/');
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    },
  };
  </script>