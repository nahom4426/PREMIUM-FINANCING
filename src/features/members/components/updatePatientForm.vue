<script setup>
import Button from "@/components/Button.vue";
import TableRowSkeleton from "@/components/TableRowSkeleton.vue";
import { useApiRequest } from "@/composables/useApiRequest";
import { ref, computed, nextTick } from "vue";
import Table from "@/components/Table.vue";
import { usemember } from "@/features/members/store/memberStore";
import { toasted } from "@/utils/utils";
import { confirmPayment } from "@/features/payment/api/paymentApi";
import { closeModal } from "@customizer/modal-x";
import { Input, Textarea } from "@/components/new_form_elements";
import { Form } from "@/components/new_form_builder";
import Select from "@/components/new_form_elements/Select.vue";
import InputPassword from "@/components/new_form_elements/InputPassword.vue";
import { checkEligiblity, searchPatientById } from "../api/patientApi";

const props = defineProps({
  patient: {
    type: Object
  }
})
console.log(props?.patient);


const patientKeys = computed(() => Object.keys(props.patient ?? {}));
const servicereq = useApiRequest();
const search = ref("");
const selectedServices = ref([]);
const serviceStore = usePatient()

// function getService(ev) {
//   selectionMessage.value = ""; // Reset the message on new search
//   servicereq.send(
//     () => searchServicesByServiceName({ page: 1, limit: 25, search: search.value }),
//     (res) => {
//       if (res.success) {
//         serviceStore.set(res.data);
//       }
//       console.log(res);
//     },
//     true
//   );
// }
const selectionMessage = ref("");
function selectService(service) {
  const isServiceSelected = selectedServices.value.some((s) => s.serviceCode === service.serviceCode);
  
  if (!isServiceSelected) {
    selectedServices.value.push(service);
    selectionMessage.value = ""; // Clear the message if the service is successfully added
    console.log(selectedServices);
  } else {
    selectionMessage.value = "Service already selected!";
  }
}
function removeService(service) {
  selectedServices.value = selectedServices.value.filter((s) => s.serviceCode !== service.serviceCode);
}

// Computes the total price of selected services
const totalPrice = computed(() =>
  selectedServices.value.reduce((sum, service) => sum + Number(service.price), 0)
);
const req = useApiRequest();
const paymentStore = usePatient()
function createService() {
  if (!props.patient?.id || selectedServices.value.length === 0) {
    alert("Patient UUID or selected services are missing.");
    console.warn("Patient UUID or selected services are missing.");
    return;
  }

  const requestData = {
    patientUuid: props.patient.patientUuid,
    servicesUuids: selectedServices.value.map(service => service.serviceUuid)
  };

  req.send(
    () => confirmPayment(requestData),
    (res) => {
      if (res.success) {
        paymentStore.set(requestData),
          console.log("Service added successfully!", res);
        selectedServices.value = []; // Clear selected services after successful submission
      }
      toasted(res.success, 'Confirm Payment Succesfully', res.error);
      closeModal();
    },
    true
  );
}


const formattedGender = computed({
  get: () => servicereq.response.value?.response[0].gender?.toUpperCase() || '',
  set: (value) => {
    if (servicereq.response.value?.response[0]) {
      servicereq.response.value.response[0].gender = value.toLowerCase(); // Store as lowercase
    }
  }
});
// Refs for checkboxes and search input
const isInsured = ref(false);
const isNotInsured = ref(false);
const insuranceSearch = ref("");
function getService(ev) {
   // Reset the message on new search
  servicereq.send(
    () => checkEligiblity({ page: 1, limit: 25, search: search.value }),
    (res) => {
      if (res.success) {
        serviceStore.set(res.data);
      }
      console.log(res);
    },
    true
  );
}


</script>

<template>
  
 <div class="flex flex-col gap-4 w-[600px]  p-2">
   
        <Textarea
      validation="required"
      name="sms"
      label="Message"
      :attributes="{
        placeholder: 'Type your message here',
      }"
    />
   
  </div>
</template>



<style scoped></style>
