import Link from "next/link";

export default function Menu({toggleMenu, isMenu}) {
	return(
		<div className={`fixed top-0 right-0 flex flex-col px-8 py-12 gap-12 bg-primary shadow-lg ${isMenu? 'h-max':'overflow-hidden translate-x-full scale-x-0'} transition-all duration-200`}>
			<div className="w-full flex justify-end text-lg" onClick={toggleMenu}>x</div>
			<ul className='flex flex-col gap-8 font-LogikBold text-lg'>
				<Link href={"/events"}><li onClick={toggleMenu} className='p-2 hover:border-b-2 hover:border-accent cursor-pointer'>EVENTS</li></Link>
				<Link href={"/news"}><li onClick={toggleMenu} className='p-2 hover:border-b-2 hover:border-accent cursor-pointer'>NEWS</li></Link>
				<Link href={"/about"}><li onClick={toggleMenu} className='p-2 hover:border-b-2 hover:border-accent cursor-pointer'>ABOUT</li></Link>
				<Link href={"/contact"}><li onClick={toggleMenu} className='p-2 hover:border-b-2 hover:border-accent cursor-pointer'>CONTACT US</li></Link>
		  	</ul>
		</div>
	)
}
