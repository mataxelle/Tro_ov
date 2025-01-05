<template>
  <div>
    <footer class="footer mt-auto py-5 bg-dark">
      <section class="container px-4">
        <nav class="">
          <h6 class="m-0 text-center text-white">Services</h6>
          <div class="d-md-flex justify-content-around mt-5">
            <ul>
              <li>
                <NuxtLink to="/" class=""> Online Store </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/" class=""> Terms & Conditions </NuxtLink>
              </li>
            </ul>
            <ul>
              <li>
                <NuxtLink to="/" class=""> Online Store </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/" class=""> Terms & Conditions </NuxtLink>
              </li>
            </ul>
            <ul>
              <li>
                <NuxtLink to="/" class=""> Shop & Contact </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/" class=""> Return & Refund </NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
      </section>
      <section class="">
        <p class="m-0 text-center text-white">
          &copy; 2025 All Rights Reserved
        </p>
      </section>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>
