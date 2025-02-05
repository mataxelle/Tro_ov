<template>
  <div>
    <div v-if="userStore.user">
      <UserForm :initialUser="userStore.user" />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import { useUserStore } from "~/stores/user";
import UserForm from "~/components/user/UserForm.vue";

const authStore = useAuthStore();
const userStore = useUserStore();
</script>
