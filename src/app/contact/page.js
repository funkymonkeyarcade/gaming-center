"use client"

import {useState, useRef} from "react"
import Image from "next/image"

import GoogleMapReact from 'google-map-react';

import emailjs from "@emailjs/browser"

import Arrow from "../../assets/icons/arrow.svg"

function MapContainer() {
	return(
		<div></div>
	)
}

function Hero() {
	return (
	  <section className="grid grid-cols-2 text-white w-full bg-[size:100%] bg-center bg-[linear-gradient(to_top,rgba(23,15,35,1),rgba(23,15,35,0)_90%),url('https://firebasestorage.googleapis.com/v0/b/gaming-906ed.appspot.com/o/pexels-element-digital-1293261.jpg?alt=media&token=ad8fefa9-eb5c-48e8-b965-2bb9e431a838')] ">
		<div className='flex flex-col px-8 sm:px-16 pt-40 pb-16 gap-4 h-full bg-[linear-gradient(to_right,rgba(23,15,35,1),rgba(23,15,35,0)_100%)]'>
		  <h1 className='text-4xl font-black font-LogikBold'>GET IN TOUCH</h1>
		</div>
	  </section>
	)
}

function Form() {
	const form = useRef()

	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [phone, setPhone] = useState()
	const [message, setMessage] = useState()

	function handleName(e) {
		setName(e.target.value)
	}

	function handleEmail(e) {
		setEmail(e.target.value)
	}

	function handlePhone(e) {
		setPhone(e.target.value)
	}

	function handleMessage(e) {
		setMessage(e.target.value)
	}

	function sendMail(e) {
		e.preventDefault()

		emailjs.sendForm(process.env.NEXT_PUBLIC_SERVICE_ID, process.env.NEXT_PUBLIC_TEMPLATE_ID, form.current, process.env.NEXT_PUBLIC_PUBLIC_KEY).then(result => {
			console.log(result)
		}).catch(error => {
			console.log(error)
		})
	}

	return (
		<section className="flex flex-col sm:grid sm:grid-cols-[2fr_3fr] px-8 sm:px-16 py-40 w-full">
			<div className="flex flex-col gap-2 text-white">
				<div className="grid grid-cols-2">
					<h1 className='text-4xl font-black font-LogikBold'>LET&rsquo;S TALK</h1>
					<Image className="h-full" src={Arrow} />
				</div>
				<p className="text-2xl">Share your excitement with us.</p>
			</div>

			<form className="flex flex-col gap-2 px-8 sm:px-12" ref={form} onSubmit={sendMail}>
				<div className="flex flex-col w-full sm:grid sm:grid-cols-2 gap-4">
					<input onChange={handleName} className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all " type="text" name="user_name" placeholder="Full name"/>
					<input onChange={handleEmail} className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white bg-transparent transition-all" type="email" name="user_email" placeholder="E-mail"/>
					<input onChange={handlePhone} className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white bg-transparent transition-all" type="phone" name="user_phone" placeholder="Phone number"/>
					<input onChange={handleMessage} className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white bg-transparent transition-all" type="text" name="message" placeholder="Message"/>
				</div>
				<input type="submit" value="Send" className='py-2 px-6 font-LogikBold col-span-2 justify-self-end w-max font-bold bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md' />
			</form>

		</section>
	)
}

function Map() {
	const defaultProps = {
		center: {
		  lat: 10.99835602,
		  lng: 77.01502627
		},
		zoom: 11
	  };

	return (
		<section className="flex flex-col gap-8 px-8 sm:px-16 w-full">
			<div className="flex flex-col gap-2 text-white">
				<h1 className="text-4xl font-black font-LogikBold">WE&rsquo;RE HERE</h1>
				<p className="text-2xl">Our door is always open for a good cup of coffee.</p>
			</div>

			<div className="w-full h-96 bg-black">
				<GoogleMapReact
					bootstrapURLKeys={{ key: "" }}
					defaultCenter={defaultProps.center}
					defaultZoom={defaultProps.zoom}
				>
				<MapContainer
					lat={59.955413}
					lng={30.337844}
					text="My Marker"
				/>
				</GoogleMapReact>
			</div>

			<div className=" flex flex-col gap-8 sm:gap-0 items-center sm:grid sm:grid-cols-2 text-white">
				<div className="flex flex-col gap-2">
					<h1 className='text-xl font-black font-LogikBold'>Kigali, Rwanda</h1>
					<div className="flex flex-col">
						<p>KN 3 Rd, Kigali</p>
					</div>
				</div>
				<div className="grid grid-cols-2 sm:flex justify-center sm:justify-between w-full">
					<div className="flex flex-col">
						<h1 className='text-xl font-black font-LogikBold'>Email</h1>
						<p>arcadefunkymonkey@gmail.com</p>
					</div>
					<div className="flex flex-col">
						<h1 className='text-xl font-black font-LogikBold'>Phone</h1>
						<p>+250 784 674 639</p>
					</div>
					<div className="flex flex-col">
						<h1 className='text-xl font-black font-LogikBold'>Hours</h1>
						<p>10:00 - 22:00</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default function Contact() {
	return (
	  <div className='flex flex-col items-center bg-primary'>
		 <Hero />
		 <Form />
		 <Map />
	  </div>
	)
}
