<template>
    <div class="flex items-center justify-center w-full mb-12">

        <label for="toggleB" class="flex items-center cursor-pointer">
            <!-- toggle -->
            <div class="relative">
                <!-- input -->
                <input type="checkbox" id="toggleB" class="sr-only" v-on:click="changeToggleWord()">
                <!-- line -->
                <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <!-- dot -->
                <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
            </div>
            <!-- label -->
            <div class="ml-3 text-purple-600 text-2xl font-medium">
                {{ isStart }}
            </div>
        </label>

    </div>
</template>

<script>
import {computed, defineComponent, ref} from "vue";


export default defineComponent({
    /* eslint-disable */
    name: "Toggle",
    props: {
        switch: {
            type: String,
            default: "stop",
        },
    },
    components: {},
    emits:[
        "changeToggle",
    ],
    setup(props, { emit }) {
        const status = computed(() => props.switch);
        const isStart = ref(status.value);

        const changeToggleWord = () => {
            isStart.value = isStart.value === "start" ? "stop" : "start";
            emit("changeToggle", isStart.value);
        }
        return {
            status,
            isStart,
            changeToggleWord,
        };
    },
});
</script>

<style scoped>
/* Toggle A */
input:checked ~ .dot {
    transform: translateX(100%);
    background-color: #48bb78;
}

/* Toggle B */
input:checked ~ .dot {
    transform: translateX(100%);
    background-color: #48bb78;
}
</style>
