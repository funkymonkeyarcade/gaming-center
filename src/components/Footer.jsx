export function Footer() {
	return(
	  <footer className='flex flex-col gap-4 w-full justify-between py-8 px-12 text-white bg-primary'>
		<div className='flex justify-between w-full py-4 border-accent border-b-2'>
		  <div>Logo</div>
		  <div>socials</div>
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
