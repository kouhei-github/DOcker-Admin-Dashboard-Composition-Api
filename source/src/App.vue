<template>
  <admin-component>
    <router-view></router-view>
  </admin-component>
</template>


<script lang="ts">
import AdminComponent from './components/AdminComponent.vue';
import {defineComponent} from "vue";
export default defineComponent({
  components: {
    AdminComponent,
  },
})

</script>