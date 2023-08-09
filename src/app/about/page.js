import { Calendar } from "../../components/Calendar.jsx"
import Newsletter from "../../components/Newsletter"

function AboutText() {
	return (
		<section className="flex flex-col gap-4 py-24 bg-white text-primary w-full px-16">
			<h1 className='text-6xl font-black font-LogikBold'>WHAT IS IESF ?</h1>
			<h2 className="text-lg font-LogikWide"><b>At our core, we are driven by a mission to elevate the world of esports.</b></h2>
			<p className="text-2xl">Throughout the year, we organize a series of tournaments and events, proudly hosting the annual World Esports Championship, the place where we unite the elite esports athletes from across the globe, fostering an environment of fair and elite competition.</p>
		</section>
	)
}

function TournamentText() {
	return (
		<section className="grid grid-cols-2 gap-4 py-24 bg-white text-primary w-full px-16 m-0">
			<div>
				<h1 className='text-6xl font-black font-LogikBold'>WHAT IS IESF ?</h1>
				<h2 className="text-lg font-LogikWide"><b>At our core, we are driven by a mission to elevate the world of esports.</b></h2>
				<p className="text-2xl">Throughout the year, we organize a series of tournaments and events, proudly hosting the annual World Esports Championship, the place where we unite the elite esports athletes from across the globe, fostering an environment of fair and elite competition.</p>
			</div>
		</section>
	)
}

export default function About() {
	return(
		<div className="flex flex-col items-center bg-primary pt-40 pb-0">
			<div className="flex flex-col items-center justify-center w-11/12">
				<h1 className="text-white font-LogikBold text-5xl pb-24">CREATING ONE ESPORTS WORLD</h1>
			</div>

			<AboutText />
			<Calendar />
			<TournamentText />
			<Newsletter />
		</div>
	)
}
