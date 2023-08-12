export default function UpdateFacts() {
	return(
		<div className="flex flex-col gap-8 py-8 px-8">
			<h1 className="font-LogikBold text-4xl">FACTS</h1>
			<input type="text" name="title" placeholder="Enter fact number" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
			<input placeholder="Write article" className="h-60 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
			<button className='py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>PUBLISH</button>
		</div>
	)
}
