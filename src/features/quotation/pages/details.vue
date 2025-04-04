<template>
  <!-- ... other template code ... -->
  <EditableDetailsForm
    :client-data="customerId.customers"
    :vehicle-data="customerId.customers"
    :car-uuid="customerId.customers?.carUuid"
    @update:success="handleUpdateSuccess"
  />
  <!-- ... other template code ... -->
</template>

<script setup>
import EditableDetailsForm from '@/components/EditableDetailsForm.vue';
// ... other imports ...

const handleUpdateSuccess = () => {
  // Refresh data or show success message
  toasted(true, "Vehicle details updated successfully!");
};
</script>
