"use client";
import { app } from "@/utils/firebase";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

export function ItemCard({ onDelete, title, type, image, price, itemId }) {

	async function removeItem() {
		const db = getFirestore(app);
		await deleteDoc(doc(db, type, itemId)).then(() => {
			onDelete()
		});
	}

	return (
		<div className="w-full p-4 grid grid-cols-[1fr_4fr_1fr] gap-8 items-center bg-black bg-opacity-70 rounded-lg shadow-lg">
			<img src={image} className="w-full" width={100} height={100} alt={title} />
			<div className="flex flex-col">
				<h2 className="text-2xl font-LogikBold">{title}</h2>
				<p className="text-xl font-LogikWide">ID: {itemId}</p>
				<p className="text-xl font-LogikWide">Price: {price}Rwf</p>
			</div>
			<div className="flex gap-4">
				<button onClick={removeItem} className='py-2 px-6 font-LogikBold justify-self-end w-max hover:bg-red-400 bg-red-600 text-white transition-all rounded-md'>DELETE</button>
			</div>
		</div>
	);
}
