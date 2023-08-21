"use client";
import { app } from "@/utils/firebase";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

export function ItemCard({ title, image, price, itemId }) {

	async function removeItem() {
		const db = getFirestore(app);
		await deleteDoc(doc(db, "Items", itemId));
	}

	return (
		<div className="w-full p-4 flex justify-between items-center bg-black bg-opacity-70 rounded-lg shadow-lg">
			<img src={image} width={80} height={80} alt={title} />
			<div className="flex flex-col">
				<h2 className="text-2xl font-LogikBold">{title}</h2>
				<p className="text-xl font-LogikWide">Price: {price}Rwf</p>
			</div>
			<div className="flex gap-4">
				<button onClick={removeItem} className='py-2 px-6 font-LogikBold justify-self-end w-max hover:bg-red-600 bg-red-800 text-white transition-all rounded-md'>REMOVE</button>
			</div>
		</div>
	);
}
