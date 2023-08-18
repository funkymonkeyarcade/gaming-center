import Image from "next/image";
import Logo from "../../public/logo.svg"

import facebook from "../assets/icons/icons8-facebook.svg"
import instagram from "../assets/icons/icons8-instagram.svg"
import linkedin from "../assets/icons/icons8-linkedin.svg"
import twitter from "../assets/icons/icons8-twitter.svg"
import youtube from "../assets/icons/icons8-youtube.svg"

export function Footer() {
	return(
	  <footer className='flex flex-col gap-4 w-full justify-between py-8 px-8 sm:px-12 text-white bg-primary'>
		<div className='flex flex-col gap-8 sm:gap-0 sm:flex-row justify-between items-center w-full py-4 border-accent border-b-2'>
		  <Image className="w-60" src={Logo} width={"100%"} />
		  <ul className="flex gap-4">
			{/* <a href="" target="_blank"><li className="w-10 h-10 p-2 rounded-full border-[0.1rem] border-white"><Image src={facebook} width={'50%'}></Image></li></a>
			<a href="" target="_blank"><li className="w-10 h-10 p-2 rounded-full border-[0.1rem] border-white"><Image src={twitter} width={'50%'}></Image></li></a>		 */}
			<a href="https://www.youtube.com/@FunkymonkeyArcade" target="_blank"><li className="w-10 h-10 p-2 rounded-full border-[0.1rem] border-white"><Image src={youtube} width={'50%'}></Image></li></a>
			{/* <a href="" target="_blank"><li className="w-10 h-10 p-2 rounded-full border-[0.1rem] border-white"><Image src={linkedin} width={'50%'}></Image></li></a>			 */}
			<a href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MDE0Mzk0OTY0NjQxMzIy?igshid=MzRlODBiNWFlZA==" target="_blank"><li className="w-10 h-10 p-2 rounded-full border-[0.1rem] border-white"><Image src={instagram} width={'50%'}></Image></li></a>
		  </ul>
		</div>
		<div>
		  <ul className='flex gap-8 font-LogikBold text-2xl text-center sm:text-left'>
			<li>Privacy Policy</li>
			<li>Terms and conditions</li>
		  </ul>
		</div>
		<div className='flex justify-center w-full text-center sm:text-left'>
		  <p className='text-sm font-LogikWide'>© All rights reserved – Funky Monkey Arcade</p>
		</div>
	  </footer>
	)
  }
