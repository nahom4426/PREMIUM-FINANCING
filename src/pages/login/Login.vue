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
          Flexible Premium Financing for Your Vehicle Insurance
        </p>
        <p class="font-degular text-[18px] leading-[28px] tracking-[0.2px] font-normal text-white">
          Make your car insurance more affordable with our premium financing solutions. Spread your insurance costs into manageable monthly payments while enjoying comprehensive coverage. Our platform makes it easy to manage your vehicle insurance premiums with flexible payment plans tailored to your needs.
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

