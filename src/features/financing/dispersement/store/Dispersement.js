import { defineStore } from 'pinia'
import { ref } from 'vue'

export const  useQuotation = defineStore('useQuotation', () => {
    const quotations = ref([])
  const done = ref(false)

  function setDone(val) {
    done.value = val
  }

  function getAll() {
    
    return quotations.value={}
  }

  function reset() {
    quotations.value = []
    done.value = false
  }

  function add(prescription) {
    quotations.value.unshift(prescription)
  }
  
  function set(data) {
        console.log(data, 'herer')
    
    quotations.value = Array.isArray(data) ? data : (data || [])
  }

  function update(id, prescription) {
    console.log(prescription);
    
    const idx = quotations.value.findIndex(el => el.ernpId == id)

    if(idx == -1) return 

    quotations.value.splice(idx, 1, prescription)
  }

  function changeAmount(id, amount) {
    const idx = quotations.value.findIndex(el => el.ernpId == id)

    if(idx > -1) {
      quotations.value[idx].totalAmount = amount
    }
  }
  
  function remove(id) {
    const idx = quotations.value.findIndex(el => el.ernpId == id)

    if(idx > -1) {
      quotations.value.splice(idx, 1)
    } 
  }

  return { quotations, set, remove, getAll, done, setDone, reset, add, update }
})