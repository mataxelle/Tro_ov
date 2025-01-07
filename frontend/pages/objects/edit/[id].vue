<template>
  <div>
    <div v-if="object">
      <ObjectForm :isEdit="true" :initialObject="object" />
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>
  
  <script>
import ObjectForm from "~/components/object/ObjectForm.vue";

export default {
  components: {
    ObjectForm,
  },
  data() {
    return {
      object: null,
    };
  },
  async created() {
    const objectId = this.$route.params.id;

    try {
      const response = await fetch(
        `http://localhost:5000/api/objects/${objectId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        this.object = await response.json();
        console.log(this.object.name, this.object.description);
      } else {
        console.error("Error loading object !");
      }
    } catch (error) {
      console.error("Error :", error);
    }
  },
};
</script>
  