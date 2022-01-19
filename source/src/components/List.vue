<template>
    <ul>
        <li class="mb-1" v-for="list in lists" :key="list.name">
            <router-link
                v-if="!list.sublists"
                :to="list.link"
                class="
                                flex
                                items-center
                                block
                                p-2
                                rounded-sm
                                hover:text-white hover:bg-blue-400
                              "
                :class="{
                                'bg-blue-600 text-white': currentRoute === list.link,
                              }"
            >
                <component :is="icons[list.icon]" class="w-6 h-6 mr-2"></component>
                <span>{{ list.name }}</span>
            </router-link>

            <div
                v-else
                class="
                    flex
                    items-center
                    justify-between
                    p-2
                    cursor-pointer
                    rounded-sm
                    hover:bg-blue-400 hover:text-white
                  "
                @click="toggle(list.name)"
            >
                <div class="flex items-center">
                    <component
                        v-bind:is="icons[list.icon]"
                        class="w-6 h-6 mr-2"
                    ></component>
                    <span>{{ list.name }}</span>
                </div>
                <ChevronDownIcon
                    class="w-4 h-4 transform duration-300"
                    :class="!list.isShow ? 'rotate-0' : '-rotate-180'"
                />
            </div>
            <transition @enter="enter" @leave="leave">
                <ul class="mt-1 overflow-hidden" v-show="list.isShow">
                    <li class="mb-1" v-for="list in list.sublists" :key="list.name">
                        <router-link
                            v-if="!list.sublists"
                            :to="list.link"
                            class="
                                flex
                                items-center
                                block
                                p-2
                                rounded-sm
                                hover:text-white hover:bg-blue-400
                              "
                            :class="{
                                'bg-blue-600 text-white': currentRoute === list.link,
                              }"
                        >
                            <component :is="icons[list.icon]" class="w-6 h-6 mr-2"></component>
                            <span>{{ list.name }}</span>
                        </router-link>
                    </li>
                </ul>
            </transition>
        </li>
    </ul>
</template>
<script>
/* eslint-disable */
import { defineComponent, reactive, computed} from "vue";
import { useRoute } from 'vue-router';
import {
    TemplateIcon,
    ShoppingCartIcon,
    ChevronDownIcon,
} from '@heroicons/vue/outline';

export default defineComponent({
    name: "List",
    props: {},
    components: {
        TemplateIcon,
        ShoppingCartIcon,
        ChevronDownIcon,
    },
    setup() {
        const currentRoute = computed(() => {
            return useRoute().fullPath;
        });
        const lists = reactive([
            {
                name: 'ダッシュボード',
                icon: 'TemplateIcon',
                link: '/admin/dashboard',
            },
            {
                name: 'AWS',
                icon: 'ShoppingCartIcon',
                link: '/admin/aws',
                show: false,
                sublists: [
                    {
                        name: 'インスタンスの起動',
                        link: '/admin/aws-on',
                    },
                    {
                        name: 'インスタンスの追加',
                        link: '/admin/add-instance',
                    },
                ],
            },
        ]);
        const icons = {
            TemplateIcon: TemplateIcon,
            ShoppingCartIcon: ShoppingCartIcon,
        };

        const toggle = (name) => {
            const list = lists.find((list) => list.name === name);
            list.isShow = !list.isShow;
        };

        const enter = (element) => {
            element.style.height = "auto";
            const height = getComputedStyle(element).height;
            element.style.height = 0;
            getComputedStyle(element);
            setTimeout(() => {
                element.style.height = height;
            });
        };

        const leave = (element) => {
            element.style.height = getComputedStyle(element).height;
            getComputedStyle(element);
            setTimeout(() => {
                element.style.height = 0;
            });
        };

        return {
            lists,
            icons,
            toggle,
            enter,
            leave,
            currentRoute,
        };
    },
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: height 0.3s;
}
</style>
