'use client'
import Image from "next/image";
import Slider from "react-slick";

import NextIcon from "../assets/icons/next.svg"
import PreviousIcon from "../assets/icons/prev.svg"

function NewsCard() {
	return (
	  <div className='flex flex-col gap-2 w-72'>
		<img className='bg-black h-52 rounded-lg w-full' src="" alt="" />
		<h2 className='text-white font-LogikBold'>The nations are calling out the greats</h2>
	  </div>
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
	const settings = {
		dots: false,
		infinite: true,
		// centerMode: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		nextArrow: <Next />,
      	prevArrow: <Prev />
	};

	return (
	  <section className='flex flex-col gap-24 px-16 pt-8 w-full'>
		<h1 className='text-white font-LogikBold text-5xl w-full pb-24 border-accent border-b-2'>News</h1>
		<Slider className="w-full" {...settings}>
		  <div><NewsCard/></div>
		  <div><NewsCard/></div>
		  <div><NewsCard/></div>
		  <div><NewsCard/></div>
		  <div><NewsCard/></div>
		  <div><NewsCard/></div>
		</Slider>
	  </section>
	)
  }
