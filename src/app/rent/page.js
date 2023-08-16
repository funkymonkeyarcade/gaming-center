"use client"

import { app } from "@/utils/firebase"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore,setDoc, doc, updateDoc, query, collection, querySnapshot, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react"

function ItemRentForm({image, title, amount, price, setIsRentForm}) {
	const [returnDate, setReturnDate] = useState()
	const [name, setName] = useState()
	const [rentAmount, setRentAmount] = useState(0)


	const handleName = (e) => {
		setName(e.target.value)
	}

	const handleRentAmount = (e) => {
		setRentAmount(e.target.value)
	}

	const handleReturnDate = (e) => {
		setReturnDate(e.target.value)
	}

	const onPublish = async () => {
		const rental = {
			image,
			title,
			amount,
			price: price*rentAmount,
			name,
			returnDate,
			currentDate: new Date()
		}

		uploadrental(item)
	}

	return(
		<div className="fixed top-0 left-0 h-screen w-screen grid place-items-center bg-black bg-opacity-80">
			<div className="flex flex-col items-center gap-8 py-8 px-8">
				<h1 className="font-LogikBold text-2xl">Rental Form</h1>

				<img src={image} className="h-12 w-12"/>
				<p className="text-white text-lg font-LogikBold">Item name: <span className="font-LogikWide">{title}</span></p>
				<p className="text-white text-lg font-LogikBold">Item price: <span className="font-LogikWide">{price}Rwf</span></p>

				<div className="flex flex-col w-full">
					<label htmlFor="amount" className="text-white text-lg font-LogikWide">amount: {rentAmount}</label>
					<input onChange={handleRentAmount} type="range" min={0} max={amount} name="amount" placeholder="Enter amount" className="h-4 px-2 appearance-none bg-white rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full"/>
				</div>

				<input onChange={handleName} type="text" name="Name" placeholder="Enter your Name" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>

				<div className="flex flex-col gap-2 w-full">
					<label htmlFor="amount" className="text-white text-lg font-LogikWide">Return date</label>
					<input onChange={handleReturnDate} type="date" name="return" placeholder="Enter the return date" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
				</div>

				<div className="flex w-full justify-between">
					<button onClick={setIsRentForm} className='py-2 px-6 font-LogikBold justify-self-end w-max hover:bg-gray-600 bg-gray-800 text-white transition-all rounded-md'>CANCEL</button>
					<button onClick={onPublish} className='py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>PUBLISH</button>
				</div>
			</div>
		</div>
	)
}

function ItemCard({title, image, amount, price}) {
	const [isRentForm,setIsRentForm] = useState(false)

	function rentItem() {
		setIsRentForm(true)
	}

	return(
		<div className="w-full h-full p-6 flex justify-between items-center gap-8 bg-black bg-opacity-50 rounded-lg shadow-lg text-white">
			<img src={image} width={100} height={100} alt={title}/>
			<div className="flex flex-col gap-2">
				<div className="flex flex-col">
					<h2 className="text-2xl font-LogikBold">{title}</h2>
					<p className="text-xl font-LogikWide">Stock: {amount}</p>
					<p className="text-xl font-LogikWide">Price: {price}Rwf</p>
				</div>
				<div className="flex gap-4">
					<button onClick={rentItem} className='py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>RENT</button>
				</div>
			</div>

			<ItemRentForm title={title} image={image} amount={amount} price={price} setIsRentForm={setIsRentForm}/>
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
					<div key={idx}><ItemCard title={itemsItem.title} image={itemsItem.image} amount={itemsItem.amount}  price={itemsItem.price}/></div>
				))}
			</div>
		</div>
	)
}
