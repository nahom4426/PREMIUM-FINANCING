import ApiService from "@/service/ApiService";

const api = new ApiService()
const path = '/users'

export function importInsured(data, config) {
	return api.addAuthenticationHeader().post(`${path}/import`, data, {
		...config,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

export function getInsuredByWoreda(id, config) {
	return api.addAuthenticationHeader().get(`${path}/${id}`, config)
}
export function getMembers(config) {
	return api.addAuthenticationHeader().get(`${path}/clients`, config)
}