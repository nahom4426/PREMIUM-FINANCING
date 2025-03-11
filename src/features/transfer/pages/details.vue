<template>  
 <div class="  mx-auto p-6 bg-white ">  
    <header class="flex items-center mb-4 pb-5 ml-5 border-b justify-between">  
    <div class="flex items-center gap-2"> 
      <i class="pl-2" v-html="icons.pro" />
       <h1 class="text-md font-semibold">{{ client.firstName }} {{ client.lastName }}</h1>  
    </div> 
    <p>Suzuki Dezire 2024 - Code 3</p>
    </header>  
<div class="bg-[rgb(246,246,255)] p-4 flex w-full h-full">
  <section class="mb-6 p-3 bg-white pt-5 w-auto">
    <h2 class="text-sm font-bold mb-1 border-b">Client Info</h2>
    <div class="grid grid-cols-2 gap-4 pt-2">
        <div class="py-1 text-sm font-normal text-[#2B3674]">First Name</div>
        <div class="py-1 text-sm">{{ client.firstName }}</div>
        
        <div class="py-1 text-sm font-normal text-[#2B3674]">Last Name</div>
        <div class="py-1 text-sm">{{ client.lastName }}</div>
        
        <div class="py-1 text-sm font-normal text-[#2B3674]">Email</div>
        <div class="py-1 text-sm">{{ client.email }}</div>
        
        <div class="py-1 text-sm font-normal text-[#2B3674]">Phone Number</div>
        <div class="py-1 text-sm">{{ client.phone }}</div>
    </div>
    <h2 class="text-sm font-bold mb-2 border-b pt-12">Vehicle details</h2>
    <div class="grid grid-cols-2 gap-4 pt-2">
        <div class="py-1 text-sm font-normal text-[#2B3674]">Vehicle Make </div>
        <div class="py-1 text-sm">{{ client.firstName }}</div>
        
        <div class="py-1 text-sm font-normal text-[#2B3674]">Vehicle Model </div>
        <div class="py-1 text-sm">{{ client.lastName }}</div>
        
        <div class="py-1 text-sm font-normal text-[#2B3674]">Vehicle Year </div>
        <div class="py-1 text-sm">{{ client.email }}</div>
        
        <div class="py-1 text-sm font-normal text-[#2B3674]">Plate Code</div>
        <div class="py-1 text-sm">{{ client.phone }}</div>
        <div class="py-1 text-sm font-normal text-[#2B3674]">Insurance</div>
        <div class="py-1 text-sm">{{ client.phone }}</div>
    </div>
</section>


<section class="w-3/5 h-full">
  <section class="mb-6 mx-4 w-full h-full p-3 bg-white pt-5">
    <h2 class="text-sm font-bold mb-2 border-b ">Quotation Details</h2>
    <div class="flex flex-col gap-4 pt-2">
      <div class="flex justify-between">
  <span class="py-1 text-sm font-normal text-[#2B3674]">Quotation</span>

  <!-- Check if the user is in edit mode -->
  <div v-if="!isEditing1">
    <Button 
      class="text-sm bg-[#F6F6FF] items-center text-[#272833]" 
      @click="toggleEdit1"
    >
      ETB {{ quotation.amount }} <i class="pl-2" v-html="icons.pencil" />
    </Button>
  </div>

  <!-- If the user is editing, show an input field with a Save button inside -->
  <div v-if="isEditing1" class="flex items-center border-2">
    <!-- Input field with padding-right to make space for the Save button --><p class="p-2">ETB</p>
    <input 
      v-model="editedAmount1" 
      type="number" 
      class="w-16 pr-2" 
    />
    
    <!-- Save button right next to the input -->
    <button 
      class="text-sm bg-[#3C3C9E] items-center p-2 m-1 text-[#ffffff] rounded-md "
      @click="saveEdit"
    >
      Change
    </button>
  </div>
</div>


<div class="flex justify-between">
  <span class="py-1 text-sm font-normal text-[#2B3674]">Deposite</span>

  <!-- Check if the user is in edit mode -->
  <div v-if="!isEditing2">
    <Button 
      class="text-sm bg-[#F6F6FF] items-center text-[#272833]" 
      @click="toggleEdit2"
    >
      ETB {{ quotation.deposit }} <i class="pl-2" v-html="icons.pencil" />
    </Button>
  </div>

  <!-- If the user is editing, show an input field with a Save button inside -->
  <div v-if="isEditing2" class="flex items-center border-2">
    <!-- Input field with padding-right to make space for the Save button --><p class="p-2">ETB</p>
    <input 
      v-model="editedAmount2" 
      type="number" 
      class="w-16 pr-2" 
    />
    
    <!-- Save button right next to the input -->
    <button 
      class="text-sm bg-[#3C3C9E] items-center p-2 m-1 text-[#ffffff] rounded-md "
      @click="saveEdit"
    >
      Change
    </button>
  </div>
</div>
<div class="flex justify-between ">
  <span class="py-1 text-sm font-normal text-[#2B3674]">Monthly Premium</span>

  <!-- Check if the user is in edit mode -->
  <div v-if="!isEditing3">
    <Button 
      class="text-sm bg-[#F6F6FF] items-center text-[#272833]" 
      @click="toggleEdit3"
    >
      ETB {{ quotation.premium }} <i class="pl-2" v-html="icons.pencil" />
    </Button>
  </div>

  <!-- If the user is editing, show an input field with a Save button inside -->
  <div v-if="isEditing3" class="flex items-center border-2">
    <!-- Input field with padding-right to make space for the Save button --><p class="p-2">ETB</p>
    <input 
      v-model="editedAmount3" 
      type="number" 
      class="w-16 pr-2" 
    />
    
    <!-- Save button right next to the input -->
    <button 
      class="text-sm bg-[#3C3C9E] items-center p-2 m-1 text-[#ffffff] rounded-md "
      @click="saveEdit"
    >
      Change
    </button>
  </div>
</div>
    </div>
    <div class="border-b-2 pt-6"></div>
    <Button class="mt-4 bg-[#3C3C9E] border-t mx-2  text-center text-white  px-56 rounded text-sm">
        Send Final Quote to Client
    </Button>
</section>

    <section class="mb-6 mx-4 w-full h-full p-3 bg-white pt-5 ">  
      <h2 class="text-lg font-semibold mb-2 border-b">libre</h2>  
      <div class="flex flex-col">  
        <div class="flex px-2 gap-4 pt-2">  
          <img src="@/assets/niyala1.png" />  
          <img src="@/assets/niyala2.png" />  

        </div>  
        
      </div>  
       
    </section> 
  </section>
    
    
  </div>
  </div>  

  </template>  
  
  <script setup>
  import { usePagination } from '@/composables/usePagination';
import { removeUndefined } from '@/utils/utils';
import { ref } from 'vue';

import { getCustomersbyId } from '../api/customersApi';
import { useRoute } from 'vue-router';
import { useCustomers } from '../store/customeridStore';
import Button from '@/components/Button.vue';
import icons from '@/utils/icons';

  
  // Customer data
  const customer = ref({
	image: 'customer-image-url.jpg', // Replace with the actual image URL
	joinedDate: '23-05-2024',
	fullName: 'Birhane Araya',
	phoneNumber: '+251 945 065 432',
	address: 'Bole, Woreda 2, Addis Ababa',
	email: 'birhanearaya23@gmail.com'
  });
  
  // Mobile data
  const mobile = ref({
	deviceBrand: 'iPhone 15',
	handsetCost: 'ETB 120,000.00',
	manufacturedYear: '2023',
	serialNumber: 'AD487598E',
	imei: '495860469593',
	imei2: '1239804710923'
  });
  
  // Policy data (if needed in future)
  const policy = ref({
	policyNumber: 'L389247',
	status: 'Active',
	expiryDate: 'Araya',
	premiumPayments: 23
  });
  const client = ref({  
  firstName: 'Birhane',  
  lastName: 'Araya',  
  email: 'birhanearya23@gmail.com',  
  phone: '+251 946065432',  
  image: 'path_to_image.jpg', // Replace with an actual image path  
});  

// Example quotation data  
const quotation = ref({  
  amount: 27000,  
  deposit: 3400,  
  premium: 1200,  
});  
  const props = defineProps({
  pending: {
    type: Boolean,
    default: false,
  },
  onSubmit: {
    type: Function,
  },
});
const customerId = useCustomers();
const route = useRoute()
const userUuid = route.params?.id
const pagination = usePagination({
  store: customerId,
  cb: async (id) => {
    try {
      return await getCustomersbyId(userUuid);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    }
  },
});
const isEditing1 = ref(false);
const isEditing2 = ref(false);
const isEditing3 = ref(false);
const editedAmount1 = ref(quotation.value.amount);
const editedAmount2 = ref(quotation.value.deposit);
const editedAmount3 = ref(quotation.value.premium);
// Method to toggle editing mode
const toggleEdit1 = () => {
  isEditing1.value = true;
  isEditing2.value = false;
  isEditing3.value = false;
  
  
};

const toggleEdit2 = () => {
  isEditing2.value = true;
  isEditing1.value = false;
  isEditing3.value = false;
};
const toggleEdit3 = () => {
  isEditing3.value = true;
  isEditing2.value = false;
  isEditing1.value = false;
};

// Method to save the edited amount
const saveEdit = () => {
  quotation.value.amount = editedAmount1.value;
  quotation.value.deposit = editedAmount2.value;
  quotation.value.premium = editedAmount3.value;
  isEditing1.value = false;
  isEditing2.value = false;
  isEditing3.value = false;
};
  </script>
  
  
  <style scoped>  
  /* You can add additional styles here if needed */  
  </style>