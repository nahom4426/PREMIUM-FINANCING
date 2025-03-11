import ApiService from "@/service/ApiService";

const api = new ApiService()
const path = '/woreda'

export function getStudents() {
//   const qr = getQueryFormObject(query);
  return api
    .addAuthenticationHeader()
    .get(`${path}/all`)
}

export function getBatchStudents(batchId, query = {}) {
     const qr = getQueryFormObject(query);
    return api
      .addAuthenticationHeader()
      .get(`${path}/batches/${batchId}${qr}`)
  }
  
export function addStudent(data) {
  //   const qr = getQueryFormObject(query);
  return api
    .addAuthenticationHeader()
    .post(`${path}/create`, data)
}


export function getInsuredByWoreda(id, config) {
	return api.addAuthenticationHeader().get(`${path}/${id}`, config)
}