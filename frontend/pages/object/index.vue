<template>
  <div class="mt-5">
    <h1>MA LISTE D OBJETS</h1>

    <article v-for="post in posts" :key="post.id">
      <h2>{{ post.name }}</h2>
    </article>
  </div>
</template>

<script setup>
const { data: posts } = useFetch("http://localhost:5000/api/objects/");
</script>
