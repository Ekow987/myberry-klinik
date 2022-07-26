import { Axios } from "axios"
import { baseUrl, getUser } from "../services/Auth"

export const officersList = async () => {
	let response
	try {
		let result = await fetch(
			`${baseUrl}/api/v1/users/get-users-by-type/officer`,
			{
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
		response = await result.json()
		console.log(
			"%cData: ",
			"background:purple; color:white; border-radius:20px",
			response
		)
	} catch (error) {
		console.log(error)
	}

	return response
}

export const getStatistics = async () => {
	let url = `http://localhost:5000/api/v1/issues/statistics`
	try {
		let result = await fetch(url, {
			headers: {
				"Content-Type": "application/json"
			}
		})
		const response = await result.json()
		return response
	} catch (error) {
		console.log(error)
	}
}
