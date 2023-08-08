function NewsCard() {
	return(
		<div className='flex flex-col w-full shadow-lg'>
	      <img className='bg-black h-64 rounded-lg' src="" alt="" />
		  <div className="bg-gray-800 flex flex-col gap-6 px-8 py-4">
			<div className="flex flex-col gap-2">
				<p className="text-gray-600 font-LogikBold">2 hours</p>
				<h2 className='text-white font-LogikBold'>The nations are calling out the greats</h2>
			</div>
			<button className="flex justify-start bg-none text-accent font-LogikWide">READ MORE</button>

		  </div>
	    </div>
	)
}

export default function News() {
	return(
		<div className="flex flex-col gap-8 items-center bg-primary pt-24 pb-24">
			<div className="flex flex-col items-center justify-center w-11/12">
				<h1 className="text-white font-LogikBold text-5xl pb-24">News</h1>

				<div className="grid grid-cols-2 gap-8 w-full">
					<NewsCard />
					<NewsCard />
					<NewsCard />
					<NewsCard />
				</div>
			</div>
		</div>
	)
}
