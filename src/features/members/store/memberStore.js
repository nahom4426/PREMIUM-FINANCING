import { defineStore } from "pinia";
import { ref } from "vue";

export const usemember = defineStore("memberStore", () => {
  const patients = ref([]);

  function set(data) {
    patients.value = data;
  }

  function getAll() {
    return patients.value;
  }

  function remove(id) {
    const idx = patients.value.findIndex((el) => el.patientUuid == id);
    if (idx > -1) {
      patients.value.splice(idx, 1);
    }
  }

  function add(user) {
    patients.value.unshift(user);
  }

  function update(id, data) {
    const idx = patients.value.findIndex((el) => el.patientUuid == id);
    if (idx > -1) {
      patients.value.splice(idx, 1, data);
    }
  }

  function updateStatus(status, ids) {
    console.log(ids);
    // Update registration status
    patients.value.forEach(el => {
      if (ids.includes(el.patientUuid)) {
        el.registered = status; // Update the registered status
      }
    });
  
    // Return the updated patients array if needed
    return patients.value; // Return the updated array or any relevant data
  }

  return {
    set,
    add,
    remove,
    update,
    getAll,
    updateStatus,
    patients,
  };
});