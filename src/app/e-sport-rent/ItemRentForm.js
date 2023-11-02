"use client";
import { useState, useEffect } from "react";
import { isWithinRanges, uploadRental } from "./helpers";

import { callAddFont } from "./Ticketing-normal";

import { useQRCode } from 'next-qrcode';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function ReceiptCard({id, item, name, phone, dates, total, toggleIdView}) {
	const { Image } = useQRCode();

	const downloadReceipt = async () => {
		const divElement = document.getElementById("receipt");
		const divWidth = divElement.offsetWidth;
		const divHeight = divElement.offsetHeight+100;

		const receipt = await callAddFont(divWidth, divHeight);

		receipt.html(document.querySelector('#receipt')).then(() => {
			receipt.setFont("Ticketing");
			receipt.save(`Funky Monkey_${id}`)
		})
	}

	return(
		<div className="fixed sm:absolute z-50 top-0 left-0 h-max sm:h-screen py-8 sm:py-0 sm:px-0 sm:w-screen grid place-items-center bg-black bg-opacity-90 font-Ticketing">
			<div className="flex flex-col gap-4 text-black w-full sm:w-auto">

				<h2 className="text-xl text-red-600 font-LogikBold">Please download this receipt or remember the Rental ID to be used at Pickup</h2>

				<div id="receipt" className="flex flex-col sm:grid sm:grid-cols-2 gap-4 bg-white px-2 sm:px-12 py-8 rounded-lg items-center">
					<div>
						<div className="flex items-center font-bold">
							<h1 className="text-4xl">Rental ID: </h1>
							<h2 className="text-4xl">{id}</h2>
						</div>
						<div className="flex gap-2">
							<h1 className="text-2xl font-bold">Item:</h1>
							<h2 className="text-2xl">{item}</h2>
						</div>
						<div className="flex gap-2">
							<h1 className="text-2xl font-bold">Name:</h1>
							<h2 className="text-2xl">{name}</h2>
						</div>
						<div className="flex gap-2">
							<h1 className="text-2xl font-bold">Phone:</h1>
							<h2 className="text-2xl">{phone}</h2>
						</div>
						<div className="flex gap-2">
							<h1 className="text-2xl font-bold">Rental Date:</h1>
							<h2 className="text-2xl">{dates[0].toLocaleString()}</h2>
						</div>
						<div className="flex gap-2">
							<h1 className="text-2xl font-bold">Return Date:</h1>
							<h2 className="text-2xl"> {dates[1] ? dates[1].toLocaleString() : (dates[0] ? dates[0].toLocaleString() : '')}</h2>
						</div>
						<div className="flex flex-col items-center">
							<h1 className="text-2xl font-bold">Total:</h1>
							<h2 className="text-4xl">{total}</h2>
						</div>
					</div>
					<div className="h-full w-full grid place-items-center">
						<Image
					      text={id}
					      options={{
					        type: 'image/jpeg',
					        quality: 0.3,
					        errorCorrectionLevel: 'M',
					        margin: 3,
					        scale: 4,
					        width: window.innerWidth <= 768 ? 200 : 300,
					        color: {
					          dark: '#000000',
					          light: '#FFFFFF',
					        },
					      }}
					    />
					</div>

				</div>
				<button onClick={downloadReceipt} className='py-2 px-6 font-LogikBold hover:bg-opacity-50 bg-accent text-white transition-all rounded-md'>Download Receipt</button>
				<button onClick={toggleIdView} className='py-2 px-6 font-LogikBold hover:bg-gray-600 bg-gray-800 text-white transition-all rounded-md'>Done</button>
			</div>
		</div>
	)
}

export function ItemRentForm({ image, title, type, price, itemId, amount, deposit, delivery, bookings, setIsRentForm, loadItems,  }) {
	const [name, setName] = useState();
	const [phone, setPhone] = useState();
	const [IdView, setIdView,] = useState(false);
	const [rentalId, setRentalId] = useState();
	const [dates, setDates] = useState();
	const [ageVerification, setAgeVerification] = useState()

	const [active, setActive] = useState(false);
	const [total,setTotal] = useState(price)
	const [error, setError] = useState();
	const [success, setSuccess] = useState()

	useEffect(()=> {
		if(dates) {
			handleTotal()
		}
	}, [dates])

	useEffect(() => {
		if (name && phone && dates && ageVerification) {
			setActive(true)
		} else {
			setActive(false)
		}
	}, [name,phone,dates,ageVerification])

	function daysInRange([start, end]) {
		if (!start || !end) {
		  return 1; // Either start or end date is missing
		}

		const startDate = new Date(start);
		const endDate = new Date(end);
		const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
		const numDays = Math.floor(Math.abs((startDate - endDate) / oneDay)) + 1;
		return numDays;
	}

	function handleTotal() {
		setTotal((price*daysInRange(dates)) + parseInt(deposit || 0) + parseInt(delivery || 0))
	}

	function tileDisabled({ date, view }) {
		const transformedBookings = bookings.map(booking => [booking.from, booking.to]);
		// Add class to tiles in month view only
		if (bookings.length >= amount) {
		  // Check if a date React-Calendar wants to check is within any of the ranges
			return isWithinRanges(date, transformedBookings);
		}
	  }


	const handleName = (e) => {
		setName(e.target.value);
	};

	const handlePhone = (e) => {
		setPhone(e.target.value);
	};

	const handleAgeVerification = (e) => {
		setAgeVerification(e.target.checked);
	};

	function handleDates(nextValue) {
		setDates(nextValue);
	}


	function showSuccess() {
		setSuccess(true)

		setTimeout(() => {
			setSuccess(false)
		}, 4000);
	}

	function showError(message) {
		setError(message)

		setTimeout(() => {
			setError('')
		}, 4000);
	}

	const onPublish = async () => {
		setActive(false)

		const rental = {
			item: title,
			type,
			itemId,
			name,
			phone,
			dates,
			total,
			onError: showError
		};

		if (!name) {
			showError("Enter name");
			return;
		}

		if (!phone) {
			showError("Enter phone number");
			return;
		}

		if (!dates) {
			showError("Select pickup and return date");
			return;
		}

		uploadRental(rental).then((rentalId) => {
			setRentalId(rentalId);
			setIdView(true);
			showSuccess()
			loadItems()
			setActive(true)
		}).catch(error => {
			showError(error.message);
		});
	};

	function toggleIdView() {
		setIsRentForm();
		setIdView(!IdView);
	}

	return (
		<div className="sticky sm:fixed z-50 top-0 left-0 h-max py-16 sm:py-0 px-8 sm:h-screen sm:w-screen grid place-items-center bg-black bg-opacity-90">
			<div className="flex flex-col items-center  gap-4 sm:py-4 sm:px-8 w-full sm:w-8/12">
				{IdView && <ReceiptCard id={rentalId} item={title} name={name} total={total} phone={phone} dates={dates} toggleIdView={toggleIdView} />}
				<h1 className="font-LogikBold text-2xl text-accent">Rental Form</h1>

				<div className="flex flex-col sm:flex-row items-center gap-16">
					<div className="flex flex-col gap-8">
						<div className="flex flex-col sm:flex-row items-center gap-4">
							<img src={image} className="w-full sm:w-4/12 m-auto aspect-auto" width={100} height={100} />
							<div className="flex flex-col sm:grid sm:grid-cols-2 w-full items-center justify-center">
								<p className="text-white text-lg font-LogikBold">Item name: <span className="font-LogikWide">{title}</span></p>
								<p className="text-white text-lg font-LogikBold">Item price: <span className="font-LogikWide">{price}Rwf</span></p>
								{deposit && <p className="text-white text-lg font-LogikBold">Deposit: <span className="font-LogikWide">{deposit}Rwf</span></p>}
								{delivery && <p className="text-white text-lg font-LogikBold">Delivery: <span className="font-LogikWide">{delivery}Rwf</span></p>}
							</div>
						</div>

						<input onChange={handleName} required type="text" name="Name" placeholder="Enter your Name" className="h-8 w-full px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all" />
						<input onChange={handlePhone} required type="text" name="Phone" placeholder="Enter your Phone number" className="h-8 w-full px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all" />

					</div>

					<div className="flex flex-col gap-4 items-center">
						<h2 className="text-lg font-LogikBold text-center">Select pickup date and return date:</h2>
						<Calendar tileDisabled={tileDisabled} selectRange={true} allowPartialRange={true} className="text-black font-LogikWide p-8 rounded-lg" onChange={handleDates} value={dates} />
					</div>
				</div>

				{<p className="text-red-800 text-xl font-LogikBold">Total: {total}</p>}

				<div className="flex gap-2">
					<input type="checkbox" onChange={handleAgeVerification} value={ageVerification} />
					<p>I confirm that I am at least 18 years old and eligible for this rental.</p>
				</div>

				<div className="flex w-full justify-between">
					<button onClick={setIsRentForm} className='py-2 px-6 font-LogikBold justify-self-end w-max hover:bg-gray-600 bg-gray-800 text-white transition-all rounded-md'>CANCEL</button>
					<button onClick={onPublish} className={`py-2 px-6 font-LogikBold justify-self-end w-max ${active ? `bg-accent text-white hover:bg-white hover:text-accent` : 'bg-gray-500'} transition-all rounded-md`} disabled={!active}>BOOK</button>
				</div>

				{success &&
					<div className="fixed z-50 flex justify-center m-auto bottom-0 left-0 w-screen p-4 bg-black bg-opacity-80 rounded-lg">
						<h1 className="text-2xl text-green-600 font-LogikBold">Item Booked successfully</h1>
					</div>
				}

				{error &&
					<div className="fixed z-50 flex justify-center m-auto bottom-0 left-0 w-screen p-4 bg-black bg-opacity-80 rounded-lg">
						<h1 className="text-2xl text-red-600 font-LogikBold">{error}</h1>
					</div>
				}
			</div>
		</div>
	);
}
