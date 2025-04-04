<script setup>
import Table from '@/components/Table.vue';
import icons from '@/utils/icons';
import DoughnutChart from '../components/DoughnutChart.vue';
import BarChart from '../components/BarChart.vue';
import Button from '@/components/Button.vue';
import LineChart from '../components/lineChart.vue';
import WeeklyRevenue from '../components/weeklyRevenue.vue';
import TableDashboard from '../components/tableDashboard.vue';
import TaskList from '../components/taskList.vue';
import TraficCard from '../components/traficCard.vue';
import PieChart from '../components/pieChart.vue';
import ComplexTable from '../components/complexTable.vue';
import CalanderDashboard from '../components/calanderDashboard.vue';
import Last from '../components/last.vue';
</script>

<template>
    <div class=" h-full w-full bg-white">
        <div class="grid grid-cols-3 bg-primary text-white rounded-md w-[100%] max-w-[1600px] overflow-hidden h-[30%]">
          
           
        </div>
        <div class="p-6 bg-white">  
  <div class="flex space-x-4 overflow-auto justify-between">  

    <div class="rounded-lg p-2 flex items-center">
      <i v-html="icons.bar" class="mr-2 w-8 h-8" />  
      <div class="flex flex-col">
        <h2 class="text-xs font-normal text-[#A3AED0]">Earnings</h2>  
        <p class="text-sm mt-1">$350.4</p>  
      </div>
    </div>

    <div class="rounded-lg p-2 flex items-center">
      <i v-html="icons.usd" class="mr-2 w-8 h-8" />  
      <div class="flex flex-col">
        <h2 class="text-xs font-normal text-[#A3AED0]">Spend this month</h2>  
        <p class="text-sm mt-1">$642.39</p>  
      </div>
    </div>

    <div class="rounded-lg p-2 flex items-center">
      <i v-html="icons.sales" class="mr-2 w-8 h-8" />  
      <div class="flex flex-col">
        <h2 class="text-xs font-normal text-[#A3AED0]">Sales</h2>  
        <p class="text-sm mt-1">$574.34</p>  
        <p class="text-xs text-gray-500">+23 since last</p>  
      </div>
    </div>

    <div class="rounded-lg p-2 flex items-center">
      <div class="flex flex-col mr-2">
        <h2 class="text-xs font-normal text-[#A3AED0]">Your balance</h2>  
        <p class="text-sm mt-1">$1,000</p>  
      </div>
      <i v-html="icons.america" class="mr-3 w-8 h-8" /> 
      <i v-html="icons.down" class="text-xs text-gray-500" />
    </div> 

    <div class="rounded-lg p-2 flex items-center">
      <i v-html="icons.task" class="mr-2 w-8 h-8" />  
      <div class="flex flex-col">
        <h2 class="text-xs font-normal text-[#A3AED0]">New Tasks</h2>  
        <p class="text-sm mt-1">154</p>  
      </div>
    </div>

    <div class="rounded-lg p-2 flex items-center">
      <i v-html="icons.projects" class="mr-2 w-8 h-8" />  
      <div class="flex flex-col">
        <h2 class="text-xs font-normal text-[#A3AED0]">Total Projects</h2>  
        <p class="text-sm mt-1">2935</p>  
      </div>
    </div> 

  </div>  
</div>
<div class="p-6 flex justify-between bg-white">  
    <LineChart /> 
    <WeeklyRevenue /> 
  </div> 
  <div class="p-6 flex justify-between bg-white">
    <TableDashboard />
    <TraficCard />
    <DoughnutChart />
  </div>
  <div class="p-6 flex justify-between bg-white">
  <ComplexTable />
  <!-- <TaskList /> -->
  <CalanderDashboard />
  </div>
  <Last />
    </div>
</template>
<style scoped>
/* .bg-gradient {
    background: linear-gradient(to right, #fbc2eb, #a18cd1);
} */
.action-icon {
    cursor: pointer;
    color: #007bff;
}
</style>