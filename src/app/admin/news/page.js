"use client"

import { app } from "@/utils/firebase"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore,setDoc, query, getDocs, collection, doc, deleteDoc } from "firebase/firestore";
import { useState,useEffect } from "react"

async function uploadArticle({image, title, article, timestamp}) {
	const storage = getStorage()
	const storageRef = ref(storage, `${title}.png`)

	const snapshot = await uploadBytes(storageRef, image);
	const imageLink = await getDownloadURL(snapshot.ref);

	const db = getFirestore(app);
	await setDoc(doc(db, "News", title), {
		image: imageLink,
		title,
		timestamp,
		article
	})
}

const NewsCard = ({title, image, onDelete}) => {

	async function removeItem() {
		const db = getFirestore(app);
		await deleteDoc(doc(db, "News", title)).then(() => {
			onDelete()
		});
	}

	return(
		<div className="w-full p-4 flex-flex-col sm:grid sm:grid-cols-[1fr_4fr_1fr] gap-16 sm:gap-8 items-center bg-black bg-opacity-70 rounded-lg shadow-lg">
			<img src={image} className="w-full" width={100} height={100} alt={title} />
			<div className="flex flex-col">
				<h2 className="text-2xl font-LogikBold">{title}</h2>
			</div>
			<div className="flex gap-4">
				<button onClick={removeItem} className='py-2 px-6 font-LogikBold justify-self-end w-max hover:bg-red-400 bg-red-600 text-white transition-all rounded-md'>DELETE</button>
			</div>
		</div>
	)
}

export default function UpdateNews() {
	const [page,setPage] = useState(1)
	const [news,setNews] = useState([])
	const [image, setImage] = useState()
	const [title, setTitle] = useState()
	const [article, setArticle] = useState()
	const [error, setError] = useState()
	const [success, setSuccess] = useState()

	const handleImage = (e) => {
		setImage(e.target.files[0])
	}

	const handleTitle = (e) => {
		setTitle(e.target.value)
	}

	const handleArticle = (e) => {
		setArticle(e.target.value)
	}

	function showSuccess() {
		setSuccess(true)

		setTimeout(() => {
			setSuccess(false)
		}, 4000);
	}

	function validateArticleData() {
		if (!image || !title || !article) {
		  return false; // Return false if any field is missing
		}

		// Add additional validation conditions if needed
		// For example, you could check if the title meets a certain length requirement

		return true; // All conditions are met, data is valid
	  }

	async function GetNews() {
		const db = getFirestore(app);

		const q = query(collection(db, "News"));

		const querySnapshot = await getDocs(q);
		const NewsData = querySnapshot.docs.map((doc) => doc.data());
		setNews(NewsData);
	}

	const loadItems = () => {
		GetNews()
	}

	const handleItemChange = () => {
		loadItems()
	}

	useEffect(() => {
		loadItems()
	},[])

	const onPublish = async () => {
		setError('')

		if(!validateArticleData()) {
			setError('Please fill all fields')
			return
		}

		const content = {
			image,
			title,
			article: article.replace(/\n/g, '\\n'),
			timestamp: new Date
		}

		uploadArticle(content).then(() => {
			showSuccess()
			setArticle('')
			setTitle('')
			setImage('')
		}).catch(err => {
			setError(err)
		})
	}

	return(
		<div className="flex flex-col gap-8 py-8 px-8">

			<div className="flex w-max m-auto items-center gap-16">
				<h1 onClick={() => setPage(1)} className={`${page==1? 'text-accent underline':'text-white'} text-xl font-LogikBold cursor-pointer`}>Add News</h1>
				<div className="h-6 w-1 bg-gray-100"></div>
				<h1 onClick={() => setPage(2)} className={`${page==2? 'text-accent underline':'text-white'} text-xl font-LogikBold cursor-pointer`}>Edit News</h1>
			</div>

			{page==1 &&
				<>
					<h1 className="font-LogikBold text-4xl">NEWS</h1>
					<input onChange={handleImage} type="file" placeholder="Enter image" multiple accept="image/*,audio/*,video/*" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"></input>
					<input onChange={handleTitle} value={title} type="text" name="title" placeholder="Enter article title" className="h-8 px-2 border-b-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
					<textarea onChange={handleArticle} value={article} placeholder="Write article" className="h-60 px-2 border-2 focus:border-accent outline-none text-white  bg-transparent transition-all"/>
					<button onClick={onPublish} className='py-2 px-6 font-LogikBold justify-self-end w-max bg-accent text-white hover:bg-white hover:text-accent transition-all rounded-md'>PUBLISH</button>
				</>
			}

			{page==2 &&
				<>
					{news && news.map((newsItem, idx) => (
						<div key={idx}><NewsCard onDelete={handleItemChange} title={newsItem.title} image={newsItem.image} /></div>
					))}
				</>
			}

			{success &&
				<div className="fixed z-50 flex justify-center m-auto bottom-0 left-0 w-screen p-4 bg-black bg-opacity-80 rounded-lg">
					<h1 className="text-2xl text-green-600 font-LogikBold">Article uploaded successfully</h1>
				</div>
			}

			{error &&
				<div className="fixed z-50 flex justify-center m-auto bottom-0 left-0 w-screen p-4 bg-black bg-opacity-80 rounded-lg">
					<h1 className="text-2xl text-red-600 font-LogikBold">{error}</h1>
				</div>
			}
		</div>
	)
}
