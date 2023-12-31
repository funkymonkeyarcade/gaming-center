import { NewsList } from '@/components/News.jsx'
import { Calendar } from '../components/Calendar.jsx'
import Numbers from '@/components/Numbers.jsx'
import Link from 'next/link.js'
import Popup from '@/components/Popup.jsx'

function Hero() {
  return(
    <section className='relative sm:h-full grid grid-cols-2 text-white px-4 pt-56 pb-56 sm:px-16 sm:pt-56 sm:pb-32 w-full'>
      <div className='flex flex-col h-full justify-center gap-4 z-10'>
        <h1 className='text-4xl font-black font-LogikBold'>FIRST E-SPORTS CENTER <br/>IN <span className='text-accent'>R</span>WANDA</h1>
        <Link href='/events'><button className='p-4 w-max font-bold bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>UPCOMING EVENTS</button></Link>
      </div>
      <div className='absolute w-full sm:h-full overflow-hidden'>
        <div className='absolute top-0 h-[200%] w-full bg-gradient-to-t from-primary via-primary to-transparent'></div>
        <video autoPlay loop>
          <source src='https://firebasestorage.googleapis.com/v0/b/gaming-906ed.appspot.com/o/InShot_20230814_150812336.mp4?alt=media&token=ec03c011-2de5-40b6-820f-5427e408a59d' />
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
      <Popup />
      <Hero />
      <NewsList />
      <Calendar />
      <Numbers />
      {/* <Partners /> */}
    </div>
  )
}
