import React, { useState } from "react"
import { getUser } from "../services/Auth"
const userObject = getUser()
export default function SelectOfficers({ officers, submit, params }) {
	const [assignData, setAssignData] = useState({
		userId: userObject.staffId,
		technicianId: "",
		issueId: ""
	})
    console.log(officers)
	console.log(params)
	const handleSelect = e => {
		e.preventDefault()
		const target = e.target
		const staffId = target.value
		const issueId = target.dataset.id

		setAssignData({
			...assignData,
			technicianId: staffId,
			issueId: issueId
		})
	}
	const onSubmit = (e, data) => {
		e.preventDefault()
		submit(assignData)
		document.getElementById(`${params.id}`).reset()
	}
	return (
		<form onSubmit={onSubmit} id={params.id}>
			<select
				name="officer"
				onChange={handleSelect}
				data-id={params.id}
				required
			>
				<option value="">Select officer</option>
				{officers.map((value, id) => {
					return (
						<option key={id} value={value.staffId}>
							{value.staffFullname}
						</option>
					)
				})}
			</select>{" "}
			<button className="btn-success ml-4">Assign</button>
		</form>
	)
}
