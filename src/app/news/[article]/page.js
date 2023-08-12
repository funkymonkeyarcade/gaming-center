"use client"

import { NewsList } from "@/components/News";
import Newsletter from "@/components/Newsletter";
import { app } from "@/utils/firebase";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import Image from "next/image";

import { useState, useEffect } from "react";

export function getDate(timestamp) {
	// Convert seconds to milliseconds
	const milliseconds = timestamp.seconds * 1000;

	// Create a Date object
	const date = new Date(milliseconds);

	// Extract day, month, and year components
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
	const year = date.getFullYear();

	// Return formatted date
	return `${day}/${month}/${year}`;
}

function getArticle(article) {
	return article.replace(/\\n/g, '<br>')
}

export default function Article({params}) {
	const [news,setNews] = useState()
	console.log(params.article)

	async function GetNews() {

		const db = getFirestore(app);

		const q = query(collection(db, "News"), where("title", "==", decodeURI(params.article)));

		const querySnapshot = await getDocs(q);
		const newsData = querySnapshot.docs.map((doc) => doc.data());
		console.log(await newsData)
     	setNews(newsData);

	}

	useEffect(() => {
		GetNews()
	}, [])

	return(

		<div className="flex flex-col gap-16">
			<div className="flex flex-col gap-16 px-16 py-24 w-full text-white">
				{news &&
					<div className="flex flex-col gap-4">
						<div className={`bg-black h-96 rounded-lg w-full bg-center bg-cover transition-all`}  alt="" style={{backgroundImage: `url(${news[0].image})`}}/>
						<p className="text-xl font-LogikWide">{getDate(news[0].timestamp)}</p>
						<h1 className="text-6xl font-LogikBold">{news[0].title}</h1>
						<div dangerouslySetInnerHTML={{ __html: getArticle(news[0].article) }} />
					</div>
				}
			</div>
			<NewsList />
			<Newsletter />
		</div>
	)
}
