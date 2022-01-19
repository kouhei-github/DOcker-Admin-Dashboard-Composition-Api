<template>
  <div v-if="isLoading">
    <Loading />
  </div>
  <div class="mt-8" v-if="!thanks">
    <form class="w-10/12 mx-auto md:max-w-3xl">
      <div class="mb-8" v-for="(day, index) in shootingDates" :key="index">
        <div
          class="
            w-full
            py-2
            focus:outline-none
            focus:border-b-2 focus:border-indigo-500
            placeholder-gray-500 placeholder-opacity-50
          "
        >
          <p class="text-black font-extrabold mb-2">{{ day }}</p>
          <p
            class="bg-red-600 text-white text-center mb-2"
            v-if="error['shooting_' + index]"
          >
            選択してください
          </p>
          <select
            for="first-day"
            class="
              text-sm
              block
              w-full
              py-3
              border-b
              focus:outline-none
              focus:border-b-2 focus:border-indigo-500
              placeholder-gray-500 placeholder-opacity-50
              hover:bg-gray-300
              bg-gray-100
            "
            v-bind:class="{
              'border-2 border-red-500': error['shooting_' + index],
            }"
            v-model="answerForm['shooting_' + index]"
          >
            <option
              v-for="(candidate, index) in dates"
              :key="index"
              v-bind:value="candidate"
            >
              {{ candidate }}
            </option>
          </select>
        </div>
      </div>
      <div class="mb-8">
        <label for="name" class="text-sm block">
          <p class="text-black font-extrabold">お名前</p>
          <p class="bg-red-600 text-white text-center" v-if="error.name">
            入力してください
          </p>
        </label>
        <input
          type="text"
          id="name"
          class="
            w-full
            py-2
            border-b
            focus:outline-none
            focus:border-b-2 focus:border-indigo-500
            placeholder-gray-500 placeholder-opacity-50
            hover:bg-gray-300
            bg-gray-100
          "
          placeholder="山田太郎"
          v-model="answerForm.name"
          v-bind:class="{
            'border-2 border-red-500': error.name,
          }"
        />
      </div>
      <div class="mb-8">
        <label for="name" class="text-sm block">
          <p class="text-black font-extrabold">フリカナ</p>
          <p class="bg-red-600 text-white text-center" v-if="error.kana">
            入力してください
          </p>
        </label>
        <input
          type="text"
          id="kana"
          class="
            w-full
            py-2
            border-b
            focus:outline-none
            focus:border-b-2 focus:border-indigo-500
            placeholder-gray-500 placeholder-opacity-50
            hover:bg-gray-300
            bg-gray-100
          "
          placeholder="ヤマダタロウ"
          v-model="answerForm.kana"
          v-bind:class="{
            'border-2 border-red-500': error.kana,
          }"
        />
      </div>
      <div class="mb-8">
        <label for="phone_number" class="text-sm block">
          <p class="text-black font-extrabold">緊急先電話番号</p>
          <p class="bg-red-600 text-white text-center" v-if="error.tell">
            入力してください
          </p>
        </label>
        <input
          type="tel"
          id="phone_number"
          class="
            w-full
            py-2
            border-b
            focus:outline-none
            focus:border-b-2 focus:border-indigo-500
            placeholder-gray-500 placeholder-opacity-50
            hover:bg-gray-300
            bg-gray-100
          "
          placeholder="電話番号"
          v-model="answerForm.tell"
          v-bind:class="{
            'border-2 border-red-500': error.tell,
          }"
        />
      </div>
      <div class="mb-8">
        <label for="phone_number" class="text-sm block">
          <p class="text-black font-extrabold">
            SNS(Instagram, Twitter, facebookなど)のアカウント
          </p>
          <p class="bg-red-600 text-white text-center" v-if="error.instagram">
            入力してください
          </p>
        </label>
        <input
          type="text"
          id="instagram"
          class="
            w-full
            py-2
            border-b
            focus:outline-none
            focus:border-b-2 focus:border-indigo-500
            placeholder-gray-500 placeholder-opacity-50
            hover:bg-gray-300
            bg-gray-100
          "
          placeholder="アカウント actress_fashion2021"
          v-model="answerForm.instagram"
          v-bind:class="{
            'border-2 border-red-500': error.instagram,
          }"
        />
      </div>
      <div class="mb-8" v-for="(interview, index) in interviews" :key="index">
        <label for="other" class="w-full">
          <p class="text-black font-extrabold">
            {{ interview }}を記述してください
          </p>
          <p
            class="bg-red-600 text-white text-center"
            v-if="error['interview_' + index]"
          >
            入力してください
          </p>
        </label>
        <textarea
          id="other"
          cols="30"
          rows="8"
          class="
            w-full
            py-2
            border-b
            focus:outline-none
            focus:border-b-2 focus:border-indigo-500
            placeholder-gray-500 placeholder-opacity-50
            hover:bg-gray-300
            bg-gray-100
          "
          v-bind:placeholder="interview"
          v-model="answerForm['interview_' + index]"
          v-bind:class="{
            'border-2 border-red-500': error['interview_' + index],
          }"
        ></textarea>
      </div>
      <div class="mb-8">
        <div
          class="
            w-full
            py-2
            focus:outline-none
            focus:border-b-2 focus:border-indigo-500
            placeholder-gray-500 placeholder-opacity-50
          "
        >
          <p class="text-black font-extrabold">
            今後のチャンネル担当者との連絡手段を選択してください
          </p>
          <p
            class="bg-red-600 text-white text-center mb-2"
            v-if="error.contact"
          >
            選択してください
          </p>
          <select
            for="first-day"
            class="
              text-sm
              block
              w-full
              py-3
              border-b
              focus:outline-none
              focus:border-b-2 focus:border-indigo-500
              placeholder-gray-500 placeholder-opacity-50
              hover:bg-gray-300
              bg-gray-100
            "
            v-model="answerForm.contact"
            v-bind:class="{
              'border-2 border-red-500': error.contact,
            }"
          >
            <option
              v-for="(way, index) in waysToContact"
              :key="'way_' + index"
              v-bind:value="way"
            >
              {{ way }}
            </option>
          </select>
        </div>
      </div>
      <div
        class="
          w-full
          px-4
          py-3
          mb-8
          text-center
          bg-green-400
          hover:bg-green-500
          font-bold
          shadow-2xl
        "
        v-on:click="postEndpoint()"
      >
        送信する
      </div>
    </form>
  </div>
  <div class="my-10 text-center" v-if="thanks">
    ご回答ありがとうございました
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import axios from "axios";
import Loading from "./Loading.vue";

export default defineComponent({
  props: {
    interviews: {
      type: Object,
      required: true,
    },
    dates: {
      type: Array,
      required: true,
    },
    interview_id: {
      type: Number,
      required: true,
    },
  },
  components: {
    Loading,
  },

  setup(props) {
    const isLoading = ref(false);
    const endPoint = process.env.MIX_API_URL_BASE;
    const thanks = ref(false);
    const error = reactive({
      shooting_0: false,
      shooting_1: false,
      shooting_2: false,
      name: false,
      kana: false,
      tell: false,
      instagram: false,
      interview_first: false,
      interview_second: false,
      interview_third: false,
      interview_fourth: false,
        interview_fifth: false,
    });

    const answerForm = reactive({
      name: "",
      kana: "",
      tell: "",
      contact: "選択してください",
      shooting_0: "選択してください",
      shooting_1: "選択してください",
      shooting_2: "選択してください",
      instagram: "",
      interview_first: "",
      interview_second: "",
      interview_third: "",
      interview_fourth: "",
        interview_fifth: "",
      interview_id: props.interview_id,
    });

    const shootingDates = [
      "撮影 第一候補日を選択してください",
      "撮影 第二候補日を選択してください",
      "撮影 第三候補日を選択してください",
    ];

    const waysToContact = [
      "選択してください",
      "Line",
      "Messenger",
      "Instagram DM",
    ];

    const postEndpoint = async () => {
      console.log(props.interview_id);
      const judge = inputCheck(answerForm);
      if (judge) {
        return;
      }
      isLoading.value = isLoading.value ? false : true;

      const config = {
        method: "post",
        url: endPoint + "api/save-answer", // TODO 回答結果を保存する処理
        headers: {
          "content-type": "application/json",
        },
        data: JSON.stringify(answerForm),
      };

      await axios(config)
        .then(function (response) {
          thanks.value = true;
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      isLoading.value = isLoading.value ? false : true;
    };
    const quesitonLength = () => {
        const keyNums = Object.keys(props.interviews);
        const Numbers = [];
        for (const key of keyNums) {
            const word = "interview_" + key;
            Numbers.push(word)
        }
        return Numbers;
    }
    const inputCheck = (answers) => {
      let flag = false;
      const questions = quesitonLength();
        console.log("test");
        console.log(props.interviews)
      for (const property in answers) {
          console.log(property);
        if (
            questions.includes(property) &&
          answers[property] == "" ||
          answers[property] == "選択してください"
        ) {
          error[property] = true;
          flag = true;
        } else {
          error[property] = false;
        }
      }
      return flag;
    };

    return {
      shootingDates,
      waysToContact,
      answerForm,
      postEndpoint,
      error,
      thanks,
      isLoading,
    };
  },
});
</script>
