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
    async login() {
      try {
      } catch (error) {}
    },
  },
};
</script>

<template>
  <form class="login" @submit.prevent="login">
    <h2>Login</h2>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" />
    <label for="password">Password</label>
    <input type="password" name="password" id="password" />
    <button type="submit">login</button>
  </form>
</template>
