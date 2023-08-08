import Image from 'next/image'

function Hero() {
  return(
    <section className='grid grid-cols-2 text-white px-16 pt-56 pb-32 w-full'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-4xl font-black font-LogikBold'>INTERNATIONAL <br/><span className='text-accent'>E</span>SPORTS FEDERATION</h1>
        <button className='p-4 w-max font-bold bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>15TH WORLD ESPORTS CHAMPIONSHIP</button>
      </div>
    </section>
  )
}

function NewsCard() {
  return (
    <div className='flex flex-col gap-2 w-72'>
      <img className='bg-black h-52 rounded-lg w-full' src="" alt="" />
      <h2 className='text-white font-LogikBold'>The nations are calling out the greats</h2>
    </div>
  )
}

function News() {
  return (
    <section className='flex flex-col gap-24 px-16 pt-8 w-full'>
      <h1 className='text-white font-LogikBold text-5xl w-full pb-24 border-accent border-b-2'>News</h1>
      <div className='flex gap-4 overflow-hidden border-accent pb-24 border-b-2'>
        <NewsCard/>
        <NewsCard/>
        <NewsCard/>
        <NewsCard/>
      </div>
    </section>
  )
}

function CalendarCard() {
  return(
    <div className='flex flex-col gap-4 items-center justify-center w-64 h-72 bg-black rounded-lg'>
      <p className='font-LogikWide text-gray-400 text-sm'>16 January - 17 January</p>
      <h2 className='text-white font-LogikBold text-xl'>National Qualifiers</h2>
      <div className='grid place-items-center rounded-full w-12 h-12 bg-accent text-white font-LogikBold'>Play</div>
    </div>
  )
}

function Calendar() {
  return (
    <section className='flex flex-col gap-16 px-16 pt-32 w-full'>
      <h1 className='text-white font-LogikBold text-5xl w-full pb-24 border-accent border-b-2'>2023 EVENTS CALENDAR</h1>
      <div className='flex gap-8 justify-center overflow-hidden w-full border-accent pb-24 border-b-2'>
        <CalendarCard />
        <CalendarCard />
        <CalendarCard />
        <CalendarCard />
      </div>
    </section>
  )
}

function Numbers() {
  return (
    <section className='flex flex-col items-center gap-16 px-16 pt-32 pb-24 w-full '>
      <h1 className='text-white font-LogikBold text-5xl w-full pb-4'>ESPORTS BY THE NUMBERS</h1>
      <div className='grid grid-cols-[1fr_2fr] w-full pb-24 border-accent border-b-2'>
        <div className='flex flex-col justify-center px-16'>
          <h1 className='text-white text-4xl font-LogikBold'>$1.3B</h1>
          <p className='text-white text-xl font-LogikWide'>Total E-sports industry Revenue</p>
        </div>
        <div className='flex justify-end pr-16'>
          <img className='w-10/12 h-96 bg-black ' src="" alt="" />
        </div>
      </div>
    </section>
  )
}

function Partners() {
  return (
    <section className='flex flex-col gap-16 px-16 py-12 w-full'>
      <h1 className='text-white font-LogikBold text-5xl w-full pb-4'>OUR PARTNERS</h1>
      <div className='flex gap-8 justify-center overflow-hidden w-full '>
        <img className="bg-black h-32 w-40" src="" alt="" />
        <img className="bg-black h-32 w-40" src="" alt="" />
        <img className="bg-black h-32 w-40" src="" alt="" />
        <img className="bg-black h-32 w-40" src="" alt="" />
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className='flex flex-col items-center bg-primary'>
       <Hero />
       <News />
       <Calendar />
       <Numbers />
       <Partners />
    </div>
  )
}
