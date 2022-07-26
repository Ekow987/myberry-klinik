const userVar = "userObject"
export const isBrowser = () => typeof window !== "undefined" && window

export const getUser = () =>
	isBrowser() && window.localStorage.getItem(userVar)
		? JSON.parse(window.localStorage.getItem(userVar))
		: {}

const setUser = user => {
	if (isBrowser()) window.localStorage.setItem(userVar, JSON.stringify(user))
}
export const clearUser = () => {
	if (isBrowser()) window.localStorage.clear()
}


export const handleLogin = ({ user }) => {
	setUser({
		name: user.displayname,
		id: user.id
	})
}

export const isLoggedIn = () => {
	const user = getUser()
	return !!user.name
}

export const logout = callback => {
	clearUser()
	callback()
}

export const baseUrl = process.env.REACT_APP_SERVER
