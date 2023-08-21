"use client";
import { app } from "@/utils/firebase";
import { getFirestore, query, collection, getDocs, where } from "firebase/firestore";
import { useState } from "react";
import { uploadRental, IdCard } from "./page";

export function ItemRentForm({ image, title, price, itemId, setIsRentForm }) {
	const [pickupDate, setPickupDate] = useState();
	const [name, setName] = useState();
	const [phone, setPhone] = useState();
	const [IdView, setIdView,] = useState(false);
	const [rentalId, setRentalId] = useState();
	const [active, setActive] = useState(false);
	const [error, setError] = useState();

	const handleName = (e) => {
		setName(e.target.value);
	};

	const handlePhone = (e) => {
		setPhone(e.target.value);
	};


	const handlePickupDate = async (e) => {

		const db = getFirestore(app);

		const q = query(collection(db, "Rentals"), where("pickupDate", "==", e.target.value), where("itemId", "==", itemId));

		const querySnapshot = await getDocs(q);

		console.log(querySnapshot.docs);

		if (querySnapshot.docs[0]) {
			console.log("A");
			setError(`Item is unavailable on ${e.target.value}`);
		} else {
			setError("");
			setPickupDate(e.target.value);
			setActive(true);
		}

	};

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
		};

		if (!name) {
			setError("Enter name");
			return;
		}

		if (!phone) {
			setError("Enter phone number");
			return;
		}

		uploadRental(rental).then((rentalId) => {
			setRentalId(rentalId);
			setIdView(true);
		}).catch(error => {
			console.log(error);
			setError(error.message);
		});
	};

	function toggleIdView() {
		setIsRentForm();
		setIdView(!IdView);
	}

	return (
		<div className="fixed z-50 top-0 left-0 h-screen w-screen grid place-items-center bg-black bg-opacity-90">
			<div className="flex flex-col items-center gap-6 py-8 px-8 w-full sm:w-5/12">
				{IdView && <IdCard id={rentalId} toggleIdView={toggleIdView} />}
				<h1 className="font-LogikBold text-2xl">Rental Form</h1>

				<div className="flex items-center gap-4">
					<img src={image} className="h-20 w-20" />
					<p className="text-white text-lg font-LogikBold">Item name: <span className="font-LogikWide">{title}</span></p>
					<p className="text-white text-lg font-LogikBold">Item price: <span className="font-LogikWide">{price}Rwf</span></p>
				</div>

				<input onChange={handleName} required type="text" name="Name" placeholder="Enter your Name" className="h-8 w-full px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all" />
				<input onChange={handlePhone} required type="text" name="Phone" placeholder="Enter your Phone number" className="h-8 w-full px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all" />

				<div className="flex flex-col gap-2 w-full">
					<label htmlFor="amount" className="text-white text-lg font-LogikWide">Pickup date</label>
					<input onChange={handlePickupDate} type="date" name="pickup" placeholder="Enter the pickup date" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white bg-transparent transition-all" style={{ colorScheme: 'dark' }} />
				</div>

				{<p className="text-red-800 text-xl font-LogikBold">{error}</p>}

				<div className="flex w-full justify-between">
					<button onClick={setIsRentForm} className='py-2 px-6 font-LogikBold justify-self-end w-max hover:bg-gray-600 bg-gray-800 text-white transition-all rounded-md'>CANCEL</button>
					<button onClick={onPublish} className={`py-2 px-6 font-LogikBold justify-self-end w-max ${active ? `bg-accent text-white hover:bg-white hover:text-accent` : 'bg-gray-500'} transition-all rounded-md`} disabled={!active}>BOOK</button>
				</div>
			</div>
		</div>
	);
}
