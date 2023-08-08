import Image from "next/image";

import facebook from "../assets/icons/icons8-facebook.svg"
import instagram from "../assets/icons/icons8-instagram.svg"
import linkedin from "../assets/icons/icons8-linkedin.svg"
import twitter from "../assets/icons/icons8-twitter.svg"
import youtube from "../assets/icons/icons8-youtube.svg"

export function Footer() {
	return(
	  <footer className='flex flex-col gap-4 w-full justify-between py-8 px-12 text-white bg-primary'>
		<div className='flex justify-between w-full py-4 border-accent border-b-2'>
		  <div>Logo</div>
		  <ul className="flex gap-4">
			<li className="w-10 p-2 rounded-full border-[0.1rem] border-white"><Image src={facebook} width={'50%'}></Image></li>
			<li className="w-10 p-2 rounded-full border-[0.1rem] border-white"><Image src={twitter} width={'50%'}></Image></li>
			<li className="w-10 p-2 rounded-full border-[0.1rem] border-white"><Image src={youtube} width={'50%'}></Image></li>
			<li className="w-10 p-2 rounded-full border-[0.1rem] border-white"><Image src={linkedin} width={'50%'}></Image></li>
			<li className="w-10 p-2 rounded-full border-[0.1rem] border-white"><Image src={instagram} width={'50%'}></Image></li>

		  </ul>
		</div>
		<div>
		  <ul className='flex gap-8 font-LogikBold text-2xl'>
			<li>Privacy Policy</li>
			<li>Terms and conditions</li>
		  </ul>
		</div>
		<div className='flex justify-center w-full '>
		  <p className='text-sm font-LogikWide'>© All rights reserved – International Esports Federation</p>
		</div>
	  </footer>
	)
  }
