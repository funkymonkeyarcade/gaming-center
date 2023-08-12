import Link from "next/link";

export default function AdminLayout({ children }) {
	return(
		<div className="grid grid-cols-[1fr_4fr] py-24 h-screen bg-primary text-white w-11/12 m-auto">
			<ul className="flex flex-col gap-4 px-12 bg-black bg-opacity-50 py-24 rounded-lg font-LogikWide">
				<Link href="/admin/news"><li className="border-b-2 border-gray-500 py-2 hover:text-accent hover:border-accent">News</li></Link>
				<Link href="/admin/facts"><li className="border-b-2 border-gray-500 py-2 hover:text-accent hover:border-accent">Facts</li></Link>
				<Link href="/admin/events"><li className="border-b-2 border-gray-500 py-2 hover:text-accent hover:border-accent">Events</li></Link>
			</ul>
			<div>
				{children}
			</div>
		</div>
	)
}
