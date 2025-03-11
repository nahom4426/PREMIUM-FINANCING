import ApiService from "@/service/ApiService";
import { getQueryFormObject } from "@/utils/utils";
const api = new ApiService(import.meta.env?.v_API_URL_PERMISSIONS)

const path = '/subcity'

export function getAllSubCities(query) {
	const qr = getQueryFormObject(query)
	return api.addAuthenticationHeader().get(`${path}/searchOrAll${qr}`)
}

export function createSubcity(data) {
	return api.addAuthenticationHeader().post(`${path}`, data)
}