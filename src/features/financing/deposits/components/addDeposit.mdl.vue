<script setup>
import { ref, computed, watch } from 'vue';
import Button from '@/components/Button.vue';
import Select from '@/components/new_form_elements/Select.vue';
import { useForm } from "@/components/new_form_builder/useForm";
import { allRequest, toasted } from "@/utils/utils";
import ModalParent from "@/components/new_form_builder/ModalParent.vue";
import NewFormParent from "@/components/NewFormParent.vue";
import Form from "@/components/new_form_builder/Form.vue";
import { Input } from "@/components/new_form_elements";
import { useApiRequest } from "@/composables/useApiRequest";
import { usePaginationcopy } from "@/composables/usePaginationcopy";
import { closeModal } from "@customizer/modal-x";
import { searchClientByPhone, submitDeposit } from "../api/depositsApi";


const step = ref(1);
const searchPhone = ref('');
let searchTimeout = null; // Add debounce timeout
const selectedClient = ref(null);

// Setup pagination - Fix the callback to properly use searchPhone value
const pagination = usePaginationcopy({
  cb: () => searchClientByPhone(searchPhone.value),
  auto: false
});

// Payment details
const paymentDetails = ref({
  paymentType: '',
  amount: '',
  receiptNumber: '',
  photo: null
});

// Add watch for searchPhone
watch(searchPhone, (newValue) => {
  // Clear any existing timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  // Don't search if empty
  if (!newValue) {
    return;
  }

  // Debounce the search with 500ms delay
  searchTimeout = setTimeout(() => {
    pagination.send();
  }, 500);
});

// Update the clients computed property to filter for non-deposited clients
const clients = computed(() => {
  const allClients = pagination.data?.value?.content || [];
  return allClients.filter(client => client.deposited === false);
});

// Use computed for loading state
const loading = computed(() => pagination.pending.value);

// Select client and move to next step
const selectClient = (client) => {
  if (client.deposited) {
    toasted(false, "", "This client has already made a deposit");
    return;
  }
  
  selectedClient.value = {
    userUuid: client.userUuid,
    quotationUuid: client.quotationUuid,
    firstName: client.clientFirstName,
    lastName: client.clientFatherName,
    phone: client.clientPhoneNumber,
    email: client.clientEmail,
    vehicle: `${client.carName} ${client.carModel}`,
    insurance: client.insurance,
    quotationAmount: client.quotationAmount,
    monthlyPayment: client.monthlyPayment,
    accountNumber: client.accountNumber
  };
};

const nextStep = (event) => {
  event?.preventDefault(); // Prevent form submission
  
  if (!selectedClient.value) {
    toasted(false, "", "Please select a client first");
    return;
  }
  step.value = 2;
};

const prevStep = () => {
  step.value = 1;
  selectedClient.value = null;
};

// Handle file upload
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toasted(false, "", "File size should be less than 5MB");
      event.target.value = ''; // Clear the input
      return;
    }
    paymentDetails.value.photo = file;
  }
};

// Submit form
const submitForm = async () => {
  // Validation
  if (!paymentDetails.value.paymentType || 
      !paymentDetails.value.amount || 
      !paymentDetails.value.receiptNumber ||
      !paymentDetails.value.photo) {
    toasted(false, "", "Please fill all required fields");
    return;
  }

  // Amount validation
  if (paymentDetails.value.amount <= 0) {
    toasted(false, "", "Amount must be greater than 0");
    return;
  }

  try {
    const response = await submitDeposit(
      selectedClient.value.userUuid,  // Use userUuid in the path
      {
        quotationUuid: selectedClient.value.quotationUuid, // Use quotationUuid in query params
        paymentType: paymentDetails.value.paymentType,
        amount: paymentDetails.value.amount,
        receiptNumber: paymentDetails.value.receiptNumber
      },
      paymentDetails.value.photo
    );

    if (response.success) {
      toasted(true, "Deposit submitted successfully!");
      closeModal();
    } else {
      toasted(false, "", response.error || "Failed to submit deposit");
    }
  } catch (error) {
    console.error('Deposit submission error:', error);
    toasted(false, "", error.response?.data?.message || "Error submitting deposit");
  }
};
</script>

<template>
  <ModalParent>
    <NewFormParent class="px-4 py-2" size="xs" title="Making Deposits">
      <template #default>
        <div class="gap-5 mt-3 p-6">
          <!-- Step 1: Search and Select Client -->
          <div v-if="step === 1">
            <!-- Search Bar -->
            <div class="w-full mb-4">
              <Input
                v-model="searchPhone"
                placeholder="Search by phone number"
                class="w-full"
              >
              <template #right>
                  <Button @click="searchClients" type="primary" size="sm">
                    Search
                  </Button>
                </template>
              </Input>
            </div>

            <!-- Clients Table -->
            <div class="bg-white rounded-lg shadow overflow-hidden">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th> -->
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                    <!-- <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Insurance</th> -->
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-if="loading" class="text-center">
                    <td colspan="6" class="px-6 py-4">Loading...</td>
                  </tr>
                  <tr v-else-if="clients.length === 0" class="text-center">
                    <td colspan="6" class="px-6 py-4">
                      {{ searchPhone ? 'No pending deposits found for this phone number' : 'Please enter a phone number to search' }}
                    </td>
                  </tr>
                  <tr v-for="client in clients" 
                      :key="client.quotationUuid" 
                      :class="{'bg-[#3C3C9E] text-white': selectedClient?.quotationUuid === client.quotationUuid}"
                      class="hover:bg-[#3C3C9E] hover:text-white">
                    <td class="px-6 py-4">{{ client.clientFirstName }} {{ client.clientFatherName }}</td>
                    <td class="px-6 py-4">{{ client.clientPhoneNumber }}</td>
                    <!-- <td class="px-6 py-4">{{ client.clientEmail }}</td> -->
                    <td class="px-6 py-4">{{ client.carName }} {{ client.carModel }}</td>
                    <!-- <td class="px-6 py-4">{{ client.insurance }}</td> -->
                    <td class="px-6 py-4">
                      <Button 
                        @click="selectClient(client)" 
                        type="secondary" 
                        size="sm"
                        :disabled="client.deposited"
                      >
                        {{ client.deposited ? 'Already Deposited' : 'Select' }}
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <!-- Pagination Controls -->
              <div class="flex justify-between items-center px-6 py-3 bg-gray-50">
                <button 
                  @click="pagination.previous"
                  :disabled="pagination.page === 1"
                  class="px-3 py-1 bg-white border rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                <span>Page {{ pagination.page }} of {{ pagination.totalPages|| 1}}</span>
                <button 
                  @click="pagination.next"
                  :disabled="!pagination.hasMore"
                  class="px-3 py-1 bg-white border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <!-- Step 2: Client Details and Payment -->
          <div v-if="step === 2" class="space-y-6">
            <div class="grid grid-cols-2 ">
              <!-- Client Info Card -->
              <div class="bg-gray-50 p-4 rounded-lg pl-5">
                <h3 class="text-lg font-bold text-[#494F51] mb-3 border-b">Client Information</h3>
                <div class="grid grid-cols-1 gap-3 pt-2">
                  <div class="flex justify-between">
                    <p class="text-sm text-[#2B3674]">First Name</p>
                    <p class="font-bold text-[#494F51]">{{ selectedClient.firstName }}</p>
                  </div>
                  <div class="flex justify-between">

                    <p class="text-sm text-[#2B3674]">Last Name</p>
                    <p class="font-bold text-[#494F51]">{{ selectedClient.lastName }}</p>
                  </div>
                  <div class="flex justify-between">

                    <p class="text-sm text-[#2B3674]">Email</p>
                    <p class="font-bold text-[#494F51]">{{ selectedClient.email }}</p>
                  </div>
                  <div class="flex justify-between">

                    <p class="text-sm text-[#2B3674]">Phone</p>
                    <p class="font-bold text-[#494F51]">{{ selectedClient.phone }}</p>
                  </div>
                </div>
              </div>

              <!-- Vehicle Details Card -->
              <div class="bg-gray-50 p-4 rounded-lg pl-5">
                <h3 class="text-lg font-bold text-[#494F51] mb-3 border-b">Insurance details</h3>
                <div class="grid grid-cols-1 gap-3 pt-2">
                  <div class="flex justify-between">
                    <p class="text-sm text-[#2B3674]">Vehicle</p>
                    <p class="font-bold text-[#494F51]">{{ selectedClient.vehicle }}</p>
                  </div>
                  <div class="flex justify-between">
                    <p class="text-sm text-[#2B3674]">Insurance</p>
                    <p class="font-bold text-[#494F51]">{{ selectedClient.insurance }}</p>
                  </div>
                  <div class="flex justify-between">
                    <p class="text-sm text-[#2B3674]">Total Primium</p>
                    <p class="font-bold text-[#494F51]">{{ selectedClient.quotationAmount }}</p>
                  </div>
                  <div class="flex justify-between">
                    <p class="text-sm text-[#2B3674]">Monthly Payment</p>
                    <p class="font-bold text-[#494F51]">{{ selectedClient.monthlyPayment }}</p>
                  </div>  <div class="flex justify-between">
                    <p class="text-sm text-[#2B3674]">Account Number</p>
                    <p class="font-bold text-[#494F51]">{{ selectedClient.accountNumber }}</p>
                  </div>
                 
                </div>
              </div>
            </div>

            <!-- Payment Form -->
            <div class="mt-6">
              <h3 class="text-lg font-semibold mb-4">Payment Details</h3>
              <div class="grid grid-cols-2 gap-4">
                <Select
                  v-model="paymentDetails.paymentType"
                  label="Payment Type"
                  validation="required"
                  :options="[
                    'ONLINE',
                    'Cash',
                    'DIRECT_pAY',
                    'DISPERSE'
                  ]"
                  :attributes="{ 
                    placeholder: 'Select Payment Type',
                    required: true 
                  }"
                />
                <Input
                  v-model="paymentDetails.amount"
                  label="Amount"
                  type="number"
                  validation="required|num_min-1"
                  :attributes="{ 
                    placeholder: 'Enter amount',
                    required: true
                  }"
                />
                <Input
                  v-model="paymentDetails.receiptNumber"
                  label="Receipt Number"
                  validation="required"
                  :attributes="{ 
                    placeholder: 'Enter receipt number',
                    required: true
                  }"
                />
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Upload Receipt <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    @change="handleFileUpload"
                    accept="image/*"
                    required
                    class="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <!-- <div class="flex justify-between mt-6">
              <Button @click="prevStep" type="secondary">
                Back
              </Button>
              <Button @click="submitForm" type="primary">
                Submit Deposit
              </Button>
            </div> -->
          </div>
        </div>
      </template>

      <template #bottom>
        <div class="flex justify-between m-4 w-full gap-4 pr-4">
          <Button 
            v-if="step === 2"
            @click.prevent="prevStep" 
            type="secondary" 
            size="lg"
          >
            Back
          </Button>
          
          <Button 
            v-if="step === 1" 
            @click.prevent="nextStep" 
            type="primary" 
            size="lg"
            :disabled="!selectedClient"
            class="w-full"
          >
            Continue
          </Button>
          
          <Button 
            v-if="step === 2" 
            @click.prevent="submitForm" 
            type="primary" 
            size="lg"
            class="w-full"
          >
            Submit
          </Button>
        </div>
      </template>
    </NewFormParent>
  </ModalParent>
</template>
