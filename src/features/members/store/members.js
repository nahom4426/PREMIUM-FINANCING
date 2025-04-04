import { defineStore } from "pinia";
import { ref } from "vue";

export const useMembers = defineStore("members", () => {
  const members = ref([]);

  function set(data) {
    members.value = data;
  }

  function getAll() {
    return members.value;
  }

  function remove(id) {
    const idx = members.value.findIndex((el) => el.id == id);
    if (idx > -1) {
      members.value.splice(idx, 1);
    }
  }

  function add(member) {
    members.value.unshift(member);
  }

  function update(id, data) {
    const idx = members.value.findIndex((el) => el.id == id);
    if (idx > -1) {
      members.value.splice(idx, 1, data);
    }
  }

  async function fetchMembers() {
    try {
      // You can implement the actual API call here
      // For now it just returns the members
      return members.value;
    } catch (error) {
      console.error('Error fetching members:', error);
      throw error;
    }
  }

  return {
    members,
    set,
    add,
    remove,
    update,
    getAll,
    fetchMembers
  };
});