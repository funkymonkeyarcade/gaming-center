import Link from "next/link"

export function Header() {
	return (
	  <header className='fixed flex w-full px-12 justify-between py-4 text-white bg-primary bg-opacity-50'>
		<Link href={"/"}><div>logo</div></Link>
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
