<template>
    <div v-if="rendering" class="overflow-y-scroll h-full">
        <div class="bg-white p-8 rounded-md w-11/12 mx-auto shadow-lg">
            <h1 class="w-full text-center mb-3 text-black font-bold underline">IPアドレス管理</h1>
            <div class=" flex items-center justify-center pb-6">
                <div>
                    <h2 class="text-gray-600 font-semibold">IP 一覧</h2>
                    <span class="text-xs">All products item</span>
                </div>
                <div class="flex items-center justify-between">
                    <div class="flex bg-gray-50 items-center p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fill-rule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clip-rule="evenodd" />
                        </svg>
                        <input class="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search...">
                    </div>
                    <div class="lg:ml-40 ml-10 space-x-8">
                        <button class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" v-on:click="deleteData()">Delete</button>
                        <button class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" v-on:click="goToCreatePage()">Create</button>
                    </div>
                </div>
            </div>
            <div>
                <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table class="min-w-full leading-normal">
                            <thead>
                            <tr>
                                <th
                                    v-for="(word, index) in ['id', 'ip_address', 'status']" :key="index"
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    {{ word }}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(instance, index) in instances" :key="index" class="bg-white hover:bg-sky-700">
                                <td
                                    class="px-5 py-5 border-b border-gray-300 text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                        {{ instance.id }}
                                    </p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                        {{ instance.ip_address }}
                                    </p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                        {{ isAwsEC2 }}
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div
                            class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
						<p class="text-xs xs:text-sm text-gray-900">
                            現在のステータス: <span class="text-purple-600 text-xl font-bold">{{ isAwsEC2 }}</span>
                        </p>
                            <Toggle :switch=isAwsEC2 @changeToggle="toggleSwitch"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, onMounted, ref} from "vue";
import axios from "axios";
import Toggle from "../components/Toggle";
import { useRouter } from 'vue-router'

export default defineComponent({
    name: "TurnOn",
    props: {},
    components: {
        Toggle
    },
    setup() {
        const endPoint = process.env.MIX_API_URL_BASE;
        const instances = ref([]);

        const getInstances = async () => {
            const config = {
                method: 'get',
                url: endPoint + 'api/v1/ip-address',
                headers: {}
            };

            await axios(config)
                .then(function (response) {
                    instances.value = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        const isAwsEC2 = ref();
        const getAwsInstanceStatus = async () => {
            const config = {
                method: 'get',
                url: endPoint + 'api/v1/aws-status',
                headers: {}
            };

            await axios(config)
                .then(function (response) {
                    isAwsEC2.value = response.data[0].status;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        const mail = process.env.MIX_MAIL;
        const password = process.env.MIX_PASSWORD;

        const putAwsInstanceStatus = async () => {
            const data = JSON.stringify({
                "email": mail,
                "password": password,
                "id": 1,
                "status": isAwsEC2.value,
            });

            console.log(data);

            const config = {
                method: 'put',
                url: endPoint + 'api/v1/aws-status',
                headers: {
                    'Content-Type': 'application/json',
                },
                data : data
            };

            await axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
        const toggleSwitch = async (changeWord) => {
            isAwsEC2.value = changeWord;
            await putAwsInstanceStatus()
        }

        const rendering = ref(false);
        onMounted(async () => {
            await getInstances();
            await getAwsInstanceStatus();
            rendering.value = true;
        });

        const router = useRouter()
        const goToCreatePage = () => {
            router.push("/admin/add-instance");
        }

        const deleteData = () => {
            const config = {
                method: 'delete',
                url: endPoint + 'api/v1/ip-address',
                headers: {}
            };

            axios(config)
                .then(function (response) {
                    isAwsEC2.value = ""
                    instances.value = [];
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        return {
            rendering,
            instances,
            isAwsEC2,
            toggleSwitch,
            goToCreatePage,
            deleteData,
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
