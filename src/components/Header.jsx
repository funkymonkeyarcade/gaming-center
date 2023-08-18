"use client"
import { useState } from "react"

import Link from "next/link"
import Logo from "../../public/logo.svg"
import Image from "next/image"
import Menu from "./Menu"

export function Header() {
	const [isMenu, setIsMenu] = useState(false)

	function toggleMenu() {
		setIsMenu(!isMenu)
	}

	return (
	  <header className='fixed z-50 flex w-full px-8 sm:px-12 justify-between py-8 sm:py-4 text-white bg-primary bg-opacity-50'>
		<Link href={"/"}><Image className="w-32" src={Logo} width={"100%"} /></Link>
		<div>
			<Menu toggleMenu={toggleMenu} isMenu={isMenu}/>
			<img className="h-12 sm:hidden" src="/menu.svg" alt="menu" onClick={toggleMenu}/>
			<ul className='hidden sm:flex gap-8 font-LogikBold text-sm'>
				<Link href={"/events"}><li className='p-2 hover:border-b-2 hover:border-accent cursor-pointer'>EVENTS</li></Link>
				<Link href={"/news"}><li className='p-2 hover:border-b-2 hover:border-accent cursor-pointer'>NEWS</li></Link>
				<Link href={"/about"}><li className='p-2 hover:border-b-2 hover:border-accent cursor-pointer'>ABOUT</li></Link>
				<Link href={"/rent"}><li className='p-2 hover:border-b-2 hover:border-accent cursor-pointer'>RENTALS</li></Link>
				<Link href={"/contact"}><li className='p-2 hover:border-b-2 hover:border-accent cursor-pointer'>CONTACT US</li></Link>
			</ul>
		</div>
	  </header>
	)
  }
