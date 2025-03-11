<template>  
    <div class="w-1/4">  
      <div class="flex items-center mb-1">  
        <input type="checkbox" v-model="allChecked" @change="toggleAllTasks" class="mr-2" />  
        <span class="font-semibold text-lg pb-2">Tasks</span>  
      </div>  
      <div class="flex flex-col">  
        <div   
          v-for="(task, index) in tasks"   
          :key="index"  
          class="flex items-center py-2 cursor-pointer hover:bg-gray-100"  
          @click="task.checked = !task.checked"  
        >  
          <td class="flex items-center px-4">  
            <input   
              type="checkbox"   
              v-model="task.checked"   
              class="mr-2 checkbox-small"   
            />  
            <span :class="task.checked ? 'text-gray-400 line-through' : ''">{{ task.name }}</span>  
          </td>  
        </div>  
      </div>  
    </div>  
  </template>  
  
  <script setup>  
  import { ref } from 'vue';  
  
  // Sample tasks data  
  const tasks = ref([  
    { name: 'Landing Page Design', checked: false },  
    { name: 'Dashboard Builder', checked: true },  
    { name: 'Mobile App Design', checked: true },  
    { name: 'Illustrations', checked: false },  
    { name: 'Promotional LP', checked: true }  
  ]);  
  
  const allChecked = ref(false);  
  
  // Function to toggle all tasks checked state  
  const toggleAllTasks = () => {  
    tasks.value.forEach(task => {  
      task.checked = allChecked.value;  
    });  
  };  
  </script>  
  
  <style scoped>  
  /* Style for the checkbox to match the second template */  
 
  
  .checkbox-small {  
    position: relative;  
  }  
  
  .checkbox-small:checked + span {  
    display: flex;  
  }  
  
  /* Optional: Style for the line-through text when checked */  
  .line-through {  
    text-decoration: line-through;  
    color: #A3AED0; /* Gray color for checked tasks */  
  }  
  </style>