<template>
  <div class="min-vh-100 bg-light">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script>
export default {
  name: "default",
};
</script>
