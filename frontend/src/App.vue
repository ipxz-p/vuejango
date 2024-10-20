<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import store from './store/index.js'
export default {
  name: 'App',
  components: {},
  setup() {
    const router = useRouter();

    return {
      logout: async () => {
        await store.dispatch('logout');
        router.push('/login');
      }
    };
  },
};
</script>
