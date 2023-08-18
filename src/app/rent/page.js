"use client"

import { app } from "@/utils/firebase"
import uniqid from 'uniqid';
import { getFirestore,setDoc, doc, updateDoc, query, collection, querySnapshot, getDocs, where } from "firebase/firestore";
import { useState, useEffect } from "react"

async function uploadRental({title, amount, price, name, rentalDate, pickupDate, verified, itemId}) {
	const rentalId = uniqid()

	const db = getFirestore(app);
	return await setDoc(doc(db, "Rentals", rentalId), {
		title,
		itemId,
		price,
		name,
		rentalDate,
		pickupDate,
		verified,
		rentalId
	}).then(() => rentalId)
}

function IdCard({id, toggleIdView}) {
	console.log(id)
	return(
		<div className="absolute z-50 top-0 left-0 h-screen w-screen grid place-items-center bg-black bg-opacity-90">
			<div className="flex flex-col gap-16">
				<h1 className="text-green-700 text-xl font-LogikBold">Item booked successfully</h1>
				<div className="font-LogikBold flex gap-8">
					<h1 className="text-2xl text-white">Rental ID: </h1>
					<h2 className="text-2xl text-accent">{id}</h2>
				</div>
				<h2 className="text-red-800 font-LogikBold">Please remember to copy this ID <br />because it will be used on checkout</h2>
				<button onClick={toggleIdView} className='py-2 px-6 font-LogikBold hover:bg-gray-600 bg-gray-800 text-white transition-all rounded-md'>Done</button>
			</div>
		</div>
	)
}

function ItemRentForm({image, title, price, itemId, setIsRentForm}) {
	const [pickupDate, setPickupDate] = useState()
	const [name, setName] = useState()
	const [phone, setPhone] = useState()
	const [IdView, setIdView,] = useState(false)
	const [rentalId, setRentalId] = useState()
	const [active, setActive] = useState(false)
	const [error, setError] = useState()

	const handleName = (e) => {
		setName(e.target.value)
	}

	const handlePhone = (e) => {
		setPhone(e.target.value)
	}


	const handlePickupDate = async (e) => {

		const db = getFirestore(app);

		const q = query(collection(db, "Rentals"), where("pickupDate", "==", e.target.value), where("itemId", "==", itemId));

		const querySnapshot = await getDocs(q);

		console.log(querySnapshot.docs)

		if(querySnapshot.docs[0]) {
			console.log("A")
			setError(`Item is unavailable on ${e.target.value}`)
		} else {
			setError("")
			setPickupDate(e.target.value)
			setActive(true)
		}

	}

	const onPublish = async () => {
		const rental = {
			title,
			itemId,
			price: price,
			name,
			phone,
			rentalDate: new Date(),
			pickupDate,
			verified: false
		}

		if (!name) {
			setError("Enter name")
			return
		}

		if (!phone) {
			setError("Enter phone number")
			return
		}

		uploadRental(rental).then((rentalId) => {
			setRentalId(rentalId)
			setIdView(true)
		}).catch(error => {
			console.log(error)
			setError(error.message)
		})
	}

	function toggleIdView() {
		setIsRentForm()
		setIdView(!IdView)
	}

	return(
		<div className="fixed z-50 top-0 left-0 h-screen w-screen grid place-items-center bg-black bg-opacity-90">
			<div className="flex flex-col items-center gap-6 py-8 px-8 w-full sm:w-5/12">
				{IdView && <IdCard id={rentalId} toggleIdView={toggleIdView}/>}
				<h1 className="font-LogikBold text-2xl">Rental Form</h1>

				<div className="flex items-center gap-4">
					<img src={image} className="h-20 w-20"/>
					<p className="text-white text-lg font-LogikBold">Item name: <span className="font-LogikWide">{title}</span></p>
					<p className="text-white text-lg font-LogikBold">Item price: <span className="font-LogikWide">{price}Rwf</span></p>
				</div>

				<input onChange={handleName} required type="text" name="Name" placeholder="Enter your Name" className="h-8 w-full px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
				<input onChange={handlePhone} required type="text" name="Phone" placeholder="Enter your Phone number" className="h-8 w-full px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>

				<div className="flex flex-col gap-2 w-full">
					<label htmlFor="amount" className="text-white text-lg font-LogikWide">Pickup date</label>
					<input onChange={handlePickupDate} type="date" name="pickup" placeholder="Enter the pickup date" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white bg-transparent transition-all" style={{colorScheme: 'dark'}}/>
				</div>

				{<p className="text-red-800 text-xl font-LogikBold">{error}</p>}

				<div className="flex w-full justify-between">
					<button onClick={setIsRentForm} className='py-2 px-6 font-LogikBold justify-self-end w-max hover:bg-gray-600 bg-gray-800 text-white transition-all rounded-md'>CANCEL</button>
					<button onClick={onPublish} className={`py-2 px-6 font-LogikBold justify-self-end w-max ${active? `bg-accent text-white hover:bg-white hover:text-accent`:'bg-gray-500'} transition-all rounded-md`} disabled={!active}>BOOK</button>
				</div>
			</div>
		</div>
	)
}

function ItemCard({title, image, price, itemId}) {
	const [isRentForm,setIsRentForm] = useState(false)

	function rentItem() {
		setIsRentForm(!isRentForm)
	}

	return(
		<div className="w-full h-full p-6 flex justify-between items-center gap-8 bg-black bg-opacity-50 rounded-lg shadow-lg text-white">
			<img src={image} width={100} height={100} alt={title}/>
			<div className="flex flex-col gap-2">
				<div className="flex flex-col">
					<h2 className="text-2xl font-LogikBold">{title}</h2>
					<p className="text-xl font-LogikWide">Price: {price}Rwf</p>
				</div>
				<div className="flex gap-4">
					<button onClick={rentItem} className='py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>RENT</button>
				</div>
			</div>

			{isRentForm && <ItemRentForm title={title} image={image} price={price} itemId={itemId} setIsRentForm={rentItem}/>}
		</div>
	)
}

export default function Rent() {
	const [items, setItems] = useState()

	async function GetItems() {

		const db = getFirestore(app);

		const q = query(collection(db, "Items"));

		const querySnapshot = await getDocs(q);
		const ItemsData = querySnapshot.docs.map((doc) => doc.data());
     	setItems(ItemsData);

	}

	useEffect(() => {
		GetItems()
	}, [])

	return (
		<div className="flex flex-col gap-8 items-center bg-primary pb-24">
			<div className="flex flex-col pt-32 pb-24 items-center justify-center w-full bg-[linear-gradient(to_top,rgba(23,15,35,1),rgba(23,15,35,0)_90%),url('/cool-geometric-triangular-figure-neon-laser-light-great-backgrounds.jpg')]">
				<h1 className="text-white font-LogikBold text-5xl">Rent</h1>
			</div>
			<div className="grid sm:grid-cols-3 gap-12 w-11/12">
				{items && items.map((itemsItem, idx) => (
					<div key={idx}><ItemCard title={itemsItem.title} image={itemsItem.image} price={itemsItem.price} itemId={itemsItem.itemId}/></div>
				))}
			</div>
		</div>
	)
}
