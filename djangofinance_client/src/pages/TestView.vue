<template>
  <div class="Test">
    <h1>Test</h1>
    <form @submit.prevent="test">
      <div>
        <label for="email">Email:</label>
        <input
          v-model="email"
          id="email"
          type="text"
          required
          @input="resetError"
        />
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          v-model="password"
          id="password"
          type="password"
          required
          @input="resetError"
        />
      </div>
      <button type="submit">Test</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/auth";

export default {
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async test() {
      await this.authStore.test(this.email, this.password, this.$router);
    },
    resetError() {
      this.error = "";
    },
  },
};
</script>
