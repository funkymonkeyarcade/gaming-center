"use client"
import Link from "next/link";
import { useState,useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/utils/firebase"

export default function AdminLayout({ children }) {
	const [logged, setLogged] = useState(false)
	const [email, setEmail] = useState()
	const [password, setPassword] = useState(false)
	const [error, setError] = useState(false)

	function handleEmail(e) {
		setEmail(e.target.value)
	}

	function handlePassword(e) {
		setPassword(e.target.value)
	}

	function onLogin() {
		const auth = getAuth(app)
		signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			setLogged(true)
			// ...
		})
		.catch((error) => {
			setError(error.message)
		});

	}

	if (logged==false) { return(
		<div className="flex flex-col gap-8 py-24 bg-primary text-white w-6/12 m-auto">
			<h1 className="text-2xl font-LogikBold">Login</h1>
			{error && <p className="text-lg font-LogikWide text-red-800">{error}</p>}
			<input onChange={handleEmail} type="text" name="email" placeholder="Enter Email" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
			<input onChange={handlePassword} type="password" name="password" placeholder="Enter Password" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
			<button onClick={onLogin} className='py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>Login</button>
		</div>
	)}

	if (logged==true) { return(
		<div className="flex flex-col sm:grid sm:grid-cols-[1fr_4fr] sm:py-24 bg-primary text-white w-11/12 m-auto">
			<ul className="flex mt-32 sm:mt-0 sm:flex-col gap-4 px-12 bg-black bg-opacity-50 py-8 sm:py-24 rounded-lg font-LogikWide">
				<Link href="/admin/news"><li className="border-b-2 border-gray-500 py-2 hover:text-accent hover:border-accent">News</li></Link>
				<Link href="/admin/facts"><li className="border-b-2 border-gray-500 py-2 hover:text-accent hover:border-accent">Facts</li></Link>
				<Link href="/admin/events"><li className="border-b-2 border-gray-500 py-2 hover:text-accent hover:border-accent">Events</li></Link>
				<Link href="/admin/rentals"><li className="border-b-2 border-gray-500 py-2 hover:text-accent hover:border-accent">Rentals</li></Link>
				<Link href="/admin/popup"><li className="border-b-2 border-gray-500 py-2 hover:text-accent hover:border-accent">Popup</li></Link>
			</ul>
			<div>
				{children}
			</div>
		</div>
	)}
}
