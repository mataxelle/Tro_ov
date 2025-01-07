<template>
  <div>
    <ObjectForm :isEdit="false" />
  </div>
</template>

<script>
import ObjectForm from '@/components/object/ObjectForm.vue';

export default {
  components: {
    ObjectForm,
  },
};
</script>
