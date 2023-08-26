"use client"
import { useEffect, useState } from "react"

import { usePathname } from 'next/navigation';

import Link from "next/link"
import Logo from "../../public/logo.svg"
import Image from "next/image"
import Menu from "./Menu"

export function Header() {
	const [isMenu, setIsMenu] = useState(false)
	const [path,setPath] = useState()

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
				<Link href={"/events"}><li className={`p-2 ${usePathname() == '/events'? 'text-accent':'text-white'} hover:border-b-2 hover:border-accent cursor-pointer transition-all`}>EVENTS</li></Link>
				<Link href={"/news"}><li className={`p-2 ${usePathname() == '/news'? 'text-accent':'text-white'} hover:border-b-2 hover:border-accent cursor-pointer transition-all`}>NEWS</li></Link>
				<Link href={"/about"}><li className={`p-2 ${usePathname() == '/about'? 'text-accent':'text-white'} hover:border-b-2 hover:border-accent cursor-pointer transition-all`}>ABOUT</li></Link>
				<Link href={"/rent"}><li className={`p-2 ${usePathname() == '/rent'? 'text-accent':'text-white'} hover:border-b-2 hover:border-accent cursor-pointer transition-all`}>RENTALS</li></Link>
				<Link href={"/contact"}><li className={`p-2 ${usePathname() == '/contact'? 'text-accent':'text-white'} hover:border-b-2 hover:border-accent cursor-pointer transition-all`}>REGISTER</li></Link>
			</ul>
		</div>
	  </header>
	)
  }
