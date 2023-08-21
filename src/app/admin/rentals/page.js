"use client"

import { app } from "@/utils/firebase"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore,setDoc, query, collection, querySnapshot, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react"
import uniqid from 'uniqid';
import { RentalsCard } from "./RentalsCard";
import { ItemCard } from "./ItemCard";
import { AddItem } from "./AddItem";

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
