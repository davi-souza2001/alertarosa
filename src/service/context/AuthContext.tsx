import Router from "next/router"
import { useEffect, useState } from "react"
import { createContext } from "react"
import Cookie from 'js-cookie'
import { useToast } from "@chakra-ui/react"

import { User } from "../../core/User"
import { AuthenticationProvider } from "../../provider/AuthenticationProvider"
import { ProviderUser } from "../../core/ProviderUser"

interface AuthContextProps {
	loginPassword(email: string, password: string): Promise<void>
	createUserPassword(name: string, phone: number, email: string, password: string): Promise<void>
	updateUser(user: User): Promise<void>
	logout(): Promise<void>
	getUser(user: User): Promise<User | false>
	submitUser(user: User): Promise<void>
	user: User
	setUser: (value: any) => void
	loading: boolean
	setLoading: any
}

const AuthContext = createContext<AuthContextProps>({
	loginPassword: () => Promise.resolve(),
	createUserPassword: () => Promise.resolve(),
	updateUser: () => Promise.resolve(),
	logout: () => Promise.resolve(),
	getUser: (user: User) => Promise.resolve(user),
	submitUser: () => Promise.resolve(),
	user: new User({
		email: '',
		name: ''
	}),
	setUser: () => {},
	loading: false,
	setLoading: {}
})

export function AuthProvider(props: any) {
	const toast = useToast()
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState<User>(new User({ email: '', name: '' }))
	const authentication = new ProviderUser(new AuthenticationProvider())
	const userCookie = Cookie.get('Admin-QuizDev')

	async function loginPassword(email: string, password: string) {
		setLoading(true)
		try {
			const loggedUser = await authentication.loginPassword(email, password)
			const searchedUser = await getUser(loggedUser)

			if (searchedUser) {
				AuthenticationProvider.setCookieUser(searchedUser)
				setLoading(false)
				Router.push('/')
			}

		} catch (error: any) {
			const erro = error.message
			toast({
				position: 'top-right',
				title: 'Algo deu errado!',
				description: erro.slice(16),
				status: 'error',
				duration: 3000,
				isClosable: true,
			})
		}
		setLoading(false)
	}

	async function createUserPassword(name: string, phone: number, email: string, password: string) {
		setLoading(true)
		const user = new User({
			email,
			name,
			phone
		})

		try {
			await authentication.createUserPassword(email, password)
			await authentication.submitUser(user)
			const loggedUser = await authentication.loginPassword(email, password)
			const searchedUser = await getUser(loggedUser)

			if (searchedUser) {
				AuthenticationProvider.setCookieUser(searchedUser)
				setLoading(false)
				Router.push('/')
			}

		} catch (error: any) {
			const erro = error.message
			toast({
				position: 'top-right',
				title: 'Algo deu errado!',
				description: erro.slice(16),
				status: 'error',
				duration: 3000,
				isClosable: true,
			})
		}

		setLoading(false)
	}

	async function getUser(user: User) {
		setLoading(true)

		const userReceived = await authentication.getUser(user)

		setLoading(false)

		return userReceived ? userReceived : false
	}

	async function updateUser(user: User){
		setLoading(true)

		await authentication.updateUser(user)

		setLoading(false)
	}

	async function submitUser(user: User) {
		setLoading(true)

		await authentication.submitUser(user)

		setLoading(false)
	}

	async function logout() {
		setLoading(true)

		await authentication.logout()

		setLoading(false)
	}

	useEffect(() => {
		setLoading(true)

		if (userCookie) {
			authentication.getUserLogged(userCookie).then((user) => {
				setUser(user)
			})
		} else {
			Router.push('/login')
		}

		setLoading(false)
	}, [userCookie])

	return (
		<AuthContext.Provider value={{
			loginPassword,
			createUserPassword,
			updateUser,
			logout,
			getUser,
			submitUser,
			user,
			setUser,
			loading,
			setLoading
		}}>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthContext
