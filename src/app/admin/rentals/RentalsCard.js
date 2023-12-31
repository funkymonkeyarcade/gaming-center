"use client";
import { app } from "@/utils/firebase";
import { getFirestore, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { useState } from "react";

export function RentalsCard({item, type, verified, loadItems, dates, itemId, name, total, rentalId, phone}) {

	// Calculate the current date
	const currentDate = new Date();

	// Determine whether the return date has passed
	const returnDatePassed = dates[1] && dates[1].toDate() < currentDate;

	const backgroundStyle = returnDatePassed
	? "bg-red-500 bg-opacity-70" // Apply this style if the return date has passed
	: "bg-black bg-opacity-70";

	async function verifyRental() {
		const db = getFirestore(app);
		const itemRef = doc(db, "Rentals", rentalId);

		await updateDoc(itemRef, {
			verified: true
		}).then(() => {
			loadItems()
		});
	}

	function formatDate(date) {
		const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
		return date.toLocaleDateString('en-GB', options); // Set the locale explicitly to en-GB for dd/mm/yyyy format
	}

	async function closeRental() {
		const db = getFirestore(app);

		await deleteDoc(doc(db, "Rentals", rentalId)).then(async () => {
			const itemRef = doc(db, type, itemId);
  			const itemDoc = await getDoc(itemRef);
			console.log(itemDoc)

			const existingBookings = itemDoc.data().bookings || [];

			const bookingIndex = existingBookings.findIndex(booking => {
				return (
				  booking.from.isEqual(dates[0]) && booking.to.isEqual(dates[1])
				);
			  });

			if (bookingIndex !== -1) {
				// Remove the booking from the array
				existingBookings.splice(bookingIndex, 1);

				// Update the item's bookings array
				await updateDoc(itemRef, {
					bookings: existingBookings
				}).then(() => {
					loadItems()
				});
			}

		});
	}

	return (
		<div className={`p-4 flex flex-col gap-8 justify-between items-center ${backgroundStyle} rounded-lg shadow-lg`}>
			<div className="flex flex-col">
				<h2 className="text-xl font-bold">ID: <span className="text font-thin">{rentalId}</span></h2>
				<p className="text-xl font-bold">Name: <span className="text font-thin">{name}</span></p>
				<p className="text-xl font-bold">Phone Number: <span className="text font-thin">{phone}</span></p>
				<p className="text-xl font-bold">Item: <span className="text font-thin">{item}</span></p>
				<p className="text-xl font-bold">Total cost: <span className="text font-thin">{total}Rwf</span></p>
				<p className="text-xl font-bold">Pickup date: <span className="text font-thin">{formatDate(dates[0].toDate())}</span></p>
				<p className="text-xl font-bold">Return date: <span className="text font-thin">{(dates[1] && formatDate(dates[1].toDate())) || formatDate(dates[0].toDate())}</span></p>
				<p className="text-xl font-bold">verified: <span className="text font-thin">{JSON.stringify(verified)}</span></p>
			</div>
			<div className="flex gap-4">
				<button onClick={verifyRental} className='py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>VERIFY</button>
				<button onClick={closeRental} className='py-2 px-6 font-LogikBold justify-self-end w-max hover:bg-gray-600 bg-gray-800 text-white transition-all rounded-md'>CLOSE</button>
			</div>
		</div>
	);
}
