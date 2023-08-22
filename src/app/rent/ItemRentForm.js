"use client";
import { app } from "@/utils/firebase";
import { getFirestore, query, collection, getDocs, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { uploadRental } from "./helpers";

function IdCard({id, toggleIdView}) {
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

export function ItemRentForm({ image, title, price, itemId, type, deposit, delivery, bookings, setIsRentForm }) {
	const [fromDate, setFromDate] = useState();
	const [toDate, setToDate] = useState();
	const [name, setName] = useState();
	const [phone, setPhone] = useState();
	const [IdView, setIdView,] = useState(false);
	const [rentalId, setRentalId] = useState();
	const [active, setActive] = useState(false);
	const [total,setTotal] = useState(price)

	const [error, setError] = useState();

	const calculateDaysDifference = (startDate, endDate) => {
		const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
		const startTimestamp = new Date(startDate).getTime();
		const endTimestamp = new Date(endDate).getTime();
		const daysDifference = Math.round(Math.abs((startTimestamp - endTimestamp) / oneDay));
		return daysDifference;
	  };

	  // Function to calculate the total price based on days, delivery, deposit, and item price
	  const calculateTotalPrice = (days, deliveryCost, deposit, itemPrice) => {
		const totalWithoutDeposit = days * itemPrice + (deliveryCost || 0);
		const totalPrice = totalWithoutDeposit + (deposit || 0);
		return totalPrice;
	  };

	useEffect(() => {
		if (fromDate && toDate) {
		  const daysDiff = calculateDaysDifference(fromDate, toDate); // Implement this function to calculate days difference
		  const totalPrice = calculateTotalPrice(daysDiff, delivery, deposit, price); // Implement this function to calculate total price
		  setTotal(totalPrice);
		}
	}, [fromDate, toDate, delivery, deposit, price]);

	const handleName = (e) => {
		setName(e.target.value);
	};

	const handlePhone = (e) => {
		setPhone(e.target.value);
	};


	const handleFromDate = async (e) => {
		setFromDate(e.target.value)
	};

	const handleToDate = async (e) => {
		setToDate(e.target.value)
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
					<div className="grid grid-cols-2 w-full items-center justify-center text-end">
						<p className="text-white text-lg font-LogikBold">Item name: <span className="font-LogikWide">{title}</span></p>
						<p className="text-white text-lg font-LogikBold">Item price: <span className="font-LogikWide">{price}Rwf</span></p>
						{deposit && <p className="text-white text-lg font-LogikBold">Deposit: <span className="font-LogikWide">{deposit}Rwf</span></p>}
						{delivery && <p className="text-white text-lg font-LogikBold">Delivery: <span className="font-LogikWide">{delivery}Rwf</span></p>}
					</div>
				</div>

				<input onChange={handleName} required type="text" name="Name" placeholder="Enter your Name" className="h-8 w-full px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all" />
				<input onChange={handlePhone} required type="text" name="Phone" placeholder="Enter your Phone number" className="h-8 w-full px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all" />

				<div className="flex flex-col gap-2 w-full">
					<label htmlFor="amount" className="text-white text-lg font-LogikWide">Pickup date</label>
					<input onChange={handleFromDate} type="date" name="from" placeholder="Enter the pickup date" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white bg-transparent transition-all" style={{ colorScheme: 'dark' }} />
				</div>

				{fromDate && <div className="flex flex-col gap-2 w-full">
					<label htmlFor="amount" className="text-white text-lg font-LogikWide">Return date</label>
					<input onChange={handleToDate} type="date" name="from" placeholder="Enter the pickup date" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white bg-transparent transition-all" style={{ colorScheme: 'dark' }} />
				</div>}

				{error && <p className="text-red-800 text-xl font-LogikBold">{error}</p>}
				{<p className="text-red-800 text-xl font-LogikBold">Total: {total}</p>}

				<div className="flex w-full justify-between">
					<button onClick={setIsRentForm} className='py-2 px-6 font-LogikBold justify-self-end w-max hover:bg-gray-600 bg-gray-800 text-white transition-all rounded-md'>CANCEL</button>
					<button onClick={onPublish} className={`py-2 px-6 font-LogikBold justify-self-end w-max ${active ? `bg-accent text-white hover:bg-white hover:text-accent` : 'bg-gray-500'} transition-all rounded-md`} disabled={!active}>BOOK</button>
				</div>
			</div>
		</div>
	);
}
