export default function Newsletter() {
	return(
		<section className="flex flex-col sm:grid sm:grid-cols-2 gap-4 py-24 bg-accent text-primary w-full px-8 sm:px-16 m-0">
			<h1 className='text-4xl sm:text-6xl font-black font-LogikBold'>SIGN UP FOR OUR NEWSLETTER</h1>
			<div className="flex flex-col gap-4 px-0 sm:px-16">
				<div className="flex flex-col gap-4">
					<input className="h-8 px-2 border-b-2 focus:border-white outline-none text-white bg-transparent transition-all " type="text" name="name" placeholder="Full name"/>
					<input className="h-8 px-2 border-b-2 focus:border-white outline-none text-white bg-transparent transition-all" type="text" name="email" placeholder="E-mail"/>
				</div>
				<p className="text-primary">This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
				<button className='py-2 px-6 font-LogikBold col-span-2 justify-self-end w-max font-bold bg-white text-primary hover:bg-primary hover:text-white transition-all rounded-md'>SEND</button>
			</div>
		</section>
	)
}
