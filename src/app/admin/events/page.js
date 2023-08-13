"use client"

import { app } from "@/utils/firebase"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore,setDoc, doc } from "firebase/firestore";
import { useState } from "react"

async function uploadEvent({image, title, type, from, to, location, games, participants}) {
	const storage = getStorage()
	const storageRef = ref(storage, `${title}.png`)

	const snapshot = await uploadBytes(storageRef, image);
	const imageLink = await getDownloadURL(snapshot.ref);

	const db = getFirestore(app);
	await setDoc(doc(db, "Events", title), {
		image: imageLink,
		title,
		type,
		from,
		to,
		location,
		games,
		participants
	})
}

export default function UpdateEvents() {
	const [image, setImage] = useState()
	const [title, setTitle] = useState()
	const [type, setType] = useState()
	const [from, setFrom] = useState()
	const [to, setTo] = useState()
	const [location, setLocation] = useState()
	const [games, setGames] = useState()
	const [participants, setParticipants] = useState()

	const handleImage = (e) => {
		setImage(e.target.files[0])
	}

	const handleTitle = (e) => {
		setTitle(e.target.value)
	}

	const handleType = (e) => {
		setType(e.target.value)
	}

	const handleFrom = (e) => {
		setFrom(e.target.value)
	}

	const handleTo = (e) => {
		setTo(e.target.value)
	}

	const handleLocation = (e) => {
		setLocation(e.target.value)
	}

	const handleGames = (e) => {
		setGames(e.target.value)
	}

	const handleParticipants = (e) => {
		setParticipants(e.target.value)
	}

	const onPublish = async () => {
		const event = {
			image,
			title,
			type,
			from,
			to,
			location,
			games,
			participants
		}

		uploadEvent(event)
	}

	return(
		<div className="flex flex-col gap-8 py-8 px-8">
			<h1 className="font-LogikBold text-4xl">EVENT</h1>
			<input onChange={handleImage} type="file" placeholder="Enter image" multiple accept="image/*,audio/*,video/*" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"></input>
			<input onChange={handleTitle} type="text" placeholder="Enter event name" name="title" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
			<input onChange={handleType} type="text"  placeholder="Enter the type" name="type" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
			<input onChange={handleLocation} type="text"  placeholder="Enter the Location" name="location" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
			<input onChange={handleGames} type="list"  placeholder="Enter featured games" name="games" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
			<input onChange={handleParticipants} type="number"  placeholder="Enter the number of participating countries" name="participants" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
			<div className="w-full flex gap-4 font-LogikWide">
				<div className="flex flex-col gap-2"><label for="from">From</label> <input onChange={handleFrom} type="date"  placeholder="Enter starting date" name="from" className="h-full w-full px-2 border-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/></div>
				<div className="flex flex-col gap-2"><label for="to">To</label> <input onChange={handleTo} type="date"  placeholder="Enter ending date" name="to" className="h-full w-full px-2 border-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/></div>
			</div>
			<button onClick={onPublish} className='py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>PUBLISH</button>
		</div>
	)
}
