import Image from "next/image"

function EventCard() {
	return (
		<div className="grid grid-cols-[1fr_6fr] items-center h-72 w-full">
			<div className="flex flex-col items-center gap-4">
				<div className="flex flex-col items-center">
					<h2 className="text-xl text-accent font-LogikWide">AUG</h2>
					<h1 className="text-5xl text-white font-LogikBold">24</h1>
				</div>
				<div className="h-2 bg-white w-5/12 rounded-lg"></div>
				<div className="flex flex-col items-center">
					<h2 className="text-xl text-accent font-LogikWide">SEP</h2>
					<h1 className="text-5xl text-white font-LogikBold">3</h1>
				</div>
			</div>

			<div className="relative h-full">
				<div className="relative left-6 z-10 grid grid-cols-[2fr_3fr] gap-6 h-full">
					<Image className="h-full bg-black w-full shadow-lg" />
					<div className="text-black py-8 flex flex-col gap-8 justify-center">
						<h1 className="text-2xl font-LogikBold">WORLD ESPORTS CHAMPIONSHIP</h1>
						<div className="flex flex-col gap-2">
							<div className="flex gap-4">
								<h2 className="text-lg font-LogikBold">TYPE</h2>
								<p>Offline</p>
							</div>
							<div className="flex gap-4">
								<h2 className="text-lg font-LogikBold">LOCATION</h2>
								<p>Iasi, Romania</p>
							</div>
							<div className="flex flex-col">
								<h2 className="text-lg font-LogikBold">GAME TITLES</h2>
								<p className="w-10/12">CS:GO CS:GO Female eFootball Tekken7 Dota2 PUBG MOBILE Mobile Legends: Bang Bang</p>
							</div>
							<div className="flex gap-4">
								<h2 className="text-lg font-LogikBold">PARTICIPATING COUNTRIES</h2>
								<p>125</p>
							</div>
						</div>
					</div>
				</div>

				<div className="absolute bg-white h-[90%] w-full m-auto top-0 right-0 left-0 bottom-0"></div>
			</div>
		</div>
	)
}

export default function Events() {
	return(
		<div className="flex flex-col gap-8 items-center bg-primary pt-24 pb-24">
			<div className="flex flex-col items-center justify-center w-11/12">
				<h1 className="text-white font-LogikBold text-5xl pb-24">Events</h1>

				<div className="flex flex-col gap-16 w-full">
					<EventCard />
					<EventCard />
					<EventCard />
				</div>
			</div>
		</div>
	)
}
