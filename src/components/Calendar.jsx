"use client"

import { app } from "@/utils/firebase";
import { collection, doc, getDocs, getFirestore, query, limit } from "firebase/firestore";
import { useEffect, useState } from "react";

function formatDate(dateString) {
	const options = {month: 'long', day: 'numeric' };
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', options);
}

function CalendarCard({title, image, from, to}) {
	return(
	  <div className='flex flex-col gap-4 items-center justify-center w-64 px-1 h-72 bg-black bg-cover bg-opacity-20 rounded-lg' style={{backgroundImage: `linear-gradient(rgba(218, 28, 92, 0.9), rgba(218, 28, 92, 0.9)), url(${image})`}}>
		<p className='font-LogikBold text-gray-800 text-lg'>{`${formatDate(from)}`}</p>
		<h2 className='text-white font-LogikBold text-2xl text-center'>{title}</h2>
	  </div>
	)
  }


  export function Calendar() {

	const [events, setEvents] = useState()

	async function GetEvents() {

		const db = getFirestore(app);

		const q = query(collection(db, "Events"), limit(4));

		const querySnapshot = await getDocs(q);
		const eventData = querySnapshot.docs.map((doc) => doc.data());
		eventData.sort((a, b) => new Date(a.from) - new Date(b.from))
     	setEvents(eventData);

	}

	useEffect(() => {
		GetEvents()
	}, [])

	return (
	  <section className='flex flex-col gap-16 px-8 sm:px-16 justify-center items-center pt-32 pb-8 w-full'>
		<h1 className='text-white font-LogikBold text-5xl w-full pb-24 border-accent border-b-2'>2023 EVENTS CALENDAR</h1>
		<div className='flex flex-col sm:flex-row gap-8 justify-center overflow-hidden w-full pb-16'>
			{events && events.map((eventItem, idx) => (
				<div key={idx} className="flex justify-center"><CalendarCard title={eventItem.title} image={eventItem.image} from={eventItem.from} to={eventItem.to}/></div>
			))}
		</div>
	  </section>
	)
  }
