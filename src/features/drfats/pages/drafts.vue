<script setup>
import { ref, onMounted } from 'vue';
import { toasted } from "@/utils/utils";
import Button from "@/components/Button.vue";
import { openModal } from "@customizer/modal-x";

const DRAFTS_STORAGE_KEY = 'quotation_drafts';
const drafts = ref([]);

// Load drafts from localStorage
function loadDrafts() {
  try {
    const savedDrafts = localStorage.getItem(DRAFTS_STORAGE_KEY);
    const parsedDrafts = JSON.parse(savedDrafts || '[]');
    
    console.log("Loaded drafts:", parsedDrafts);
    
    drafts.value = parsedDrafts.map(draft => {
      console.log("Processing draft:", draft);
      return draft;
    });
  } catch (error) {
    console.error('Error loading drafts:', error);
    drafts.value = [];
  }
}

// Delete draft
function deleteDraft(id) {
  try {
    const updatedDrafts = drafts.value.filter(draft => draft.id !== id);
    localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(updatedDrafts));
    drafts.value = updatedDrafts;
    toasted(true, "Draft deleted successfully!");
  } catch (error) {
    toasted(false, "Error deleting draft");
  }
}

// Load draft to edit
function loadDraftToEdit(draft) {
  console.log("Loading draft:", draft);

  if (!draft?.data) {
    console.error("Invalid draft structure:", draft);
    return;
  }

  const dataToEdit = {
    personalDetails: {
      userUuid: draft.data.personalDetails?.userUuid || '',
      firstName: draft.data.personalDetails?.firstName || '',
      fatherName: draft.data.personalDetails?.fatherName || '',
      email: draft.data.personalDetails?.email || '',
      mobilePhone: draft.data.personalDetails?.mobilePhone || '',
      insuranceUuid: draft.data.personalDetails?.insuranceUuid || ''
    },
    carRequests: Array.isArray(draft.data.carRequests) ? [...draft.data.carRequests] : [],
    bankAccount: draft.data.bankAccount || '',
    step: draft.data.step || 1
  };

  console.log('Opening modal with data:', dataToEdit);

  openModal('addClient', {
    props: {
      data: {
        props: {
          data: dataToEdit
        }
      }
    }
  });
}

onMounted(() => {
  loadDrafts();
});
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-semibold mb-4">Saved Drafts</h2>
    
    <div v-if="drafts.length === 0" class="text-gray-500">
      No drafts found
    </div>
    
    <div v-else class="space-y-4">
      <div v-for="draft in drafts" :key="draft.id" 
           class="bg-white p-4 rounded-lg shadow flex justify-between items-center">
        <div>
          <div class="font-medium">
            {{ new Date(draft.date).toLocaleDateString() }}
          </div>
          <div class="text-sm text-gray-600">
            <div>Vehicles: {{ draft.data.carRequests?.length || 0 }}</div>
            <div>Step: {{ draft.data.step }}</div>
            <div v-if="draft.data.bankAccount">Bank Account: {{ draft.data.bankAccount }}</div>
          </div>
        </div>
        
        <div class="flex gap-2">
          <Button 
            @click="loadDraftToEdit(draft)" 
            type="secondary" 
            size="sm"
          >
            Edit
          </Button>
          <Button 
            @click="deleteDraft(draft.id)" 
            type="danger" 
            size="sm"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
