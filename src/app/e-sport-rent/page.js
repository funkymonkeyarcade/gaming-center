"use client"

import { app } from "@/utils/firebase"
import { getFirestore,setDoc, doc, updateDoc, query, collection, querySnapshot, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react"
import { ItemRentForm } from "./ItemRentForm";


function ItemCard({title, image, price, itemId, amount, type, deposit, delivery, bookings, loadItems}) {
	const [isRentForm,setIsRentForm] = useState(false)

	function rentItem() {
		setIsRentForm(!isRentForm)
	}

	return(
		<div className="w-full h-full p-4 flex flex-col justify- gap-8 bg-black bg-opacity-50 rounded-lg shadow-lg text-white">
			<img src={image} className="w-full aspect-auto" width={100} height={100} alt={title}/>
			<div className="flex flex-col gap-2">
				<div className="flex flex-col">
					<h2 className="text-2xl font-LogikBold">{title}</h2>
					<p className="text-xl font-LogikWide text-white">Price: <span className="text-accent">Rwf{price}</span>/day</p>
				</div>
				<div className="flex gap-4">
					<button onClick={rentItem} className='py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>RENT</button>
				</div>
			</div>

			{isRentForm && <ItemRentForm loadItems={loadItems} title={title} amount={amount} bookings={bookings} delivery={delivery} deposit={deposit} type={type} image={image} price={price} itemId={itemId} setIsRentForm={rentItem}/>}

		</div>
	)
}

export default function Rent() {
	const [videoGames, setVideoGames] = useState()
	const [interactiveGames, setInteractiveGames] = useState()
	const [page, setPage] = useState(1)

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

	const loadItems = () => {
		GetVideoGames()
		GetInteractiveGames()
	}

	useEffect(() => {
		loadItems()
	}, [])

	return (
		<div className="flex flex-col gap-16 items-center bg-primary pb-24">
			<div className="flex flex-col pt-32 pb-8 items-center justify-center w-full bg-cover bg-[linear-gradient(to_top,rgba(4,9,38,1)_40%,rgba(4,9,38,0)_100%),url('https://firebasestorage.googleapis.com/v0/b/gaming-906ed.appspot.com/o/9260185_4127298.jpg?alt=media&token=3d9efb75-a9c3-4171-b969-3040712c87ac')]">
				<h1 className="text-white font-LogikBold text-5xl">Rent</h1>
				<h2 className="text-lg font-LogikWide text-accent" >{`(Terms and Conditions apply)`}</h2>
			</div>
			<div className="flex flex-col sm:flex-row w-max m-auto items-center gap-4 sm:gap-16">
				<h1 onClick={() => setPage(1)} className={`${page==1? 'text-accent underline':'text-white'} text-xl font-LogikBold cursor-pointer`}>Video Games</h1>
				<div className="h-[0.2rem] w-16 sm:h-6 sm:w-1 bg-gray-100"></div>
				<h1 onClick={() => setPage(2)} className={`${page==2? 'text-accent underline':'text-white'} text-xl font-LogikBold cursor-pointer`}>Interactive Games</h1>
			</div>

			{page==1 &&
				<div className="grid sm:grid-cols-3 gap-12 w-11/12">
					{videoGames && videoGames.map((videoGamesItem, idx) => (
						<div key={idx}><ItemCard loadItems={loadItems} title={videoGamesItem.title} type={videoGamesItem.type} bookings={videoGamesItem.bookings} delivery={videoGamesItem.delivery} deposit={videoGamesItem.deposit} amount={videoGamesItem.amount} image={videoGamesItem.image} price={videoGamesItem.price} itemId={videoGamesItem.itemId}/></div>
					))}
				</div>
			}

			{page==2 &&
				<div className="grid sm:grid-cols-3 gap-12 w-11/12">
					{interactiveGames && interactiveGames.map((interactiveGamesItem, idx) => (
						<div key={idx}><ItemCard title={interactiveGamesItem.title} type={interactiveGamesItem.type}  bookings={interactiveGamesItem.bookings} delivery={interactiveGamesItem.delivery} deposit={interactiveGamesItem.deposit} amount={interactiveGamesItem.amount} image={interactiveGamesItem.image} price={interactiveGamesItem.price} itemId={interactiveGamesItem.itemId}/></div>
					))}
				</div>
			}
		</div>
	)
}
