<template>
  <div>
    <h1>MA PAGE USER</h1>

    <article v-for="post in posts" :key="post.id">
      <h2>{{ post.name }}</h2>
    </article>
  </div>
</template>

<script setup>
const { data: posts } = useFetch("http://localhost:5000/api/objects/");
</script>
