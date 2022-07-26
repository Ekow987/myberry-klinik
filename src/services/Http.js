import { isBrowser, logout } from "./Auth"
import { toast } from "react-toastify"
import routes from "../components/routes"

const baseUrl = `${process.env.REACT_APP_SERVER}`

const token = isBrowser()
	? localStorage.getItem("token") ||
	  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuaWNob2xhcy5hcmthYWhAdm9kYWZvbmUuY29tIiwiZXhwIjoxNjQ2Mjg4NDUwLCJpYXQiOjE2NDYyNTI0NTB9.LaY8agPEw60aU5KAaeHkVdu09usBS5FC0jMvYV936zs"
	: null

const headers = (isNotFormData = false) => {
	const headerContent = {
		// Authorization: "Bearer " + token,
		//"Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE"
		"Access-Control-Allow-Origin": "*"
	}

	if (isNotFormData) {
		headerContent["Content-Type"] = "application/json"
	}
	return headerContent
}

async function handleErrors(response) {
	if (response.status === 401) {
		logout(() => {
			navigate("/login")
		})
		return Promise.reject("Please login")
	}

	try {
		const res = await response.json()

		/**
		 * TODO: object value errors mentioned here should be error
		 * It should align with the Generic Response Schema of the API
		 */

		if (!response.ok) {
			if (response.status == 404) {
				toast.error("Resource not found")
			} else if (
				typeof res.errors == "object" ||
				typeof res.data?.errors == "object"
			) {
				var errors = Object.values({
					...res.errors,
					...res?.data?.errors
				})

				//Merge array of errors
				let mergedErrors = []

				errors.forEach(item => {
					mergedErrors = mergedErrors.concat(item)
				})

				// show errors
				mergedErrors.forEach(item => {
					toast.error(item)
				})
			} else if (typeof res.errors == "string") {
				toast.error(res.errors)
			} else if (response.status !== 401) {
				toast.error("Failed Request")
			}

			/**
            TODO: Add further checks for  status code 403 Forbidden, 500 Internal Server Error  
            */

			throw {
				status: response.status,
				data: res
			}
		}

		if (res?.hasError == 1) {
			toast.error("Oops. An error occured")
			throw {
				...res
			}
		}

		return res
	} catch (e) {
		toast.error(e)
		return
	}
}

const get = async url => {
	try {
		const response = await fetch(`${baseUrl}/${url}`, {
			headers: { ...headers() }
		})
		return handleErrors(response)
	} catch (e) {
		return handleErrors(e)
	}
}

/**
 *
 * @param {string} url
 * @param {object | formData} data
 * @param {object} config
 *
 * @returns Promise
 */
const post = async (url, data, formData = false) => {
	try {
		const response = await fetch(`${baseUrl}/${url}`, {
			headers: {
				...headers(formData)
				// ...setHeaders(config),
			},
			method: "POST",
			body: formData ? JSON.stringify(data) : formToFormData(data)
			// body: JSON.stringify(data),
		})
		return handleErrors(response)
	} catch (e) {
		return handleErrors(e)
	}
}

const destroy = async (url, data, formData = false) => {
	try {
		const response = await fetch(`${baseUrl}/${url}`, {
			headers: { ...headers },
			method: "DELETE",
			body: formData ? data : formToFormData(data)
		})
		return handleErrors(response)
	} catch (e) {
		return handleErrors(e)
	}
}

const update = async (url, data, formData = false) => {
	const response = await fetch(`${baseUrl}/${url}`, {
		headers: {
			...headers(formData)
			// ...setHeaders(config),
		},
		method: "PUT",
		// body: formToFormData({ ...data, _method: "PUT" }),
		body: formData ? data : formToFormData(data)
		// body: config.formData ? data : JSON.stringify(data),
	})
	return handleErrors(response)
}

/**
 * Set request headers
 * @param {object} config
 */
const setHeaders = config => {
	if (config.formData) {
		return { ...headers }
	}
	return { ...headers, "Content-Type": "application/json" }
}

/**
 * Remote data
 */

export default {
	get,
	post,
	update,
	destroy,
	baseUrl
}
