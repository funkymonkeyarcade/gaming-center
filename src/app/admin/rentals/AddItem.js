"use client";
import { useState } from "react";
import { uploadItem } from "./helpers";

export function AddItem({ toggleAddItem }) {
	const [image, setImage] = useState();
	const [title, setTitle] = useState();
	const [type, setType] = useState();
	const [amount, setAmount] = useState(0);
	const [from, setFrom] = useState();
	const [to, setTo] = useState();
	const [deposit, setDeposit] = useState();
	const [delivery, setDelivery] = useState();
	const [price, setPrice] = useState(0);

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
		console.log(amount)
	};

	const onPublish = async () => {
		// const item = {
		// 	image,
		// 	title,
		// 	price
		// };

		// uploadItem(item);
		console.log(amount)
	};

	return (
		<div className="fixed top-0 left-0 h-screen w-screen grid place-items-center bg-black bg-opacity-80">
			<div className="flex flex-col gap-8 py-8 px-8">
				<h1 className="font-LogikBold text-2xl">Add Item</h1>
				<input onChange={handleImage} type="file" placeholder="Enter image" multiple accept="image/*,audio/*,video/*" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"></input>
				<input onChange={handleTitle} type="text" name="title" placeholder="Enter item title" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all" />
				<select onChange={handleType} list="type" name="type" id="type" className="h-8 px-2 border-b-2 focus:border-accent outline-none bg-transparent text-white font-LogikWide transition-all" style={{ colorScheme: 'dark' }} >
					<option value="video games" className="text-black">Video games</option>
					<option value="Interactive Games" className="text-black">Interactive Games</option>
				</select>

				<div className="flex flex-col gap-2">
					<label htmlFor="amount" className="text-lg font-LogikBold">Amount: {amount}</label>
					<input onChange={handleAmount} name="amount" type="range" min={0} max={20} />
				</div>

				<input onChange={handlePrice} type="text" name="price" placeholder="Enter item price" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all" />
				<div className="flex w-full justify-between">
					<button onClick={toggleAddItem} className='py-2 px-6 font-LogikBold justify-self-end w-max hover:bg-gray-600 bg-gray-800 text-white transition-all rounded-md'>CANCEL</button>
					<button onClick={onPublish} className='py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>PUBLISH</button>
				</div>
			</div>

		</div>
	);
}
