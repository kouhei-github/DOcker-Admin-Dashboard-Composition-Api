<template>
    <div  class="relative" ref="root">
        <div
            class="rounded-full w-10 h-10 leading-10 cursor-pointer bg-white text-black font-bold text-center"
            @click="showMenu()"
        >M</div>
        <transition
            enter-active-class="transition-opacity duration-800"
            enter-from-class="opacity-0"
            leave-active-class="transition-opacity duration-800"
            leave-to-class="opacity-0"
        >
            <div
                class="absolute top-16 right-0 z-10 w-40 py-2 rounded-sm shadow"
                v-if="isMenu"
                :class="{'bg-gray-700 text-white' : !isDark, 'bg-gray-200 text-gray-700 ': isDark }"
            >
                <ul>
                    <li class="hover:bg-blue-100 hover:text-blue-600 p-2">
                        <router-link to="/profile" class="flex items-center space-x-2">
                            <UserIcon class="w-5 h-5" />
                            <span class="text-sm font-bold">プロファイル</span></router-link
                        >
                    </li>
                    <li class="hover:bg-blue-100 hover:text-blue-600 p-2">
                        <a href="/#" class="flex items-center space-x-2">
                            <LogoutIcon class="w-5 h-5" />
                            <span class="text-sm font-bold">ログアウト</span></a
                        >
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted, computed} from "vue";
import { UserIcon, LogoutIcon } from '@heroicons/vue/outline';

export default defineComponent({
  /* eslint-disable */
    props: {
        isDark: {
            type: Boolean,
            default: true,
        },
    },
    components: {
        UserIcon,
        LogoutIcon,
    },
    setup(props) {
        const isDark = computed(() => props.isDark);

        const isMenu = ref(false);
        const showMenu = () => {
            isMenu.value = !isMenu.value;
        };
        const root = ref(null);
        const clickOutside = (e) => {
            if (!root.value.contains(e.target) && isMenu.value) {
                isMenu.value = false;
            }
        };

        onMounted(() => document.addEventListener('click', clickOutside));
        onUnmounted(() => document.removeEventListener('click', clickOutside));
        return {
            isMenu,
            showMenu,
            isDark,
            root,

        };
    },
});
</script>

<style scoped>

</style>
