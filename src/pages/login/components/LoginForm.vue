<script setup>
import FormSubmitButton from "@/components/FormSubmitButton.vue";
import Input from "@/components/new_form_elements/Input.vue";
import InputPassword from "@/components/new_form_elements/InputPassword.vue";
import NewFormLayout from "@/components/NewFormLayout.vue";
import icons from "@/utils/icons";
import { useApiRequest } from "@/composables/useApiRequest";
import { useAuth } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import { toasted } from "@/utils/utils";
import { login } from "../api/LoginApi";

const router = useRouter();
const route = useRoute();
const auth = useAuth();
let detiail = localStorage.getItem("userDetail");

function reRoute() {
  if (route.query.redirect && route.query?.from == "other")
    location.href = route.query.redirect;
  else if (route.query.redirect) router.replace(route.query.redirect);
  else router.replace("/dashboard");
}

if (detiail) {
  detiail = JSON.parse(detiail);
  auth.setAuth({
    user: detiail,
    accessToken: detiail.token,
  });
  reRoute();
} else {
  //   redirecting.value = false;
}

const loginReq = useApiRequest();
function handleLogin({ values }) {
  if (loginReq.pending.value) return;

  loginReq.send(
    () => login(values),
    (res) => {
      if (res.success) {
        auth.setAuth({
          user: res.data,
          accessToken: res.data?.token,
        });
        localStorage.setItem("userDetail", JSON.stringify(res.data));
        reRoute();
      }
      toasted(res.success, "Successfully Loggedin", res.error);
    }
  );
}
</script>
<template>
  <div class=" bottom-0 right-0 h-[70%] py-10 px-32">
    <div class="border bg-white h-[100%] px-10 w-[280px] py-4 flex flex-col rounded-lg gap-5 relative z-10 shadow-lg">
    <div class="flex flex-col">
      <img 
        src="@/assets/logo.svg" 
        alt="Logo"
        class="h-[100px]"
      />
    </div>
    
    <NewFormLayout v-slot="{ submit }" id="login-form" class="max-w-full">
      <div class="flex flex-col gap-6">
        <Input
          label="Email*"
          name="email"
          validation="required|email"
          :attributes="{ placeholder: 'Email' }"
        />
        <InputPassword
          label="Password*"
          name="password"
          validation="required"
          :attributes="{ placeholder: 'Password' }"
        />
        <div class="flex justify-between items-center gap-2">
          <div class="flex gap-2">
            <i v-html="icons.checkBox" />
            <p class="text-primary font-normal text">Keep me logged in</p>
          </div>
          <p class="font-bold text-primary cursor-pointer">Forgot Password?</p>
        </div>
        <FormSubmitButton
          class="max-w-[91%]"
          @click.prevent="submit(handleLogin)"
          btn-text="Login"
        />
      </div>
    </NewFormLayout>
  </div>
</div>
  
</template>
<style scoped>
.loginForm {
  background-image: url("@/assets/rectangle2.svg");
  background-size: cover;
}
</style>
