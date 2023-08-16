"use client"

import { app } from "@/utils/firebase"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore,setDoc, doc, updateDoc, query, collection, querySnapshot, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react"

async function uploadItem({image, title, amount, price}) {
	const storage = getStorage()
	const storageRef = ref(storage, `${title}.png`)

	const snapshot = await uploadBytes(storageRef, image);
	const imageLink = await getDownloadURL(snapshot.ref);

	const db = getFirestore(app);
	await setDoc(doc(db, "Items", title), {
		image: imageLink,
		title,
		amount,
		price
	})
}

function ItemCard({title, image, amount, price}) {
	const [currentAmount, setCurrentAmount] = useState(amount)

	useEffect(() => {},[amount])

	async function plusItem() {
		const db = getFirestore(app);
		const itemRef = doc(db, "Items", title)

		const updatedAmount = parseInt(currentAmount) + 1

		await updateDoc(itemRef, {
			amount: updatedAmount
		}).then(() => setCurrentAmount(updatedAmount))
	}

	async function minusItem() {
		const db = getFirestore(app);
		const itemRef = doc(db, "Items", title)

		const updatedAmount = parseInt(currentAmount) - 1

		await updateDoc(itemRef, {
			amount: updatedAmount
		}).then(() => setCurrentAmount(updatedAmount))
	}

	return(
		<div className="w-full p-4 flex justify-between items-center bg-black bg-opacity-70 rounded-lg shadow-lg">
			<img src={image} width={80} height={80} alt={title}/>
			<div className="flex flex-col">
				<h2 className="text-2xl font-LogikBold">{title}</h2>
				<p className="text-xl font-LogikWide">Price: {price}Rwf</p>
				<p className="text-xl font-LogikWide">Stock: {currentAmount}</p>
			</div>
			<div className="flex gap-4">
				<button onClick={plusItem} className='py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>ADD</button>
				<button onClick={minusItem} className='py-2 px-6 font-LogikBold justify-self-end w-max hover:bg-gray-600 bg-gray-800 text-white transition-all rounded-md'>REMOVE</button>
			</div>
		</div>
	)
}

function AddItem({toggleAddItem}) {
	const [image, setImage] = useState()
	const [title, setTitle] = useState()
	const [amount, setAmount] = useState(0)
	const [price, setPrice] = useState(0)

	const handleImage = (e) => {
		setImage(e.target.files[0])
	}

	const handleTitle = (e) => {
		setTitle(e.target.value)
	}

	const handleAmount = (e) => {
		setAmount(e.target.value)
	}

	const handlePrice = (e) => {
		setPrice(e.target.value)
	}

	const onPublish = async () => {
		const item = {
			image,
			title,
			amount,
			price
		}

		uploadItem(item)
	}

	return (
		<div className="fixed top-0 left-0 h-screen w-screen grid place-items-center bg-black bg-opacity-80">
			<div className="flex flex-col gap-8 py-8 px-8">
				<h1 className="font-LogikBold text-2xl">Add Item</h1>
				<input onChange={handleImage} type="file" placeholder="Enter image" multiple accept="image/*,audio/*,video/*" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"></input>
				<input onChange={handleTitle} type="text" name="title" placeholder="Enter item title" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
				<input onChange={handlePrice} type="text" name="price" placeholder="Enter item price" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
				<div className="flex flex-col">
					<label htmlFor="amount" className="text-white text-lg font-LogikWide">amount: {amount}</label>
					<input onChange={handleAmount} type="range" value={amount} name="amount" placeholder="Enter amount" className="h-4 px-2 appearance-none bg-white rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full"/>
				</div>
				<div className="flex w-full justify-between">
					<button onClick={toggleAddItem} className='py-2 px-6 font-LogikBold justify-self-end w-max hover:bg-gray-600 bg-gray-800 text-white transition-all rounded-md'>CANCEL</button>
					<button onClick={onPublish} className='py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>PUBLISH</button>
				</div>
			</div>

		</div>
	)
}

export default function UpdateRentals() {
	const [isAddItem, setIsAddItem] = useState(false)
	const [items, setItems] = useState()

	function toggleAddItem() {
		setIsAddItem(!isAddItem)
	}

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

	return(
		<div className="flex flex-col gap-8 py-8 px-8">
			<h1 className="font-LogikBold text-4xl">Rentals</h1>
			<button onClick={toggleAddItem} className="py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md">Add Item</button>
			{isAddItem && <AddItem toggleAddItem={toggleAddItem}/>}

			<div className="flex flex-col gap-4">
				{items && items.map((itemsItem, idx) => (
					<div key={idx}><ItemCard title={itemsItem.title} image={itemsItem.image} amount={itemsItem.amount} price={itemsItem.price}/></div>
				))}
			</div>
		</div>
	)
}
