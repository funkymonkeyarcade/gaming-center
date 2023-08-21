"use client";
import { app } from "@/utils/firebase";
import { getFirestore, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import { getDate } from "@/app/news/[article]/page";

export function RentalsCard({ title, price, name, rentalDate, pickupDate, verified, rentalId, phone }) {
	const [currentVerified, setCurrentVerified] = useState(verified);

	console.log(verified);

	async function verifyRental() {
		const db = getFirestore(app);
		const itemRef = doc(db, "Rentals", rentalId);

		await updateDoc(itemRef, {
			verified: true
		}).then(() => setCurrentVerified(true));
	}

	async function closeRental() {
		const db = getFirestore(app);
		await deleteDoc(doc(db, "Rentals", rentalId));
	}

	return (
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
	);
}
