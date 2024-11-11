<script lang="ts">
import { useAuthStore } from "@/stores/auth";
import { usePortfolioStore } from "@/stores/portfolio";
import { useRouter } from "vue-router";

export default {
  setup() {
    const authStore = useAuthStore();
    const portfolioStore = usePortfolioStore();
    const router = useRouter();

    return {
      authStore,
      portfolioStore,
      router,
    };
  },
  methods: {
    isLoggedIn() {
      if (localStorage.getItem(`loggedIn`) !== null) {
        return true;
      } else {
        return false;
      }
    },
    logout() {
      this.authStore.logout(this.$router);
    },
  },
  watch: {
    "$store.state.list": {
      handler() {
        this.portfolioStore.getPortfolio();
      },
      immediate: true,
    },
  },
};
</script>

<template>
  <h2>Home View</h2>

  <div v-if="isLoggedIn()">
    <p>Logged in</p>
    <button @click="logout">Logout</button>
  </div>
  <div v-else>
    please log in first <RouterLink to="/login">login</RouterLink>
  </div>
</template>
