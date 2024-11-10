<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email:</label>
        <input v-model="email" id="email" type="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <p v-if="success">{{ success }}</p>
  </div>
</template>

<script>
import router from "@/router";
import { get_csrf_token, useAuthStore } from "@/stores/auth";

export default {
  setup() {
    if (localStorage.getItem("loggedIn") !== null) {
      router.push({ name: "home" });
    }
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
      success: "",
    };
  },
  methods: {
    async register() {
      try {
        console.log(get_csrf_token());
        await this.authStore.register(this.email, this.password, this.$router);
      } catch (error) {
        this.error = error;
      }
    },
    resetError() {
      this.error = "";
    },
  },
};
</script>
