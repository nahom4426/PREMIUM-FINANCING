<script setup>
import icons from "@/utils/icons";
import LoginForm from "./components/LoginForm.vue";
</script>

<template>
  <div class="h-full w-full relative gap-4 overflow-hidden login bg-[#3C3C9E]">
    <img 
  src="@/assets/rectangle2.svg" 
  alt="" 
  class="absolute top-0 left-0 w-auto h-auto object-cover rotate-30 fade-mask"
/>
    <div class="grid grid-cols-2 h-full">
      <div class="p-20 py-48 flex flex-col gap-4">
        <p class="font-degular text-[45px] leading-[45px] tracking-[4%] gap-4 text-white font-normal">
  Lorem ipsum dolor sit, adipiscing elit.
</p>
<p class="font-degular text-[18px] leading-[28px] tracking-[0.2px] font-normal text-white">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel odio en urna ultrice. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel odio en urna ultrice. Lorem ipsum dolor sit, consectetur adipiscing elit. Ut vel odio en urna ultrice. Lorem ipsum dolor sit amet.
</p>


      </div>
      <LoginForm />
    </div>
  </div>
</template>

<style scoped>
.login {

  background-size: cover;
  background-position: center;
}
.fade-mask {
  mask-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 30%, rgba(0, 0, 0, 1) 100%);
  -webkit-mask-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 30%, rgba(0, 0, 0, 1) 100%);
}



</style>
