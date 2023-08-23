"use client";
import { useState } from "react";
import { uploadItem } from "./helpers";

export function AddItem({ toggleAddItem, onAddItem }) {
	const [image, setImage] = useState();
	const [title, setTitle] = useState();
	const [type, setType] = useState('video-games');
	const [amount, setAmount] = useState(1);
	const [deposit, setDeposit] = useState('');
	const [delivery, setDelivery] = useState('');
	const [price, setPrice] = useState();
	const [error, setError] = useState()
	const [success, setSuccess] = useState()


	const handleImage = (e) => {
		setImage(e.target.files[0]);
	};

	const handleTitle = (e) => {
		setTitle(e.target.value);
	};

	const handlePrice = (e) => {
		setPrice(e.target.value);
	};

	const handleType = (e) => {
		setType(e.target.value);
	};

	const handleAmount = (e) => {
		setAmount(e.target.value);
	};

	const handleDeposit = (e) => {
		setDeposit(e.target.value);
	};

	const handleDelivery = (e) => {
		setDelivery(e.target.value);
	};

	function showSuccess() {
		setSuccess(true)

		setTimeout(() => {
			setSuccess(false)
		}, 4000);
	}

	function validateItemData() {
		if (!image || !title || !type || !price) {
		  return false; // Return false if any field is missing
		}

		// Add additional validation conditions if needed
		// For example, you could check if the title meets a certain length requirement

		return true; // All conditions are met, data is valid
	  }

	const onPublish = async () => {
		setError('')
		const item = {
			image,
			title,
			amount,
			type,
			deposit,
			delivery,
			price,
			bookings: []
		};

		if(!validateItemData()) {
			setError('Image, Title, Type and Price are required')
			return
		}

		uploadItem(item).then(() => {
			showSuccess()
			onAddItem()
			setAmount('')
			setDelivery('')
			setDeposit('')
			setPrice('')
			setTitle('')
		}).catch(err => {
			setError(err.message)
		});
	};

	return (
		<div className="fixed top-0 left-0 h-screen w-screen grid place-items-center bg-black bg-opacity-80">
			<div className="flex flex-col gap-8 py-8 px-8 w-4/12">
				<h1 className="font-LogikBold text-2xl">Add Item</h1>
				<input onChange={handleImage} type="file" placeholder="Enter image" multiple accept="image/*,audio/*,video/*" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"></input>
				<input onChange={handleTitle} value={title} type="text" name="title" placeholder="Enter item title" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all" />
				<select onChange={handleType} list="type" name="type" id="type" className="h-8 px-2 border-b-2 focus:border-accent outline-none bg-transparent text-white font-LogikWide transition-all" style={{ colorScheme: 'dark' }} >
					<option value="video-games" className="text-black">Video Game</option>
					<option value="interactive-games" className="text-black">Interactive Game</option>
				</select>

				<div className="flex flex-col gap-2">
					<label htmlFor="amount" className="text-lg font-LogikBold">Amount: {amount}</label>
					<input onChange={handleAmount} value={amount} name="amount" type="range" min={1} max={20} />
				</div>

				<input onChange={handlePrice} value={price} type="text" name="price" placeholder="Enter item price per day" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all" />
				<input onChange={handleDeposit} value={deposit} type="text" name="deposit" placeholder="Enter item deposit" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all" />
				<input onChange={handleDelivery} value={delivery} type="text" name="deposit" placeholder="Enter delivery cost" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all" />

				<div className="flex w-full justify-between">
					<button onClick={toggleAddItem} className='py-2 px-6 font-LogikBold justify-self-end w-max hover:bg-gray-600 bg-gray-800 text-white transition-all rounded-md'>CANCEL</button>
					<button onClick={onPublish} className='py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>PUBLISH</button>
				</div>
			</div>

			{success &&
				<div className="fixed z-50 flex justify-center m-auto bottom-0 left-0 w-screen p-4 bg-black bg-opacity-80 rounded-lg">
					<h1 className="text-2xl text-green-600 font-LogikBold">Item added successfully</h1>
				</div>
			}

			{error &&
				<div className="fixed z-50 flex justify-center m-auto bottom-0 left-0 w-screen p-4 bg-black bg-opacity-80 rounded-lg">
					<h1 className="text-2xl text-red-600 font-LogikBold">{error}</h1>
				</div>
			}
		</div>
	);
}
