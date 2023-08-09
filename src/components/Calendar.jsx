function CalendarCard() {
	return(
	  <div className='flex flex-col gap-4 items-center justify-center w-64 h-72 bg-black rounded-lg'>
		<p className='font-LogikWide text-gray-400 text-sm'>16 January - 17 January</p>
		<h2 className='text-white font-LogikBold text-xl'>National Qualifiers</h2>
		<div className='grid place-items-center rounded-full w-12 h-12 bg-accent text-white font-LogikBold'>Play</div>
	  </div>
	)
  }

  export function Calendar() {
	return (
	  <section className='flex flex-col gap-16 px-16 pt-32 pb-8 w-full'>
		<h1 className='text-white font-LogikBold text-5xl w-full pb-24 border-accent border-b-2'>2023 EVENTS CALENDAR</h1>
		<div className='flex gap-8 justify-center overflow-hidden w-full pb-16'>
		  <CalendarCard />
		  <CalendarCard />
		  <CalendarCard />
		  <CalendarCard />
		</div>
	  </section>
	)
  }
