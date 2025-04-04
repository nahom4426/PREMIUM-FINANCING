<script setup>
import Button from '@/components/Button.vue';

const props = defineProps({  
  rowData: {  
    type: Array,  
    required: true,  
  },  
  headKeys: {  
    type: Array,  
  },  
  rowKeys: {  
    type: Array,  
    required: true,  
  },  
}); 
const emit = defineEmits(["row"]);  
</script>
<template>  
    <tr 
      v-for="(row, idx) in rowData" 
      :key="idx"
      @click.self="emit('row', row)" 
      class="bg-white border-b-[0.2px]" 
    >  
      <td class="p-3">{{ idx + 1 }}</td>  
  
      <td class="p-3" v-for="key in rowKeys" :key="key">  
        <div v-if="key === 'checked'" class="truncate flex items-center gap-4">  
          <p v-if="row?.checked === false"
          class=" rounded-[2px] w-[87px] text-center bg-[#FFF8E7] text-[#B38B35] px-3 py-1" 
   style=" font-weight: 600; font-size: 14px; line-height: 21px; letter-spacing: 0%;">Not Checked  
</p>  
          <p v-else-if="row?.checked === true" 
   class=" rounded-[2px] w-[87px]  text-center bg-[#EBE7FF] px-3 py-1 text-primary" 
   style=" font-weight: 600; font-size: 14px; line-height: 21px; letter-spacing: 0%;">
    Checked  
</p>  
<p v-else class="bg-gray-400 px-2 py-1 rounded-full text-white">Not Member</p>  
        </div>  
  
        <!-- Custom computation for patientName -->
        <span v-else-if="key === 'customerName'">
          {{ row.title }} {{ row.clientFirstName }} {{ row.clientFatherName }} {{ row.clientGrandFatherName }}
        </span>
        <span v-else-if="key === 'quotationAmount'" class="font-bold text-black">
        ETB  {{ row.quotationAmount }} 
        </span>
        <span v-else-if="key === 'VehicleDetail'" class="">
          {{ row.carName }}  {{ row.carModel }} - {{ row.carType }}
        </span>
        <span v-else>
          {{ row[key] }}
        </span>
       

  
       
      </td>  
      <td class="p-3 flex gap-3" v-if="headKeys.includes('actions')">  
        <Button 
          v-if="row?.checked === false" 
          @click="$router.push(`/details/${row.quotationUuid}`)" 
          class="rounded-[4px]  bg-primary text-white"
        >
          Open
        </Button>
        <Button 
          v-if="row?.checked === true" 
          @click="$router.push(`/details/${row.quotationUuid}`)" 
          class="rounded-[4px]  bg-[#EBE7FF] text-primary"
        >
          View
        </Button>
      </td>   
    </tr>   
  </template>
  
