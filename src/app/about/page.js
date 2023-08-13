import { Calendar } from "../../components/Calendar.jsx"
import Newsletter from "../../components/Newsletter"

function AboutText() {
	return (
		<section className="flex flex-col gap-4 py-24 bg-white text-primary w-full px-8 sm:px-16">
			<h1 className='text-6xl font-black font-LogikBold'>WHAT IS IESF ?</h1>
			<h2 className="text-lg font-LogikWide"><b>At our core, we are driven by a mission to elevate the world of esports.</b></h2>
			<p className="text-2xl">Throughout the year, we organize a series of tournaments and events, proudly hosting the annual World Esports Championship, the place where we unite the elite esports athletes from across the globe, fostering an environment of fair and elite competition.</p>
		</section>
	)
}

function TournamentText() {
	return (
		<section className="flex flex-col gap-8 sm:grid sm:grid-cols-2 sm:gap-4 py-24 bg-white text-primary w-full px-8 sm:px-16 m-0">
			<div className="flex flex-col gap-4">
				<h1 className='text-4xl sm:text-6xl font-black font-LogikBold'>OFFICIAL TOURNAMENT PLATFORM</h1>
				<h2 className="text-lg font-LogikWide"><b>Welcome to the epicenter of Esports.</b></h2>
				<p className="text-2xl">Everything you need to know for the 15th World Esports Championship, from Live broadcasts to detailed information about our participants!</p>
			</div>
			<img className="w-full h-full" src="https://firebasestorage.googleapis.com/v0/b/gaming-906ed.appspot.com/o/michal-ilenda-UzwsrV3bFdU-unsplash.png?alt=media&token=a2f93deb-6f0a-46a7-bdc4-0f6e10327d55"/>
		</section>
	)
}

export default function About() {
	return(
		<div className="flex flex-col items-center bg-primary">
			<div className="flex flex-col items-center justify-center pt-40 px-8 sm:px-0 w-full bg-[size:100%] bg-[linear-gradient(to_top,rgba(23,15,35,1),rgba(23,15,35,0)_90%),url('https://firebasestorage.googleapis.com/v0/b/gaming-906ed.appspot.com/o/cool-geometric-triangular-figure-neon-laser-light-great-backgrounds.jpg?alt=media&token=754cb71a-ab23-487f-9648-6dc908b016c6')]">
				<h1 className="text-white font-LogikBold text-5xl pb-24">CREATING ONE ESPORTS WORLD</h1>
			</div>
			<AboutText />
			<Calendar />
			<TournamentText />
			<Newsletter />
		</div>
	)
}
