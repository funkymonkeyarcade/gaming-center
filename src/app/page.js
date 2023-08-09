import { NewsList } from '@/components/News.jsx'
import { Calendar } from '../components/Calendar.jsx'
import Numbers from '@/components/Numbers.jsx'

function Hero() {
  return(
    <section className='relative grid grid-cols-2 text-white px-16 pt-56 pb-32 w-full'>
      <div className='flex flex-col gap-4 z-10'>
        <h1 className='text-4xl font-black font-LogikBold'>INTERNATIONAL <br/><span className='text-accent'>E</span>SPORTS FEDERATION</h1>
        <button className='p-4 w-max font-bold bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>15TH WORLD ESPORTS CHAMPIONSHIP</button>
      </div>
      <div className='absolute w-full h-full overflow-hidden'>
        <video autoPlay loop>
          <source src='/pexels_videos_1957727 (1080p).mp4' />
        </video>
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
    <div className='flex flex-col items-center bg-primary overflow-hidden'>
       <Hero />
       <NewsList />
       <Calendar />
       <Numbers />
       <Partners />
    </div>
  )
}
