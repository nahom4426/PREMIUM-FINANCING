import ApiService from "@/service/ApiService";

const api = new ApiService()
const path = '/auth/insured-users'

export function importInsured(data, config) {
	return api.addAuthenticationHeader().post(`${path}/import`, data, {
		...config,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

export function getCustomers(config) {
	return api.addAuthenticationHeader().get(`${path}`, config)
}

export function getInsuredByWoreda(id, config) {
	return api.addAuthenticationHeader().get(`${path}/${id}`, config)
}
export function getCustomersbyId(id, config) {
	return api.addAuthenticationHeader().get(`${path}/${id}`, config)
}