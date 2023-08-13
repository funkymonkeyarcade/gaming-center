"use client"

import { app } from "@/utils/firebase"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore,setDoc, doc } from "firebase/firestore";
import { useState } from "react"

async function uploadFact({image, number, description}) {
	const storage = getStorage()
	const storageRef = ref(storage, `${description}.png`)

	const snapshot = await uploadBytes(storageRef, image);
	const imageLink = await getDownloadURL(snapshot.ref);

	const db = getFirestore(app);
	await setDoc(doc(db, "Facts", description), {
		image: imageLink,
		number,
		description
	})
}

export default function UpdateFacts() {
	const [image, setImage] = useState()
	const [number, setNumber] = useState()
	const [description, setDescription] = useState()

	const handleImage = (e) => {
		setImage(e.target.files[0])
	}

	const handleNumber = (e) => {
		setNumber(e.target.value)
	}

	const handleDescription = (e) => {
		setDescription(e.target.value)
	}

	const onPublish = async () => {
		const content = {
			image,
			number,
			description
		}

		uploadFact(content)
	}

	return(
		<div className="flex flex-col gap-8 py-8 px-8">
			<h1 className="font-LogikBold text-4xl">NEWS</h1>
			<input onChange={handleImage} type="file" placeholder="Enter image" multiple accept="image/*,audio/*,video/*" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"></input>
			<input onChange={handleNumber} type="text" name="Number" placeholder="Enter Number" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
			<textarea onChange={handleDescription} placeholder="Write Description" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
			<button onClick={onPublish} className='py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>PUBLISH</button>
		</div>
	)
}
