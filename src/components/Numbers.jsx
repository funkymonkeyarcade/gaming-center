'use client'

import { collection, query, getDocs, getFirestore } from "firebase/firestore";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from "react";
import { app } from "@/utils/firebase";

function FactCard({number, image, description}) {
	return(
		<div className='flex flex-col-reverse sm:grid sm:grid-cols-[1fr_2fr] sm:gap-24 w-full pb-16'>
		  <div className='flex flex-col gap-2 items-start justify-center sm:px-12'>
			<h1 className='text-white text-6xl font-LogikBold'>{number}</h1>
			<p className='text-white text-2xl font-LogikWide text-left'>{description}</p>
		  </div>
		  <div className='flex justify-end h-96 relative sm:w-11/12'>
			<img className='h-80 w-96 bg-black' src={image} alt={description} />
		  </div>
		</div>
	)
}

export default function Numbers() {

	const [facts, setFacts] = useState()

	async function GetFacts() {

		const db = getFirestore(app);

		const q = query(collection(db, "Facts"));

		const querySnapshot = await getDocs(q);
		const factsData = querySnapshot.docs.map((doc) => doc.data());
     	setFacts(factsData);

	}

	useEffect(() => {
		GetFacts()
	}, [])

	return (
	  <section className='flex flex-col items-center gap-16 px-8 sm:px-16 pt-16 pb-8 w-full '>
		<h1 className='text-white font-LogikBold text-5xl w-full pb-4'>ESPORTS BY THE NUMBERS</h1>
		<Carousel showStatus={false} infiniteLoop={true} showArrows={false} className="w-full">
			{facts && facts.map((factsItem, idx) => (
				<div key={idx}><FactCard number={factsItem.number} image={factsItem.image} description={factsItem.description} /></div>
			))}
		</Carousel>
	  </section>
	)
  }
