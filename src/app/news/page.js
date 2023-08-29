"use client"
import { getDate } from "./[article]/page";
import { app } from "@/utils/firebase";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import Link from "next/link";
import { useState, useEffect } from "react";

function NewsCard({title, image, timestamp}) {
	return(
		<div className='flex flex-col w-full shadow-lg'>
	      <div className='bg-black h-64 rounded-t-xl bg-center bg-[size:120%] hover:bg-[size:140%] transition-all'  style={{backgroundImage: `url(${image})`}}/>
		  <div className="bg-gray-800 flex flex-col gap-6 px-8 py-4">
			<div className="flex flex-col gap-2">
				<p className="text-gray-600 font-LogikBold">{getDate(timestamp)}</p>
				<h2 className='text-white font-LogikBold'>{title}</h2>
			</div>
			<Link href={`/news/${title}`}><button className="flex justify-start bg-none text-accent font-LogikWide">READ MORE</button></Link>
		  </div>
	    </div>
	)
}

export default function News() {

	const [news, setNews] = useState([])

	async function GetNews() {

		const db = getFirestore(app);

		const q = query(collection(db, "News"));

		const querySnapshot = await getDocs(q);
		const newsData = querySnapshot.docs.map((doc) => doc.data());
     	setNews(newsData);

	}

	useEffect(() => {
		GetNews()
	}, [])

	return(
		<div className="flex flex-col gap-8 items-center bg-primary pb-24">
			<div className="flex flex-col pt-32 pb-24 items-center justify-center bg-cover w-full bg-[linear-gradient(to_top,rgba(4,9,38,1)_40%,rgba(4,9,38,0)_100%),url('https://firebasestorage.googleapis.com/v0/b/gaming-906ed.appspot.com/o/10987662_4561977.jpg?alt=media&token=a757fb2a-fc76-45a3-a82e-b2ce44b00ccd')]">
				<h1 className="text-white font-LogikBold text-5xl">News</h1>
			</div>

			<div className="grid sm:grid-cols-2 gap-8 w-11/12">
				{news && news.map((newsItem, idx) => (
					<div key={idx}><NewsCard title={newsItem.title} image={newsItem.image} timestamp={newsItem.timestamp} /></div>
				))}
			</div>
		</div>
	)
}
