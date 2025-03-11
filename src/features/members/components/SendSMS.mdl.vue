<script setup>
import updatePatientForm from "./updatePatientForm.vue";
import NewFormParent from "@/components/NewFormParent.vue";
import { useForm } from "@/components/new_form_builder/useForm";
import { toasted } from "@/utils/utils";
import Button from "@/components/Button.vue";
import icons from "@/utils/icons";
import ModalParent from "@/components/new_form_builder/ModalParent.vue";
import { closeModal } from "@customizer/modal-x";
import { useApiRequest } from "@/composables/useApiRequest";
import { createPatient, editPatient } from "../api/patientApi";
import { usePatient } from "../store/patientStore";
import { computed, ref } from "vue";
const props = defineProps({
  data: Object
})

console.log(props.data);
const patientUuid = props.data?.patientUuid;
const { submit } = useForm("patientForm");
const patientStore = usePatient();
const patient = computed(() => {  
    return patientStore.patients.find((el) => el.patientUuid === patientUuid) || {};  
});  
const patientReq = useApiRequest();
const pending = ref(false); 
function update({ values }) {  
    pending.value = true; // set to true when starting the update  
    patientReq.send(  
        () => editPatient(patientUuid, values),  
        (res) => {  
            pending.value = false; // reset to false after response  
            if (res.success) {  
                patientStore.update(patientUuid, { ...patient.value, ...values }); // Use .value for refs  
            }  
            toasted(res.success, 'Successfully Updated', res.error);  
            closeModal();  
        }  
    );  
}  
console.log(patientStore.patients);
</script>

<template>
 <ModalParent>
  <NewFormParent class="!px-4 !py-2" size="xs" title="Send SMS">
    <updatePatientForm title="Edit" :patient="props.data" v-if="!pending && !waiting" :providers="providers" :patients="patients" />
    <template #bottom>
      <div class="flex items-center w-full flex-1 bg- justify-center">
        <Button @click.prevent="submit(update)" type="primary" size="lg"
          class="gap-2 m-4 flex items-center flex-1 justify-center">
         
         Send SMS
        </Button>
      </div>
    </template>
  </NewFormParent>
</ModalParent>

</template>
