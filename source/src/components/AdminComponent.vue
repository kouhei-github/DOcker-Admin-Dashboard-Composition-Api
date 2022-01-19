<template>
    <div class="relative">
        <div
            class="
                fixed
                top-0
                w-64
                h-screen
                z-20
                transform
                duration-300
              "
            :class="{ '-translate-x-full': !show, 'bg-gray-800 text-gray-300': !dark, 'bg-gray-300 text-black': dark }"
        >
           <Sidebar :isDark="dark"/>
        </div>
        <div
            class="fixed xl:hidden inset-0 bg-gray-900 z-10 opacity-50"
            @click="show = !show"
            v-show="show"
        ></div>
        <div
            class="bg-gray-100 h-screen overflow-y-scroll duration-300"
            :class="{ 'xl:pl-64': show, 'bg-gray-900 text-gray-300': !dark, 'bg-white text-black': dark }"
        >
            <div
                class="flex items-center justify-between rounded shadow m-4 p-4"
                :class="{'bg-gray-800 text-gray-300': !dark, 'bg-gray-300 text-black': dark }"
            >
                <MenuIcon
                    class="h-6 w-6 text-gray-600 dark:text-gray-300 cursor-pointer"
                    @click="show = !show"
                />
                <div class="flex items-center space-x-4">
                    <MoonIcon
                        class="w-7 h-7 text-gray-600 cursor-pointer"
                        @click="changeMode('dark')"
                        v-if="theme === 'light'"
                    />
                    <SunIcon
                        class="w-7 h-7 text-gray-300 cursor-pointer"
                        @click="changeMode('light')"
                        v-else
                    />
                    <DropdownMenu
                        v-bind:isDark="dark"
                    />
                </div>
            </div>
            <div class="dark:text-gray-300 dark:bg-gray-900">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent, ref, onMounted, onUnmounted} from 'vue';
import { MenuIcon, MoonIcon, SunIcon } from '@heroicons/vue/outline';
import Sidebar from './Sidebar.vue';
import DropdownMenu from './DropdownMenu.vue';
import { debounce } from 'lodash';


export default defineComponent({
    props: {},
    components: {
        Sidebar,
        MenuIcon,
        MoonIcon,
        SunIcon,
        DropdownMenu,
    },

    setup() {
        const theme = ref('light');
        const dark = ref(false);
        const changeMode = (mode) => {
            theme.value = mode;
            dark.value = theme.value === 'light';
            theme.value === 'light'
                ? document.documentElement.classList.remove('dark')
                : document.documentElement.classList.add('dark');
        };
        const innerWidth = ref(window.innerWidth);
        const show = ref(innerWidth.value >= 1280 ? true : false);

        const checkWindowSize = () => {
            if (window.innerWidth >= 1280) {
                if (show.value === false && innerWidth.value < 1280) show.value = true;
            } else {
                if (show.value === true) show.value = false;
            }
            innerWidth.value = window.innerWidth;
        };

        onMounted(() => {
            window.addEventListener('resize', debounce(checkWindowSize, 100));
        });
        onUnmounted(() => {
            window.removeEventListener('resize', checkWindowSize);
        });

        return {
            innerWidth,
            show,
            theme,
            changeMode,
            dark,
        };
    },
});
</script>
