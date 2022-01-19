
<template>
    <div class="p-4">
        <div class="font-bold text-lg text-blue-600">LOGO</div>
        <div class="mt-8" :class="{'bg-gray-800 text-white' : !isDark, 'bg-gray-300 text-black ': isDark }">
            <List />
        </div>
    </div>
</template>


<script>
/* eslint-disable */
import { defineComponent, ref, onMounted, onUnmounted, computed} from "vue";
import List from './List.vue';

export default defineComponent({
    name: "Sidebar",
    props: {
        isDark: {
            type: Boolean,
            default: true,
        },
    },
    components: {
        List,
    },
    setup(props) {
        const isDark = computed(() => props.isDark);
        return {
            isDark
        };
    },
});
</script>

<style scoped>

</style>
