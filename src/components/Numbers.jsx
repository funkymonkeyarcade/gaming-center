'use client'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function SingleFact() {
	return(
		<div className='grid grid-cols-[1fr_2fr] w-full pb-16'>
		  <div className='flex flex-col justify-center px-16'>
			<h1 className='text-white text-4xl font-LogikBold'>$1.3B</h1>
			<p className='text-white text-xl font-LogikWide'>Total E-sports industry Revenue</p>
		  </div>
		  <div className='flex justify-end pr-16'>
			<img className='w-10/12 h-96 bg-black ' src="" alt="" />
		  </div>
		</div>
	)
}

export default function Numbers() {
	return (
	  <section className='flex flex-col items-center gap-16 px-16 pt-32 pb-8 w-full '>
		<h1 className='text-white font-LogikBold text-5xl w-full pb-4'>ESPORTS BY THE NUMBERS</h1>
		<Carousel showStatus={false} infiniteLoop={true} showArrows={false} className="w-full">
			<SingleFact />
			<SingleFact />
			<SingleFact />
			<SingleFact />
			<SingleFact />
		</Carousel>
	  </section>
	)
  }
