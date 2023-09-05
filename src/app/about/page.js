import { Calendar } from "../../components/Calendar.jsx"
import Newsletter from "../../components/Newsletter"

function AboutText() {
	return (
		<section className="flex flex-col gap-4 py-24 bg-white text-primary w-full px-8 sm:px-16">
			<h1 className='text-6xl font-black font-LogikBold'>WHAT IS FUNKY MONKEY ARCADE?</h1>
			<h2 className="text-lg font-LogikWide"><b>Unleashing the Thrill of Competitive Gaming in Rwanda</b></h2>
			<p className="text-2xl">Your premier destination for esports excitement in Rwanda. Immerse yourself in a world where gaming transcends boundaries. From casual players to aspiring pros, our cutting-edge facility fosters skill growth and community building. Join us and be part of redefining Rwanda&rsquo;s esports scene.</p>
		</section>
	)
}

function TournamentText() {
	return (
		<section className="flex flex-col gap-8 sm:grid sm:grid-cols-2 sm:gap-4 py-24 bg-white text-primary w-full px-8 sm:px-16 m-0">
			<div className="flex flex-col gap-4">
				<h1 className='text-4xl sm:text-6xl font-black font-LogikBold'>OFFICIAL TOURNAMENT ARENA</h1>
				<h2 className="text-lg font-LogikWide"><b>Elevate Your Game.</b></h2>
				<p className="text-2xl">Funky Monkey Arcade&rsquo;s Tournament Arena isn&rsquo;t just a platform – it&rsquo;s a launching pad for esports enthusiasts to ascend to new heights. Sharpen your skills, forge connections, and etch your name into the annals of esports history.</p>
			</div>
			<img className="w-full h-full " src="https://firebasestorage.googleapis.com/v0/b/gaming-906ed.appspot.com/o/michal-ilenda-UzwsrV3bFdU-unsplash.png?alt=media&token=a2f93deb-6f0a-46a7-bdc4-0f6e10327d55"/>
		</section>
	)
}

export default function About() {
	return(
		<div className="flex flex-col items-center bg-primary">
			<div className="flex flex-col items-center justify-center pt-40 px-8 sm:px-0 w-full bg-[size:100%] bg-[linear-gradient(to_top,rgba(4,9,38,1),rgba(4,9,38,0)_90%),url('https://firebasestorage.googleapis.com/v0/b/gaming-906ed.appspot.com/o/cool-geometric-triangular-figure-neon-laser-light-great-backgrounds.jpg?alt=media&token=754cb71a-ab23-487f-9648-6dc908b016c6')]">
				<h1 className="text-white font-LogikBold text-5xl pb-24">PROMOTING ESPORTS IN RWANDA</h1>
			</div>
			<AboutText />
			<Calendar />
			<TournamentText />
			{/* <Newsletter /> */}
		</div>
	)
}
