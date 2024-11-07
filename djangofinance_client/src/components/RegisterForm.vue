<script lang="ts">
export default {
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
      } catch (error) {}
    },
  },
};
</script>

<template>
  <h2>Register</h2>
  <form class="register" @submit.prevent="register">
    <label for="email">Email</label>
    <input type="email" name="email" id="email" />
    <label for="password">Password</label>
    <input type="password" name="password" id="password" />
    <button type="submit">Register</button>
  </form>
</template>
