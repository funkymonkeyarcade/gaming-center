import Link from "next/link"
import Logo from "../../public/logo.svg"
import Image from "next/image"

export function Header() {
	return (
	  <header className='fixed z-50 flex w-full px-12 justify-between py-4 text-white bg-primary bg-opacity-50'>
		<Link href={"/"}><Image className="w-32" src={Logo} width={"100%"} /></Link>
		<div>
		  <ul className='flex gap-8 font-LogikBold text-sm'>
			<Link href={"/events"}><li className='p-2 hover:border-b-2 hover:border-accent cursor-pointer'>EVENTS</li></Link>
			<Link href={"/news"}><li className='p-2 hover:border-b-2 hover:border-accent cursor-pointer'>NEWS</li></Link>
			<Link href={"/about"}><li className='p-2 hover:border-b-2 hover:border-accent cursor-pointer'>ABOUT</li></Link>
			<Link href={"/contact"}><li className='p-2 hover:border-b-2 hover:border-accent cursor-pointer'>CONTACT US</li></Link>
		  </ul>
		</div>
	  </header>
	)
  }
