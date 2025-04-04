<template>  
 <div class="mx-auto p-3 sm:p-6  bg-white">  
    <header class="flex flex-col  sm:flex-row items-start sm:items-center mb-4 pb-5 ml-2 sm:ml-5 border-b justify-between gap-2">  
      <div class="flex items-center gap-2"> 
        <i class="pl-2" v-html="icons.pro" />
        <h1 class="text-sm sm:text-md font-semibold">{{ customerId.customers?.clientFirstName }} {{ customerId.customers?.clientFatherName }} {{ customerId.customers?.clientGrandFatherName }}</h1>  
      </div> 
      <p class="text-sm">Suzuki Dezire 2024 - Code 3</p>
    </header>  

    <div class="bg-[rgb(246,246,255)] p-2 sm:p-4 flex flex-col lg:flex-row w-full h-full gap-4">
      <!-- Client Info Section -->
      <section class="mb-4 p-3 bg-white pt-5 w-full lg:w-1/3">
        <h2 class="text-sm font-bold mb-1 border-b">Client Info</h2>
        <div class="grid grid-cols-2 gap-2 sm:gap-4 pt-2">
          <div class="py-1 text-xs sm:text-sm font-normal text-[#2B3674]">First Name</div>
          <div class="py-1 text-xs sm:text-sm">{{ customerId.customers?.clientFirstName }}</div>
          
          <div class="py-1 text-xs sm:text-sm font-normal text-[#2B3674]">Last Name</div>
          <div class="py-1 text-xs sm:text-sm">{{ customerId.customers?.clientFatherName }}</div>
          
          <div class="py-1 text-xs sm:text-sm font-normal text-[#2B3674]">Email</div>
          <div class="py-1 text-xs sm:text-sm break-all">{{ customerId.customers?.clientEmail }}</div>
          
          <div class="py-1 text-xs sm:text-sm font-normal text-[#2B3674]">Phone Number</div>
          <div class="py-1 text-xs sm:text-sm">{{ customerId.customers?.clientPhoneNumber}}</div>
        </div>

        <h2 class="text-sm font-bold mb-2 border-b pt-8 sm:pt-12">Vehicle details</h2>
        <div class="grid grid-cols-2 gap-2 sm:gap-4 pt-2">
          <div class="py-1 text-xs sm:text-sm font-normal text-[#2B3674]">Vehicle Make </div>
          <div class="py-1 text-xs sm:text-sm">{{ customerId.customers?.carName}}</div>
          
          <div class="py-1 text-xs sm:text-sm font-normal text-[#2B3674]">Vehicle Model </div>
          <div class="py-1 text-xs sm:text-sm">{{ customerId.customers?.carModel }}</div>
          
          <div class="py-1 text-xs sm:text-sm font-normal text-[#2B3674]">Vehicle Year </div>
          <div class="py-1 text-xs sm:text-sm">{{ customerId.customers?.makeYear }}</div>
          
          <div class="py-1 text-xs sm:text-sm font-normal text-[#2B3674]">Plate Code</div>
          <div class="py-1 text-xs sm:text-sm">{{ customerId.customers?.plateCode }}</div>
          
          <div class="py-1 text-xs sm:text-sm font-normal text-[#2B3674]">Insurance</div>
          <div class="py-1 text-xs sm:text-sm">{{ customerId.customers?.insurance }}</div>
        </div>
      </section>

      <!-- Right Section Container -->
      <section class="w-full lg:w-3/5 flex flex-col gap-4">
        <!-- Quotation Details Section -->
        <section class="w-full p-3 bg-white pt-5">
          <h2 class="text-sm font-bold mb-2 border-b">Quotation Details</h2>
          <div class="flex flex-col gap-4 pt-2">
            <!-- Quotation Amount -->
            <div class="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
              <span class="text-xs sm:text-sm font-normal text-[#2B3674]">Quotation</span>
              <div v-if="!isEditing1">
                <Button class="text-xs sm:text-sm bg-[#F6F6FF] items-center text-[#272833]" @click="toggleEdit1">
                  ETB {{ quotation.amount }} <i class="pl-2" v-html="icons.pencil" />
                </Button>
              </div>
              <div v-if="isEditing1" class="flex items-center border-2">
                <p class="p-2 text-xs sm:text-sm">ETB</p>
                <input v-model="editedAmount1" type="number" class="w-16 pr-2 text-xs sm:text-sm" />
                <button class="text-xs sm:text-sm bg-[#3C3C9E] items-center p-2 m-1 text-white rounded-md" @click="saveEdit">
                  Change
                </button>
              </div>
            </div>

            <!-- Deposit -->
            <div class="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
              <span class="text-xs sm:text-sm font-normal text-[#2B3674]">Deposit</span>
              <div class="text-xs sm:text-sm bg-[#F6F6FF] items-center text-[#272833] p-2">
                ETB {{ quotation.deposit }}
              </div>
            </div>

            <!-- Monthly Premium -->
            <div class="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
              <span class="text-xs sm:text-sm font-normal text-[#2B3674]">Monthly Premium</span>
              <div class="text-xs sm:text-sm bg-[#F6F6FF] items-center text-[#272833] p-2">
                ETB {{ quotation.premium }}
              </div>
            </div>
          </div>

          <div class="flex border-b-2 text-center items-center justify-center pt-6">
            <Button 
              class="flex justify-center mt-1 bg-[#3C3C9E] text-center w-full mx-2 items-center text-white py-2 rounded text-sm"
              @click="sendFinalQuotation"
              :pending="isSubmitting"
            >
              Send Final Quote to Client
            </Button>
          </div>
        </section>

        <!-- Libre Section -->
        <section class="w-full p-3 bg-white pt-5">  
          <h2 class="text-lg font-semibold mb-2 border-b">libre</h2>  
          <div class="flex flex-col">  
            <div class="flex flex-col sm:flex-row px-2 gap-4 pt-2">  
              <!-- Front Page -->
              <div class="relative w-full sm:w-1/2">
                <div v-if="!libreFrontPage" class="text-gray-500 text-xs sm:text-sm">Loading front page...</div>
                <div v-else class="flex flex-col gap-2">
                  <img :src="libreFrontPage" class="w-full h-auto object-contain" />  
                  <button @click="viewImage('Front Page', libreFrontPage)"
                    class="w-full bg-primary text-white py-2 px-4 rounded-md text-xs sm:text-sm">
                    View Front Page
                  </button>
                </div>
              </div>
              
              <!-- Back Page -->
              <div class="relative w-full sm:w-1/2">
                <div v-if="!libreBackPage" class="text-gray-500 text-xs sm:text-sm">Loading back page...</div>
                <div v-else class="flex flex-col gap-2">
                  <img :src="libreBackPage" class="w-full h-auto object-contain" />  
                  <button @click="viewImage('Back Page', libreBackPage)"
                    class="w-full bg-primary text-white py-2 px-4 rounded-md text-xs sm:text-sm">
                    View Back Page
                  </button>
                </div>
              </div>
            </div>  
          </div>  
        </section>
      </section>
    </div>
  </div>
</template>  
  
  <script setup>
  import { usePaginations } from '@/composables/usePaginations';
import { removeUndefined, toasted } from '@/utils/utils';
import { openModal } from "@customizer/modal-x";

import { getCustomersbyId, getLibreImages, setQuotation } from '../api/customersApi';
import { useRoute } from 'vue-router';
import { useCustomers } from '../store/customeridStore';
import Button from '@/components/Button.vue';
import icons from '@/utils/icons';
import { ref, onMounted, watch } from 'vue';
import ApiService from "@/service/ApiService";

const customerId = useCustomers();
const api = new ApiService();
const libreFrontPage = ref('');
const libreBackPage = ref('');

const viewImage = (title, imageUrl) => {
  openModal('ImageViewer', {
    title,
    imageUrl
  });
};

const fetchLibreImages = async () => {
  try {
    console.log('Fetching libre images...');
    console.log('Car UUID:', customerId.customers?.carUuid);
    
    const carUuid = customerId.customers?.carUuid;
    if (!carUuid) {
      console.log('No carUuid available');
      return;
    }

    const response = await getLibreImages(carUuid);

    console.log('API Response:', response);

    if (response.success) {
      libreFrontPage.value = `data:image/jpeg;base64,${response.data.libreFrontPage}`;
      libreBackPage.value = `data:image/jpeg;base64,${response.data.libreBackPage}`;
      console.log('Images loaded successfully');
    }
  } catch (error) {
    console.error('Error fetching libre images:', error);
  }
};

// Watch for changes in customerId.customers
watch(
  () => customerId.customers,
  (newValue) => {
    console.log('Customer data changed:', newValue);
    if (newValue?.carUuid) {
      fetchLibreImages();
    }
  },
  { immediate: true }
);

onMounted(() => {
  console.log('Component mounted');
  if (customerId.customers?.carUuid) {
    fetchLibreImages();
  }
});
  
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
const calculateMonthlyPremium = (quotationAmount) => {
  return quotationAmount / 12; // quotation divided by 12
};
const calculateDeposit = (quotationAmount) => {
  return quotationAmount * 0.22; // 22% of quotation
};
// Then define the quotation ref
const quotation = ref({
  amount: customerId.customers?.quotationAmount || 0,
  deposit: calculateDeposit(customerId.customers?.quotationAmount || 0),
  premium: calculateMonthlyPremium(customerId.customers?.quotationAmount || 0),
});
// Example quotation data  

  const props = defineProps({
  pending: {
    type: Boolean,
    default: false,
  },
  onSubmit: {
    type: Function,
  },
});

const route = useRoute()
const userUuid = route.params?.quotationUuid
const pagination = usePaginations({
  store: customerId,
  cb: async (id) => {
    try {
      return await getCustomersbyId(userUuid);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    }
  },
});


watch(
  () => customerId.customers,
  (newValue) => {
    if (newValue) {
      const quotationAmount = newValue.quotationAmount || 0;
      quotation.value.amount = quotationAmount;
      quotation.value.deposit = calculateDeposit(quotationAmount);
      quotation.value.premium = calculateMonthlyPremium(quotationAmount);
    }
  }
);
// First, define the calculation functions




// Now define the editing states
const isEditing1 = ref(false);
const isEditing2 = ref(false);
const isEditing3 = ref(false);
const editedAmount1 = ref(quotation.value.amount);
const editedAmount2 = ref(quotation.value.deposit);
const editedAmount3 = ref(quotation.value.premium);
const isSubmitting = ref(false);

// Toggle functions
const toggleEdit1 = () => {  
  editedAmount1.value = quotation.value.amount;
  isEditing1.value = true;  
  isEditing2.value = false;  
  isEditing3.value = false;  
};  

const toggleEdit2 = () => {  
  editedAmount2.value = quotation.value.deposit;
  isEditing2.value = true;  
  isEditing1.value = false;  
  isEditing3.value = false;  
};  

const toggleEdit3 = () => {  
  editedAmount3.value = quotation.value.premium;
  isEditing3.value = true;  
  isEditing2.value = false;  
  isEditing1.value = false;  
}; 

// Method to save the edited amount
const saveEdit = async () => {
  if (isEditing1.value) {
    // Update quotation amount and recalculate deposit and premium locally
    const newAmount = parseFloat(editedAmount1.value);
    quotation.value.amount = newAmount;
    quotation.value.deposit = calculateDeposit(newAmount);
    quotation.value.premium = calculateMonthlyPremium(newAmount);
    
    // Reset editing state
    isEditing1.value = false;
    editedAmount1.value = '';
  }
};

// Add new function to handle sending final quotation to backend
const sendFinalQuotation = async () => {
  try {
    isSubmitting.value = true;
    const quotationUuid = customerId.customers?.quotationUuid;
    if (!quotationUuid) {
      toasted(false, '', 'Quotation ID not found');
      return;
    }

    const response = await setQuotation(quotationUuid, quotation.value.amount, 'quotation');
    if (response.success) {
      await setQuotation(quotationUuid, quotation.value.deposit, 'deposit');
      await setQuotation(quotationUuid, quotation.value.premium, 'premium');
      toasted(true, 'Final quotation sent successfully', '');
    } else {
      toasted(false, '', response.error || 'Failed to send quotation');
    }
  } catch (error) {
    console.error('Error sending final quotation:', error);
    toasted(false, '', 'An error occurred while sending the quotation');
  } finally {
    isSubmitting.value = false;
  }
};

// Add these computed properties



console.log(customerId.customers?.clientFirstName)
  </script>
  
  
  <style scoped>  
  /* You can add additional styles here if needed */  
  </style>
