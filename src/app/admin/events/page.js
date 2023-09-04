"use client"

import { app } from "@/utils/firebase"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore,setDoc, query, getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react"

const EventCard = ({title, type, location, image, from, to, featured, participants, onDelete}) => {

	async function removeItem() {
		const db = getFirestore(app);
		await deleteDoc(doc(db, "Events", title)).then(() => {
			onDelete()
		});
	}

	return(
		<div className="w-full p-4 flex-flex-col sm:grid sm:grid-cols-[1fr_4fr_1fr] gap-16 sm:gap-8 items-center bg-black bg-opacity-70 rounded-lg shadow-lg">
			<img src={image} className="w-full" width={100} height={100} alt={title} />
			<div className="flex flex-col">
				<h2 className="text-2xl font-LogikBold">{title}</h2>
				<p className="text-xl font-LogikWide">Location: {location}</p>
				<p className="text-xl font-LogikWide">Type: {type}</p>
				<p className="text-xl font-LogikWide">Participants: {participants}</p>
				<p className="text-xl font-LogikWide">From: {from}</p>
				<p className="text-xl font-LogikWide">To: {to}</p>
			</div>
			<div className="flex gap-4">
				<button onClick={removeItem} className='py-2 px-6 font-LogikBold justify-self-end w-max hover:bg-red-400 bg-red-600 text-white transition-all rounded-md'>DELETE</button>
			</div>
		</div>
	)
}

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
	const [page,setPage] = useState(1)
	const [events, setEvents] = useState([])
	const [error, setError] = useState()
	const [success, setSuccess] = useState()
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

	function showSuccess() {
		setSuccess(true)

		setTimeout(() => {
			setSuccess(false)
		}, 4000);
	}

	function validateEventData() {
		if (!image || !title || !type || !from || !to || !location || !games || !participants) {
		  return false; // Return false if any field is missing
		}

		// Add additional validation conditions if needed
		// For example, you could check if the title meets a certain length requirement

		return true; // All conditions are met, data is valid
	  }

	  async function GetEvents() {
		const db = getFirestore(app);

		const q = query(collection(db, "Events"));

		const querySnapshot = await getDocs(q);
		const EventsData = querySnapshot.docs.map((doc) => doc.data());
     	setEvents(EventsData);
	}

	const loadItems = () => {
		GetEvents()
	}

	const handleItemChange = () => {
		loadItems()
	}

	useEffect(() => {
		loadItems()
	},[])

	const onPublish = async () => {

		setError('')

		if(!validateEventData()) {
			setError('Please fill all fields')
			return
		}

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

		uploadEvent(event).then(() => {
			showSuccess()
			setTitle('')
			setImage('')
			setType('')
			setFrom('')
			setTo('')
			setGames('')
			setParticipants('')
			setLocation('')
		}).catch(err => {
			setError(err)
		})
	}

	return(
		<div className="flex flex-col gap-8 py-8 px-8">
			<div className="flex w-max m-auto items-center gap-16">
				<h1 onClick={() => setPage(1)} className={`${page==1? 'text-accent underline':'text-white'} text-xl font-LogikBold cursor-pointer`}>Add Event</h1>
				<div className="h-6 w-1 bg-gray-100"></div>
				<h1 onClick={() => setPage(2)} className={`${page==2? 'text-accent underline':'text-white'} text-xl font-LogikBold cursor-pointer`}>Edit Events</h1>
			</div>

			{page==1 &&
				<>
					<h1 className="font-LogikBold text-4xl">EVENT</h1>
					<input onChange={handleImage} type="file" placeholder="Enter image" multiple accept="image/*,audio/*,video/*" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"></input>
					<input onChange={handleTitle} value={title} type="text" placeholder="Enter event name" name="title" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
					<input onChange={handleType} value={type} type="text"  placeholder="Enter the type" name="type" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
					<input onChange={handleLocation} value={location} type="text"  placeholder="Enter the Location" name="location" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
					<input onChange={handleGames} value={games} type="list"  placeholder="Enter featured games" name="games" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
					<input onChange={handleParticipants} value={participants} type="number"  placeholder="Enter the number of participants" name="participants" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
					<div className="w-full flex gap-4 font-LogikWide">
						<div className="flex flex-col gap-2"><label for="from">From</label> <input onChange={handleFrom} value={from} type="date"  placeholder="Enter starting date" name="from" className="h-full w-full px-2 border-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/></div>
						<div className="flex flex-col gap-2"><label for="to">To</label> <input onChange={handleTo} value={to} type="date"  placeholder="Enter ending date" name="to" className="h-full w-full px-2 border-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/></div>
					</div>
					<button onClick={onPublish} className='py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>PUBLISH</button>
				</>
			}

			{page==2 &&
				<>
					{events && events.map((eventsItem, idx) => (
						<div key={idx}><EventCard onDelete={handleItemChange} title={eventsItem.title} type={eventsItem.type} image={eventsItem.image} from={eventsItem.from} to={eventsItem.to} location={eventsItem.location} games={eventsItem.games} participants={eventsItem.participants}/></div>
					))}
				</>
			}

			{success &&
				<div className="fixed z-50 flex justify-center m-auto bottom-0 left-0 w-screen p-4 bg-black bg-opacity-80 rounded-lg">
					<h1 className="text-2xl text-green-600 font-LogikBold">Article uploaded successfully</h1>
				</div>
			}

			{error &&
				<div className="fixed z-50 flex justify-center m-auto bottom-0 left-0 w-screen p-4 bg-black bg-opacity-80 rounded-lg">
					<h1 className="text-2xl text-red-600 font-LogikBold">{error}</h1>
				</div>
			}
		</div>
	)
}
