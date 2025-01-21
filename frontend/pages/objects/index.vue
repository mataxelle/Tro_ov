<template>
  <div class="mt-5 py-5 px-5">
    <h1 class="text-center">Liste d'objets souvenirs</h1>
    <h2 class="text-center mt-5 mb-5">
      Un lieu où les souvenirs prennent vie, et où le partage crée des liens
      inoubliables !
    </h2>

    <h3 class="text-center text-secondary mb-5">Il n'y a pas de hasard</h3>

    <div v-if="objects.length === 0" class="text-center">
      <p>Aucun objet disponible pour l'instant.</p>
    </div>

    <div v-if="isLoading" class="text-center">
  <p>Chargement en cours...</p>
</div>
    <div v-else class="row row-cols-1 row-cols-md-3 g-4 my-5">
      <div v-for="object in objects" :key="object.id" class="col">
        <div class="card h-100 shadow">
          <div class="card-body">
            <h5 class="card-title">{{ object.name }}</h5>
            <img class="card-img-top" :src="object.imageUrl" alt="Image de l'objet" loading="lazy" />
            <NuxtLink :to="`/objects/${object._id}`" role="button" class="btn btn-outline-success my-4" aria-label="Lire l'histoire de {{ object.name }}">Lire mon histoire
            </NuxtLink>
          </div>
          <div class="card-footer">
            <p class="card-text d-flex justify-content-end">
              <small class="text-muted">
                <em>Posté le {{ formatDate(object.updatedAt) }}</em>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      objects: [],
      isLoading: true, // Loading indicator
    };
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await this.$axios.get('/api/objects');
        this.objects = response.data;
      } catch (error) {
        console.error('Error objects :', error);
      } finally {
        this.isLoading = false;
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style>
.card {
  border: 2px solid #28a745;
  border-radius: 8px;
  max-width: 400px;
}
</style>
