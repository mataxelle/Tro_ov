<template>
  <div
    class="container d-flex justify-content-center align-items-center min-vh-100 bg-light px-5"
  >
    <form
      @submit.prevent="submit"
      class="form-login p-4 rounded shadow bg-white"
    >
      <h2 class="text-center text-success mb-4">
        {{ isEdit ? "Modifier un objet !" : "Ajouter un objet !" }}
      </h2>

      <div class="mb-3">
        <label for="name" class="form-label">Nom</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Entrez un nom"
        />
        <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          v-model="description"
          class="form-control"
          id="description"
          placeholder="Décrivez un contenu"
        ></textarea>
        <div v-if="errors.description" class="text-danger">
          {{ errors.description }}
        </div>
      </div>

      <div class="mb-3">
        <label for="color" class="form-label">Couleur</label>
        <input
          v-model="color"
          type="text"
          class="form-control"
          id="color"
          placeholder="Entrez une couleur"
        />
        <div v-if="errors.color" class="text-danger">{{ errors.color }}</div>
      </div>

      <div class="mb-3">
        <label for="imageUrl" class="form-label">Image</label>
        <input
          v-model="imageUrl"
          type="text"
          id="imageUrl"
          class="form-control"
          placeholder="Entrez une image"
        />
        <div v-if="errors.imageUrl" class="text-danger">
          {{ errors.imageUrl }}
        </div>
      </div>

      <div class="mb-3">
        <label for="price" class="form-label">Prix</label>
        <input
          v-model="price"
          type="text"
          class="form-control"
          id="price"
          placeholder="Entrez un prix"
        />
        <div v-if="errors.price" class="text-danger">{{ errors.price }}</div>
      </div>

      <div class="d-grid">
        <button class="btn btn-success" type="submit">
          {{ isEdit ? "Modifier" : "Ajouter" }}
        </button>
      </div>

      <div v-if="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script>
import { objectSchema } from "~/schemas/ObjectSchema";

export default {
  name: "ObjectForm",
  props: {
    initialObject: {
      type: Object,
      default: () => ({}),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: this.initialObject.name || "",
      description: this.initialObject.description || "",
      color: this.initialObject.color || "",
      imageUrl:
        this.initialObject.imageUrl ||
        "https://cdn.pixabay.com/photo/2014/12/08/14/23/pocket-watch-560937_1280.jpg",
      price: this.initialObject.price || "",
      errors: {},
      errorMessage: "",
    };
  },
  methods: {
    async submit() {
      this.errors = {};
      this.errorMessage = "";

      const formData = {
        name: this.name,
        description: this.description,
        color: this.color,
        imageUrl: this.imageUrl,
        price: this.price,
      };

      const { error } = objectSchema.validate(formData, { abortEarly: false });

      if (error) {
        error.details.forEach((err) => {
          this.errors[err.path[0]] = err.message;
        });
        return;
      }

      try {
        const method = this.isEdit ? "PUT" : "POST";
        const url = this.isEdit
          ? `http://localhost:5000/api/objects/${this.initialObject._id}`
          : "http://localhost:5000/api/objects/";

        const response = await fetch(url, {
          method,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const data = await response.json();
          this.errorMessage = data.message || "Error !";
          return;
        }

        await this.$router.push("/objects");
      } catch (error) {
        console.error(error);
        this.errorMessage = "An error has occurred. Please try again.";
      }
    },
  },
};
</script>
