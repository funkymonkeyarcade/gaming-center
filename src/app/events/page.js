"use client"
import { useEffect, useState } from "react";
import Image from "next/image"
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { app } from "@/utils/firebase";

function getShortMonth(dateString) {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const date = new Date(dateString);
	const monthIndex = date.getMonth();
	const shortMonth = months[monthIndex];
	const day = date.getDate();
	return { day, shortMonth };
}

function EventCard({image, title, type, from, to, location, games, participants}) {
	return (
		<div className="flex flex-col gap-8 sm:grid sm:grid-cols-[1fr_6fr] items-center sm:h-72 w-full">
			<div className="flex sm:flex-col items-center gap-4">
				<div className="flex flex-col items-center">
					<h2 className="text-xl text-accent font-LogikWide">{getShortMonth(from).shortMonth}</h2>
					<h1 className="text-5xl text-white font-LogikBold">{getShortMonth(from).day}</h1>
				</div>
				{/* <div className="h-12 sm:h-2 bg-white w-full sm:w-5/12 rounded-lg"></div>
				<div className="flex flex-col items-center">
					<h2 className="text-xl text-accent font-LogikWide">{getShortMonth(to).shortMonth}</h2>
					<h1 className="text-5xl text-white font-LogikBold">{getShortMonth(to).day}</h1>
				</div> */}
			</div>

			<div className="relative h-full w-11/12">
				<div className="relative flex flex-col sm:left-6 z-10 sm:grid sm:grid-cols-[2fr_3fr] sm:gap-6 h-full">
					<div className="h-full bg-black w-11/12 m-auto sm:w-full shadow-xl bg-cover bg-center rounded-lg" style={{backgroundImage: `url(${image})`}} />
					<div className="text-black pb-16 py-6 px-8 sm:px-0 sm:pb-4 flex flex-col gap-4 justify-center">
						<h1 className="text-2xl font-LogikBold w-11/12">{title}</h1>
						<div className="flex flex-col gap-2">
							<div className="sm:flex gap-4">
								<h2 className="text-base font-LogikBold">TYPE</h2>
								<p>{type}</p>
							</div>
							<div className="sm:flex gap-4">
								<h2 className="text-base font-LogikBold">LOCATION</h2>
								<p>{location}</p>
							</div>
							<div className="sm:flex flex-col">
								<h2 className="text-base font-LogikBold">GAME TITLES</h2>
								<p className="w-10/12">{games}</p>
							</div>
							<div className="sm:flex gap-4">
								<h2 className="text-base font-LogikBold">PARTICIPANTS</h2>
								<p>{participants}</p>
							</div>
						</div>
					</div>
				</div>

				<div className="absolute bg-white h-[90%] m-auto top-0 right-0 left-0 bottom-0 rounded-lg"></div>
			</div>
		</div>
	)
}

export default function Events() {

	const [events, setEvents] = useState()

	async function GetEvents() {

		const db = getFirestore(app)

		const q = query(collection(db, "Events"))

		const querySnapshot = await getDocs(q)
		const eventsData = querySnapshot.docs.map((doc) => doc.data())
		eventsData.sort((a, b) => new Date(a.from) - new Date(b.from))

     	setEvents(eventsData);

	}

	useEffect(() => {
		GetEvents()
	}, [])

	return(
		<div className="flex flex-col gap-8 items-center bg-primary">
			<div className="flex flex-col items-center justify-center pt-40 pb-16 w-full bg-[linear-gradient(to_top,rgba(23,15,35,1),rgba(23,15,35,0)_90%),url('/futuristic-colorful-glowing-abstract-neon-lights-background.jpg')]">
				<h1 className="text-white font-LogikBold text-5xl">Events</h1>
			</div>

			<div className="flex flex-col gap-16 w-full">
				{events && events.map((eventItem, idx) => (
					<div key={idx}><EventCard title={eventItem.title} image={eventItem.image} type={eventItem.type} from={eventItem.from} to={eventItem.to} location={eventItem.location} games={eventItem.games} participants={eventItem.participants} /></div>
				))}
			</div>
		</div>
	)
}
