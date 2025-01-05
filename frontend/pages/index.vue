<template>
  <div>
    <h1>HOME PAGE HOME PAGE</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      message: "",
    };
  },
  async mounted() {
    try {
      this.message = "You are logged";
    } catch (e) {
      this.message = "You are not logged in";
    }
  },
};
</script>
