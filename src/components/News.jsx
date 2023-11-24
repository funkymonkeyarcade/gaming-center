'use client'
import { app } from "@/utils/firebase";
import { collection, query, getDocs, getFirestore } from "firebase/firestore";

import Image from "next/image";
import Slider from "react-slick";

import NextIcon from "../assets/icons/next.svg"
import PreviousIcon from "../assets/icons/prev.svg"
import { useEffect, useState } from "react";
import Link from "next/link";

function NewsCard({image, title}) {
	return (
		<Link href={`/e-sport-news/${title}`}>
		  <div className='flex flex-col gap-4 w-72'>
			<img src={image} alt={title} className="bg-black h-52 rounded-lg w-full hover:scale-110 transition-all" />
			<h2 className='text-white font-LogikBold'>{title}</h2>
		  </div>
		</Link>
	)
  }

  function Next(props) {
	const { className, style, onClick } = props;
	return(
		<Image
			className={className}
			style={{ ...style, display: "block"}}
			onClick={onClick}
			src={NextIcon}
		/>
	)
  }

  function Prev(props) {
	const { className, style, onClick } = props;
	return(
		<Image
			className={className}
			style={{ ...style, display: "block"}}
			onClick={onClick}
   			src={PreviousIcon}
		/>
	)
  }

export function NewsList() {
	const [news, setNews] = useState([])
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: news.length<4? news.length:4,
		slidesToScroll: 1,
		nextArrow: <Next />,
      	prevArrow: <Prev />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
				  slidesToShow: 2,
				}
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
			  }
			},
		  ]
	}

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

	return (
	  <section className='flex flex-col gap-24 px-8 sm:px-16 lg:pt-32 pt-8 w-full'>
		<h1 className='text-white font-LogikBold text-5xl w-full pb-8 border-accent border-b-2'>News</h1>
		<Slider className="w-full" {...settings}>
			{news && news.map((newsItem, idx) => (
				<div key={idx}><NewsCard title={newsItem.title} image={newsItem.image} /></div>
			))}
		</Slider>
	  </section>
	)
  }
