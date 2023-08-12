"use client"

import { app } from "@/utils/firebase"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore,setDoc, doc } from "firebase/firestore";
import { useState } from "react"

async function uploadArticle({image, title, article, timestamp}) {
	const storage = getStorage()
	const storageRef = ref(storage, `${title}.png`)

	const snapshot = await uploadBytes(storageRef, image);
	const imageLink = await getDownloadURL(snapshot.ref);

	const db = getFirestore(app);
	await setDoc(doc(db, "News", title), {
		image: imageLink,
		title,
		timestamp,
		article
	})
}

export default function UpdateNews() {
	const [image, setImage] = useState()
	const [title, setTitle] = useState()
	const [article, setArticle] = useState()

	const handleImage = (e) => {
		setImage(e.target.files[0])
	}

	const handleTitle = (e) => {
		setTitle(e.target.value)
	}

	const handleArticle = (e) => {
		setArticle(e.target.value)
	}

	const onPublish = async () => {
		const content = {
			image,
			title,
			article: article.replace(/\n/g, '\\n'),
			timestamp: new Date
		}

		uploadArticle(content)
	}

	return(
		<div className="flex flex-col gap-8 py-8 px-8">
			<h1 className="font-LogikBold text-4xl">NEWS</h1>
			<input onChange={handleImage} type="file" placeholder="Enter image" multiple accept="image/*,audio/*,video/*" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"></input>
			<input onChange={handleTitle} type="text" name="title" placeholder="Enter article title" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
			<textarea onChange={handleArticle} placeholder="Write article" className="h-60 px-2 border-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
			<button onClick={onPublish} className='py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>PUBLISH</button>
		</div>
	)
}
