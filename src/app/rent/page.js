"use client"

import { app } from "@/utils/firebase"
import uniqid from 'uniqid';
import { getFirestore,setDoc, doc, updateDoc, query, collection, querySnapshot, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react"
import { ItemRentForm } from "./ItemRentForm";

export async function uploadRental({title, amount, price, name, rentalDate, pickupDate, verified, itemId}) {
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

export function IdCard({id, toggleIdView}) {
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
