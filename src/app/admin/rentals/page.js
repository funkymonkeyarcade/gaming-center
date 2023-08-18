"use client"

import { app } from "@/utils/firebase"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore,setDoc, doc, updateDoc, query, collection, querySnapshot, getDocs, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react"
import { getDate } from "@/app/news/[article]/page";
import uniqid from 'uniqid';

async function uploadItem({image, title, price}) {
	const storage = getStorage()
	const storageRef = ref(storage, `${title}.png`)

	const snapshot = await uploadBytes(storageRef, image);
	const imageLink = await getDownloadURL(snapshot.ref);

	const itemId = uniqid()

	const db = getFirestore(app);
	await setDoc(doc(db, "Items", itemId), {
		image: imageLink,
		title,
		price,
		itemId
	})
}

function RentalsCard({title, price, name, rentalDate, pickupDate, verified, rentalId, phone}) {
	const [currentVerified, setCurrentVerified] = useState(verified)

	console.log(verified)

	async function verifyRental() {
		const db = getFirestore(app);
		const itemRef = doc(db, "Rentals", rentalId)

		await updateDoc(itemRef, {
			verified: true
		}).then(() => setCurrentVerified(true))
	}

	async function closeRental() {
		const db = getFirestore(app);
		await deleteDoc(doc(db, "Rentals", rentalId));
	}

	return(
		<div className="w-full p-4 flex justify-between items-center bg-black bg-opacity-70 rounded-lg shadow-lg">
			<div className="flex flex-col">
				<h2 className="text-2xl font-LogikBold">ID: {rentalId}</h2>
				<p className="text-xl font-LogikWide">Name: {name}</p>
				<p className="text-xl font-LogikWide">Phone Number: {phone}</p>
				<p className="text-xl font-LogikWide">Item: {title}</p>
				<p className="text-xl font-LogikWide">Price: {price}Rwf</p>
				<p className="text-xl font-LogikWide">Rental Date: {getDate(rentalDate)}</p>
				<p className="text-xl font-LogikWide">Pickup date: {pickupDate}</p>
				<p className="text-xl font-LogikWide">verified: {JSON.stringify(currentVerified)}</p>
			</div>
			<div className="flex gap-4">
				<button onClick={verifyRental} className='py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>VERIFY</button>
				<button onClick={closeRental} className='py-2 px-6 font-LogikBold justify-self-end w-max hover:bg-gray-600 bg-gray-800 text-white transition-all rounded-md'>CLOSE</button>
			</div>
		</div>
	)
}

function ItemCard({title, image, price, itemId}) {

	async function removeItem() {
		const db = getFirestore(app);
		await deleteDoc(doc(db, "Items", itemId));
	}

	return(
		<div className="w-full p-4 flex justify-between items-center bg-black bg-opacity-70 rounded-lg shadow-lg">
			<img src={image} width={80} height={80} alt={title}/>
			<div className="flex flex-col">
				<h2 className="text-2xl font-LogikBold">{title}</h2>
				<p className="text-xl font-LogikWide">Price: {price}Rwf</p>
			</div>
			<div className="flex gap-4">
				<button onClick={removeItem} className='py-2 px-6 font-LogikBold justify-self-end w-max hover:bg-red-600 bg-red-800 text-white transition-all rounded-md'>REMOVE</button>
			</div>
		</div>
	)
}

function AddItem({toggleAddItem}) {
	const [image, setImage] = useState()
	const [title, setTitle] = useState()
	const [price, setPrice] = useState(0)

	const handleImage = (e) => {
		setImage(e.target.files[0])
	}

	const handleTitle = (e) => {
		setTitle(e.target.value)
	}

	const handlePrice = (e) => {
		setPrice(e.target.value)
	}

	const onPublish = async () => {
		const item = {
			image,
			title,
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
				<div className="flex w-full justify-between">
					<button onClick={toggleAddItem} className='py-2 px-6 font-LogikBold justify-self-end w-max hover:bg-gray-600 bg-gray-800 text-white transition-all rounded-md'>CANCEL</button>
					<button onClick={onPublish} className='py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>PUBLISH</button>
				</div>
			</div>

		</div>
	)
}

export default function UpdateRentals() {
	const [page,setPage] = useState(1)
	const [isAddItem, setIsAddItem] = useState(false)
	const [items, setItems] = useState()
	const [rentals, setRentals] = useState()


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

	async function GetRentals() {
		const db = getFirestore(app);

		const q = query(collection(db, "Rentals"));

		const querySnapshot = await getDocs(q);
		const RentalsData = querySnapshot.docs.map((doc) => doc.data());
     	setRentals(RentalsData);
	}

	useEffect(() => {
		GetItems()
		GetRentals()
	}, [])

	return(
		<div className="flex flex-col gap-8 py-8 px-8">
			<h1 className="font-LogikBold text-4xl">Rentals</h1>

			<div className="flex w-max m-auto items-center gap-16">
				<h1 onClick={() => setPage(1)} className={`${page==1? 'text-accent underline':'text-white'} text-xl font-LogikBold cursor-pointer`}>Items</h1>
				<div className="h-6 w-1 bg-gray-100"></div>
				<h1 onClick={() => setPage(2)} className={`${page==2? 'text-accent underline':'text-white'} text-xl font-LogikBold cursor-pointer`}>Rentals</h1>
			</div>

			{page==1 &&
				<>
					<button onClick={toggleAddItem} className="py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md">Add Item</button>
					{isAddItem && <AddItem toggleAddItem={toggleAddItem}/>}

					<div className="flex flex-col gap-4">
						{items && items.map((itemsItem, idx) => (
							<div key={idx}><ItemCard title={itemsItem.title} image={itemsItem.image} amount={itemsItem.amount} price={itemsItem.price} itemId={itemsItem.itemId}/></div>
						))}
					</div>
				</>
			}

			{page==2 &&
				<>
					<div className="flex flex-col gap-4">
						{rentals && rentals.map((rentalsItem, idx) => (
							<div key={idx}><RentalsCard title={rentalsItem.title} verified={rentalsItem.verified} pickupDate={rentalsItem.pickupDate}  rentalId={rentalsItem.rentalId} rentalDate={rentalsItem.rentalDate} amount={rentalsItem.amount} name={rentalsItem.name} price={rentalsItem.price} phone={rentalsItem.phone}/></div>
						))}
					</div>
				</>
			}
		</div>
	)
}
