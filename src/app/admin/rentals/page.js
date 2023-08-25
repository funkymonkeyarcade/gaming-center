"use client"

import { app } from "@/utils/firebase"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore,setDoc, query, collection, querySnapshot, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react"
import { RentalsCard } from "./RentalsCard";
import { ItemCard } from "./ItemCard";
import { AddItem } from "./AddItem";

export default function UpdateRentals() {
	const [page,setPage] = useState(1)
	const [isAddItem, setIsAddItem] = useState(false)
	const [videoGames, setVideoGames] = useState()
	const [interactiveGames, setInteractiveGames] = useState()
	const [rentals, setRentals] = useState()

	function toggleAddItem() {
		setIsAddItem(!isAddItem)
	}

	async function GetVideoGames() {

		const db = getFirestore(app);

		const q = query(collection(db, "video-games"));

		const querySnapshot = await getDocs(q);
		const ItemsData = querySnapshot.docs.map((doc) => doc.data());
     	setVideoGames(ItemsData);

	}

	async function GetInteractiveGames() {

		const db = getFirestore(app);

		const q = query(collection(db, "interactive-games"));

		const querySnapshot = await getDocs(q);
		const ItemsData = querySnapshot.docs.map((doc) => doc.data());
     	setInteractiveGames(ItemsData);

	}

	async function handleItemChange() {
		// Re-fetch the items after deletion
		await GetVideoGames();
		await GetInteractiveGames();
	}

	async function GetRentals() {
		const db = getFirestore(app);

		const q = query(collection(db, "Rentals"));

		const querySnapshot = await getDocs(q);
		const RentalsData = querySnapshot.docs.map((doc) => doc.data());
     	setRentals(RentalsData);
	}

	const loadItems = () => {
		GetVideoGames()
		GetInteractiveGames()
		GetRentals()
	}

	useEffect(() => {
		loadItems()
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
					{isAddItem && <AddItem onAddItem={handleItemChange} toggleAddItem={toggleAddItem}/>}

					<div className="flex flex-col gap-4">
						{videoGames && videoGames.map((videoGamesItem, idx) => (
							<div key={idx}><ItemCard onDelete={handleItemChange} title={videoGamesItem.title} type={videoGamesItem.type} image={videoGamesItem.image} amount={videoGamesItem.amount} price={videoGamesItem.price} itemId={videoGamesItem.itemId}/></div>
						))}

						{interactiveGames && interactiveGames.map((interactiveGamesItem, idx) => (
							<div key={idx}><ItemCard onDelete={handleItemChange} title={interactiveGamesItem.title} type={interactiveGamesItem.type} image={interactiveGamesItem.image} amount={interactiveGamesItem.amount} price={interactiveGamesItem.price} itemId={interactiveGamesItem.itemId}/></div>
						))}
					</div>
				</>
			}

			{page==2 &&
				<>
					<div className="grid grid-cols-2 gap-12 py-12">
						{rentals && rentals.map((rentalsItem, idx) => (
							<div key={idx}><RentalsCard loadItems={loadItems} item={rentalsItem.item} type={rentalsItem.type} verified={rentalsItem.verified} dates={rentalsItem.dates}  itemId={rentalsItem.itemId} name={rentalsItem.name} total={rentalsItem.total} rentalId={rentalsItem.rentalId} phone={rentalsItem.phone}/></div>
						))}
					</div>
				</>
			}
		</div>
	)
}
